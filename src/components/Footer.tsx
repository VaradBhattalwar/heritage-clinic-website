import React from "react";
import { HeartPulse, Phone, Mail, MapPin, Calendar, ArrowUp } from "lucide-react";
import { CLINIC_INFO } from "@/data/clinicData";

interface FooterProps {
  onOpenBookingModal: () => void;
}

export default function Footer({ onOpenBookingModal }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-clinic-600 flex items-center justify-center text-white shadow-md">
                <HeartPulse className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Heritage <span className="text-clinic-400">Clinic</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {CLINIC_INFO.tagline}. {CLINIC_INFO.subheading}
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenBookingModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-clinic-600 hover:bg-clinic-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-clinic-900"
              >
                <Calendar className="w-4 h-4" />
                <span>Book an Appointment</span>
              </button>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#about" className="hover:text-clinic-400 transition-colors">
                  About Clinic
                </a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-clinic-400 transition-colors">
                  Treatments & Care
                </a>
              </li>
              <li>
                <a href="#doctors" className="hover:text-clinic-400 transition-colors">
                  Our Doctors
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-clinic-400 transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-clinic-400 transition-colors">
                  Contact & Hours
                </a>
              </li>
            </ul>
          </div>

          {/* Clinical Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Key Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>• Dental Cleaning</li>
              <li>• Tooth Filling</li>
              <li>• Braces Consultation</li>
              <li>• Braces Adjustment</li>
              <li>• General Checkup</li>
            </ul>
          </div>

          {/* Contact Placeholders */}
          <div className="lg:col-span-3 space-y-3 text-xs sm:text-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Clinic Contact
            </h4>
            <div className="space-y-2.5 text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-clinic-400 flex-shrink-0 mt-0.5" />
                <span>{CLINIC_INFO.contact.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-clinic-400 flex-shrink-0" />
                <span>{CLINIC_INFO.contact.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-clinic-400 flex-shrink-0" />
                <span>{CLINIC_INFO.contact.email}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p className="max-w-3xl leading-relaxed text-center md:text-left">
            <strong>Medical Disclaimer:</strong> The information provided on this Heritage Clinic demonstration website is for educational and demo evaluation purposes only and should not be construed as clinical medical advice or diagnosis. Always consult a qualified healthcare provider for personal health concerns.
          </p>

          <div className="flex items-center gap-4 flex-shrink-0">
            <span>© {new Date().getFullYear()} Heritage Clinic Demo.</span>
            <a
              href="#"
              aria-label="Back to top"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
