import { Router } from "express";
import { db, transactionsTable, applicationsTable, usersTable, companiesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth } from "../lib/auth.js";

const router = Router();

router.get("/", requireAuth as any, async (req: any, res) => {
  try {
    const transactions = await db.select().from(transactionsTable);
    const applications = await db.select().from(applicationsTable);
    const users = await db.select().from(usersTable);
    const companies = await db.select().from(companiesTable);

    const appMap = new Map(applications.map(a => [a.id, a]));
    const userMap = new Map(users.map(u => [u.id, u]));
    const companyMap = new Map(companies.map(c => [c.id, c]));

    res.json(transactions.map(t => {
      const app = appMap.get(t.applicationId);
      const student = app ? userMap.get(app.studentId) : null;
      const company = app ? companyMap.get(app.companyId) : null;
      return {
        id: t.id,
        applicationId: t.applicationId,
        studentName: student?.fullName ?? "Unknown",
        companyName: company?.name ?? "Unknown",
        amount: t.amount,
        platformFee: t.platformFee,
        escrowFee: t.escrowFee,
        status: t.status,
        createdAt: t.createdAt.toISOString(),
      };
    }));
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
