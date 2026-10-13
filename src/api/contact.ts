// Contact form — POST /api/v1/contact (x-www-form-urlencoded)
import { apiPost } from "./client";

export type ContactPayload = {
  full_name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  website: string; // honeypot: must stay empty
};

export type ContactResult = { received: boolean; id: number; message: string };

export async function sendContact(payload: ContactPayload): Promise<ContactResult> {
  const json = await apiPost<{ data: ContactResult }>("/api/v1/contact", payload);
  return json.data;
}
