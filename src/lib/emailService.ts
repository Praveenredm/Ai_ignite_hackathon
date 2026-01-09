import emailjs from "@emailjs/browser";

export async function sendTicketEmail({ email, token, data }: any) {
  console.log("📧 Sending email to:", email);
  console.log("📧 Token:", token);
  console.log("📧 Payload:", data);

  return emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      to_email: email,
      patient_name: data.patient.name,
      hospital: data.hospital.name,
      doctor: data.doctor.name,
      slot: data.slot,
      token: token,
    },
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
}
