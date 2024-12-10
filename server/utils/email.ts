import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

// Create transporter for sending emails
const transporter: Transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: true
  },
  debug: true, // Enable debug logs
  logger: true  // Enable built-in logger
});

// Verify transporter configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('Email transporter verification failed:', error);
  } else {
    console.log('Email server connection successful');
  }
});

// Email templates
const welcomeEmailTemplate = (subscriberEmail: string, subscriberName: string) => ({
  from: `Classic Fashion Show <${process.env.ZOHO_EMAIL}>`,
  to: subscriberEmail,
  subject: 'Welcome to Classic Fashion Show Newsletter!',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <img src="https://classicfashion.africa/assets/logo.webp" alt="Classic Fashion Show" style="max-width: 200px; margin: 20px 0;">
      <h1 style="color: #1a5d1a;">Welcome ${subscriberName}!</h1>
      <p>Thank you for subscribing to the Classic Fashion Show newsletter. We're excited to keep you updated about our upcoming fashion show on December 18th, 2024.</p>
      <p>You'll receive exclusive updates about:</p>
      <ul>
        <li>Event preparations</li>
        <li>Featured designers</li>
        <li>Special announcements</li>
        <li>Behind-the-scenes content</li>
      </ul>
      <p>Stay tuned for more updates!</p>
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">© 2024 Classic Fashion Show. All rights reserved.</p>
      </div>
    </div>
  `,
});

// Send welcome email to new subscribers
export async function sendWelcomeEmail(email: string, name: string): Promise<boolean> {
  try {
    // Log attempt
    console.log(`Attempting to send welcome email to ${email}`);
    
    // Verify SMTP connection before sending
    await transporter.verify();
    
    // Send email
    const info = await transporter.sendMail(welcomeEmailTemplate(email, name));
    console.log('Welcome email sent successfully:', {
      messageId: info.messageId,
      recipient: email,
      response: info.response
    });
    
    return true;
  } catch (error) {
    // Detailed error logging
    console.error('Failed to send welcome email:', {
      recipient: email,
      error: error.message,
      stack: error.stack,
      code: error.code,
      command: error.command
    });
    return false;
  }
}
