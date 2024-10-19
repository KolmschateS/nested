"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { sendContactMessage } from "@/app/contact/actions";

// Define Zod validation schema
const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  captcha: z.string().min(6, { message: "Captcha must be 6 characters" }),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm({ captchaCode }: { captchaCode: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false); // Add submission state
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true); // Disable button while sending
    if (data.captcha !== captchaCode) {
      alert("Captcha does not match");
      setIsSubmitting(false); // Re-enable the button
      return;
    }

    try {
      await sendContactMessage(data);
      alert("Message sent successfully!");
      reset();
    } catch (error) {
      console.error(error);
      alert("Failed to send the message. Please try again.");
    } finally {
      setIsSubmitting(false); // Re-enable the button after sending
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded bg-neutral-900 text-neutral-200"
          {...register("email")}
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
          Subject
        </label>
        <input
          id="subject"
          className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded bg-neutral-900 text-neutral-200"
          {...register("subject")}
        />
        {errors.subject && <span className="text-red-500 text-sm">{errors.subject.message}</span>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300">
          Message
        </label>
        <textarea
          id="message"
          className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded bg-neutral-900 text-neutral-200"
          rows={4}
          {...register("message")}
        />
        {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}
      </div>

      <div>
        <label htmlFor="captcha" className="block text-sm font-medium text-gray-300">
          Captcha: {captchaCode}
        </label>
        <input
          id="captcha"
          className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded bg-neutral-900 text-neutral-200"
          {...register("captcha")}
        />
        {errors.captcha && <span className="text-red-500 text-sm">{errors.captcha.message}</span>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 px-4 rounded-md text-white ${
          isSubmitting ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"
        }`}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
