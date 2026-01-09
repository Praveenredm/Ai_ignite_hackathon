🏥 CareNav — AI-Powered Symptom Triage & Care Navigator

✨ Smart • Safe • Simple Healthcare Guidance

CareNav is a healthcare decision-support web application that helps users assess symptoms, detect medical red flags, decide the right level of care, and book appointments through a guided flow.

⚠️ Not a medical diagnosis tool. Built with safety-first principles.

🎯 Problem We Solve

Patients often struggle with:

🤔 Is this symptom serious?
🏠 Can I manage this at home?
🏥 Do I need a hospital or doctor?
🚨 Is this an emergency?

CareNav reduces confusion, panic, and delay by providing structured triage and clear next steps.

🧠 How CareNav Works
💬 1. Conversational Symptom Triage

The system asks follow-up questions step-by-step:

Main symptom
Additional symptoms
Age
Duration
Chronic conditions
Severity (Low / Medium / High)
Context is remembered throughout the conversation.

🚨 2. Red-Flag Detection

Automatically detects and escalates critical symptoms:

Chest pain
Difficulty breathing
Unconsciousness
Severe bleeding
Stroke / seizure signs

👉 Immediate guidance: 📞 Call 108

🩺 3. Care Recommendation Engine
Severity	Recommendation
🟢 Low	Self-care & home remedies
🟡 Medium	Teleconsult / clinic visit
🔴 High	Emergency care

✔ Clear safety disclaimer shown with every result.

🧪 4. Possible Condition & Remedies

🧠 Shows possible condition
📊 Displays confidence score
💊 Disease-specific remedies (only when safe)
🧱 Remedies and conditions shown in separate cards for clarity

📅 5. Appointment Booking Flow (Mock)

End-to-end guided booking:

🏥 Select hospital (city-based)
👨‍⚕️ Select doctor
⏰ Choose time slot
🧑 Patient details

✅ Confirmation

Generates:

🎫 Appointment token
📱 QR code
📧 Email confirmation (EmailJS)

✨ Key Features

✅ Safety-first triage logic
✅ Red-flag escalation
✅ Clear, simple language
✅ Modular UI cards
✅ Hospital & doctor workflow
✅ Appointment ticket + QR
✅ Email notification
✅ Multilingual support (English / தமிழ்)
✅ Mobile-friendly & accessible

🛡️ Safety & Privacy

❌ No medical diagnosis
❌ No real patient data
✅ Synthetic / mock data only
✅ Conservative recommendations
✅ Emergency escalation prioritized

🌍 Multilingual Support

🇬🇧 English
🇮🇳 Tamil (தமிழ்)
Language toggle available in the UI.

🧰 Tech Stack

⚛️ React + TypeScript
🎨 Tailwind CSS
🧩 Shadcn UI
🔁 React Router
🧠 Rule-based triage engine
📧 EmailJS
📱 react-qr-code
🎯 Lucide Icons

🗂️ Project Structure
src/
├─ components/
│  ├─ ChatInterface.tsx
│  ├─ RecommendationCard.tsx
│  ├─ PossibleConditionCard.tsx
│  ├─ RemediesCard.tsx
│  ├─ AppointmentModal.tsx
│  ├─ HospitalSelector.tsx
│  ├─ DoctorSelector.tsx
│  └─ PatientForm.tsx
├─ lib/
│  ├─ triageLogic.ts
│  ├─ bookingData.ts
│  ├─ doctorData.ts
│  └─ bookingService.ts
├─ pages/
│  ├─ Index.tsx
│  ├─ Chat.tsx
│  └─ Guidelines.tsx
└─ App.tsx

🧪 Evaluation Readiness (Hackathon)

✔ Safety (no missed red flags)
✔ Clarity & usability
✔ Fast recommendation (~60 seconds)
✔ Explainable logic
✔ Agent-like behavior
✔ Multilingual bonus

⚠️ Medical Disclaimer

This application is for informational purposes only and does not provide medical advice, diagnosis, or treatment.
Always consult a qualified healthcare professional.
In emergencies, call 108 immediately.

🏁 Final Note

💡 CareNav is not just a chatbot.
It is a safe, structured, and deployable healthcare navigation system designed to guide users to the right care at the right time.

👨‍💻 Author

Praveen
AI Ignite Hackathon 2026
