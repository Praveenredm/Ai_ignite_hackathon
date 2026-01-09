🏥 CareNav – AI-Powered Symptom Triage & Care Navigator

CareNav is a safe, intelligent healthcare navigation system that helps users assess symptoms, detect red flags, decide the next best care step (self-care, teleconsult, clinic, or emergency), and seamlessly book appointments — all in one flow.

⚠️ Not a medical diagnosis tool. Built with safety-first principles.

🚀 Live Problem Statement

Healthcare – Symptom Triage and Care Navigator

Patients often struggle to decide:

Is this serious?

Should I go to a hospital?

Can I manage this at home?

Whom should I consult?

CareNav solves this by combining structured triage logic, red-flag detection, and a guided booking experience.

🎯 Key Objectives

Guide patients to the right level of care

Detect life-threatening red flags

Provide clear, simple next steps

Reduce unnecessary hospital visits

Enable end-to-end appointment booking (mocked)

🧠 How CareNav Works
1️⃣ Conversational Symptom Triage

CareNav asks follow-up questions intelligently:

Main symptom

Additional symptoms

Age

Duration of symptoms

Chronic conditions

Severity (Low / Medium / High)

2️⃣ Red-Flag Detection 🚨

Automatically escalates when critical symptoms are detected:

Chest pain

Difficulty breathing

Unconsciousness

Severe bleeding

Stroke / seizure symptoms

👉 Immediate emergency guidance (Call 108)

3️⃣ Triage Decision Engine

Based on severity + duration + symptoms:

Level	Recommendation
🟢 Low	Self-care + home remedies
🟡 Medium	Teleconsult / clinic visit
🔴 High	Emergency care

✔ Clear disclaimer: “Not a medical diagnosis”

4️⃣ Disease Insight (Explainable AI)

Suggests possible condition

Displays confidence score

Shows disease-specific remedies

Remedies shown only when safe

5️⃣ Appointment Booking Flow

End-to-end guided booking:

Hospital selection (city-based)

Doctor selection

Time slot selection

Patient details

Appointment confirmation

✔ Generates:

🎫 Appointment token

📱 QR code

📧 Email confirmation (EmailJS)

✨ Features

✅ Safety-first triage logic

✅ Red-flag escalation

✅ Clean UI with step-based flow

✅ Disease confidence scoring

✅ Remedy cards (separate, clear)

✅ Hospital & doctor workflow

✅ Appointment ticket + QR

✅ Email notification

✅ Multilingual support (English / தமிழ்)

✅ Accessible & mobile-friendly UI

🛡️ Safety & Ethics

❌ No medical diagnosis

❌ No real patient data

✅ Synthetic/mock data only

✅ Conservative recommendations

✅ Emergency-first escalation

✅ Clear medical disclaimer

🌍 Multilingual Support

CareNav supports:

🇬🇧 English

🇮🇳 Tamil (தமிழ்)

Language toggle available in the UI.

🧰 Tech Stack

Frontend: React + TypeScript + Tailwind CSS

State & Routing: React Router

UI Components: Shadcn UI

Icons: Lucide React

QR Generation: react-qr-code

Email: EmailJS (client-side)

Data: Mock hospitals, doctors, slots

Architecture: Modular, scalable, component-driven

🗂️ Project Structure
src/
├── components/
│   ├── ChatInterface.tsx
│   ├── RecommendationCard.tsx
│   ├── PossibleConditionCard.tsx
│   ├── RemediesCard.tsx
│   ├── AppointmentModal.tsx
│   ├── HospitalSelector.tsx
│   ├── DoctorSelector.tsx
│   ├── PatientForm.tsx
│   └── Footer.tsx
│
├── lib/
│   ├── triageLogic.ts
│   ├── bookingData.ts
│   ├── doctorData.ts
│   └── bookingService.ts
│
├── pages/
│   ├── Index.tsx
│   ├── Chat.tsx
│   ├── Guidelines.tsx
│   └── HospitalLocator.tsx
│
└── App.tsx

🧪 Evaluation Readiness (For Judges)
Criteria	Status
Safety	✅
Clarity	✅
Red-flag handling	✅
Booking flow	✅
Time to recommendation	< 60s
Agentic behavior	✅
Multilingual bonus	✅
⚠️ Medical Disclaimer

This application is for informational purposes only and does not constitute medical advice, diagnosis, or treatment.
Always seek the advice of a qualified healthcare provider.
In emergencies, call 108 immediately.

🏁 Final Note

CareNav is not just a chatbot.
It is a safe, explainable, and deployable healthcare navigation system designed to reduce panic, improve decision-making, and guide patients to the right care — at the right time.

👨‍💻 Author

Praveen
AI Ignite Hackathon 2026
