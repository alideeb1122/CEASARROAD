import type { Metadata } from "next";
import { en } from "@/lib/content/en";
import BranchCard from "@/components/branches/BranchCard";

export const metadata: Metadata = { title: "Our Branches" };

export default function EnglishBranchesPage() {
  const p = en.pages.branches;
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

      <section className="bg-background section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {p.branches.map((branch, i) => (
              <BranchCard
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
    </>
  );
}
