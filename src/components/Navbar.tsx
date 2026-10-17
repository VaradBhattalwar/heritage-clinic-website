"use client";

import React, { useState, useEffect } from "react";
import { PlusCircle, Menu, X, Phone, Calendar, HeartPulse } from "lucide-react";
import { CLINIC_INFO } from "@/data/clinicData";

interface NavbarProps {
  onOpenBookingModal: () => void;
}

export default function Navbar({ onOpenBookingModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Treatments", href: "#treatments" },
    { label: "Doctors", href: "#doctors" },
    { label: "Why Choose Us", href: "#why-us" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Top Notification / Emergency bar */}
      <div className="bg-clinic-900 text-white text-xs py-2 px-4 border-b border-clinic-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-200">
              Emergency & Urgent Desk Placeholder:
            </span>
            <strong className="text-white font-semibold">
              {CLINIC_INFO.contact.emergencyPhone}
            </strong>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span>{CLINIC_INFO.contact.hours.weekdays}</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">{CLINIC_INFO.contact.address}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-100"
            : "bg-white py-4 border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="Heritage Clinic Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-clinic-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-clinic-200 group-hover:scale-105 transition-transform">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1">
                Heritage <span className="text-clinic-600">Clinic</span>
              </span>
              <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Healthcare & Diagnostics
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-clinic-600 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-clinic-600 hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${CLINIC_INFO.contact.phone.replace(/[^0-9+]/g, "")}`}
              className="hidden xl:flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-clinic-600 transition-colors"
            >
              <Phone className="w-4 h-4 text-clinic-600" />
              <span>{CLINIC_INFO.contact.phone}</span>
            </a>

            <button
              onClick={onOpenBookingModal}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-clinic-600 hover:bg-clinic-700 text-white text-sm font-semibold shadow-md shadow-clinic-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenBookingModal}
              className="sm:hidden px-3 py-1.5 rounded-full bg-clinic-600 text-white text-xs font-semibold"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-fadeIn shadow-lg">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-slate-700 font-medium hover:bg-clinic-50 hover:text-clinic-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <div className="text-xs text-slate-500 px-3">
                <strong>Contact:</strong> {CLINIC_INFO.contact.phone}
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBookingModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-clinic-600 text-white font-semibold text-sm shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
