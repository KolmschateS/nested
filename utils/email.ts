// utils/email.ts
import nodemailer from "nodemailer";

export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  // Create a reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // SMTP username from .env
      pass: process.env.SMTP_PASS, // SMTP password from .env
    },
  });

  // Send the email
  await transporter.sendMail({
    from: `"Your App" <${process.env.SMTP_USER}>`, // Sender address from .env
    to, // List of recipients
    subject, // Subject line
    text, // Plain text body
  });
}
