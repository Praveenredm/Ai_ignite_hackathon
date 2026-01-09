// ===================================================
// Care Navigator – Enhanced Rule-Based Symptom Triage
// ===================================================

export interface Recommendation {
  level: "self-care" | "teleconsult" | "urgent";
  title: string;
  description: string;
  actions: string[];
}

// ===================================================
// HEALTH INTENT KEYWORDS (EXPANDED)
// ===================================================
const HEALTH_KEYWORDS = [
  // General
  "pain","fever","temperature","sick","ill","weakness","fatigue","tired",
  "body ache","chills","sweating","infection","symptom","temperature","ache","hurt","discomfort","unwell","not feeling well",
  "wellbeing","health","condition","ailment","disease","disorder","syndrome"," issue","problem","concern","medical","clinic","hospital",
  

  // Respiratory
  "cough","cold","sneezing","runny nose","congestion","breath","breathing",
  "shortness of breath","wheezing","chest","chest pain","chest tightness",

  // Gastrointestinal
  "stomach","abdominal","belly","cramps","vomit","vomiting","nausea",
  "diarrhea","loose motion","constipation","acid","gas","bloating","heartburn","indigestion",
  "appetite","food poisoning","dysentery","diarrhoea","dehydration","abdomen","abdo","colic",
  "bloody stool","black stool","dark urine","jaundice","yellow eyes","yellow skin","liver","hepatitis","pancreas",
  "appendicitis","kidney stone","gallstone","stones","kidney stones","gall bladder","gallbladder","urination","urinate",
  
  // Neurological
  "headache","migraine","dizzy","dizziness","faint","unconscious",
  "seizure","fits","convulsions","blurred vision","light sensitivity","photophobia","numbness","tingling","weakness one side",
  "paralysis","memory","confusion","balance","vertigo","tremor","shaking",
  "seizures","epilepsy","coma","sleepiness","insomnia","nightmare","hallucination",
  "depression","anxiety","panic attack","panic attacks","suicide attempt","psychosis","mental illness",
  "depressive episode","anxiety disorder","obsessive compulsive disorder","ocd","ptsd",

  // Cardiac
  "heart","pressure","palpitation","cardiac","heart attack","angina","chest pain","cardiac arrest",

  // Skin
  "rash","itching","swelling","redness","burning","allergy",

  // Urinary
  "urine","burning urination","frequent urination","lower abdomen",

  // ENT
  "sore throat","throat pain","ear pain","sinus","voice loss","hoarseness","earache","snoring","snore","snoring","snorer","snorers",
  "mouth ulcer","tonsillectomy","tonsils","adenoids","adeno","sleep apnea","sleep apnoea",
  "sleep apnea","sleep apnoea","snoring","snore","snoring","snorer","snorers",
  "mouth ulcer","tonsillectomy","tonsils","adenoids","adeno",

  // Chronic
  "diabetes","asthma","bp","blood pressure","hypertension","hypotension","hyperglycaemia","low bp","low blood pressure",
  "high bp","high blood pressure","hypoglycaemia","diabetic ketoacidosis","diabetic coma","diabetic coma","diabetic ketoacidosis",
  "chronic kidney disease","ckd","chronic obstructive pulmonary disease","copd","emphysema","bronchitis","asthmatic bronchitis",
  "lung cancer","lung disease","respiratory disease","respiratory problem","respiratory infection","tuberculosis","tb","pneumonia"
  ,"bronchiectasis","interstitial lung disease","pulmonary fibrosis","sarcoidosis","cystic fibrosis","pulmonary hypertension","sleep apnea"

];

export function isHealthRelated(text: string): boolean {
  const lower = text.toLowerCase();
  return HEALTH_KEYWORDS.some(k => lower.includes(k));
}

export function irrelevantMessageResponse() {
  return {
    type: "irrelevant",
    message:
      "❌ I can assist only with health-related symptoms.\nExample: fever, cough, headache, stomach pain."
  };
}

