import { useState, useEffect } from "react";
import HospitalSelector from "./HospitalSelector";
import DoctorSelector from "./DoctorSelector";
import PatientForm from "./PatientForm";
import QRCode from "react-qr-code";
import emailjs from "@emailjs/browser";

const AppointmentModal = ({ symptom, onClose }) => {
  const [step, setStep] = useState<
    "hospital" | "doctor" | "slot" | "patient" | "done"
  >("hospital");

  const [hospital, setHospital] = useState<any>(null);
  const [doctor, setDoctor] = useState<any>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [patient, setPatient] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false); // ✅ NEW

  // 🔒 Disable background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // ----------------------------------
  // 🔥 SAFE BOOKING + EMAIL (NON-BLOCKING)
  // ----------------------------------
  const handlePatientSubmit = async (data: any) => {
    setLoading(true);
    setPatient(data);

    // ⏱️ Simulate booking
    setTimeout(async () => {
      const generatedToken =
        "APT-" + Math.floor(100000 + Math.random() * 900000);

      setToken(generatedToken);
      setStep("done");
      setLoading(false);

      // 📧 SEND EMAIL (ASYNC, NO UI BLOCK)
      try {
        await emailjs.send(
          "YOUR_SERVICE_ID",
          "YOUR_TEMPLATE_ID",
          {
            patient_name: data.name,
            patient_email: data.email,
            hospital: hospital.name,
            doctor: doctor.name,
            slot,
            token: generatedToken,
          },
          "YOUR_PUBLIC_KEY"
        );

        setEmailSent(true);
      } catch (err) {
        console.error("Email failed", err);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* MODAL */}
      <div className="relative bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-6 z-10">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* STEP 1 */}
        {step === "hospital" && (
          <HospitalSelector
            symptom={symptom}
            onSelect={h => {
              setHospital(h);
              setStep("doctor");
            }}
          />
        )}

        {/* STEP 2 */}
        {step === "doctor" && hospital && (
          <DoctorSelector
            hospital={hospital}
            onSelect={doc => {
              setDoctor(doc);
              setStep("slot");
            }}
          />
        )}

        {/* STEP 3 */}
        {step === "slot" && doctor && (
          <div>
            <h2 className="text-xl font-bold mb-4">Select Time Slot</h2>
            <div className="space-y-3">
              {doctor.slots.map((s: string) => (
                <button
                  key={s}
                  onClick={() => {
                    setSlot(s);
                    setStep("patient");
                  }}
                  className="w-full border rounded p-3 hover:bg-green-50"
                >
                  ⏰ {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === "patient" && (
          <>
            <PatientForm onSubmit={handlePatientSubmit} />
            {loading && (
              <p className="text-center mt-4 text-sm text-muted-foreground">
                Booking appointment…
              </p>
            )}
          </>
        )}

        {/* STEP 5 */}
        {step === "done" && token && patient && (
          <div className="space-y-5">

            {/* SUCCESS BAR */}
            <div className="bg-green-100 text-green-800 p-3 rounded-md text-center font-semibold">
              ✅ Appointment Confirmed
              {emailSent && " — Email Sent Successfully"}
            </div>

            {/* TICKET */}
            <div className="border-2 border-dashed rounded-xl p-6 space-y-4">
              <h2 className="text-xl font-bold text-center text-green-700">
                🏥 Appointment Ticket
              </h2>

              <div>
                <p><strong>Name:</strong> {patient.name}</p>
                <p><strong>Age:</strong> {patient.age}</p>
                <p><strong>Phone:</strong> {patient.phone}</p>
                <p><strong>Email:</strong> {patient.email}</p>
              </div>

              <hr />

              <div>
                <p><strong>Hospital:</strong> {hospital.name}</p>
                <p><strong>Doctor:</strong> {doctor.name}</p>
                <p><strong>Time Slot:</strong> {slot}</p>
              </div>

              <hr />

              <div className="text-center space-y-3">
                <p className="text-lg font-bold">🎫 TOKEN: {token}</p>
                <div className="flex justify-center">
                  <QRCode value={token} size={140} />
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full p-3 bg-blue-600 text-white rounded-md"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentModal;
