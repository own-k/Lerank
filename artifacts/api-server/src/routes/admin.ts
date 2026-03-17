import { Router } from "express";
import { db, companiesTable, usersTable, transactionsTable, applicationsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/companies", async (_req, res) => {
  try {
    const companies = await db.select().from(companiesTable);
    res.json(companies.map(c => ({ ...c, createdAt: c.createdAt.toISOString() })));
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/companies", async (req, res) => {
  try {
    const { name, description, website, priceMin, priceMax, specializedCountries, degreeLevels } = req.body;
    const [company] = await db.insert(companiesTable).values({
      name,
      description,
      website,
      priceMin,
      priceMax,
      specializedCountries: specializedCountries || [],
      degreeLevels: degreeLevels || [],
    }).returning();
    res.status(201).json({ ...company, createdAt: company.createdAt.toISOString() });
  } catch (err: any) {
    res.status(500).json({ error: "Server error", message: err?.message });
  }
});

router.put("/companies/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, website, isActive, priceMin, priceMax } = req.body;
    const [updated] = await db.update(companiesTable)
      .set({ name, description, website, isActive, priceMin, priceMax })
      .where(eq(companiesTable.id, id))
      .returning();
    if (!updated) {
      res.status(404).json({ error: "NotFound" });
      return;
    }
    res.json({ ...updated, createdAt: updated.createdAt.toISOString() });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/users", async (_req, res) => {
  try {
    const users = await db.select().from(usersTable);
    res.json(users.map(u => ({
      id: u.id,
      email: u.email,
      fullName: u.fullName,
      role: u.role,
      avatarUrl: u.avatarUrl,
      onboardingCompleted: u.onboardingCompleted,
      companyId: u.companyId,
      createdAt: u.createdAt.toISOString(),
      profile: null,
    })));
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/analytics", async (_req, res) => {
  try {
    const users = await db.select().from(usersTable);
    const companies = await db.select().from(companiesTable);
    const applications = await db.select().from(applicationsTable);
    const transactions = await db.select().from(transactionsTable);

    const totalStudents = users.filter(u => u.role === "student").length;
    const totalCompanies = companies.length;
    const totalRevenue = transactions.filter(t => t.status === "released").reduce((s, t) => s + t.platformFee, 0);
    const activeApplications = applications.filter(a => a.status === "active").length;
    const pendingTransactions = transactions.filter(t => t.status === "pending" || t.status === "held").length;
    const completedTransactions = transactions.filter(t => t.status === "released").length;
    const refundedTransactions = transactions.filter(t => t.status === "refunded").length;

    res.json({ totalStudents, totalCompanies, totalRevenue, activeApplications, pendingTransactions, completedTransactions, refundedTransactions });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
