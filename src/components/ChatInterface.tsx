import { useState, useEffect, useRef } from "react";
import { Send, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import RecommendationCard from "./RecommendationCard";
import HospitalRecommendationCard from "./HospitalRecommendationCard";
import PossibleConditionCard from "./PossibleConditionCard";
import RemediesCard from "./RemediesCard";
import AppointmentModal from "./AppointmentModal";
import { languages, Lang } from "@/lib/i18n";




import {
  isHealthRelated,
  irrelevantMessageResponse,
  checkRedFlags,
  inferPossibleDiseases,
  inferDiseasesWithScoreAndRemedies,
  generateRecommendation,
  Recommendation,
} from "@/lib/triageLogic";

// -----------------------------
// TYPES
// -----------------------------
interface Hospital {
  name: string;
  city: string;
  specialty: string[];
  emergency24x7: boolean;
  maps: string;
  distance: number;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [remedies, setRemedies] = useState<string[]>([]);


  const [recommendation, setRecommendation] =
    useState<Recommendation | null>(null);

    const [possibleCondition, setPossibleCondition] = useState<{
  disease: string;
  confidence: number;
} | null>(null);

const [showBooking, setShowBooking] = useState(false);

const [lang, setLang] = useState<Lang>("en");
const t = languages[lang];

  const [nearbyHospitals, setNearbyHospitals] = useState<Hospital[]>([]);

  const [state, setState] = useState({
    step: 0,
    symptom: "",
    additional: [] as string[],
    age: 0,
    chronic: "",          // ✅ NEW 
    duration: "",
    severity: 0,
    diseases: [] as string[],
    redFlag: false,
  });

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    addMessage(
      "assistant",
      "👋 Hello! Please describe your main health symptom.\n⚠️ Chest pain or breathing trouble → Call 108"
    );
  }, []);


  // ===============================
// INPUT VALIDATION HELPERS
// ===============================

// 🔹 Duration validator
const isValidDuration = (text: string) => {
  const t = text.toLowerCase();
  return (
    t.includes("day") ||
    t.includes("days") ||
    t.includes("week") ||
    t.includes("weeks") ||
    t.includes("month") ||
    t.includes("months") ||
    t.includes("hour") ||
    t.includes("hours") ||
    /^\d+$/.test(t)
  );
};

