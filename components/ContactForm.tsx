// components/ContactForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendContactForm } from "@/app/actions";

// Zod validation schema
const contactSchema = z.object({
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
  captcha: z.string().min(6, "Captcha is required").max(6, "Captcha must be exactly 6 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm({ captcha }: { captcha: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const [formCaptcha, setFormCaptcha] = useState("");

  const onSubmit = async (data: ContactFormData) => {
    if (data.captcha !== captcha) {
      alert("Captcha does not match");
      return;
    }

    const response = await sendContactForm(data);

    if (response.ok) {
      alert("Message sent successfully!");
    } else {
      alert("Failed to send message.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 space-y-4 bg-neutral-900 rounded">
      <div>
        <label htmlFor="email" className="block text-neutral-200">Email</label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="w-full px-4 py-2 mt-1 border rounded bg-neutral-800 text-neutral-200"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="block text-neutral-200">Subject</label>
        <input
          id="subject"
          type="text"
          {...register("subject")}
          className="w-full px-4 py-2 mt-1 border rounded bg-neutral-800 text-neutral-200"
        />
        {errors.subject && <p className="text-red-500">{errors.subject.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-neutral-200">Message</label>
        <textarea
          id="message"
          {...register("message")}
          className="w-full px-4 py-2 mt-1 border rounded bg-neutral-800 text-neutral-200"
        ></textarea>
        {errors.message && <p className="text-red-500">{errors.message.message}</p>}
      </div>

      <div>
        <label className="block text-neutral-200">Captcha: {captcha}</label>
        <input
          type="text"
          {...register("captcha")}
          value={formCaptcha}
          onChange={(e) => setFormCaptcha(e.target.value)}
          className="w-full px-4 py-2 mt-1 border rounded bg-neutral-800 text-neutral-200"
        />
        {errors.captcha && <p className="text-red-500">{errors.captcha.message}</p>}
      </div>

      <button type="submit" className="px-4 py-2 bg-blue-600 rounded text-neutral-200">
        Send Message
      </button>
    </form>
  );
}
