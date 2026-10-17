# Heritage Clinic Demo Website 🏥

A modern, responsive healthcare website built for **Heritage Clinic** using **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. Designed for effortless customization and one-click **Vercel deployment**.

---

## 🌟 Features Included

- **White & Blue Healthcare Aesthetics**: Clean, accessible clinical palette with blue accents (`#006bc9`), subtle slate backgrounds, and crisp typography.
- **Mobile-First & Fully Responsive**: Optimized for smartphones, tablets, and wide desktop screens with a mobile navigation drawer.
- **Complete Clinic Sections**:
  - **Emergency Banner**: Quick access to clinic helpline and hours.
  - **Navigation Bar**: Clinic logo with stethoscope icon, smooth-scroll links, and "Book Appointment" CTA.
  - **Hero Section**: Healthcare headline, stats counters, quick clinic highlights, and direct appointment triggers.
  - **About the Clinic**: Clinic mission, values, and modern facilities presentation.
  - **Treatments**: Interactive treatment cards with category filter pills (Preventive Care, Cardiology, Pediatrics, Orthopedics, Diagnostics).
  - **Doctors**: Doctor profile cards with qualifications, experience badges, and "Book with Doctor" action.
  - **Why Choose Us**: 6 clinic pillars + verified patient testimonial placeholders.
  - **Contact**: Interactive inquiry form + telephone, email, physical address, and visiting hours placeholders.
  - **Footer**: Brand summary, quick links, and required medical disclaimer.
  - **Appointment Booking Modal**: Interactive popup scheduler allowing patients to choose a treatment, doctor, date/time, and receive instant confirmation.
  - **Floating n8n Chatbot Widget**: Bottom-right floating assistant with quick prompt suggestions, simulated chat responses, and a designated webhook integration point ready for your n8n workflow.

---

## 📁 Project Structure

```text
heritage_clinic_website/
├── package.json               # Dependencies & scripts
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.ts         # Tailwind CSS styling & custom clinic theme
├── postcss.config.mjs         # PostCSS configuration
├── next.config.mjs            # Next.js configuration
├── .gitignore                 # Files excluded from git
├── README.md                  # This documentation
└── src/
    ├── app/
    │   ├── globals.css        # Global CSS & Tailwind directives
    │   ├── layout.tsx         # Root layout with Inter font & metadata
    │   └── page.tsx           # Main page orchestrating all sections
    ├── components/
    │   ├── Navbar.tsx         # Header navigation & mobile drawer
    │   ├── Hero.tsx           # Hero section & clinic highlights
    │   ├── About.tsx          # About the Clinic & core values
    │   ├── Treatments.tsx     # Services & category filters
    │   ├── Doctors.tsx        # Doctor directory & schedule
    │   ├── WhyChooseUs.tsx    # Clinic advantages & patient reviews
    │   ├── Contact.tsx        # Contact info & patient inquiry form
    │   ├── Footer.tsx         # Footer navigation & medical disclaimer
    │   ├── AppointmentModal.tsx # Interactive booking popup
    │   └── ChatbotWidget.tsx  # Floating chatbot (ready for n8n)
    └── data/
        └── clinicData.ts      # Centralized clinic data & placeholders
```

---

## 🚀 How to Run & Preview the Website Locally

### Step 1: Ensure Node.js is Installed
If you haven't installed Node.js yet:
1. Visit [https://nodejs.org](https://nodejs.org) and download the **LTS (Long Term Support)** version.
2. Run the installer and click **Next** through the setup (keep default settings).
3. Once finished, open a new PowerShell or Command Prompt window and confirm:
   ```powershell
   node -v
   npm -v
   ```

### Step 2: Install Project Dependencies
Open your terminal inside the project directory (`c:\Users\my\Desktop\heritage_clinic_website`) and run:
```powershell
npm install
```

### Step 3: Start the Development Server
Run the local development command:
```powershell
npm run dev
```

### Step 4: Preview in Your Browser
Open your web browser (Chrome, Edge, Firefox, etc.) and visit:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🤖 How to Connect Your n8n Chatbot

The bottom-right chatbot widget is already pre-configured with a placeholder and integration hook. To link your live n8n workflow:

1. Open `src/components/ChatbotWidget.tsx`.
2. Locate the line with `N8N_WEBHOOK_URL` (around line 43):
   ```typescript
   const N8N_WEBHOOK_URL = "https://your-n8n-instance.com/webhook/your-chat-id";
   ```
3. Paste your n8n Production Webhook URL.
4. When a user sends a message, it will automatically send a POST request with:
   ```json
   {
     "message": "User question here",
     "sessionId": "demo-session-heritage-clinic",
     "timestamp": "..."
   }
   ```
5. In your n8n workflow, return a JSON response with `{ "reply": "Your AI answer here" }`.

---

## ✏️ How to Customize Clinic Details & Placeholders

All doctor names, contact phone numbers, emails, clinic hours, and treatment descriptions are centralized in **one single file**:
👉 `src/data/clinicData.ts`

Whenever you want to replace `[Dr. Doctor One]`, `[123 Heritage Medical Drive]`, or `[+1 (555) 019-2834]` with real details, just edit that file and the entire website will update automatically!

---

## ☁️ Deploying to Vercel

1. Push this project folder to your GitHub repository:
   ```powershell
   git init
   git add .
   git commit -m "Initial commit of Heritage Clinic website"
   git branch -M main
   git remote add origin <YOUR_GITHUB_REPO_URL>
   git push -u origin main
   ```
2. Go to [https://vercel.com](https://vercel.com) and log in.
3. Click **"Add New..."** -> **"Project"**.
4. Select your `heritage_clinic_website` repository.
5. Keep default settings (Framework preset: Next.js) and click **"Deploy"**.
6. Your website will be live worldwide on a secure `https://...vercel.app` domain in about 1 minute!
