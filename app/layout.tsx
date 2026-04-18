import type { Metadata } from "next";
import { Fira_Code, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Vineet Singh — Frontend Engineer",
  description:
    "Frontend Software Engineer with 4.6+ years building scalable React.js & Next.js applications. Based in Gurugram, India.",
  keywords: [
    "Frontend Engineer",
    "React Developer",
    "Next.js Developer",
    "Full-Stack Developer",
    "Vineet Singh",
    "Gurugram",
  ],
  authors: [{ name: "Vineet Singh" }],
  creator: "Vineet Singh",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Vineet Singh — Frontend Engineer",
    description:
      "Frontend Software Engineer with 4.6+ years building scalable React.js & Next.js applications.",
    siteName: "Vineet Singh Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vineet Singh — Frontend Engineer",
    description:
      "Frontend Software Engineer with 4.6+ years building scalable React.js & Next.js applications.",
    creator: "@CypheR_0809",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import ScrollToTop from "./components/ScrollToTop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${firaCode.variable}`}
      style={{
        fontFamily: "var(--font-inter), sans-serif",
      }}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#080010" />
      </head>
      <body className="antialiased">
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
