// app/actions.ts
"use server";

import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { sendEmail } from "@/utils/email";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

const contactSchema = z.object({
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(10),
  captcha: z.string().min(6).max(6),
});

export async function sendContactForm(data: unknown) {
  const parsedData = contactSchema.safeParse(data);

  if (!parsedData.success) {
    return { ok: false, error: parsedData.error };
  }

  const { email, subject, message } = parsedData.data;

  try {
    // Send the email using the utility function
    await sendEmail({
      to: process.env.EMAIL_TO || "your-email@example.com", // Recipient email from env
      subject: `Contact Form: ${subject}`,
      text: `Message from ${email}: ${message}`,
    });

    // Save the message to the database
    await prisma.contactMessage.create({
      data: {
        email,
        subject,
        message,
      },
    });

    return { ok: true };
  } catch (error) {
    console.error("Error sending contact form:", error);
    return { ok: false };
  }
}
