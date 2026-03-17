import { pgTable, serial, text, boolean, integer, real, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const userRoleEnum = pgEnum("user_role", ["student", "company_admin", "super_admin"]);

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  fullName: text("full_name").notNull(),
  role: userRoleEnum("role").notNull().default("student"),
  avatarUrl: text("avatar_url"),
  onboardingCompleted: boolean("onboarding_completed").notNull().default(false),
  companyId: integer("company_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const studentProfilesTable = pgTable("student_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id),
  ieltsScore: real("ielts_score"),
  satScore: integer("sat_score"),
  toeflScore: integer("toefl_score"),
  gpa: real("gpa"),
  gpaScale: real("gpa_scale"),
  budgetMin: integer("budget_min"),
  budgetMax: integer("budget_max"),
  educationBudget: text("education_budget"),
  preferredCountries: text("preferred_countries").array(),
  preferredMajor: text("preferred_major"),
  degreeLevel: text("degree_level"),
  additionalNotes: text("additional_notes"),
});

export const insertUserSchema = createInsertSchema(usersTable).omit({ id: true, createdAt: true });
export const insertStudentProfileSchema = createInsertSchema(studentProfilesTable).omit({ id: true });

export type User = typeof usersTable.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type StudentProfile = typeof studentProfilesTable.$inferSelect;
