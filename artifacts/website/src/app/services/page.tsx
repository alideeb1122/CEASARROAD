import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Services",
};

const services = [
  {
    title: "Web Development",
    description:
      "Fast, modern websites and web applications built with the latest technologies. From landing pages to complex SaaS platforms.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: "UI/UX Design",
    description:
      "User interfaces that are both beautiful and intuitive. We design experiences people actually enjoy using.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    title: "Mobile Apps",
    description:
      "Cross-platform mobile applications for iOS and Android. Native performance, one codebase.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Cloud & DevOps",
    description:
      "Reliable infrastructure, automated deployments, and scalable cloud architecture. Ship with confidence.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    title: "Strategy & Consulting",
    description:
      "Get expert guidance before you build. We help you make the right decisions from day one.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Maintenance & Support",
    description:
      "Ongoing support, updates, and monitoring so your product stays healthy and secure long-term.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const process = [
  { step: "01", title: "Discover", description: "We learn about your goals, users, and constraints through a structured kick-off." },
  { step: "02", title: "Design", description: "We sketch, prototype, and validate ideas before a single line of production code is written." },
  { step: "03", title: "Build", description: "Our engineers build with quality, speed, and maintainability as top priorities." },
  { step: "04", title: "Launch", description: "We deploy, monitor, and support your product through a smooth launch and beyond." },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-dark text-white py-20 lg:py-28">
        <div className="w-full max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Our <span className="text-primary-light">Services</span>
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            End-to-end digital services — from strategy and design through
            engineering, deployment, and ongoing support.
          </p>
        </div>
      </section>

      <Section>
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-dark">
            What We Offer
          </h2>
          <p className="mt-4 text-slate-500 text-lg max-w-2xl mx-auto">
            A full range of services to take your product from idea to production.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </Section>

      <Section className="bg-slate-50">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-dark">
            How We Work
          </h2>
          <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto">
            A clear, proven process — no guesswork, no surprises.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((item) => (
            <div
              key={item.step}
              className="bg-white rounded-xl border border-slate-200 p-6 lg:p-8"
            >
              <span className="text-4xl font-extrabold text-primary/20">
                {item.step}
              </span>
              <h3 className="mt-4 font-semibold text-dark text-lg">{item.title}</h3>
              <p className="mt-2 text-slate-500 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-primary">
        <div className="text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Ready to get started?
          </h2>
          <p className="mt-4 text-blue-100 text-lg max-w-xl mx-auto">
            Tell us about your project and we&apos;ll come back with ideas and a plan.
          </p>
          <div className="mt-8">
            <Button href="/contact/" size="lg" variant="secondary">
              Contact Us Today
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
