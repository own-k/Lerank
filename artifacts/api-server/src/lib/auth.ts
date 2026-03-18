import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + "lerank_salt_2024").digest("hex");
}

export function generateToken(userId: number): string {
  const payload = `${userId}:${Date.now()}:${Math.random()}`;
  return Buffer.from(payload).toString("base64");
}

export function parseToken(token: string): number | null {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const parts = decoded.split(":");
    const userId = parseInt(parts[0]);
    return isNaN(userId) ? null : userId;
  } catch {
    return null;
  }
}

export function getTokenFromRequest(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }
  return null;
}

export async function requireAuth(req: Request & { userId?: number }, res: Response, next: NextFunction) {
  const token = getTokenFromRequest(req);
  if (!token) {
    res.status(401).json({ error: "Unauthorized", message: "No token provided" });
    return;
  }
  const userId = parseToken(token);
  if (!userId) {
    res.status(401).json({ error: "Unauthorized", message: "Invalid token" });
    return;
  }
  req.userId = userId;
  next();
}

export function requireRole(...roles: string[]) {
  return async (req: Request & { userId?: number }, res: Response, next: NextFunction) => {
    if (!req.userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const user = await db.query.usersTable.findFirst({ where: eq(usersTable.id, req.userId) });
    if (!user || !roles.includes(user.role)) {
      res.status(403).json({ error: "Forbidden", message: "Insufficient permissions" });
      return;
    }
    next();
  };
}

export function generateUserCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
