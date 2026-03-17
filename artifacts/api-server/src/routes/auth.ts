import { Router } from "express";
import { db, usersTable, studentProfilesTable } from "@workspace/db";
import { RegisterBody, LoginBody, UpdateProfileBody } from "@workspace/api-zod";
import { eq } from "drizzle-orm";
import { hashPassword, generateToken, requireAuth } from "../lib/auth.js";

const router = Router();

router.get("/me", requireAuth as any, async (req: any, res) => {
  try {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, req.userId),
    });
    if (!user) {
      res.status(401).json({ error: "Unauthorized", message: "User not found" });
      return;
    }
    const profile = await db.query.studentProfilesTable.findFirst({
      where: eq(studentProfilesTable.userId, req.userId),
    });
    res.json({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      avatarUrl: user.avatarUrl,
      onboardingCompleted: user.onboardingCompleted,
      companyId: user.companyId,
      createdAt: user.createdAt.toISOString(),
      profile: profile ? {
        ieltsScore: profile.ieltsScore,
        satScore: profile.satScore,
        toeflScore: profile.toeflScore,
        gpa: profile.gpa,
        gpaScale: profile.gpaScale,
        budgetMin: profile.budgetMin,
        budgetMax: profile.budgetMax,
        educationBudget: profile.educationBudget,
        preferredCountries: profile.preferredCountries || [],
        preferredMajor: profile.preferredMajor,
        degreeLevel: profile.degreeLevel,
        additionalNotes: profile.additionalNotes,
      } : null,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const body = RegisterBody.parse(req.body);
    const existing = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, body.email),
    });
    if (existing) {
      res.status(400).json({ error: "BadRequest", message: "Email already in use" });
      return;
    }
    const [user] = await db.insert(usersTable).values({
      email: body.email,
      passwordHash: hashPassword(body.password),
      fullName: body.fullName,
      role: "student",
    }).returning();
    const token = generateToken(user.id);
    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        avatarUrl: user.avatarUrl,
        onboardingCompleted: user.onboardingCompleted,
        companyId: user.companyId,
        createdAt: user.createdAt.toISOString(),
        profile: null,
      },
      token,
    });
  } catch (err: any) {
    if (err?.name === "ZodError") {
      res.status(400).json({ error: "ValidationError", message: err.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const body = LoginBody.parse(req.body);
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, body.email),
    });
    if (!user || user.passwordHash !== hashPassword(body.password)) {
      res.status(401).json({ error: "Unauthorized", message: "Invalid credentials" });
      return;
    }
    const profile = await db.query.studentProfilesTable.findFirst({
      where: eq(studentProfilesTable.userId, user.id),
    });
    const token = generateToken(user.id);
    res.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        avatarUrl: user.avatarUrl,
        onboardingCompleted: user.onboardingCompleted,
        companyId: user.companyId,
        createdAt: user.createdAt.toISOString(),
        profile: profile ? {
          ieltsScore: profile.ieltsScore,
          satScore: profile.satScore,
          toeflScore: profile.toeflScore,
          gpa: profile.gpa,
          gpaScale: profile.gpaScale,
          budgetMin: profile.budgetMin,
          budgetMax: profile.budgetMax,
          educationBudget: profile.educationBudget,
          preferredCountries: profile.preferredCountries || [],
          preferredMajor: profile.preferredMajor,
          degreeLevel: profile.degreeLevel,
          additionalNotes: profile.additionalNotes,
        } : null,
      },
      token,
    });
  } catch (err: any) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/logout", (_req, res) => {
  res.json({ success: true, message: "Logged out" });
});

router.put("/profile", requireAuth as any, async (req: any, res) => {
  try {
    const body = UpdateProfileBody.parse(req.body);
    const user = await db.query.usersTable.findFirst({ where: eq(usersTable.id, req.userId) });
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (body.onboardingCompleted !== undefined) {
      await db.update(usersTable).set({ onboardingCompleted: body.onboardingCompleted }).where(eq(usersTable.id, req.userId));
    }

    const existing = await db.query.studentProfilesTable.findFirst({
      where: eq(studentProfilesTable.userId, req.userId),
    });

    const profileData = {
      ieltsScore: body.ieltsScore ?? null,
      satScore: body.satScore ?? null,
      toeflScore: body.toeflScore ?? null,
      gpa: body.gpa ?? null,
      gpaScale: body.gpaScale ?? null,
      budgetMin: body.budgetMin ?? null,
      budgetMax: body.budgetMax ?? null,
      educationBudget: body.educationBudget ?? null,
      preferredCountries: body.preferredCountries ?? [],
      preferredMajor: body.preferredMajor ?? null,
      degreeLevel: body.degreeLevel ?? null,
      additionalNotes: body.additionalNotes ?? null,
    };

    if (existing) {
      await db.update(studentProfilesTable).set(profileData).where(eq(studentProfilesTable.userId, req.userId));
    } else {
      await db.insert(studentProfilesTable).values({ userId: req.userId, ...profileData });
    }

    const updated = await db.query.usersTable.findFirst({ where: eq(usersTable.id, req.userId) });
    const profile = await db.query.studentProfilesTable.findFirst({ where: eq(studentProfilesTable.userId, req.userId) });

    res.json({
      id: updated!.id,
      email: updated!.email,
      fullName: updated!.fullName,
      role: updated!.role,
      avatarUrl: updated!.avatarUrl,
      onboardingCompleted: updated!.onboardingCompleted,
      companyId: updated!.companyId,
      createdAt: updated!.createdAt.toISOString(),
      profile: profile ? {
        ieltsScore: profile.ieltsScore,
        satScore: profile.satScore,
        toeflScore: profile.toeflScore,
        gpa: profile.gpa,
        gpaScale: profile.gpaScale,
        budgetMin: profile.budgetMin,
        budgetMax: profile.budgetMax,
        educationBudget: profile.educationBudget,
        preferredCountries: profile.preferredCountries || [],
        preferredMajor: profile.preferredMajor,
        degreeLevel: profile.degreeLevel,
        additionalNotes: profile.additionalNotes,
      } : null,
    });
  } catch (err: any) {
    res.status(500).json({ error: "Server error", message: err?.message });
  }
});

export default router;
