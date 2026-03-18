import { Router } from "express";
import { db, applicationsTable, usersTable, companiesTable, milestoneTemplatesTable } from "@workspace/db";
import { UpdateCompanySettingsBody } from "@workspace/api-zod";
import { eq } from "drizzle-orm";
import { requireAuth } from "../lib/auth.js";

const router = Router();

router.get("/students", requireAuth as any, async (req: any, res) => {
  try {
    const user = await db.query.usersTable.findFirst({ where: eq(usersTable.id, req.userId) });
    if (!user?.companyId) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    const applications = await db.select().from(applicationsTable).where(eq(applicationsTable.companyId, user.companyId));
    const students = await db.select().from(usersTable);
    const studentMap = new Map(students.map(s => [s.id, s]));

    res.json(applications.map(app => {
      const student = studentMap.get(app.studentId);
      return {
        studentId: app.studentId,
        studentName: student?.fullName ?? "Unknown",
        email: student?.email ?? "",
        applicationId: app.id,
        serviceName: app.serviceName,
        progressPercent: app.progressPercent,
        escrowStatus: app.escrowStatus,
        totalAmount: app.totalAmount,
      };
    }));
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/settings", requireAuth as any, async (req: any, res) => {
  try {
    const user = await db.query.usersTable.findFirst({ where: eq(usersTable.id, req.userId) });
    if (!user?.companyId || user.role !== "company_admin") {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    const company = await db.query.companiesTable.findFirst({ where: eq(companiesTable.id, user.companyId) });
    if (!company) {
      res.status(404).json({ error: "NotFound" });
      return;
    }
    res.json({
      id: company.id,
      name: company.name,
      bio: company.bio,
      description: company.description,
      contactEmail: company.contactEmail,
      contactPhone: company.contactPhone,
      location: company.location,
      workingHours: company.workingHours,
      requirementsPerCountry: company.requirementsPerCountry,
      website: company.website,
      priceMin: company.priceMin,
      priceMax: company.priceMax,
      specializedCountries: company.specializedCountries,
      rating: company.rating,
      studentsHelped: company.studentsHelped,
      successRate: company.successRate,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/settings", requireAuth as any, async (req: any, res) => {
  try {
    const user = await db.query.usersTable.findFirst({ where: eq(usersTable.id, req.userId) });
    if (!user?.companyId || user.role !== "company_admin") {
      res.status(403).json({ error: "Forbidden" });
      return;
    }

    const body = UpdateCompanySettingsBody.parse(req.body);
    const updates: any = {};
    if (body.name !== undefined) updates.name = body.name;
    if (body.bio !== undefined) updates.bio = body.bio;
    if (body.contactEmail !== undefined) updates.contactEmail = body.contactEmail;
    if (body.contactPhone !== undefined) updates.contactPhone = body.contactPhone;
    if (body.location !== undefined) updates.location = body.location;
    if (body.workingHours !== undefined) updates.workingHours = body.workingHours;
    if (body.requirementsPerCountry !== undefined) updates.requirementsPerCountry = body.requirementsPerCountry;
    if (body.priceMin !== undefined) updates.priceMin = body.priceMin;
    if (body.priceMax !== undefined) updates.priceMax = body.priceMax;
    if (body.specializedCountries !== undefined) updates.specializedCountries = body.specializedCountries;

    if (Object.keys(updates).length > 0) {
      await db.update(companiesTable).set(updates).where(eq(companiesTable.id, user.companyId));
    }

    const company = await db.query.companiesTable.findFirst({ where: eq(companiesTable.id, user.companyId) });
    res.json({
      id: company!.id,
      name: company!.name,
      bio: company!.bio,
      description: company!.description,
      contactEmail: company!.contactEmail,
      contactPhone: company!.contactPhone,
      location: company!.location,
      workingHours: company!.workingHours,
      requirementsPerCountry: company!.requirementsPerCountry,
      website: company!.website,
      priceMin: company!.priceMin,
      priceMax: company!.priceMax,
      specializedCountries: company!.specializedCountries,
      rating: company!.rating,
      studentsHelped: company!.studentsHelped,
      successRate: company!.successRate,
    });
  } catch (err: any) {
    res.status(500).json({ error: "Server error", message: err?.message });
  }
});

router.get("/milestone-templates", requireAuth as any, async (req: any, res) => {
  try {
    const user = await db.query.usersTable.findFirst({ where: eq(usersTable.id, req.userId) });
    if (!user?.companyId) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    const templates = await db.select().from(milestoneTemplatesTable).where(eq(milestoneTemplatesTable.companyId, user.companyId));
    res.json(templates.map(t => ({
      id: t.id,
      companyId: t.companyId,
      name: t.name,
      milestones: JSON.parse(t.milestonesJson || "[]"),
      createdAt: t.createdAt.toISOString(),
    })));
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/milestone-templates", requireAuth as any, async (req: any, res) => {
  try {
    const user = await db.query.usersTable.findFirst({ where: eq(usersTable.id, req.userId) });
    if (!user?.companyId) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    const { name, milestones } = req.body;
    const [template] = await db.insert(milestoneTemplatesTable).values({
      companyId: user.companyId,
      name,
      milestonesJson: JSON.stringify(milestones || []),
    }).returning();
    res.status(201).json({
      id: template.id,
      companyId: template.companyId,
      name: template.name,
      milestones: JSON.parse(template.milestonesJson),
      createdAt: template.createdAt.toISOString(),
    });
  } catch (err: any) {
    res.status(500).json({ error: "Server error", message: err?.message });
  }
});

export default router;
