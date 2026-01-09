import { db } from "./firebase";
import { addDoc, collection } from "firebase/firestore";
import { sendTicketEmail } from "./emailService";

export async function bookAppointment(data: any) {
  const token = "APT-" + Math.floor(100000 + Math.random() * 900000);

  try {
    await addDoc(collection(db, "appointments"), {
      ...data,
      token,
      createdAt: new Date(),
    });
  } catch (e) {
    console.warn("Firebase failed, continuing UX");
  }

  // 🔥 THIS LINE MUST EXECUTE
  await sendTicketEmail({
    email: data.patient.email,
    token,
    data,
  });

  return token;
}
