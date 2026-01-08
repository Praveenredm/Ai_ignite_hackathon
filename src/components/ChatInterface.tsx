import { useState, useRef, useEffect } from "react";
import { Send, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import RecommendationCard from "./RecommendationCard";
import HospitalRecommendationCard from "./HospitalRecommendationCard";

import {
  TRIAGE_QUESTIONS,
  checkRedFlags,
  categorizeSymptom,
  generateRecommendation,
  isHealthRelated,
  irrelevantMessageResponse,
  processUserAnswer,
  inferPossibleDiseases,
  detectFever,
  Recommendation
} from "@/lib/triageLogic";

const ChatInterface = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [recommendation, setRecommendation] =
    useState<Recommendation | null>(null);

  const [nearbyHospitals, setNearbyHospitals] = useState<any[] | null>(null);

  const [triageState, setTriageState] = useState({
    step: 0,
    symptom: "",
    category: null as string | null,
    age: "",
    conditions: [] as string[],
    duration: "",
    severity: 0,
    additional: [] as string[],
    hasFever: false,
    possibleDiseases: [] as string[],
    redFlag: null as null | { message: string; action: string },
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(scrollToBottom, [messages, isTyping]);

  useEffect(() => {
    addMessage(
      "assistant",
      "👋 Hello! Tell me your main health symptom.\n\n⚠️ Chest pain or breathing trouble → Call 108."
    );
  }, []);

  const addMessage = (role: "user" | "assistant", content: string, isRedFlag = false) => {
    setMessages(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role,
        content,
        timestamp: new Date(),
        isRedFlag,
      },
    ]);
  };

  const simulateTyping = async (cb: () => void, delay = 700) => {
    setIsTyping(true);
    await new Promise(r => setTimeout(r, delay));
    setIsTyping(false);
    cb();
  };

  // ===============================
  // MAIN INPUT HANDLER
  // ===============================
  const processUserInput = async (text: string) => {
    addMessage("user", text);
    setInput("");

    // 🚫 Intent gate
    if (triageState.step === 0 && !isHealthRelated(text)) {
      const res = irrelevantMessageResponse();
      await simulateTyping(() => addMessage("assistant", res.message));
      return;
    }

    // 🚨 Red flag detection
    const redFlag = checkRedFlags(text);
    if (redFlag) {
      setTriageState(prev => ({ ...prev, redFlag }));
    }

    if (redFlag && triageState.step === 0) {
      await simulateTyping(() =>
        addMessage(
          "assistant",
          `🚨 ${redFlag.message}\n${redFlag.action}`,
          true
        )
      );
        setRecommendation(
          generateRecommendation(10, "Just started", true, null)
        );

        // Recommend nearby hospitals for follow-up (prefer cardiac if chest pain)
        try {
          const { recommendHospitals } = await import("@/lib/recommender");
          const lower = text.toLowerCase();
          const forcedCategory = lower.includes("chest") || lower.includes("chest pain")
            ? "cardiac"
            : categorizeSymptom(text);
          const rec = recommendHospitals(forcedCategory, 10);
          setNearbyHospitals(rec.hospitals.map(h => ({
            name: h.name,
            city: h.city,
            specialty: h.specialty,
            emergency24x7: h.emergency24x7,
            maps: h.maps,
            distance: h.distance
          })));
        } catch (e) {
          setNearbyHospitals(null);
        }
      return;
    }

    switch (triageState.step) {
      // First user message: capture main symptom and ask about additional symptoms
      case 0:
        setTriageState(prev => ({
          ...prev,
          step: 1,
          symptom: text,
          category: categorizeSymptom(text),
        }));
        await simulateTyping(() =>
          addMessage("assistant", "Do you have any other symptoms?")
        );
        break;

      // User replies with additional symptoms — infer conditions and fever automatically
      case 1:
        {
          const additional = text.trim().toLowerCase();
          const additionalArr = additional === "no" ? [] : [additional];
          // infer diseases and fever
          const possible = inferPossibleDiseases(text, additionalArr);
          const hasF = detectFever(text, additionalArr);
          setTriageState(prev => ({
            ...prev,
            step: 2,
            additional: additionalArr,
            hasFever: hasF,
            possibleDiseases: possible,
            category: hasF ? "infection" : prev.category,
          }));
          // Show the inferred possibilities to the user briefly
          await simulateTyping(() => addMessage("assistant", `Based on symptoms, possible: ${possible.slice(0,3).join(", ") || "unspecified"}.`));
          await simulateTyping(() => addMessage("assistant", TRIAGE_QUESTIONS[0].question));
        }
        break;

      // Age (was case 1 previously)
      case 2:
        {
          const res = processUserAnswer(1, text);
          if (!res.advance) {
            await simulateTyping(() => addMessage("assistant", res.botMessage || "Please try again."));
            return;
          }
          setTriageState(prev => ({ ...prev, step: 3, age: res.value ?? text }));
          await simulateTyping(() => addMessage("assistant", TRIAGE_QUESTIONS[1].question));
        }
        break;

      // Existing conditions (was case 2)
      case 3:
        {
          const res = processUserAnswer(2, text);
          if (!res.advance) {
            await simulateTyping(() => addMessage("assistant", res.botMessage || "Please try again."));
            return;
          }
          setTriageState(prev => ({
            ...prev,
            step: 4,
            conditions: (res.value as string).split(",").map(s => s.trim()),
          }));
          await simulateTyping(() => addMessage("assistant", TRIAGE_QUESTIONS[2].question));
        }
        break;

      // Duration (was case 3)
      case 4:
        {
          const res = processUserAnswer(3, text);
          if (!res.advance) {
            await simulateTyping(() => addMessage("assistant", res.botMessage || "Please try again."));
            return;
          }
          setTriageState(prev => ({ ...prev, step: 5, duration: res.value ?? text }));
          // Show duration options in button-like format
          const durationMsg = `${TRIAGE_QUESTIONS[2].question}\n[Few hours] [1 day] [2 days] [3 days] [More than 3 days]`;
          await simulateTyping(() => addMessage("assistant", durationMsg));
        }
        break;

      // Severity (was case 4)
      case 5:
        {
          const res = processUserAnswer(4, text);
          if (!res.advance) {
            await simulateTyping(() => addMessage("assistant", res.botMessage || "Please try again."));
            return;
          }
          setTriageState(prev => ({
            ...prev,
            step: 6,
            severity: ((res.value as number) ?? parseInt(text)) || 5,
          }));
          await simulateTyping(() => addMessage("assistant", TRIAGE_QUESTIONS[4].question));
        }
        break;

      // Final additional symptoms / wrap up (was case 5)
      case 6:
        {
          const res = processUserAnswer(5, text);
          if (!res.advance) {
            await simulateTyping(() => addMessage("assistant", res.botMessage || "Please try again."));
            return;
          }
          setTriageState(prev => ({ ...prev, additional: (res.value as string) === "no" ? [] : [(res.value as string)] }));

          await simulateTyping(() => addMessage("assistant", "Analyzing your symptoms…"));

          // Generate disease inferences
          const possibleDiseases = inferPossibleDiseases(triageState.symptom, triageState.additional);
          setTriageState(prev => ({ ...prev, possibleDiseases }));

          const rec = generateRecommendation(
            triageState.severity || 0,
            triageState.duration,
            triageState.redFlag !== null,
            triageState.category
          );

          // Append possible diseases to recommendation
          if (possibleDiseases && possibleDiseases.length > 0) {
            rec.description += `\n\n**Possible conditions:** ${possibleDiseases.slice(0, 5).join(", ")}`;
          }

          setRecommendation(rec);
        }
        break;
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">

      <div className="border-b p-3 flex justify-between">
        <h1 className="font-semibold">Symptom Assessment</h1>
        <Button size="sm" onClick={() => window.location.reload()}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(m => <ChatMessage key={m.id} {...m} />)}
        {isTyping && <TypingIndicator />}
        {recommendation && (
          <>
            <RecommendationCard recommendation={recommendation} onRestart={undefined} />
            {recommendation.level === "urgent" && nearbyHospitals && (
              <div className="mt-4">
                <HospitalRecommendationCard hospitals={nearbyHospitals} title="Suggested nearby hospitals" />
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {!recommendation && (
        <form
          onSubmit={e => {
            e.preventDefault();
            if (input.trim() && !isTyping) {
              processUserInput(input.trim());
            }
          }}
          className="p-4 border-t flex gap-3"
        >
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Describe your symptom…"
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
