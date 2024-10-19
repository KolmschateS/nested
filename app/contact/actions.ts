"use server";

import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { sendEmail } from "@/utils/email";
import dotenv from "dotenv";

// Laad omgevingsvariabelen
dotenv.config();

const prisma = new PrismaClient();

// Definieer het schema voor de contactgegevens
const contactSchema = z.object({
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(10),
});

export async function sendContactMessage(data: unknown) {
  const parsedData = contactSchema.safeParse(data);

  if (!parsedData.success) {
    return { ok: false, error: parsedData.error.format() };
  }

  const { email, subject, message } = parsedData.data;

  try {
    // Stuur de e-mail met behulp van de utility functie
    await sendEmail({
      email: process.env.SMTP_EMAIL_TO || "s1148925@student.windesheim.nl",
      subject: `NESTED | Contact Form: ${subject}`,
      message: `Bericht van ${email}: ${message}`,
    });

    // Sla het bericht op in de database
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
    return { ok: false, error: "Er is een fout opgetreden bij het verzenden." };
  }
}
