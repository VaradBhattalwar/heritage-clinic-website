export interface TreatmentItem {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  iconName: string;
}

export interface DoctorItem {
  id: string;
  name: string;
  specialty: string;
  title: string; // for backward-compatibility with modal
  shortDescription: string;
  photoPlaceholder: string;
  qualification: string;
  experience: string;
  availability: string;
  avatarPlaceholder: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  treatmentType: string;
  rating: number;
}

export interface ClinicStat {
  label: string;
  value: string;
}

export const CLINIC_INFO = {
  name: "Heritage Clinic",
  tagline: "Dedicated to Compassionate, Modern Healthcare",
  subheading:
    "Providing high-quality clinical care, advanced diagnostics, and personalized treatment plans in a warm and patient-focused environment.",
  contact: {
    address: "[123 Heritage Medical Drive, Suite 400, City, State ZIP]",
    phone: "[+1 (555) 019-2834]",
    emergencyPhone: "[+1 (555) 019-9999]",
    email: "[contact@heritageclinic.example]",
    supportEmail: "[appointments@heritageclinic.example]",
    hours: {
      weekdays: "[Monday - Friday: 8:00 AM - 8:00 PM]",
      saturday: "[Saturday: 9:00 AM - 4:00 PM]",
      sunday: "[Sunday: Urgent Care / On-call Only]",
    },
  },
  stats: [
    { label: "Community Care", value: "[20+ Years]" },
    { label: "Patients Served", value: "[25,000+]" },
    { label: "Medical Specialists", value: "[3 Specialists]" },
    { label: "Patient Satisfaction", value: "[99% Rating]" },
  ] as ClinicStat[],
};

export const TREATMENTS: TreatmentItem[] = [
  {
    id: "treatment-1",
    title: "Dental Cleaning",
    category: "Dental Care",
    description:
      "[Description Placeholder: Professional plaque and tartar removal, polishing, and comprehensive oral hygiene care.]",
    duration: "[Approx. 30 - 45 mins]",
    iconName: "Sparkles",
  },
  {
    id: "treatment-2",
    title: "Tooth Filling",
    category: "Dental Care",
    description:
      "[Description Placeholder: Tooth-colored composite restoration to repair decay, cavity, or damaged tooth structure.]",
    duration: "[Approx. 30 - 60 mins]",
    iconName: "ShieldCheck",
  },
  {
    id: "treatment-3",
    title: "Braces Consultation",
    category: "Orthodontics",
    description:
      "[Description Placeholder: Comprehensive orthodontic evaluation, bite assessment, and personalized alignment treatment plan.]",
    duration: "[Approx. 30 - 45 mins]",
    iconName: "Activity",
  },
  {
    id: "treatment-4",
    title: "Braces Adjustment",
    category: "Orthodontics",
    description:
      "[Description Placeholder: Periodic archwire adjustment, progress tracking, and orthodontic elastic alignment maintenance.]",
    duration: "[Approx. 20 - 30 mins]",
    iconName: "CheckCircle2",
  },
  {
    id: "treatment-5",
    title: "General Checkup",
    category: "General Medicine",
    description:
      "[Description Placeholder: Routine physical evaluation, vital signs screening, and proactive general medical guidance.]",
    duration: "[Approx. 20 - 40 mins]",
    iconName: "Stethoscope",
  },
];

export const DOCTORS: DoctorItem[] = [
  {
    id: "doc-sharma",
    name: "Dr. Sharma",
    specialty: "Dentist",
    title: "Dentist",
    shortDescription:
      "[Short description placeholder: Dedicated to comprehensive oral health, gentle preventive dental care, and restorative procedures.]",
    photoPlaceholder: "[Photo Placeholder: Dr. Sharma]",
    qualification: "[BDS / Dental Surgery Placeholder]",
    experience: "[Dental Specialist Placeholder]",
    availability: "[Mon, Wed, Fri | 9:00 AM - 4:00 PM]",
    avatarPlaceholder: "DS",
  },
  {
    id: "doc-patel",
    name: "Dr. Patel",
    specialty: "Orthodontist",
    title: "Orthodontist",
    shortDescription:
      "[Short description placeholder: Specializing in modern orthodontic care, smile alignment, braces consultations, and ongoing adjustments.]",
    photoPlaceholder: "[Photo Placeholder: Dr. Patel]",
    qualification: "[MDS / Orthodontics Placeholder]",
    experience: "[Orthodontic Specialist Placeholder]",
    availability: "[Tue, Thu, Sat | 10:00 AM - 3:00 PM]",
    avatarPlaceholder: "DP",
  },
  {
    id: "doc-mehta",
    name: "Dr. Mehta",
    specialty: "General Physician",
    title: "General Physician",
    shortDescription:
      "[Short description placeholder: Providing complete primary healthcare consultations, routine health checkups, and wellness management.]",
    photoPlaceholder: "[Photo Placeholder: Dr. Mehta]",
    qualification: "[MD / General Medicine Placeholder]",
    experience: "[General Physician Placeholder]",
    availability: "[Mon through Fri | 8:30 AM - 2:30 PM]",
    avatarPlaceholder: "DM",
  },
];

export const WHY_CHOOSE_US = [
  {
    title: "Modern Medical Technology",
    description:
      "Our clinic is equipped with modern diagnostic tools and electronic health records to ensure accurate, rapid evaluations.",
    iconName: "Sparkles",
  },
  {
    title: "Qualified Specialists",
    description:
      "Board-certified doctors and compassionate nursing staff dedicated to patient safety and evidence-based medicine.",
    iconName: "Award",
  },
  {
    title: "Transparent & Friendly Care",
    description:
      "Clear explanation of all treatment options, zero hidden fees, and dedicated support for insurance coordination.",
    iconName: "CheckCircle2",
  },
  {
    title: "Prompt & Easy Appointments",
    description:
      "Minimal waiting times with organized online scheduling, reminder notifications, and flexible rescheduling.",
    iconName: "Clock",
  },
  {
    title: "Hygienic & Comfortable Clinic",
    description:
      "Clean, sanitized, and relaxing clinical environment designed for maximum patient comfort and safety.",
    iconName: "Shield",
  },
  {
    title: "24/7 Patient Assistant",
    description:
      "Smart digital chatbot support powered to answer clinic inquiries, hours, and appointment details anytime.",
    iconName: "Bot",
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    quote:
      "[Testimonial Placeholder: 'Heritage Clinic provided exceptional care during my consultation. The team was attentive, patient, and very thorough with diagnosis.']",
    author: "[Patient Reviewer A - Verified Consultation]",
    treatmentType: "Preventive Care",
    rating: 5,
  },
  {
    id: "test-2",
    quote:
      "[Testimonial Placeholder: 'Modern clinic facilities, prompt appointments, and compassionate medical staff. The best clinic experience for our entire family.']",
    author: "[Patient Reviewer B - Verified Consultation]",
    treatmentType: "Pediatric Care",
    rating: 5,
  },
  {
    id: "test-3",
    quote:
      "[Testimonial Placeholder: 'Booking an appointment online was simple, and the doctor took extra time to explain all my questions clearly and thoroughly.']",
    author: "[Patient Reviewer C - Verified Consultation]",
    treatmentType: "Cardiology",
    rating: 5,
  },
];
