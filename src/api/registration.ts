// Event registration — POST /api/v1/events/{id}/registrations (JSON body)
import { apiPostJson } from "./client";

export type RegistrationPayload = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city_id: number | null;
  relationship: string; // "mother" | "father" | "guardian"
  children: { name: string; age: number | null }[];
  adults: { name: string; age: number | null }[];
  // chosen sessions: one per activity (activity id + date + start time)
  sessions: { activity_id: number; date: string; start: string }[];
  website: string; // honeypot: must stay empty
};

export type RegistrationResult = { id?: number; message?: string };

export async function registerForEvent(eventId: number, payload: RegistrationPayload): Promise<RegistrationResult> {
  const json = await apiPostJson<{ data?: RegistrationResult }>(`/api/v1/events/${eventId}/registrations`, payload);
  return json.data ?? {};
}
