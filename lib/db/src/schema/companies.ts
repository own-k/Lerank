import { pgTable, serial, text, boolean, integer, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const companiesTable = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logoUrl: text("logo_url"),
  description: text("description"),
  bio: text("bio"),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  location: text("location"),
  workingHours: text("working_hours"),
  requirementsPerCountry: text("requirements_per_country"), // JSON string
  website: text("website"),
  rating: real("rating").notNull().default(0),
  studentsHelped: integer("students_helped").notNull().default(0),
  successRate: real("success_rate").notNull().default(0),
  priceMin: integer("price_min").notNull().default(500),
  priceMax: integer("price_max").notNull().default(5000),
  specializedCountries: text("specialized_countries").array().notNull().default([]),
  degreeLevels: text("degree_levels").array().notNull().default([]),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertCompanySchema = createInsertSchema(companiesTable).omit({ id: true, createdAt: true });

export type Company = typeof companiesTable.$inferSelect;
export type InsertCompany = z.infer<typeof insertCompanySchema>;
