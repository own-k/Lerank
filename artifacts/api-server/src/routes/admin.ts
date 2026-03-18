import { Router } from "express";
import { db, companiesTable, usersTable, transactionsTable, applicationsTable, studentProfilesTable } from "@workspace/db";
import { AdminCreateUserBody, AdminUpdateUserRoleBody } from "@workspace/api-zod";
import { eq, ilike } from "drizzle-orm";
import { requireAuth, requireRole, hashPassword, generateUserCode, generateToken } from "../lib/auth.js";

const router = Router();

// All admin routes require super_admin role
router.use(requireAuth as any);
router.use(requireRole("super_admin") as any);

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
      userCode: u.userCode,
      emailVerified: u.emailVerified,
      createdAt: u.createdAt.toISOString(),
    })));
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/users/search", async (req: any, res) => {
  try {
    const code = (req.query.code as string || "").trim().toUpperCase();
    if (!code) {
      res.status(400).json({ error: "BadRequest", message: "Code is required" });
      return;
    }
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.userCode, code),
    });
    if (!user) {
      res.status(404).json({ error: "NotFound", message: "No user found with this code" });
      return;
    }
    res.json({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      avatarUrl: user.avatarUrl,
      onboardingCompleted: user.onboardingCompleted,
      companyId: user.companyId,
      userCode: user.userCode,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt.toISOString(),
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/users", async (req: any, res) => {
  try {
    const body = AdminCreateUserBody.parse(req.body);
    const existing = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, body.email),
    });
    if (existing) {
      res.status(400).json({ error: "BadRequest", message: "Email already in use" });
      return;
    }

    let userCode: string;
    do {
      userCode = generateUserCode();
      const dup = await db.query.usersTable.findFirst({ where: eq(usersTable.userCode, userCode) });
      if (!dup) break;
    } while (true);

    const [user] = await db.insert(usersTable).values({
      email: body.email,
      passwordHash: hashPassword(body.password),
      fullName: body.fullName,
      role: body.role,
      companyId: body.companyId ?? null,
      emailVerified: true,
      userCode,
    }).returning();

    res.status(201).json({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      avatarUrl: user.avatarUrl,
      onboardingCompleted: user.onboardingCompleted,
      companyId: user.companyId,
      userCode: user.userCode,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt.toISOString(),
    });
  } catch (err: any) {
    if (err?.name === "ZodError") {
      res.status(400).json({ error: "ValidationError", message: err.message });
    } else {
      res.status(500).json({ error: "Server error", message: err?.message });
    }
  }
});

router.delete("/users/:id", async (req: any, res) => {
  try {
    const id = parseInt(req.params.id);
    if (id === req.userId) {
      res.status(400).json({ error: "BadRequest", message: "Cannot delete yourself" });
      return;
    }
    const user = await db.query.usersTable.findFirst({ where: eq(usersTable.id, id) });
    if (!user) {
      res.status(404).json({ error: "NotFound" });
      return;
    }
    // Delete related data
    await db.delete(studentProfilesTable).where(eq(studentProfilesTable.userId, id));
    await db.delete(usersTable).where(eq(usersTable.id, id));
    res.json({ success: true, message: "User deleted" });
  } catch (err: any) {
    res.status(500).json({ error: "Server error", message: err?.message });
  }
});

router.put("/users/:id/role", async (req: any, res) => {
  try {
    const id = parseInt(req.params.id);
    const body = AdminUpdateUserRoleBody.parse(req.body);
    const user = await db.query.usersTable.findFirst({ where: eq(usersTable.id, id) });
    if (!user) {
      res.status(404).json({ error: "NotFound" });
      return;
    }

    const updates: any = { role: body.role };
    if (body.companyId !== undefined) {
      updates.companyId = body.companyId;
    }

    const [updated] = await db.update(usersTable)
      .set(updates)
      .where(eq(usersTable.id, id))
      .returning();

    res.json({
      id: updated.id,
      email: updated.email,
      fullName: updated.fullName,
      role: updated.role,
      avatarUrl: updated.avatarUrl,
      onboardingCompleted: updated.onboardingCompleted,
      companyId: updated.companyId,
      userCode: updated.userCode,
      emailVerified: updated.emailVerified,
      createdAt: updated.createdAt.toISOString(),
    });
  } catch (err: any) {
    res.status(500).json({ error: "Server error", message: err?.message });
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
