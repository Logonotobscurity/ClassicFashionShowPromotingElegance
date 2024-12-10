import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "../db";
import { subscribers, tickets } from "../db/schema";
import { eq } from "drizzle-orm";
import Paystack from "paystack-node";

const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY!);

export function registerRoutes(app: Express): Server {
  // API Routes
  app.post("/api/newsletter", async (req, res) => {
    try {
      const { email, name } = req.body;
      
      // Check if already subscribed
      const existing = await db.query.subscribers.findFirst({
        where: eq(subscribers.email, email),
      });

      if (existing) {
        return res.status(400).json({ message: "Already subscribed" });
      }

      await db.insert(subscribers).values({
        email,
        name,
        createdAt: new Date(),
      });

      try {
        // Send welcome email
        const { sendWelcomeEmail } = await import('./utils/email');
        const emailSent = await sendWelcomeEmail(email, name);
        
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

  // Ticket Routes
  app.post("/api/tickets/initialize", async (req, res) => {
    try {
      const { email, name, ticketType, quantity, totalAmount } = req.body;

      const response = await paystack.transaction.initialize({
        email,
        amount: Math.round(totalAmount * 100), // Convert to kobo
        callback_url: `${process.env.APP_URL}/api/tickets/verify`,
        metadata: {
          name,
          ticketType,
          quantity,
        },
      });

      await db.insert(tickets).values({
        email,
        name,
        ticketType,
        quantity,
        totalAmount,
        paymentReference: response.data.reference,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      res.status(200).json({
        status: true,
        message: "Payment initialized",
        data: response.data,
      });
    } catch (error) {
      console.error("Payment initialization error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  app.post("/api/tickets/verify", async (req, res) => {
    try {
      const { reference } = req.query;
      const response = await paystack.transaction.verify(reference);

      if (response.data.status === "success") {
        await db.update(tickets)
          .set({ 
            status: 'confirmed',
            updatedAt: new Date()
          })
          .where(eq(tickets.paymentReference, reference));

        // Send ticket confirmation email
        const ticket = await db.query.tickets.findFirst({
          where: eq(tickets.paymentReference, reference),
        });

        if (ticket) {
          const { sendTicketConfirmation } = await import('./utils/email');
          await sendTicketConfirmation(ticket);
        }

        res.redirect(`/tickets/success?reference=${reference}`);
      } else {
        res.redirect(`/tickets/failed?reference=${reference}`);
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      res.redirect('/tickets/failed');
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "healthy" });
  });

  const httpServer = createServer(app);
  return httpServer;
}
