import QRCode from "react-qr-code";

const AppointmentTicket = ({ appointment }: { appointment: any }) => {
  const { patient, hospital, doctor, slot, token } = appointment;

  return (
    <div className="border-2 border-dashed rounded-xl p-6 bg-white shadow-md space-y-4">

      {/* HEADER */}
      <div className="text-center border-b pb-3">
        <h2 className="text-2xl font-bold text-green-700">
          🏥 Appointment Ticket
        </h2>
        <p className="text-sm text-muted-foreground">
          Please show this token at the hospital
        </p>
      </div>

      {/* PATIENT */}
      <div className="space-y-1">
        <p><strong>Patient:</strong> {patient.name}</p>
        <p><strong>Age:</strong> {patient.age}</p>
        <p><strong>Phone:</strong> {patient.phone}</p>
        <p><strong>Email:</strong> {patient.email}</p>
      </div>

      {/* APPOINTMENT */}
      <div className="space-y-1 border-t pt-3">
        <p><strong>Hospital:</strong> {hospital.name}</p>
        <p><strong>Doctor:</strong> {doctor.name}</p>
        <p><strong>Time Slot:</strong> {slot}</p>
      </div>

      {/* TOKEN */}
      <div className="border-t pt-4 text-center space-y-3">
        <p className="text-lg font-bold tracking-widest">
          🎫 TOKEN: {token}
        </p>

        <div className="flex justify-center">
          <QRCode value={token} size={140} />
        </div>
      </div>

    </div>
  );
};

export default AppointmentTicket;