// ===================================================
// RED FLAGS (LIFE-THREATENING)
// ===================================================
const RED_FLAGS = [
  ["chest pain","heart pain","pressure","cardiac"],
  ["difficulty breathing","shortness of breath","can't breathe"],
  ["unconscious","fainted","collapsed"],
  ["seizure","fits","convulsions"],
  ["vomiting blood","blood vomit","coughing blood"],
  ["severe abdominal pain","unbearable pain"],
  ["stroke","slurred speech","face drooping","arm weakness"],
  ["severe allergic reaction","anaphylaxis","swelling throat","difficulty swallowing"],
  ["severe burns","major burns"],
  ["severe head injury","head trauma","brain injury"],
  ["high fever in infant","fever baby under 2 months"],
  ["severe bleeding","bleeding out"],
  ["severe chest pain","heart pain","pressure","cardiac"],
  ["severe abdominal pain","unbearable pain"],
  ["stroke","slurred speech","face drooping","arm weakness"],
  ["severe allergic reaction","anaphylaxis","swelling throat","difficulty swallowing"],
  ["severe burns","major burns"],
  ["severe head injury","head trauma","brain injury"],
  ["high fever in infant","fever baby under 2 months"],
  ["severe bleeding","bleeding out"],
  ["severe chest pain","heart pain","pressure","cardiac"],
  ["severe abdominal pain","unbearable pain"],
  ["stroke","slurred speech","face drooping","arm weakness"],
  ["severe allergic reaction","anaphylaxis","swelling throat","difficulty swallowing"],
  ["severe burns","major burns"],
  ["severe head injury","head trauma","brain injury"],
  ["high fever in infant","fever baby under 2 months"],
  ["severe bleeding","bleeding out"],
  ["severe chest pain","heart pain","pressure","cardiac"],
  ["severe abdominal pain","unbearable pain"],
  ["stroke","slurred speech","face drooping","arm weakness"],
  ["severe allergic reaction","anaphylaxis","swelling throat","difficulty swallowing"],
  ["severe burns","major burns"],
  ["severe head injury","head trauma","brain injury"],
  ["high fever in infant","fever baby under 2 months"],
  ["severe bleeding","bleeding out"],
  ["severe chest pain","heart pain","pressure","cardiac"],
  ["severe abdominal pain","unbearable pain"],
  ["stroke","slurred speech","face drooping","arm weakness"],
  ["severe allergic reaction","anaphylaxis","swelling throat","difficulty swallowing"],
  ["severe burns","major burns"],
  ["severe head injury","head trauma","brain injury"],
  ["high fever in infant","fever baby under 2 months"],
  ["severe bleeding","bleeding out"]
];

export function checkRedFlags(text: string) {
  const lower = text.toLowerCase();
  for (const keys of RED_FLAGS) {
    if (keys.some(k => lower.includes(k))) {
      return {
        message: "Possible medical emergency detected.",
        action: "📞 Call emergency services (108) immediately."
      };
    }
  }
  return null;
}

// ===================================================
// DISEASE ↔ SYMPTOM KNOWLEDGE BASE (EXPANDED)
// ===================================================
const DISEASE_KEYWORDS: Record<string, string[]> = {
  // Fever-related
  "Viral Fever": ["fever","temperature","body ache","fatigue","weakness"],
  "Dengue": ["high fever","body ache","joint pain","headache","fatigue"],
  "Malaria": ["fever","chills","sweating","weakness"],
  "Typhoid": ["fever","abdominal pain","weakness","headache"],

  // Respiratory
  "Common Cold": ["cold","sneezing","runny nose","congestion"],
  "Flu (Influenza)": ["fever","chills","body ache","fatigue","cough"],
  "COVID-19": ["fever","cough","loss of smell","loss of taste","breath"],
  "Asthma Attack": ["wheezing","shortness of breath","breathing","chest"],

  // Gastrointestinal
  "Gastritis": ["stomach pain","abdominal pain","vomiting","nausea","acid"],
  "Food Poisoning": ["vomiting","diarrhea","cramps","abdominal pain"],
  "Constipation": ["abdominal pain","bloating","gas"],

  // Neurological
  "Migraine": ["migraine","headache","photophobia","vomiting"],
  "Tension Headache": ["headache","stress","pressure"],
  "Vertigo": ["dizziness","nausea","loss of balance"],

  // Cardiac
  "Angina / Cardiac Issue": ["chest pain","pressure","shortness of breath"],

  // Skin
  "Allergic Reaction": ["rash","itching","swelling","allergy"],
  "Skin Infection": ["redness","swelling","pain","burning"],

  // Urinary
  "Urinary Tract Infection (UTI)": ["burning urination","frequent urination","lower abdomen"],

  // ENT
  "Throat Infection": ["sore throat","throat pain","fever"],
  "Sinusitis": ["headache","sinus","congestion","facial pain"],

  // General
  "General Infection": ["fever","weakness","fatigue","body ache"]
};

// ===================================================
// DISEASE INFERENCE ENGINE (SCORING)
// ===================================================
export function inferPossibleDiseases(
  mainSymptom: string,
  additionalSymptoms: string[]
): string[] {

  const text = (mainSymptom + " " + additionalSymptoms.join(" ")).toLowerCase();
  const scores: Record<string, number> = {};

  for (const [disease, keywords] of Object.entries(DISEASE_KEYWORDS)) {
    let score = 0;
    for (const kw of keywords) {
      if (text.includes(kw)) score++;
    }
    if (score > 0) scores[disease] = score;
  }

  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([disease]) => disease);
}

