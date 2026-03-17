import { pgTable, serial, text, integer, real, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";
import { companiesTable } from "./companies";

export const applicationStatusEnum = pgEnum("application_status", ["active", "completed", "refunded", "disputed"]);
export const escrowStatusEnum = pgEnum("escrow_status", ["pending", "held", "released", "refunded"]);
export const milestoneStatusEnum = pgEnum("milestone_status", ["not_started", "in_progress", "under_review", "completed"]);

export const applicationsTable = pgTable("applications", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull().references(() => usersTable.id),
  companyId: integer("company_id").notNull().references(() => companiesTable.id),
  serviceName: text("service_name").notNull(),
  status: applicationStatusEnum("status").notNull().default("active"),
  progressPercent: real("progress_percent").notNull().default(0),
  totalAmount: integer("total_amount").notNull(),
  escrowStatus: escrowStatusEnum("escrow_status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const milestonesTable = pgTable("milestones", {
  id: serial("id").primaryKey(),
  applicationId: integer("application_id").notNull().references(() => applicationsTable.id),
  name: text("name").notNull(),
  description: text("description"),
  status: milestoneStatusEnum("status").notNull().default("not_started"),
  orderIndex: integer("order_index").notNull().default(0),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const activityFeedTable = pgTable("activity_feed", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id),
  applicationId: integer("application_id").references(() => applicationsTable.id),
  message: text("message").notNull(),
  type: text("type").notNull().default("milestone_update"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertApplicationSchema = createInsertSchema(applicationsTable).omit({ id: true, createdAt: true, updatedAt: true });
export const insertMilestoneSchema = createInsertSchema(milestonesTable).omit({ id: true, updatedAt: true });
export const insertActivitySchema = createInsertSchema(activityFeedTable).omit({ id: true, createdAt: true });

export type Application = typeof applicationsTable.$inferSelect;
export type Milestone = typeof milestonesTable.$inferSelect;
export type ActivityItem = typeof activityFeedTable.$inferSelect;
