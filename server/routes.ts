import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "../db";
import { subscribers } from "../db/schema";
import { eq } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  app.post("/api/newsletter", async (req, res) => {
    try {
      const { email } = req.body;
      
      // Check if already subscribed
      const existing = await db.query.subscribers.findFirst({
        where: eq(subscribers.email, email),
      });

      if (existing) {
        return res.status(400).json({ message: "Already subscribed" });
      }

      await db.insert(subscribers).values({
        email,
        createdAt: new Date(),
      });

      res.status(200).json({ message: "Subscribed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
