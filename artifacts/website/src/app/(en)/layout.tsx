import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { en } from "@/lib/content/en";

export const metadata: Metadata = {
  title: {
    default: "Caesar Road Travel & Tourism",
    template: "%s | Caesar Road",
  },
  description:
    "Caesar Road Travel & Tourism — Your trusted companion for unforgettable journeys around the world",
};

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body className="font-english bg-background text-text-primary flex flex-col min-h-screen antialiased">
        <Header
          locale="en"
          siteName={en.siteNameShort}
          siteTagline={en.siteTagline}
          nav={en.nav}
        />
        <main className="flex-1">{children}</main>
        <Footer
          locale="en"
          siteName={en.siteName}
          nav={en.nav}
          footer={en.footer}
          branches={en.pages.branches.branches}
        />
      </body>
    </html>
  );
}
