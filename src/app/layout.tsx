import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/handbook/Sidebar";
import CommandPalette from "@/components/handbook/CommandPalette";
import { Info, Database } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060913",
};

export const metadata: Metadata = {
  title: {
    default: "Planet Engine Handbook",
    template: "%s | Planet Engine Handbook",
  },
  description: "Single Source of Truth and Engineering Operating System for Planet Engine components.",
  metadataBase: new URL("https://planet-engine-handbook.vercel.app"),
  openGraph: {
    title: "Planet Engine Handbook",
    description: "Single Source of Truth and Engineering Operating System for Planet Engine components.",
    url: "https://planet-engine-handbook.vercel.app",
    siteName: "Planet Engine Handbook",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Planet Engine Handbook",
    description: "Single Source of Truth and Engineering Operating System for Planet Engine components.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="h-full bg-background text-foreground flex flex-col md:flex-row overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar />

        {/* Viewport Core */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          {/* Top telemetry bar for desktop */}
          <header className="hidden md:flex items-center justify-between px-8 py-4 border-b border-slate-900 bg-slate-950/40 select-none">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <Database className="h-3.5 w-3.5 text-teal-500" />
                Planet Core System Topology
              </span>
              <span className="h-4 w-[1px] bg-slate-800" />
              <div className="flex items-center gap-1 text-[10px] text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                <Info className="h-3 w-3" />
                <span>Verification Gates Pending</span>
              </div>
            </div>
            <div>
              <CommandPalette />
            </div>
          </header>

          {/* Main scrollable page wrapper */}
          <main className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-thin">
            <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
