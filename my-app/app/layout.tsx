import { AudioProvider } from "@/lib/audio-context";
import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "R3F Solar System",
  description: "Interactive 3D Solar System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={orbitron.className}>
        <AudioProvider>{children}</AudioProvider>
      </body>
    </html>
  );
}
