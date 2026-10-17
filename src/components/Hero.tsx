"use client";

import React from "react";
import {
  Calendar,
  ShieldCheck,
  Clock,
  MapPin,
  PhoneCall,
  ArrowRight,
  CheckCircle2,
  Stethoscope,
  HeartPulse,
} from "lucide-react";
import { CLINIC_INFO } from "@/data/clinicData";

interface HeroProps {
  onOpenBookingModal: () => void;
}

export default function Hero({ onOpenBookingModal }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-clinic-50/70 via-white to-white pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Background soft glow circles */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-clinic-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-clinic-100 text-clinic-700 text-xs font-semibold tracking-wide border border-clinic-200">
              <HeartPulse className="w-4 h-4 text-clinic-600" />
              <span>Modern Healthcare Demo Website</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Exceptional Healthcare{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-clinic-600 to-sky-600">
                Designed Around You
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Welcome to <strong className="text-slate-800">Heritage Clinic</strong>. Combining personalized clinical attention, trusted medical specialists, and modern diagnostics in a calm, welcoming environment.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenBookingModal}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-clinic-600 hover:bg-clinic-700 text-white font-semibold text-base shadow-lg shadow-clinic-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2.5"
              >
                <Calendar className="w-5 h-5" />
                <span>Book an Appointment</span>
              </button>

              <a
                href="#treatments"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base border border-slate-200 hover:border-slate-300 shadow-sm transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Explore Treatments</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </a>
            </div>

            {/* Bullet Highlights */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Online Booking Available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Experienced Specialists</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>AI Chatbot Ready</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Card Presentation */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Feature Container */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 relative z-10">
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-clinic-50 text-clinic-600 flex items-center justify-center font-bold text-xl">
                      <Stethoscope className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="font-bold text-slate-900 text-lg">Heritage Clinic</h2>
                      <p className="text-xs text-slate-500">Patient Care Center</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200">
                    Open Today
                  </span>
                </div>

                {/* Key Information Cards */}
                <div className="space-y-4 py-6">
                  <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <Clock className="w-5 h-5 text-clinic-600 flex-shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm">
                      <p className="font-semibold text-slate-800">Visiting Hours</p>
                      <p className="text-slate-500">{CLINIC_INFO.contact.hours.weekdays}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <MapPin className="w-5 h-5 text-clinic-600 flex-shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm">
                      <p className="font-semibold text-slate-800">Clinic Location</p>
                      <p className="text-slate-500">{CLINIC_INFO.contact.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-clinic-50/60 border border-clinic-100">
                    <PhoneCall className="w-5 h-5 text-clinic-600 flex-shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm">
                      <p className="font-semibold text-slate-800">Direct Helpline</p>
                      <p className="text-clinic-700 font-medium">{CLINIC_INFO.contact.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Card CTA */}
                <button
                  onClick={onOpenBookingModal}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-clinic-400" />
                  <span>Schedule Consultation Now</span>
                </button>
              </div>

              {/* Floating Decorative Badge */}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl p-4 shadow-lg border border-slate-100 flex items-center gap-3 z-20">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Verified Healthcare</p>
                  <p className="text-[11px] text-slate-500">Board-Certified Quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clinic Stats Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CLINIC_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-slate-200/80 shadow-sm text-center"
            >
              <p className="text-2xl sm:text-3xl font-extrabold text-clinic-600 mb-1">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
