import { db, companiesTable, usersTable, applicationsTable, milestonesTable, transactionsTable, activityFeedTable } from "@workspace/db";
import crypto from "crypto";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + "lerank_salt_2024").digest("hex");
}

async function seed() {
  console.log("Seeding database...");

  // Clear existing data
  await db.delete(activityFeedTable);
  await db.delete(milestonesTable);
  await db.delete(transactionsTable);
  await db.delete(applicationsTable);
  await db.delete(usersTable);
  await db.delete(companiesTable);

  // Create companies
  const companiesData = [
    {
      name: "EduPath Global",
      description: "Leading consultancy specializing in US and UK university admissions. 15+ years of experience with a 92% acceptance rate.",
      website: "https://edupathglobal.com",
      rating: 4.8,
      studentsHelped: 1240,
      successRate: 92,
      priceMin: 1500,
      priceMax: 4000,
      specializedCountries: ["USA", "UK", "Canada"],
      degreeLevels: ["bachelor", "master", "phd"],
      isActive: true,
    },
    {
      name: "AcademicBridge",
      description: "Specialist in European university placements. Expert guidance for Germany, Netherlands, and Scandinavian institutions.",
      website: "https://academicbridge.eu",
      rating: 4.6,
      studentsHelped: 890,
      successRate: 88,
      priceMin: 1000,
      priceMax: 3000,
      specializedCountries: ["Germany", "Netherlands", "Sweden"],
      degreeLevels: ["bachelor", "master"],
      isActive: true,
    },
    {
      name: "OxBridge Consultants",
      description: "Elite consultancy focused exclusively on Oxbridge and Ivy League admissions. Highly personalized service.",
      website: "https://oxbridgeconsultants.com",
      rating: 4.9,
      studentsHelped: 420,
      successRate: 78,
      priceMin: 3000,
      priceMax: 8000,
      specializedCountries: ["UK", "USA"],
      degreeLevels: ["bachelor", "master", "phd"],
      isActive: true,
    },
    {
      name: "Asia Pacific Admissions",
      description: "Gateway to top universities in Australia, Japan, South Korea, and Singapore. Multilingual support available.",
      website: "https://apacadmissions.com",
      rating: 4.5,
      studentsHelped: 1680,
      successRate: 91,
      priceMin: 800,
      priceMax: 2500,
      specializedCountries: ["Australia", "Japan", "South Korea"],
      degreeLevels: ["bachelor", "master"],
      isActive: true,
    },
    {
      name: "North Star Education",
      description: "Canada specialist with strong relationships with top Canadian universities. Expertise in immigration and study permit guidance.",
      website: "https://northstaredu.ca",
      rating: 4.7,
      studentsHelped: 960,
      successRate: 89,
      priceMin: 1200,
      priceMax: 3500,
      specializedCountries: ["Canada"],
      degreeLevels: ["bachelor", "master", "phd"],
      isActive: true,
    },
    {
      name: "Global Scholars Network",
      description: "Comprehensive multi-country consultancy. We help students apply to universities across 15+ countries with local expert teams.",
      website: "https://globalscholars.net",
      rating: 4.4,
      studentsHelped: 2100,
      successRate: 85,
      priceMin: 600,
      priceMax: 2000,
      specializedCountries: ["USA", "UK", "Canada", "Australia", "Germany"],
      degreeLevels: ["bachelor", "master"],
      isActive: true,
    },
  ];

  const companies = await db.insert(companiesTable).values(companiesData).returning();
  console.log(`Created ${companies.length} companies`);

  // Create users
  const adminUser = await db.insert(usersTable).values({
    email: "admin@lerank.com",
    passwordHash: hashPassword("admin123"),
    fullName: "Lerank Admin",
    role: "super_admin",
    onboardingCompleted: true,
  }).returning();

  const companyAdminUser = await db.insert(usersTable).values({
    email: "company@edupathglobal.com",
    passwordHash: hashPassword("company123"),
    fullName: "EduPath Admin",
    role: "company_admin",
    onboardingCompleted: true,
    companyId: companies[0].id,
  }).returning();

  const studentUser = await db.insert(usersTable).values({
    email: "student@example.com",
    passwordHash: hashPassword("student123"),
    fullName: "Alex Chen",
    role: "student",
    onboardingCompleted: true,
  }).returning();

  console.log(`Created users: admin, company admin, student`);

  // Create application for demo student
  const [app] = await db.insert(applicationsTable).values({
    studentId: studentUser[0].id,
    companyId: companies[0].id,
    serviceName: "Complete US University Application Package",
    status: "active",
    progressPercent: 40,
    totalAmount: 2500,
    escrowStatus: "held",
  }).returning();

  // Create milestones
  const milestoneData = [
    { name: "Initial Consultation & Profile Review", status: "completed" as const, orderIndex: 0 },
    { name: "Document Collection (Transcripts, LORs)", status: "completed" as const, orderIndex: 1 },
    { name: "Statement of Purpose Draft", status: "in_progress" as const, orderIndex: 2 },
    { name: "Application Form Completion", status: "not_started" as const, orderIndex: 3 },
    { name: "Submission & Confirmation", status: "not_started" as const, orderIndex: 4 },
  ];

  for (const m of milestoneData) {
    await db.insert(milestonesTable).values({
      applicationId: app.id,
      ...m,
    });
  }

  // Create transaction
  await db.insert(transactionsTable).values({
    applicationId: app.id,
    amount: 2500,
    platformFee: 75,
    escrowFee: 125,
    status: "held",
  });

  // Create activity feed
  const activityData = [
    { message: "Application started with EduPath Global", type: "application" },
    { message: 'Milestone "Initial Consultation & Profile Review" marked as completed', type: "milestone_update" },
    { message: 'Milestone "Document Collection" marked as completed', type: "milestone_update" },
    { message: 'Milestone "Statement of Purpose Draft" marked as in progress', type: "milestone_update" },
    { message: "Payment of $2,500 held in escrow", type: "payment" },
  ];

  for (const a of activityData) {
    await db.insert(activityFeedTable).values({
      userId: studentUser[0].id,
      applicationId: app.id,
      message: a.message,
      type: a.type,
    });
  }

  console.log("Seed complete!");
  console.log("Demo accounts:");
  console.log("  Super Admin: admin@lerank.com / admin123");
  console.log("  Company Admin: company@edupathglobal.com / company123");
  console.log("  Student: student@example.com / student123");

  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
