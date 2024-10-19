// pages/contact.tsx
import ContactForm from "@/components/ContactForm";

// Function to generate a simple CAPTCHA
function generateCaptcha() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
}

export default function ContactPage() {
  const captcha = generateCaptcha();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <ContactForm captcha={captcha} />
    </div>
  );
}
