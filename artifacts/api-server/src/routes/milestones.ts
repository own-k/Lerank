import { Router } from "express";
import { db, milestonesTable, applicationsTable, activityFeedTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth } from "../lib/auth.js";

const router = Router();

router.get("/applications/:id/milestones", requireAuth as any, async (req: any, res) => {
  try {
    const id = parseInt(req.params.id);
    const milestones = await db.select().from(milestonesTable).where(eq(milestonesTable.applicationId, id));
    res.json(milestones.map(m => ({ ...m, updatedAt: m.updatedAt.toISOString() })));
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:id", requireAuth as any, async (req: any, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status, description } = req.body;

    const [updated] = await db.update(milestonesTable)
      .set({ status, description, updatedAt: new Date() })
      .where(eq(milestonesTable.id, id))
      .returning();

    if (!updated) {
      res.status(404).json({ error: "NotFound" });
      return;
    }

    // Recalculate application progress
    const allMilestones = await db.select().from(milestonesTable).where(eq(milestonesTable.applicationId, updated.applicationId));
    const completedCount = allMilestones.filter(m => m.status === "completed").length;
    const progressPercent = allMilestones.length > 0 ? (completedCount / allMilestones.length) * 100 : 0;

    await db.update(applicationsTable)
      .set({ progressPercent, updatedAt: new Date() })
      .where(eq(applicationsTable.id, updated.applicationId));

    // Log activity
    const app = await db.query.applicationsTable.findFirst({ where: eq(applicationsTable.id, updated.applicationId) });
    if (app) {
      await db.insert(activityFeedTable).values({
        userId: app.studentId,
        applicationId: app.id,
        message: `Milestone "${updated.name}" marked as ${status.replace("_", " ")}`,
        type: "milestone_update",
      });
    }

    res.json({ ...updated, updatedAt: updated.updatedAt.toISOString() });
  } catch (err: any) {
    res.status(500).json({ error: "Server error", message: err?.message });
  }
});

export default router;
