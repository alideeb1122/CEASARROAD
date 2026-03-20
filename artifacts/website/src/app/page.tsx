import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Home — Modern Solutions",
};

const features = [
  {
    title: "Lightning Fast",
    description:
      "Optimized from day one — every millisecond matters. We deliver products that feel instant.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Fully Responsive",
    description:
      "Pixel-perfect on every screen — mobile, tablet, and desktop. No compromises.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Scalable by Design",
    description:
      "Built to grow with you. Our architecture handles your growth without breaking a sweat.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: "Secure & Reliable",
    description:
      "Security baked in from the ground up. Your users' data is always protected.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Expert Support",
    description:
      "Our team is here when you need us — fast, helpful, and always human.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
  },
  {
    title: "Data-Driven",
    description:
      "We make decisions backed by real analytics — not guesswork. Results you can measure.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

const stats = [
  { value: "200+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "12+", label: "Years of Experience" },
  { value: "40+", label: "Team Members" },
];

export default function HomePage() {
  return (
    <>
      <section className="bg-dark text-white py-20 lg:py-32">
        <div className="w-full max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary-light text-sm font-medium mb-6">
              Trusted by 200+ companies
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Building Tomorrow&apos;s{" "}
              <span className="text-primary-light">Digital</span> Experience
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
              We design and build modern web products that are fast, beautiful,
              and built to last. From idea to launch — we make it happen.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/services/" size="lg">
                Explore Services
              </Button>
              <Button href="/contact/" size="lg" variant="outline">
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Section tight className="bg-slate-50">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl lg:text-4xl font-extrabold text-dark">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-slate-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-dark">
            Why teams choose us
          </h2>
          <p className="mt-4 text-slate-500 text-lg max-w-2xl mx-auto">
            Everything you need to ship great products — in one team.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </Section>

      <Section className="bg-primary">
        <div className="text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Ready to build something great?
          </h2>
          <p className="mt-4 text-blue-100 text-lg max-w-xl mx-auto">
            Let&apos;s talk about your project. We&apos;ll get back to you within 24 hours.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact/" size="lg" variant="secondary">
              Start a Conversation
            </Button>
            <Button href="/about/" size="lg" variant="outline">
              Learn About Us
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
