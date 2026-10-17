"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Building,
} from "lucide-react";
import { CLINIC_INFO } from "@/data/clinicData";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "General Inquiries",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-clinic-700 bg-clinic-50 rounded-full border border-clinic-100 mb-3">
            Contact & Location
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Get in Touch With Heritage Clinic
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Have questions about clinical treatments, appointments, or medical records? Send us a message or reach us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Cards & Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-clinic-100 text-clinic-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  Clinic Location
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  {CLINIC_INFO.contact.address}
                </p>
                <p className="text-[11px] text-slate-400">
                  Convenient parking & wheelchair accessibility available.
                </p>
              </div>
            </div>

            {/* Telephone & Emergency */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-clinic-100 text-clinic-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  Telephone Numbers
                </h3>
                <p className="text-xs sm:text-sm text-slate-700">
                  <span className="text-slate-500">General Desk:</span>{" "}
                  <strong>{CLINIC_INFO.contact.phone}</strong>
                </p>
                <p className="text-xs sm:text-sm text-clinic-700">
                  <span className="text-slate-500">Urgent Support:</span>{" "}
                  <strong>{CLINIC_INFO.contact.emergencyPhone}</strong>
                </p>
              </div>
            </div>

            {/* Email Support */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-clinic-100 text-clinic-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  Email Correspondence
                </h3>
                <p className="text-xs sm:text-sm text-slate-700">
                  <span className="text-slate-500">Inquiries:</span>{" "}
                  <strong>{CLINIC_INFO.contact.email}</strong>
                </p>
                <p className="text-xs sm:text-sm text-slate-700">
                  <span className="text-slate-500">Appointments:</span>{" "}
                  <strong>{CLINIC_INFO.contact.supportEmail}</strong>
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-clinic-100 text-clinic-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-xs sm:text-sm">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  Consultation Hours
                </h3>
                <p className="text-slate-600">{CLINIC_INFO.contact.hours.weekdays}</p>
                <p className="text-slate-600">{CLINIC_INFO.contact.hours.saturday}</p>
                <p className="text-slate-500 text-[11px] pt-1">
                  {CLINIC_INFO.contact.hours.sunday}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Send an Inquiry or Feedback
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                Fill out the form below and our clinic reception team will respond within 24 business hours.
              </p>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-emerald-950">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                    Thank you for reaching out to Heritage Clinic. In this demo version, your submission is captured and ready to be hooked to an automated email or database workflow.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        department: "General Inquiries",
                        message: "",
                      });
                    }}
                    className="px-5 py-2 text-xs font-semibold bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sarah Jenkins"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-clinic-500 focus:bg-white outline-none text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. sarah@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-clinic-500 focus:bg-white outline-none text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +1 (555) 012-3456"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-clinic-500 focus:bg-white outline-none text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Department
                      </label>
                      <select
                        value={formData.department}
                        onChange={(e) =>
                          setFormData({ ...formData, department: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-clinic-500 focus:bg-white outline-none text-slate-800"
                      >
                        <option value="General Inquiries">General Inquiries</option>
                        <option value="Dental Care">Dental Care</option>
                        <option value="Orthodontics">Orthodontics</option>
                        <option value="General Medicine">General Medicine</option>
                        <option value="Billing & Insurance">Billing & Insurance</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Write your message or inquiry here..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-clinic-500 focus:bg-white outline-none text-slate-800"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-clinic-600 hover:bg-clinic-700 text-white font-semibold text-sm shadow-md shadow-clinic-200 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Clinic</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
