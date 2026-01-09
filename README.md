# 🏥 Care Navigator – Symptom Triage & Appointment Booking System

🌍 **AI Ignite Hackathon 2026 Project**  
👨‍💻 Built by: **Praveen**  
📍 Region: India  
⚡ Tech-first, safety-first healthcare assistant

---

## 🚀 Overview

**Care Navigator** is an intelligent, rule-based **Symptom Triage and Care Navigation Web App** designed to help users:

- Understand their symptoms
- Identify **red flags**
- Decide the **next best step** (self-care, teleconsult, hospital, emergency)
- Book a **doctor appointment**
- Receive a **digital appointment ticket with QR code**

⚠️ **Disclaimer:**  
This tool is **NOT a medical diagnosis system**. It provides guidance only and escalates emergencies appropriately.

---

## 🎯 Problem Statement

Healthcare systems face challenges like:
- Patients unsure whether symptoms are serious
- Overcrowding in emergency departments
- Delays in care due to poor triage
- Lack of simple, multilingual digital tools

---

## 💡 Solution

Care Navigator provides:

- 🧠 Rule-based symptom triage (safe & deterministic)
- 🚨 Emergency red-flag detection
- 📋 Simple follow-up questions
- 🏥 Hospital & doctor selection
- ⏰ Slot-based appointment booking
- 🎫 Token + QR-based appointment ticket
- 🌐 Multilingual support (English 🇬🇧 / Tamil 🇮🇳)

---

## ✨ Key Features

### 🩺 Symptom Triage
- Step-by-step questioning
- Severity classification (Low / Medium / High)
- Clear next-step guidance

### 🚨 Red Flag Detection
- Chest pain
- Breathing difficulty
- Unconsciousness
- Seizures
- Severe bleeding

➡️ Immediate **108 emergency escalation**

### 💊 Remedies & Possible Conditions
- Disease inference with confidence score
- Disease-specific **safe home remedies**
- Displayed in separate, clear UI cards

### 🏥 Appointment Booking Flow
1. Select Hospital (location-based)
2. Select Doctor
3. Select Available Slot
4. Enter Patient Details
5. Get Appointment Ticket 🎟️

### 🎫 Digital Appointment Ticket
- Patient details
- Hospital & doctor
- Slot timing
- Unique token
- QR code (scan at hospital)

### 🌐 Multilingual
- English
- Tamil (தமிழ்)

---

## 🧠 System Workflow

```text
User Symptom
     ↓
Health Intent Check
     ↓
Red Flag Detection
     ↓
Follow-up Questions
     ↓
Severity Analysis
     ↓
Recommendation
     ↓
Possible Condition + Remedies
     ↓
Appointment Booking
     ↓
Digital Ticket + QR
```
## 🧩 Use Case Diagram

User
 ├── Enter Symptoms
 ├── Answer Questions
 ├── View Recommendation
 ├── Book Appointment
 ├── Receive Ticket
 └── Visit Hospital

## 🏗️ Tech Stack

### Frontend
- ⚛️ **React + TypeScript**
- 🎨 **Tailwind CSS**
- 🧩 **shadcn/ui**
- 🧭 **React Router**
- 🔔 **Sonner / Toast Notifications**

### Backend / Logic
- 🧠 **Rule-based Triage Engine**
- 📊 **Scoring-based Disease Inference**
- 🔐 **Firebase (Firestore – optional)**
- ✉️ **EmailJS (Email Notifications)**

### Utilities
- 📷 **QR Code Generator**
- 🌍 **Browser Geolocation (Safe Fallback)**

---

## 📁 Project File Structure

```text
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
│   ├── AppointmentTicket.tsx
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
├── App.tsx
└── main.tsx
```

🛡️ Safety & Ethics

❌ No real patient data stored
✅ Synthetic / mock data only
🚨 Emergency escalation always prioritized
📜 Clear medical disclaimer shown
🔒 Privacy-first approach

📚 Sources & Guidelines

🌍 World Health Organization (WHO)
🇺🇸 Centers for Disease Control and Prevention (CDC)
🇬🇧 NICE Clinical Guidelines
🇮🇳 Government of India Health Portals

🔮 Future Enhancements

🗣️ Voice-based symptom input
📱 WhatsApp / SMS notifications
🏥 Live hospital availability
🤖 ML-assisted triage (with safeguards)
📊 Doctor dashboard

🙌 Conclusion

Care Navigator demonstrates how technology can:
Reduce healthcare confusion
Improve triage safety
Save time for patients and hospitals
Provide accessible, multilingual healthcare guidance
🩵 Built with care, safety, and impact in mind.

📌 Emergency Notice

🚨 If you or someone else is in immediate danger, call 108 right now.
