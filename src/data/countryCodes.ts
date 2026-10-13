// Dial codes for the phone selector. Add more rows here when needed.
export type CountryCode = { iso: string; name: string; dial: string };

export const countryCodes: CountryCode[] = [
  { iso: "AE", name: "United Arab Emirates", dial: "971" },
  { iso: "OM", name: "Oman", dial: "968" },
  { iso: "SA", name: "Saudi Arabia", dial: "966" },
  { iso: "QA", name: "Qatar", dial: "974" },
  { iso: "KW", name: "Kuwait", dial: "965" },
  { iso: "BH", name: "Bahrain", dial: "973" },
  { iso: "JO", name: "Jordan", dial: "962" },
  { iso: "LB", name: "Lebanon", dial: "961" },
  { iso: "EG", name: "Egypt", dial: "20" },
  { iso: "PK", name: "Pakistan", dial: "92" },
  { iso: "IN", name: "India", dial: "91" },
  { iso: "LK", name: "Sri Lanka", dial: "94" },
  { iso: "BD", name: "Bangladesh", dial: "880" },
  { iso: "PH", name: "Philippines", dial: "63" },
  { iso: "GB", name: "United Kingdom", dial: "44" },
  { iso: "US", name: "United States / Canada", dial: "1" },
  { iso: "AU", name: "Australia", dial: "61" },
  { iso: "DE", name: "Germany", dial: "49" },
  { iso: "FR", name: "France", dial: "33" },
];