// 🔹 Step-wise relevance validator
const isAnswerRelevantForStep = (step: number, text: string) => {
  const t = text.toLowerCase();

  // Step 0 & 1 → symptoms
  if (step === 0 || step === 1) {
    return isHealthRelated(t) || t === "no";
  }

  // STEP 2 – Age
  if (step === 2) {
    const age = Number(t);
    return !isNaN(age) && age > 0 && age <= 120;
  }

  // Step 3 → duration
  if (step === 3) { 
    return isValidDuration(t);
  }

  // Step 4 → chronic conditions
  if (step === 4) {
    return isHealthRelated(t) || t === "no";
  }

  // Step 5 → severity
  if (step === 5) {
    const sev = Number(t);
    return !isNaN(sev) && sev >= 1 && sev <= 10;
  }

  return true;
};

  // -----------------------------
  // HELPERS
  // -----------------------------
  const addMessage = (
    role: "user" | "assistant",
    content: string,
    danger = false
  ) => {
    setMessages(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role,
        content,
        danger,
        timestamp: new Date(),
      },
    ]);
  };

  const simulateTyping = async (cb: () => void) => {
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 600));
    setIsTyping(false);
    cb();
  };

  const restartAssessment = () => {
    setMessages([]);
    setRecommendation(null);
    setNearbyHospitals([]);
    setState({
      step: 0,
      symptom: "",
      additional: [],
      age: 0,
      chronic: "", 
      duration: "",
      severity: 0,
      diseases: [],
      redFlag: false,
    });

    addMessage(
      "assistant",
      "🔄 Assessment restarted. Please describe your main health symptom."
    );
  };

  // -----------------------------
  // MAIN CHAT LOGIC
  // -----------------------------
  const handleUserInput = async (text: string) => {
    addMessage("user", text);
    setInput("");

    // STEP 0 – Intent + symptom
    if (state.step === 0) {
  if (!isHealthRelated(text)) {
    const res = irrelevantMessageResponse();
    return simulateTyping(() =>
      addMessage("assistant", res.message)
    );
  }


      const redFlag = checkRedFlags(text);
      if (redFlag) {
        addMessage(
          "assistant",
          `🚨 ${redFlag.message}\n📞 Emergency Number: 108`,
          true
        );
        setRecommendation(generateRecommendation(10, "", true));
        loadHospitals("emergency");
        return;
      }

      setState(s => ({ ...s, step: 1, symptom: text }));
      return simulateTyping(() =>
        addMessage("assistant", "Do you have any other symptoms? (or type 'no')")
      );
    }

    // STEP 1 – Additional symptoms
    if (state.step === 1) {
  const t = text.toLowerCase();
  if (!(isHealthRelated(t) || t === "no")) {
    return simulateTyping(() =>
      addMessage(
        "assistant",
        "Please describe additional health-related symptoms or type 'no'."
      )
    );
  }

  setState(s => ({
    ...s,
    step: 2,
    additional: t === "no" ? [] : [text],
  }));

  return simulateTyping(() =>
    addMessage("assistant", "What is your age?")
  );
}


    // STEP 2 – Age
    if (state.step === 2) {
      const age = Number(text);
      if (!Number.isInteger(age) || age <= 0 || age > 120) {
        return simulateTyping(() =>
          addMessage("assistant", "Please enter a valid age.")
        );
      }
      setState(s => ({ ...s, step: 3, age }));
      return simulateTyping(() =>
        addMessage("assistant", "How long have you had this symptom?")
      );
    }
    // STEP 3 – Duration
    if (state.step === 3) {
  if (!isValidDuration(text)) {
    return simulateTyping(() =>
      addMessage(
        "assistant",
        "Please specify duration (e.g., 2 days, 1 week)."
      )
    );
  }

  setState(s => ({ ...s, step: 4, duration: text }));
  return simulateTyping(() =>
    addMessage(
      "assistant",
      "Do you have any chronic conditions? (e.g., diabetes, BP, asthma) \nType 'no' if none."
    )
  );
}


    // STEP 4 – Chronic conditions
    if (state.step === 4) {
  const t = text.toLowerCase();
  if (!(isHealthRelated(t) || t === "no")) {
    return simulateTyping(() =>
      addMessage(
        "assistant",
        "Please mention a medical condition or type 'no'."
      )
    );
  }

  setState(s => ({ ...s, step: 5, chronic: t }));
  return simulateTyping(() =>
    addMessage("assistant", "Rate severity from 1–10")
  );
}


    // STEP 5 – Severity + ANALYSIS
    if (state.step === 5) {
      const severity = Number(text);
      if (!Number.isInteger(severity) || severity < 1 || severity > 10) {
        return simulateTyping(() =>
          addMessage("assistant", "Severity must be between 1 and 10.")
        );
      }

      const diseases = inferPossibleDiseases(
        state.symptom,
        state.additional
      );

      const rec = generateRecommendation(
        severity,
        state.duration,
        false
      );

      // 🔹 NEW: disease + confidence + remedies
      const diseaseInsights = inferDiseasesWithScoreAndRemedies(
        state.symptom,
        state.additional
      );

      // ✅ SET POSSIBLE CONDITION (SEPARATE STATE)
      if (diseaseInsights.length > 0) {
        setPossibleCondition({
          disease: diseaseInsights[0].disease,
          confidence: diseaseInsights[0].confidence,
        });
      } else {
        setPossibleCondition(null);
      }

      // ✅ SET REMEDIES (ONLY FOR NON-URGENT)
      if (rec.level !== "urgent" && diseaseInsights.length > 0) {
        setRemedies(diseaseInsights[0].remedies);
      } else {
        setRemedies([]);
      }

      // ❌ DO NOT PUT DISEASE OR REMEDIES IN DESCRIPTION
      // Keep description clean
      rec.description += `
If symptoms worsen or do not improve, consult a doctor.
`;

      setState(s => ({
        ...s,
        step: 6,
        severity,
        diseases,
      }));

      setRecommendation(rec);

      if (rec.level !== "self-care") {
        loadHospitals("general");
      }
    };

};

  // -----------------------------
  // MOCK HOSPITAL LOADER
  // -----------------------------
  const loadHospitals = (type: string) => {
    setNearbyHospitals([
      {
        name: "City Care Hospital",
        city: "Chennai",
        specialty: [type === "emergency" ? "Emergency" : "General Medicine"],
        emergency24x7: true,
        maps: "https://maps.google.com",
        distance: 2.3,
      },
      {
        name: "Apollo Clinic",
        city: "Chennai",
        specialty: ["Physician"],
        emergency24x7: false,
        maps: "https://maps.google.com",
        distance: 4.1,
      },
    ]);
  };

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">

      <div className="border-b p-3 flex justify-between">
        <h1 className="font-semibold">Care Navigator</h1>
        <Button size="sm" onClick={restartAssessment}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(m => (
          <ChatMessage key={m.id} {...m} />
        ))}

        {isTyping && <TypingIndicator />}

       {recommendation && (
  <>
    {/* 1️⃣ Recommendation */}
    <RecommendationCard
      recommendation={recommendation}
      onRestart={restartAssessment}
      onBookAppointment={() => setShowBooking(true)}
    />
{showBooking && (
  <AppointmentModal
    symptom={state.symptom}
    onClose={() => setShowBooking(false)}
  />
)}



    {/* 2️⃣ Possible Condition */}
    {possibleCondition && (
      <PossibleConditionCard
        disease={possibleCondition.disease}
        confidence={possibleCondition.confidence}
      />
    )}

    {/* 3️⃣ Remedies (only if available) */}
    <RemediesCard remedies={remedies} />

    {/* 4️⃣ Hospitals */}
    {recommendation.level !== "self-care" &&
      nearbyHospitals.length > 0 && (
        <HospitalRecommendationCard
          hospitals={nearbyHospitals}
          title="Nearby Hospitals"
        />
      )}
  </>
)}


        <div ref={endRef} />
      </div>

      {/* 🔴 SEVERITY STEP → TELEGRAM STYLE OPTIONS */}
{!recommendation && state.step === 5 && (
  <div className="p-4 border-t space-y-3">
    <p className="text-sm font-medium text-muted-foreground">
      How severe is your condition?
    </p>

    <div className="flex gap-3">
      <button
        onClick={() => handleUserInput("2")}
        className="flex-1 p-3 rounded-lg border bg-green-50 hover:bg-green-100 text-green-700 font-semibold"
      >
        🟢 Low (1–3)
      </button>

      <button
        onClick={() => handleUserInput("5")}
        className="flex-1 p-3 rounded-lg border bg-yellow-50 hover:bg-yellow-100 text-yellow-700 font-semibold"
      >
        🟡 Medium (4–6)
      </button>

      <button
        onClick={() => handleUserInput("8")}
        className="flex-1 p-3 rounded-lg border bg-red-50 hover:bg-red-100 text-red-700 font-semibold"
      >
        🔴 High Alert (7–10)
      </button>
    </div>
  </div>
)}

{/* 🟢 ALL OTHER STEPS → NORMAL INPUT */}
{!recommendation && state.step !== 5 && (
  <form
    onSubmit={e => {
      e.preventDefault();
      if (input.trim() && !isTyping) {
        handleUserInput(input.trim());
      }
    }}
    className="p-4 border-t flex gap-3"
  >
    <Input
      value={input}
      onChange={e => setInput(e.target.value)}
      placeholder="Type your answer…"
    />
    <Button type="submit">
      <Send className="w-5 h-5" />
    </Button>
  </form>
)}

    </div>
  );
};

export default ChatInterface;
