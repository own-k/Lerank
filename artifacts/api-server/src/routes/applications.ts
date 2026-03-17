import { Router } from "express";
import { db, applicationsTable, milestonesTable, companiesTable, activityFeedTable, transactionsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth } from "../lib/auth.js";

const router = Router();

router.get("/", requireAuth as any, async (req: any, res) => {
  try {
    const applications = await db.select().from(applicationsTable).where(eq(applicationsTable.studentId, req.userId));
    const companies = await db.select().from(companiesTable);
    const companyMap = new Map(companies.map(c => [c.id, c]));

    res.json(applications.map(app => ({
      ...app,
      companyName: companyMap.get(app.companyId)?.name ?? "Unknown",
      createdAt: app.createdAt.toISOString(),
      updatedAt: app.updatedAt.toISOString(),
    })));
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", requireAuth as any, async (req: any, res) => {
  try {
    const { companyId, serviceName, totalAmount, templateId } = req.body;
    const [app] = await db.insert(applicationsTable).values({
      studentId: req.userId,
      companyId,
      serviceName,
      totalAmount,
      status: "active",
      progressPercent: 0,
      escrowStatus: "pending",
    }).returning();

    // Create transaction record
    const platformFee = Math.round(totalAmount * 0.03);
    const escrowFee = Math.round(totalAmount * 0.05);
    await db.insert(transactionsTable).values({
      applicationId: app.id,
      amount: totalAmount,
      platformFee,
      escrowFee,
      status: "pending",
    });

    // Add default milestones
    const defaultMilestones = [
      "Initial Consultation",
      "Document Collection",
      "Application Draft",
      "Application Review",
      "Final Submission",
    ];
    for (let i = 0; i < defaultMilestones.length; i++) {
      await db.insert(milestonesTable).values({
        applicationId: app.id,
        name: defaultMilestones[i],
        status: "not_started",
        orderIndex: i,
      });
    }

    // Log activity
    await db.insert(activityFeedTable).values({
      userId: req.userId,
      applicationId: app.id,
      message: `New application started with ${serviceName}`,
      type: "application",
    });

    const company = await db.query.companiesTable.findFirst({ where: eq(companiesTable.id, companyId) });

    res.status(201).json({
      ...app,
      companyName: company?.name ?? "Unknown",
      createdAt: app.createdAt.toISOString(),
      updatedAt: app.updatedAt.toISOString(),
    });
  } catch (err: any) {
    res.status(500).json({ error: "Server error", message: err?.message });
  }
});

router.get("/:id", requireAuth as any, async (req: any, res) => {
  try {
    const id = parseInt(req.params.id);
    const app = await db.query.applicationsTable.findFirst({ where: eq(applicationsTable.id, id) });
    if (!app) {
      res.status(404).json({ error: "NotFound" });
      return;
    }
    const milestones = await db.select().from(milestonesTable).where(eq(milestonesTable.applicationId, id));
    const company = await db.query.companiesTable.findFirst({ where: eq(companiesTable.id, app.companyId) });

    res.json({
      ...app,
      companyName: company?.name ?? "Unknown",
      createdAt: app.createdAt.toISOString(),
      updatedAt: app.updatedAt.toISOString(),
      milestones: milestones.map(m => ({ ...m, updatedAt: m.updatedAt.toISOString() })),
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
