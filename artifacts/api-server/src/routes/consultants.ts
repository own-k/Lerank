import { Router } from "express";
import { db, companiesTable } from "@workspace/db";
import { eq, and, gte, lte } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const companies = await db.select().from(companiesTable).where(eq(companiesTable.isActive, true));

    const { country, minRating, maxPrice, degreeLevel } = req.query as Record<string, string>;
    let filtered = companies;

    if (country) {
      filtered = filtered.filter(c => c.specializedCountries.includes(country));
    }
    if (minRating) {
      filtered = filtered.filter(c => c.rating >= parseFloat(minRating));
    }
    if (maxPrice) {
      filtered = filtered.filter(c => c.priceMin <= parseInt(maxPrice));
    }
    if (degreeLevel) {
      filtered = filtered.filter(c => c.degreeLevels.includes(degreeLevel));
    }

    const sortBy = req.query.sortBy as string;
    if (sortBy === "priceLow") {
      filtered.sort((a, b) => a.priceMin - b.priceMin);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "mostStudents") {
      filtered.sort((a, b) => b.studentsHelped - a.studentsHelped);
    }

    res.json(filtered.map(c => ({
      ...c,
      createdAt: c.createdAt.toISOString(),
    })));
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const company = await db.query.companiesTable.findFirst({
      where: eq(companiesTable.id, id),
    });
    if (!company) {
      res.status(404).json({ error: "NotFound", message: "Company not found" });
      return;
    }
    res.json({ ...company, createdAt: company.createdAt.toISOString() });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
