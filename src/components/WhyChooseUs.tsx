import React from "react";
import {
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
  Shield,
  Bot,
  Star,
  Quote,
} from "lucide-react";
import { WHY_CHOOSE_US, TESTIMONIALS } from "@/data/clinicData";

export default function WhyChooseUs() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Sparkles":
        return <Sparkles className="w-5 h-5" />;
      case "Award":
        return <Award className="w-5 h-5" />;
      case "CheckCircle2":
        return <CheckCircle2 className="w-5 h-5" />;
      case "Clock":
        return <Clock className="w-5 h-5" />;
      case "Shield":
        return <Shield className="w-5 h-5" />;
      case "Bot":
        return <Bot className="w-5 h-5" />;
      default:
        return <CheckCircle2 className="w-5 h-5" />;
    }
  };

  return (
    <section id="why-us" className="py-20 bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-clinic-700 bg-clinic-50 rounded-full border border-clinic-100 mb-3">
            Why Choose Heritage Clinic
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            High Standards of Modern Clinical Excellence
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            We focus on precision, empathy, and seamless digital patient services to deliver healthcare you can rely on.
          </p>
        </div>

        {/* 6 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {WHY_CHOOSE_US.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 rounded-xl bg-clinic-100 text-clinic-600 flex items-center justify-center mb-4">
                {getIcon(item.iconName)}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Patient Testimonials Sub-section */}
        <div className="pt-8 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-bold tracking-wider text-clinic-600">
              Patient Experiences
            </span>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">
              What Our Community Says
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              (Clearly marked placeholder reviews for demo purposes)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-clinic-200 mb-2" />
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    {test.quote}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <p className="font-semibold text-xs text-slate-900">{test.author}</p>
                  <p className="text-[11px] text-clinic-600 font-medium">
                    Consultation: {test.treatmentType}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
