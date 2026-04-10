import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos and moments from BRO Forum meetings, events, awards, and networking sessions across all our chapters.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
