import { useState } from "react";

const PatientForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      age: Number(age),
      phone,
      email,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Patient Details</h2>

      <input
        required
        placeholder="Full Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="w-full p-3 border rounded"
      />

      <input
        required
        type="number"
        placeholder="Age"
        value={age}
        onChange={e => setAge(e.target.value)}
        className="w-full p-3 border rounded"
      />

      <input
        required
        placeholder="Phone Number"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        className="w-full p-3 border rounded"
      />

      <input
        required
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full p-3 border rounded"
      />

      <button
        type="submit"
        className="w-full p-3 bg-green-600 text-white rounded font-semibold"
      >
        Confirm & Book Appointment
      </button>
    </form>
  );
};

export default PatientForm;
