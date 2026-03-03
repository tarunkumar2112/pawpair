import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { PWAInstaller } from "@/components/pwa-installer";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "PawPair - Pet Care, Perfectly Matched",
  description: "Compatibility-based dog care, starting local and built thoughtfully.",
  applicationName: "PawPair",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PawPair",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "PawPair",
    title: "PawPair - Pet Care, Perfectly Matched",
    description: "Compatibility-based dog care, starting local and built thoughtfully.",
  },
  twitter: {
    card: "summary",
    title: "PawPair - Pet Care, Perfectly Matched",
    description: "Compatibility-based dog care, starting local and built thoughtfully.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <PWAInstaller />
        </ThemeProvider>
      </body>
    </html>
  );
}
