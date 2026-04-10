import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Who We Are",
  description: "Learn about BRO Forum — our mission, values, leadership team, and the story behind Chennai's premier business referral organisation.",
};

export default function WhoWeAreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
