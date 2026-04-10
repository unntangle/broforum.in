import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join BRO Forum",
  description: "Apply for BRO Forum membership. One exclusive seat per business category. Start receiving qualified referrals every Thursday in Chennai.",
};

export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
