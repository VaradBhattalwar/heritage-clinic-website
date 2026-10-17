"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Treatments from "@/components/Treatments";
import Doctors from "@/components/Doctors";
import WhyChooseUs from "@/components/WhyChooseUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AppointmentModal from "@/components/AppointmentModal";
import ChatbotWidget from "@/components/ChatbotWidget";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | undefined>(
    undefined
  );
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<
    string | undefined
  >(undefined);

  const handleOpenBooking = () => {
    setSelectedDoctorId(undefined);
    setSelectedTreatmentId(undefined);
    setIsBookingOpen(true);
  };

  const handleSelectDoctor = (doctorId: string) => {
    setSelectedDoctorId(doctorId);
    setSelectedTreatmentId(undefined);
    setIsBookingOpen(true);
  };

  const handleSelectTreatment = (treatmentId: string) => {
    setSelectedTreatmentId(treatmentId);
    setSelectedDoctorId(undefined);
    setIsBookingOpen(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Navigation Bar */}
      <Navbar onOpenBookingModal={handleOpenBooking} />

      {/* Main Healthcare Sections */}
      <div className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOpenBookingModal={handleOpenBooking} />

        {/* 2. About the Clinic */}
        <About />

        {/* 3. Treatments */}
        <Treatments onSelectTreatment={handleSelectTreatment} />

        {/* 4. Doctors */}
        <Doctors onSelectDoctor={handleSelectDoctor} />

        {/* 5. Why Choose Us */}
        <WhyChooseUs />

        {/* 6. Contact */}
        <Contact />
      </div>

      {/* Footer */}
      <Footer onOpenBookingModal={handleOpenBooking} />

      {/* Booking Appointment Modal Dialog */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedDoctorId={selectedDoctorId}
        preselectedTreatmentId={selectedTreatmentId}
      />

      {/* Floating Bottom-Right Chatbot Widget (Placeholder for n8n) */}
      <ChatbotWidget onOpenBookingModal={handleOpenBooking} />
    </main>
  );
}
