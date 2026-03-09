import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DermaAI — AI-Powered Skin Health Assistant",
  description:
    "DermaAI analyzes skin conditions, provides personalized skincare guidance, and helps you track your skin progress over time using AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
