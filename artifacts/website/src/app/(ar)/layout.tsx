import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ar } from "@/lib/content/ar";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "طريق القيصر للسياحة والسفر",
    template: "%s | طريق القيصر",
  },
  description:
    "طريق القيصر للسياحة والسفر — رفيقك الموثوق في رحلات لا تُنسى حول العالم",
};

export default function ArabicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} bg-background text-text-primary flex flex-col min-h-screen antialiased`}>
        <Header
          locale="ar"
          siteName={ar.siteNameShort}
          siteTagline={ar.siteTagline}
          nav={ar.nav}
        />
        <main className="flex-1">{children}</main>
        <Footer
          locale="ar"
          siteName={ar.siteName}
          nav={ar.nav}
          footer={ar.footer}
          branches={ar.pages.branches.branches}
        />
      </body>
    </html>
  );
}
