import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
};

const values = [
  {
    title: "Quality First",
    description:
      "We never cut corners. Every line of code, every pixel — done right.",
    icon: "⭐",
  },
  {
    title: "Transparency",
    description:
      "Open communication at every stage. You always know what we're working on.",
    icon: "🔍",
  },
  {
    title: "Speed & Reliability",
    description:
      "We ship fast without sacrificing stability. Your deadlines matter to us.",
    icon: "🚀",
  },
  {
    title: "People First",
    description:
      "Behind every project is a real team that cares about your success.",
    icon: "🤝",
  },
];

const team = [
  { name: "Alex Rivera", role: "CEO & Co-Founder", initials: "AR" },
  { name: "Sam Chen", role: "CTO & Co-Founder", initials: "SC" },
  { name: "Jordan Lee", role: "Head of Design", initials: "JL" },
  { name: "Morgan Blake", role: "Lead Engineer", initials: "MB" },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-dark text-white py-20 lg:py-28">
        <div className="w-full max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            About <span className="text-primary-light">Us</span>
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We&apos;re a team of designers, engineers, and strategists who love
            building products that make a difference.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-dark leading-tight">
              Our Mission
            </h2>
            <p className="mt-5 text-slate-500 text-lg leading-relaxed">
              At Acme Co., we believe that great software changes the world. Our
              mission is to help businesses of all sizes build products that are
              not only beautiful and functional, but genuinely impactful.
            </p>
            <p className="mt-4 text-slate-500 leading-relaxed">
              Since our founding in 2012, we&apos;ve partnered with startups,
              scale-ups, and enterprises across the globe — turning ambitious
              ideas into real, shipped products.
            </p>
            <div className="mt-8">
              <Button href="/contact/">Work with us</Button>
            </div>
          </div>
          <div className="bg-slate-100 rounded-2xl aspect-video lg:aspect-square flex items-center justify-center">
            <span className="text-6xl">🏢</span>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-dark">
            What We Stand For
          </h2>
          <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto">
            These values guide every decision we make.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-white rounded-xl border border-slate-200 p-6 lg:p-8 flex gap-5"
            >
              <span className="text-3xl flex-shrink-0">{v.icon}</span>
              <div>
                <h3 className="font-semibold text-dark text-lg">{v.title}</h3>
                <p className="mt-2 text-slate-500 text-sm leading-relaxed">
                  {v.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-dark">
            Meet the Team
          </h2>
          <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto">
            The people behind the work.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary font-bold text-xl lg:text-2xl">
                {member.initials}
              </div>
              <h3 className="mt-4 font-semibold text-dark text-sm lg:text-base">
                {member.name}
              </h3>
              <p className="text-slate-500 text-xs lg:text-sm mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-dark" tight>
        <div className="text-center text-white">
          <h2 className="text-2xl lg:text-3xl font-bold">
            Want to join the team?
          </h2>
          <p className="mt-3 text-slate-400">
            We&apos;re always looking for great people.
          </p>
          <div className="mt-6">
            <Button href="/contact/" variant="outline">
              Get in Touch
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