// ===================================================
// FINAL RECOMMENDATION ENGINE
// ===================================================
export function generateRecommendation(
  severity: number,
  duration: string,
  redFlag: boolean
): Recommendation {

  if (redFlag || severity >= 9) {
    return {
      level: "urgent",
      title: "🚨 Emergency Care Required",
      description:
        "Your symptoms suggest a potentially serious condition that needs immediate medical attention.",
      actions: ["Call 108 immediately", "Go to nearest emergency hospital"]
    };
  }

  if (severity >= 5 || duration.toLowerCase().includes("more")) {
    return {
      level: "teleconsult",
      title: "Doctor Consultation Recommended",
      description:
        "Your symptoms may require evaluation by a medical professional.",
      actions: ["Book doctor appointment", "Avoid self-medication"]
    };
  }

  return {
    level: "self-care",
    title: "Self-Care Suggested",
    description:
      "Your symptoms appear mild. Home care and monitoring are advised.",
    actions: ["Home remedies", "Monitor symptoms", "Book appointment if needed"]
  };
}// ===================================================
// 🆕 DISEASE-SPECIFIC REMEDIES (SAFE, NON-PRESCRIPTIVE)
// ===================================================
const DISEASE_REMEDIES: Record<string, string[]> = {
  "Viral Fever": [
    "Adequate rest",
    "Drink warm fluids",
    "Paracetamol if fever persists",
    "Monitor temperature regularly"
  ],
  "Dengue": [
    "Strict rest",
    "Plenty of oral fluids",
    "Avoid painkillers like ibuprofen",
    "Consult doctor immediately if bleeding occurs"
  ],
  "Malaria": [
    "Consult doctor for blood test",
    "Rest and hydration",
    "Avoid self-medication"
  ],
  "Typhoid": [
    "Soft diet",
    "Hydration",
    "Medical consultation required"
  ],
  "Common Cold": [
    "Steam inhalation",
    "Warm salt water gargle",
    "Plenty of fluids",
    "Adequate rest"
  ],
  "Flu (Influenza)": [
    "Rest and hydration",
    "Warm fluids",
    "Avoid cold exposure"
  ],
  "COVID-19": [
    "Isolate and monitor symptoms",
    "Hydration and rest",
    "Consult doctor if breathing worsens"
  ],
  "Asthma Attack": [
    "Use prescribed inhaler",
    "Sit upright",
    "Avoid triggers",
    "Seek emergency help if no relief"
  ],
  "Gastritis": [
    "Small frequent meals",
    "Avoid spicy and oily food",
    "Warm water",
    "Do not lie down immediately after eating"
  ],
  "Food Poisoning": [
    "ORS (oral rehydration solution)",
    "Light meals",
    "Avoid outside food",
    "Monitor dehydration"
  ],
  "Migraine": [
    "Rest in dark, quiet room",
    "Avoid screen exposure",
    "Adequate sleep",
    "Hydration"
  ],
  "Vertigo": [
    "Avoid sudden head movements",
    "Sit or lie down immediately",
    "Hydration"
  ],
  "Angina / Cardiac Issue": [
    "Immediate medical evaluation required",
    "Avoid exertion",
    "Emergency care if pain persists"
  ],
  "Allergic Reaction": [
    "Avoid known allergens",
    "Cold compress",
    "Loose cotton clothing"
  ],
  "Urinary Tract Infection (UTI)": [
    "Drink plenty of water",
    "Do not hold urine",
    "Maintain hygiene",
    "Consult doctor if fever occurs"
  ],
  "Throat Infection": [
    "Warm salt water gargle",
    "Warm fluids",
    "Voice rest"
  ],
  "Sinusitis": [
    "Steam inhalation",
    "Warm compress",
    "Hydration"
  ],
  "General Infection": [
    "Adequate rest",
    "Hydration",
    "Monitor symptoms"
  ],
  "Constipation": [
    "Fiber-rich diet",
    "Stay hydrated",
    "Regular exercise",
    "Consult doctor if severe"
  ],
  "Tension Headache": [
    "Relaxation techniques",
    "Massage",
    "Heat/cold therapy",
    "Avoid stressors"
  ],
  "Skin Infection": [
    "Keep area clean and dry",
    "Avoid scratching",
    "Use mild antiseptics"
  ],
  
};

// ===================================================
// 🆕 DISEASE INFERENCE WITH CONFIDENCE SCORE + REMEDIES
// ===================================================
export interface DiseaseWithConfidence {
  disease: string;
  confidence: number; // percentage
  remedies: string[];
}

export function inferDiseasesWithScoreAndRemedies(
  mainSymptom: string,
  additionalSymptoms: string[]
): DiseaseWithConfidence[] {

  const text = (mainSymptom + " " + additionalSymptoms.join(" ")).toLowerCase();
  const results: DiseaseWithConfidence[] = [];

  for (const [disease, keywords] of Object.entries(DISEASE_KEYWORDS)) {
    let matched = 0;

    for (const kw of keywords) {
      if (text.includes(kw)) matched++;
    }

    if (matched > 0) {
      const confidence = Math.min(
        Math.round((matched / keywords.length) * 100),
        95 // safety cap
      );

      results.push({
        disease,
        confidence,
        remedies: DISEASE_REMEDIES[disease] || [
          "Rest",
          "Hydration",
          "Consult doctor if symptoms persist"
        ]
      });
    }
  }

  return results.sort((a, b) => b.confidence - a.confidence);
}

