import { doctorsByHospital } from "@/lib/doctorData";
import { useState, useEffect } from "react";

const DoctorSelector = ({ hospital, onSelect }) => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);

  useEffect(() => {
    if (!hospital) return;

    // ✅ NORMALIZED KEY (THIS IS THE FIX)
    const key =
      hospital.id && doctorsByHospital[hospital.id]
        ? hospital.id
        : hospital.name;

    console.log("🏥 Hospital object:", hospital);
    console.log("🔑 Doctor lookup key:", key);
    console.log("📚 Available keys:", Object.keys(doctorsByHospital));

    setDoctors(doctorsByHospital[key] || []);
  }, [hospital]);

  return (
    <div className="flex gap-4">
      {/* LEFT */}
      <div className="w-1/2 border rounded-lg p-3 space-y-3">
        <h2 className="font-bold text-lg mb-2">Doctors</h2>

        {doctors.map(doc => (
          <div
            key={doc.id}
            className={`p-3 border rounded cursor-pointer ${
              selectedDoctor?.id === doc.id
                ? "bg-blue-50 border-blue-400"
                : "hover:bg-gray-50"
            }`}
            onClick={() => setSelectedDoctor(doc)}
          >
            <p className="font-semibold">{doc.name}</p>
            <p className="text-sm text-muted-foreground">
              {doc.specialty}
            </p>
          </div>
        ))}

        {doctors.length === 0 && (
          <p className="text-sm text-red-500">
            ❌ No doctors found — hospital & doctor data mismatch
          </p>
        )}
      </div>

      {/* RIGHT */}
      <div className="w-1/2 border rounded-lg p-3">
        <h2 className="font-bold text-lg mb-2">Available Slots</h2>

        {!selectedDoctor && (
          <p className="text-sm text-muted-foreground">
            Select a doctor to view slots
          </p>
        )}

        {selectedDoctor && (
          <div className="space-y-2">
            {selectedDoctor.slots.map(slot => (
              <button
                key={slot}
                onClick={() =>
                  onSelect({
                    doctor: selectedDoctor,
                    slots: selectedDoctor.slots,
                  })
                }
                className="w-full border rounded p-2 hover:bg-green-50"
              >
                ⏰ {slot}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorSelector;
