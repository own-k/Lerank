import { Router } from "express";
import { db, usersTable, studentProfilesTable, verificationCodesTable } from "@workspace/db";
import { RegisterBody, LoginBody, UpdateProfileBody, VerifyEmailBody, ResendCodeBody, ForgotPasswordBody, ResetPasswordBody, UpdateSettingsBody } from "@workspace/api-zod";
import { eq, and } from "drizzle-orm";
import { hashPassword, generateToken, requireAuth, generateUserCode, generateVerificationCode } from "../lib/auth.js";
import { sendVerificationEmail, sendPasswordResetEmail } from "../lib/email.js";

const router = Router();

function buildUserResponse(user: any, profile: any) {
  return {
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
  };
}

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
    res.json(buildUserResponse(user, profile));
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

    // Generate unique user code
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
      role: "student",
      emailVerified: false,
      userCode,
    }).returning();

    // Generate verification code and send email
    const code = generateVerificationCode();
    await db.insert(verificationCodesTable).values({
      email: body.email,
      code,
      type: "registration",
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min
    });

    const emailSent = await sendVerificationEmail(body.email, code);

    res.status(201).json({
      requiresVerification: true,
      email: body.email,
      emailSent,
      // Fallback: show code in response if email delivery failed
      fallbackCode: emailSent ? undefined : code,
    });
  } catch (err: any) {
    if (err?.name === "ZodError") {
      res.status(400).json({ error: "ValidationError", message: err.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
});

router.post("/verify-email", async (req, res) => {
  try {
    const body = VerifyEmailBody.parse(req.body);
    const verification = await db.query.verificationCodesTable.findFirst({
      where: and(
        eq(verificationCodesTable.email, body.email),
        eq(verificationCodesTable.code, body.code),
        eq(verificationCodesTable.type, "registration"),
      ),
    });

    if (!verification || verification.expiresAt < new Date()) {
      res.status(400).json({ error: "BadRequest", message: "Invalid or expired verification code" });
      return;
    }

    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, body.email),
    });
    if (!user) {
      res.status(400).json({ error: "BadRequest", message: "User not found" });
      return;
    }

    await db.update(usersTable).set({ emailVerified: true }).where(eq(usersTable.id, user.id));
    // Clean up verification codes
    await db.delete(verificationCodesTable).where(
      and(eq(verificationCodesTable.email, body.email), eq(verificationCodesTable.type, "registration"))
    );

    const updatedUser = await db.query.usersTable.findFirst({ where: eq(usersTable.id, user.id) });
    const token = generateToken(user.id);
    res.json({
      user: buildUserResponse(updatedUser!, null),
      token,
    });
  } catch (err: any) {
    res.status(500).json({ error: "Server error", message: err?.message });
  }
});

router.post("/resend-code", async (req, res) => {
  try {
    const body = ResendCodeBody.parse(req.body);
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, body.email),
    });
    if (!user) {
      res.status(400).json({ error: "BadRequest", message: "Email not found" });
      return;
    }

    // Delete old codes
    await db.delete(verificationCodesTable).where(
      and(eq(verificationCodesTable.email, body.email), eq(verificationCodesTable.type, "registration"))
    );

    const code = generateVerificationCode();
    await db.insert(verificationCodesTable).values({
      email: body.email,
      code,
      type: "registration",
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    const emailSent = await sendVerificationEmail(body.email, code);
    res.json({ success: true, emailSent, fallbackCode: emailSent ? undefined : code });
  } catch (err: any) {
    res.status(500).json({ error: "Server error", message: err?.message });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const body = ForgotPasswordBody.parse(req.body);
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, body.email),
    });
    if (!user) {
      // Don't reveal whether email exists
      res.json({ success: true, message: "If this email is registered, a reset code has been sent." });
      return;
    }

    // Delete old codes
    await db.delete(verificationCodesTable).where(
      and(eq(verificationCodesTable.email, body.email), eq(verificationCodesTable.type, "password_reset"))
    );

    const code = generateVerificationCode();
    await db.insert(verificationCodesTable).values({
      email: body.email,
      code,
      type: "password_reset",
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    const emailSent = await sendPasswordResetEmail(body.email, code);
    res.json({ success: true, emailSent, fallbackCode: emailSent ? undefined : code });
  } catch (err: any) {
    res.status(500).json({ error: "Server error", message: err?.message });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const body = ResetPasswordBody.parse(req.body);
    const verification = await db.query.verificationCodesTable.findFirst({
      where: and(
        eq(verificationCodesTable.email, body.email),
        eq(verificationCodesTable.code, body.code),
        eq(verificationCodesTable.type, "password_reset"),
      ),
    });

    if (!verification || verification.expiresAt < new Date()) {
      res.status(400).json({ error: "BadRequest", message: "Invalid or expired reset code" });
      return;
    }

    await db.update(usersTable)
      .set({ passwordHash: hashPassword(body.newPassword) })
      .where(eq(usersTable.email, body.email));

    await db.delete(verificationCodesTable).where(
      and(eq(verificationCodesTable.email, body.email), eq(verificationCodesTable.type, "password_reset"))
    );

    res.json({ success: true, message: "Password has been reset successfully" });
  } catch (err: any) {
    res.status(500).json({ error: "Server error", message: err?.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const body = LoginBody.parse(req.body);
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, body.email),
    });
    if (!user || user.passwordHash !== hashPassword(body.password)) {
      res.status(401).json({ error: "Unauthorized", message: "Incorrect password or email" });
      return;
    }
    const profile = await db.query.studentProfilesTable.findFirst({
      where: eq(studentProfilesTable.userId, user.id),
    });
    const token = generateToken(user.id);
    res.json({
      user: buildUserResponse(user, profile),
      token,
    });
  } catch (err: any) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/logout", (_req, res) => {
  res.json({ success: true, message: "Logged out" });
});

router.put("/settings", requireAuth as any, async (req: any, res) => {
  try {
    const body = UpdateSettingsBody.parse(req.body);
    const user = await db.query.usersTable.findFirst({ where: eq(usersTable.id, req.userId) });
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const updates: any = {};

    if (body.fullName) {
      updates.fullName = body.fullName;
    }

    if (body.currentPassword && body.newPassword) {
      if (user.passwordHash !== hashPassword(body.currentPassword)) {
        res.status(400).json({ error: "BadRequest", message: "Current password is incorrect" });
        return;
      }
      updates.passwordHash = hashPassword(body.newPassword);
    }

    if (Object.keys(updates).length > 0) {
      await db.update(usersTable).set(updates).where(eq(usersTable.id, req.userId));
    }

    const updated = await db.query.usersTable.findFirst({ where: eq(usersTable.id, req.userId) });
    const profile = await db.query.studentProfilesTable.findFirst({ where: eq(studentProfilesTable.userId, req.userId) });
    res.json(buildUserResponse(updated!, profile));
  } catch (err: any) {
    res.status(500).json({ error: "Server error", message: err?.message });
  }
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
    res.json(buildUserResponse(updated!, profile));
  } catch (err: any) {
    res.status(500).json({ error: "Server error", message: err?.message });
  }
});

export default router;
