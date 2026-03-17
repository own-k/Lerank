import { Router } from "express";
import { db, applicationsTable, milestonesTable, transactionsTable, activityFeedTable } from "@workspace/db";
import { eq, and, gte } from "drizzle-orm";
import { requireAuth } from "../lib/auth.js";

const router = Router();

router.get("/stats", requireAuth as any, async (req: any, res) => {
  try {
    const applications = await db.select().from(applicationsTable).where(eq(applicationsTable.studentId, req.userId));
    const activeApplications = applications.filter(a => a.status === "active").length;

    // Milestones completed this week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const appIds = applications.map(a => a.id);
    let milestonesCompletedThisWeek = 0;
    if (appIds.length > 0) {
      const allMilestones = await db.select().from(milestonesTable);
      milestonesCompletedThisWeek = allMilestones.filter(
        m => appIds.includes(m.applicationId) &&
          m.status === "completed" &&
          m.updatedAt >= oneWeekAgo
      ).length;
    }

    // Money stats
    const heldTransactions = await db.select().from(transactionsTable);
    const myAppIds = new Set(applications.map(a => a.id));
    const myTransactions = heldTransactions.filter(t => myAppIds.has(t.applicationId));
    const moneyInEscrow = myTransactions.filter(t => t.status === "held").reduce((s, t) => s + t.amount, 0);
    const moneyReleased = myTransactions.filter(t => t.status === "released").reduce((s, t) => s + t.amount, 0);

    res.json({ activeApplications, milestonesCompletedThisWeek, moneyInEscrow, moneyReleased });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/activity", requireAuth as any, async (req: any, res) => {
  try {
    const activities = await db.select().from(activityFeedTable)
      .where(eq(activityFeedTable.userId, req.userId));
    const sorted = activities.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 20);
    res.json(sorted.map(a => ({
      id: a.id,
      message: a.message,
      timestamp: a.createdAt.toISOString(),
      type: a.type,
    })));
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
