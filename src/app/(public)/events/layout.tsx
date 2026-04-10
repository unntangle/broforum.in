import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description: "BRO Forum meets every Thursday 8:30–9:30 AM IST in Chennai. View upcoming meetings, register to attend, and see our structured meeting format.",
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
