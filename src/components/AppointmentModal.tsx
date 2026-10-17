"use client";

import React, { useState } from "react";
import { X, Calendar, Clock, User, Phone, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { TREATMENTS, DOCTORS, CLINIC_INFO } from "@/data/clinicData";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDoctorId?: string;
  preselectedTreatmentId?: string;
}

export default function AppointmentModal({
  isOpen,
  onClose,
  preselectedDoctorId,
  preselectedTreatmentId,
}: AppointmentModalProps) {
  const [treatmentId, setTreatmentId] = useState(preselectedTreatmentId || "");
  const [doctorId, setDoctorId] = useState(preselectedDoctorId || "");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-clinic-700 to-clinic-600 px-6 py-5 text-white flex items-center justify-between">
          <div>
            <span className="inline-block px-2.5 py-0.5 mb-1 text-xs font-semibold tracking-wider uppercase bg-white/20 rounded-full text-white">
              Heritage Clinic Booking
            </span>
            <h3 className="text-xl font-bold">Schedule an Appointment</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800">
                Demo Appointment Requested!
              </h4>
              <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
                Thank you, <strong className="text-slate-800">{patientName || "Valued Patient"}</strong>. In a live system, this request is forwarded directly to the clinic schedule coordinator.
              </p>
              <div className="bg-clinic-50 border border-clinic-200 rounded-xl p-4 text-left text-xs text-slate-700 space-y-1.5 max-w-md mx-auto">
                <p>
                  <strong>Clinic Phone Placeholder:</strong> {CLINIC_INFO.contact.phone}
                </p>
                <p>
                  <strong>Clinic Email Placeholder:</strong> {CLINIC_INFO.contact.email}
                </p>
                <p>
                  <strong>Confirmation:</strong> Confirmation will be dispatched to your email {patientEmail || "[patient@example.com]"}.
                </p>
              </div>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-clinic-600 hover:bg-clinic-700 text-white font-medium rounded-lg shadow-sm transition-colors text-sm"
                >
                  Done & Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Demo Mode Notice:</strong> This is a demonstration booking component. Fill out the details below to test the workflow.
                </span>
              </div>

              {/* Treatment Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    Select Treatment / Service
                  </label>
                  <select
                    value={treatmentId}
                    onChange={(e) => setTreatmentId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-clinic-500 focus:border-clinic-500 outline-none text-slate-800"
                    required
                  >
                    <option value="">-- Choose a Treatment --</option>
                    {TREATMENTS.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Doctor Selection */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    Select Doctor (Optional)
                  </label>
                  <select
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-clinic-500 focus:border-clinic-500 outline-none text-slate-800"
                  >
                    <option value="">-- Any Available Specialist --</option>
                    {DOCTORS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.title})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-clinic-600" />
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-clinic-500 focus:border-clinic-500 outline-none text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-clinic-600" />
                    Preferred Time Slot
                  </label>
                  <select
                    required
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-clinic-500 focus:border-clinic-500 outline-none text-slate-800"
                  >
                    <option value="">-- Select Time Slot --</option>
                    <option value="morning-1">09:00 AM - 10:30 AM</option>
                    <option value="morning-2">10:30 AM - 12:00 PM</option>
                    <option value="afternoon-1">01:30 PM - 03:00 PM</option>
                    <option value="afternoon-2">03:30 PM - 05:00 PM</option>
                    <option value="evening-1">05:30 PM - 07:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Patient Details */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Patient Contact Details
                </p>

                <div>
                  <label className="block text-xs text-slate-600 mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-500" /> Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-clinic-500 focus:border-clinic-500 outline-none text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-600 mb-1 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-500" /> Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-clinic-500 focus:border-clinic-500 outline-none text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-1 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-500" /> Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 (555) 000-0000"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-clinic-500 focus:border-clinic-500 outline-none text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-1">
                    Reason for Visit / Symptoms (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Briefly describe your symptoms or what you'd like to consult on..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-clinic-500 focus:border-clinic-500 outline-none text-slate-800"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-clinic-600 hover:bg-clinic-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all text-sm flex items-center gap-2"
                >
                  Confirm Demo Booking
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
