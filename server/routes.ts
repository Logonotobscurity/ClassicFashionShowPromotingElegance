import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "../db";
import { subscribers } from "../db/schema";
import { eq } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  // API Routes
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

      try {
        // Send welcome email
        const { sendWelcomeEmail } = await import('./utils/email');
        const emailSent = await sendWelcomeEmail(email);
        
        res.status(200).json({ 
          message: "Subscribed successfully",
          emailSent
        });
      } catch (emailError) {
        console.error("Error sending welcome email:", emailError);
        // Still return 200 as the subscription was successful
        res.status(200).json({ 
          message: "Subscribed successfully, but there was an error sending the welcome email",
          emailSent: false
        });
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "healthy" });
  });

  const httpServer = createServer(app);
  return httpServer;
}
