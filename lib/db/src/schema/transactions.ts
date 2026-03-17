import { pgTable, serial, integer, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { applicationsTable } from "./applications";

export const transactionStatusEnum = pgEnum("transaction_status", ["pending", "held", "released", "refunded", "disputed"]);

export const transactionsTable = pgTable("transactions", {
  id: serial("id").primaryKey(),
  applicationId: integer("application_id").notNull().references(() => applicationsTable.id),
  amount: integer("amount").notNull(),
  platformFee: integer("platform_fee").notNull(),
  escrowFee: integer("escrow_fee").notNull(),
  status: transactionStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const milestoneTemplatesTable = pgTable("milestone_templates", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").notNull(),
  name: text("name").notNull(),
  milestonesJson: text("milestones_json").notNull().default("[]"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertTransactionSchema = createInsertSchema(transactionsTable).omit({ id: true, createdAt: true });
export const insertMilestoneTemplateSchema = createInsertSchema(milestoneTemplatesTable).omit({ id: true, createdAt: true });

export type Transaction = typeof transactionsTable.$inferSelect;
export type MilestoneTemplate = typeof milestoneTemplatesTable.$inferSelect;
