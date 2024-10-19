// app/layout.tsx (of waar je je RootLayout hebt gedefinieerd)
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import NavigationBar from "@/components/NavigationBar"; // Update de import naam hier

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Nested",
  description: "A nested messaging app. Chat your way and dive deep.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <NavigationBar />
          <main className="flex-grow overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
