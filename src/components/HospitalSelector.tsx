import { useEffect, useState } from "react";
import { hospitals } from "@/lib/bookingData";

interface Hospital {
  id: string;
  name: string;
  city: string;
  specialties: string[];
  isGovernment?: boolean;
  hasEmergency?: boolean;
}

interface HospitalSelectorProps {
  symptom: string;
  onSelect: (hospital: Hospital) => void;
}

const HospitalSelector = ({ symptom, onSelect }: HospitalSelectorProps) => {
  const [city, setCity] = useState("");
  const [filtered, setFiltered] = useState<Hospital[]>(hospitals);

  // 🌍 Auto-detect city (safe default for hackathon)
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      () => setCity("Pondicherry"),
      () => setCity("")
    );
  }, []);

  // 🔍 Filter hospitals by city
  useEffect(() => {
    if (!city.trim()) {
      setFiltered(hospitals);
    } else {
      setFiltered(
        hospitals.filter(h =>
          h.city.toLowerCase().includes(city.toLowerCase())
        )
      );
    }
  }, [city]);

  return (
    <div>
      {/* Header */}
      <h2 className="text-xl font-bold mb-1">Select Hospital</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Recommended hospitals for: <strong>{symptom}</strong>
      </p>

      {/* City search */}
      <input
        value={city}
        onChange={e => setCity(e.target.value)}
        placeholder="Search by city (e.g., Pondicherry)"
        className="w-full p-2 border rounded-md mb-4"
      />

      {/* Hospital list */}
      <div className="space-y-3 max-h-[320px] overflow-y-auto">
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No hospitals found for this city.
          </p>
        )}

        {filtered.map(h => (
          <div
            key={h.id}
            className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition"
            onClick={() =>
              onSelect({
                id: h.id,                 // ✅ CRITICAL
                name: h.name,             // ✅ CRITICAL
                city: h.city,
                specialties: h.specialties,
                isGovernment: h.isGovernment,
                hasEmergency: h.hasEmergency,
              })
            }
          >
            {/* Top row */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-base">{h.name}</h3>
                <p className="text-sm text-muted-foreground">📍 {h.city}</p>
              </div>

              {/* Badges */}
              <div className="flex gap-2 flex-wrap">
                {h.isGovernment && (
                  <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">
                    🏛 Government
                  </span>
                )}
                {h.hasEmergency && (
                  <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-700">
                    🚨 Emergency
                  </span>
                )}
              </div>
            </div>

            {/* Specialties */}
            <p className="text-xs text-muted-foreground mt-2">
              Specialties: {h.specialties.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalSelector;
