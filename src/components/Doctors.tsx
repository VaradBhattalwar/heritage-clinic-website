"use client";

import React from "react";
import { Calendar, ArrowUpRight, Camera, User } from "lucide-react";
import { DOCTORS } from "@/data/clinicData";

interface DoctorsProps {
  onSelectDoctor: (doctorId: string) => void;
}

export default function Doctors({ onSelectDoctor }: DoctorsProps) {
  return (
    <section id="doctors" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-clinic-700 bg-clinic-50 rounded-full border border-clinic-100 mb-3">
            Medical Faculty & Specialists
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Meet Our Doctors
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Our qualified healthcare professionals are dedicated to providing compassionate, patient-centered care and modern treatments.
          </p>
        </div>

        {/* Doctor Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {DOCTORS.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-clinic-300 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Photo Placeholder Container */}
                <div className="h-56 bg-gradient-to-b from-clinic-50 via-slate-50 to-white relative flex flex-col items-center justify-center border-b border-slate-100 p-6 text-center">
                  {/* Avatar / Camera Frame */}
                  <div className="relative mb-3">
                    <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center text-clinic-600 font-extrabold text-2xl border-2 border-clinic-200 group-hover:scale-105 transition-transform duration-200">
                      <User className="w-12 h-12 text-clinic-500" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-clinic-600 text-white flex items-center justify-center shadow-sm">
                      <Camera className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Labeled Photo Placeholder Badge */}
                  <span className="inline-block px-3 py-1 text-[11px] font-semibold text-slate-600 bg-white/90 border border-slate-200 rounded-full shadow-xs">
                    {doc.photoPlaceholder}
                  </span>
                </div>

                {/* Doctor Details */}
                <div className="p-6 space-y-3">
                  {/* Specialty Badge */}
                  <div>
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-clinic-700 bg-clinic-50 rounded-full border border-clinic-100">
                      {doc.specialty}
                    </span>
                  </div>

                  {/* Doctor Name */}
                  <h3 className="font-bold text-slate-900 text-xl group-hover:text-clinic-600 transition-colors">
                    {doc.name}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {doc.shortDescription}
                  </p>
                </div>
              </div>

              {/* Action Button: Book with Doctor */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectDoctor(doc.id)}
                  className="w-full py-3 px-4 rounded-xl bg-clinic-50 hover:bg-clinic-600 text-clinic-700 hover:text-white text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 border border-clinic-200 hover:border-clinic-600 shadow-xs"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book with {doc.name}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Notice for Custom Bios */}
        <div className="mt-12 text-center text-xs text-slate-500">
          <p>
            * Note: To replace the photo placeholders and short descriptions with real doctor photos and biographies, update <code className="text-clinic-700 font-semibold bg-slate-100 px-1.5 py-0.5 rounded">src/data/clinicData.ts</code>.
          </p>
        </div>
      </div>
    </section>
  );
}
