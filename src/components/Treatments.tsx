"use client";

import React, { useState } from "react";
import {
  Stethoscope,
  Activity,
  ShieldCheck,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { TREATMENTS, TreatmentItem } from "@/data/clinicData";

interface TreatmentsProps {
  onSelectTreatment: (treatmentId: string) => void;
}

export default function Treatments({ onSelectTreatment }: TreatmentsProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Dental Care",
    "Orthodontics",
    "General Medicine",
  ];

  const filteredTreatments =
    selectedCategory === "All"
      ? TREATMENTS
      : TREATMENTS.filter((t) => t.category === selectedCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Stethoscope":
        return <Stethoscope className="w-6 h-6" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-amber-500" />;
      case "Activity":
        return <Activity className="w-6 h-6" />;
      case "CheckCircle2":
        return <CheckCircle2 className="w-6 h-6 text-emerald-600" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-clinic-600" />;
    }
  };

  return (
    <section id="treatments" className="py-20 bg-slate-50/60 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-clinic-700 bg-clinic-50 rounded-full border border-clinic-100 mb-3">
            Clinical Services & Treatments
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Medical Treatments
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Explore our specialized treatments and diagnostic screenings. Every service is delivered with medical rigor and patient safety at the center.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-clinic-600 text-white shadow-md shadow-clinic-200"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Treatment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTreatments.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-clinic-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header Icon + Category Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-clinic-50 text-clinic-600 flex items-center justify-center group-hover:bg-clinic-600 group-hover:text-white transition-colors duration-200">
                    {getIcon(t.iconName)}
                  </div>
                  <span className="text-[11px] font-semibold text-clinic-700 bg-clinic-50 px-2.5 py-1 rounded-full border border-clinic-100">
                    {t.category}
                  </span>
                </div>

                {/* Treatment Title */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-clinic-600 transition-colors mb-2">
                  {t.title}
                </h3>

                {/* Treatment Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {t.description}
                </p>
              </div>

              {/* Card Footer: Duration & CTA */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-clinic-500" />
                  <span>{t.duration}</span>
                </div>

                <button
                  onClick={() => onSelectTreatment(t.id)}
                  className="flex items-center gap-1 font-semibold text-clinic-600 hover:text-clinic-800 transition-colors group-hover:translate-x-0.5 duration-200"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Section Bottom Banner */}
        <div className="mt-14 bg-gradient-to-r from-clinic-900 to-clinic-700 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-bold">Need a Custom Consultation or Specialized Test?</h4>
            <p className="text-xs sm:text-sm text-blue-100">
              Our clinical advisory team is available to assist you in selecting the right diagnostic screening.
            </p>
          </div>
          <button
            onClick={() => onSelectTreatment(TREATMENTS[0].id)}
            className="px-6 py-3 rounded-xl bg-white text-clinic-800 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 flex-shrink-0"
          >
            <Calendar className="w-4 h-4 text-clinic-600" />
            <span>Schedule Health Check</span>
          </button>
        </div>
      </div>
    </section>
  );
}
