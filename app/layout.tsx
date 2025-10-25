import "./globals.css";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

// JetBrains Mono loaded from local files (app/fonts/jetbrains-mono/)
const jetbrainsMono = localFont({
  src: [
    { path: "./fonts/jetbrains-mono/JetBrainsMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/jetbrains-mono/JetBrainsMono-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/jetbrains-mono/JetBrainsMono-Bold.woff2", weight: "700", style: "normal" }
  ],
  variable: "--font-mono",
  display: "swap",
  fallback: ["Courier New", "monospace"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#00ff41",
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://devspace-terminal.vercel.app'),
  title: "Sanjay - DevSpace Terminal",
  description:
    "Full-stack developer specializing in AI/ML integration and educational technology. Creator of Phantom Phisher - an AI-powered phishing awareness platform.",
  keywords: [
    "sanjay",
    "full-stack developer",
    "AI ML developer",
    "phishing awareness",
    "phantom phisher",
    "educational technology",
    "chrome extension",
    "next.js",
    "python",
    "fastapi",
    "google gemini",
    "machine learning",
  ],
  authors: [{ name: "Sanjay", url: "https://github.com/Imperiex-1911" }],
  manifest: "/manifest.json",
  robots: "index, follow",
  openGraph: {
    title: "Sanjay - AI/ML Developer & Creator of Phantom Phisher",
    description:
      "Full-stack developer building AI-powered educational platforms and Chrome extensions.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://devspace-terminal.vercel.app",
    siteName: "Sanjay's Portfolio",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sanjay - Full-Stack Developer & AI/ML Specialist",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanjay - AI/ML Developer",
    description:
      "Creator of Phantom Phisher - AI-powered phishing awareness platform.",
    creator: "@Imperiex_1911",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#00ff41" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} scroll-smooth`}>
      <head>
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="bg-terminal-bg text-terminal-text antialiased min-h-screen flex flex-col overflow-x-hidden">
        <noscript>
          <div className="p-4 bg-terminal-error text-center">
            This site requires JavaScript to function properly. Please enable
            JavaScript in your browser.
          </div>
        </noscript>
        <main className="flex-1" role="main">
          {children}
        </main>
        <footer 
          className="text-center py-6 text-sm opacity-70 border-t border-terminal-accent"
          role="contentinfo"
        >
          © {new Date().getFullYear()} DevSpace Terminal. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
