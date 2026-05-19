import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "See Blockchain",
  description: "Learn blockchain by watching it happen.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
