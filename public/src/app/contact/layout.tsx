import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start a Consultation — House of Shakya",
  description:
    "Book a premium interior or construction consultation with House of Shakya. Hospitality and luxury residential projects across Nepal.",
  openGraph: {
    title: "Start a Consultation — House of Shakya",
    description: "Tell us about your project. We respond within one business day.",
  },
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
