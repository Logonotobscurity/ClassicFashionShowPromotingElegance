import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import QRCode from 'qrcode';
import type { tickets } from '@db/schema';

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

const ticketEmailTemplate = async (ticket: typeof tickets.$inferSelect) => {
  // Generate QR code
  const qrCodeData = await QRCode.toDataURL(JSON.stringify({
    ticketId: ticket.id,
    reference: ticket.paymentReference,
    type: ticket.ticketType,
    email: ticket.email,
  }));

  return {
    from: `Classic Fashion Show <${process.env.ZOHO_EMAIL}>`,
    to: ticket.email,
    subject: 'Your Classic Fashion Show Tickets',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <img src="https://classicfashion.africa/assets/logo.webp" alt="Classic Fashion Show" style="max-width: 200px; margin: 20px 0;">
        <h1 style="color: #1a5d1a;">Thank you for your purchase, ${ticket.name}!</h1>
        <p>Your ticket purchase has been confirmed for the Classic Fashion Show.</p>
        
        <div style="background-color: #f8f8f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #1a5d1a; margin-top: 0;">Ticket Details</h2>
          <p><strong>Ticket Type:</strong> ${ticket.ticketType}</p>
          <p><strong>Quantity:</strong> ${ticket.quantity}</p>
          <p><strong>Reference:</strong> ${ticket.paymentReference}</p>
          <p><strong>Date:</strong> December 18th, 2024</p>
          <p><strong>Venue:</strong> Amazing Place Event Centre, Akure</p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <img src="${qrCodeData}" alt="Ticket QR Code" style="max-width: 200px;">
          <p style="color: #666;">Present this QR code at the entrance</p>
        </div>

        <div style="background-color: #f8f8f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1a5d1a; margin-top: 0;">Important Information</h3>
          <ul>
            <li>Doors open at 11:00 AM</li>
            <li>Please arrive at least 30 minutes before the show starts</li>
            <li>Your ticket includes access to all fashion show segments</li>
            <li>Photography is allowed, but no flash photography during the show</li>
          </ul>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">© 2024 Classic Fashion Show. All rights reserved.</p>
        </div>
      </div>
    `,
  };
};

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
  } catch (error: any) {
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

// Send ticket confirmation email
export async function sendTicketConfirmation(ticket: typeof tickets.$inferSelect): Promise<boolean> {
  try {
    console.log(`Attempting to send ticket confirmation email to ${ticket.email}`);
    
    await transporter.verify();
    
    const emailTemplate = await ticketEmailTemplate(ticket);
    const info = await transporter.sendMail(emailTemplate);
    
    console.log('Ticket confirmation email sent successfully:', {
      messageId: info.messageId,
      recipient: ticket.email,
      response: info.response
    });
    
    return true;
  } catch (error: any) {
    console.error('Failed to send ticket confirmation email:', {
      recipient: ticket.email,
      error: error.message,
      stack: error.stack,
      code: error.code,
      command: error.command
    });
    return false;
  }
}
