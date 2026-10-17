import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@n8n/chat/dist/style.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#006bc9",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Heritage Clinic | Compassionate Modern Healthcare",
  description:
    "Heritage Clinic provides comprehensive clinical services, expert doctors, preventive screenings, and modern patient-first care.",
  keywords: [
    "Heritage Clinic",
    "healthcare clinic",
    "medical consultation",
    "doctor appointments",
    "treatments",
    "health checkups",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white text-slate-800 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
