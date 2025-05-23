import { Inter as FontSans } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "CollabDocs",
  description: "Your go-to collaborative text editor",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body className={cn(fontSans.variable)}>{children}</body>
    </html>
  );
}
