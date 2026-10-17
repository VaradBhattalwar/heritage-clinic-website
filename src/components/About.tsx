import React from "react";
import { CheckCircle2, Shield, HeartHandshake, Sparkles, Building2 } from "lucide-react";
import { CLINIC_INFO } from "@/data/clinicData";

export default function About() {
  const values = [
    {
      title: "Patient-Centered Compassion",
      description:
        "Every patient is heard with empathy and respect. We tailor our clinical decisions around your unique personal well-being.",
    },
    {
      title: "Evidence-Based Medical Practice",
      description:
        "Our treatments and diagnostic protocols strictly align with current international healthcare guidelines and validated clinical data.",
    },
    {
      title: "Modern Clinical Facilities",
      description:
        "Equipped with clean, contemporary consultation rooms, digital imaging systems, and swift in-house laboratory processing.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-clinic-700 bg-clinic-50 rounded-full border border-clinic-100 mb-3">
            About Heritage Clinic
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Committed to Excellence in Family & Specialty Care
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Heritage Clinic is founded on the belief that superior medical care combines clinical precision with genuine human empathy.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual clinic card */}
          <div className="lg:col-span-5">
            <div className="relative bg-gradient-to-br from-clinic-600 to-clinic-800 rounded-3xl p-8 sm:p-10 text-white shadow-xl overflow-hidden">
              {/* Background ambient pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <Building2 className="w-6 h-6" />
                </div>

                <h3 className="text-2xl font-bold leading-snug">
                  Modern Facilities Designed for Comfort & Safety
                </h3>

                <p className="text-sm text-blue-100 leading-relaxed">
                  Our premises adhere to strict hygiene and clinical sterilization standards. From spacious waiting lounges to advanced diagnostic suites, your comfort and recovery are our priority.
                </p>

                {/* Placeholders for certifications & accreditations */}
                <div className="pt-4 border-t border-white/20 space-y-2.5 text-xs text-blue-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                    <span>Accreditation: <strong>[Healthcare Board Accreditation Placeholder]</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                    <span>Laboratory: <strong>[ISO Certified Diagnostic Lab Placeholder]</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                    <span>Location: <strong>{CLINIC_INFO.contact.address}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Values and Mission */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900">
                Our Medical Mission & Philosophy
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                At Heritage Clinic, we understand that visiting a medical provider can sometimes feel overwhelming. That is why our entire staff is dedicated to creating a reassuring atmosphere where patients feel understood, informed, and respected.
              </p>
            </div>

            {/* Core Values List */}
            <div className="space-y-4">
              {values.map((v, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-clinic-50/50 border border-slate-100 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-clinic-100 text-clinic-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-base">
                      {v.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Note regarding placeholders */}
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-blue-900">
              <span className="font-semibold">Note for Clinic Administrators:</span> All historical details, certifications, and doctor profiles are maintained in a structured data file for seamless customization before production launch.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
