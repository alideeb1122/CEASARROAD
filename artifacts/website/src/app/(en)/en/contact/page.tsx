import type { Metadata } from "next";
import { en } from "@/lib/content/en";
import { WhatsAppIcon } from "@/components/home/Icons";
import ContactBranchCard from "@/components/contact/ContactBranchCard";
import SocialLinksSection from "@/components/contact/SocialLinksSection";

export const metadata: Metadata = { title: "Contact Us" };

export default function EnglishContactPage() {
  const p = en.pages.contact;
  const branches = en.pages.branches.branches;
  return (
    <>
      <section className="bg-navy text-white py-20 lg:py-28">
        <div className="container-custom text-center">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
            {p.label}
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            {p.title}
          </h1>
          <p className="mt-4 text-white/65 text-lg max-w-2xl mx-auto leading-relaxed">
            {p.subtitle}
          </p>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20 border-b border-gray-100">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-text-muted text-base lg:text-lg leading-relaxed mb-8">
              {p.intro}
            </p>
            <a
              href={`https://wa.me/${p.primaryWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-[#1fba58] transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="w-6 h-6" />
              {p.primaryCta}
            </a>
            <p className="mt-4 text-sm text-text-muted">{p.primaryCtaNote}</p>
          </div>
        </div>
      </section>

      <section className="bg-background section-padding">
        <div className="container-custom">
          <div className="text-center mb-10">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
              {p.branchesLabel}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
              {p.branchSelectNote}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {branches.map((branch, i) => (
              <ContactBranchCard
                key={i}
                branch={branch}
                branchCta={p.branchCta}
                mapCta={p.mapCta}
                hoursLabel={p.hoursLabel}
                offDayLabel={p.offDayLabel}
              />
            ))}
          </div>
        </div>
      </section>

      <SocialLinksSection
        title={p.socialsTitle}
        subtitle={p.socialsSubtitle}
        socials={p.socials}
      />
    </>
  );
}
