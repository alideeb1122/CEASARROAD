import { MapPinIcon, ClockIcon, ExternalLinkIcon, WhatsAppIcon } from "@/components/home/Icons";

interface Branch {
  city: string;
  country: string;
  address: string;
  mapUrl: string;
  whatsapp: string;
  hours: string;
  offDay: string;
  description: string;
}

interface BranchCardProps {
  branch: Branch;
  branchCta: string;
  mapCta: string;
  hoursLabel: string;
  offDayLabel: string;
}

export default function BranchCard({
  branch,
  branchCta,
  mapCta,
  hoursLabel,
  offDayLabel,
}: BranchCardProps) {
  return (
    <div className="group flex flex-col rounded-2xl border border-gray-100 bg-white overflow-hidden hover:shadow-xl hover:border-gold/30 transition-all duration-300">
      <div className="bg-navy px-6 py-6">
        <h3 className="text-2xl font-extrabold text-white">{branch.city}</h3>
        <p className="text-sm text-white/60 mt-1">{branch.country}</p>
      </div>

      <div className="flex flex-col flex-1 p-6 gap-5">
        <p className="text-sm text-text-muted leading-relaxed">{branch.description}</p>

        <div className="border-t border-gray-100" />

        <a
          href={branch.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-3 text-sm text-text-muted hover:text-gold transition-colors group/link"
        >
          <MapPinIcon className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold" />
          <span className="leading-relaxed flex-1">{branch.address}</span>
          <ExternalLinkIcon className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 opacity-0 group-hover/link:opacity-60 transition-opacity" />
        </a>

        <div className="flex items-start gap-3 text-sm text-text-muted">
          <ClockIcon className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold" />
          <div className="flex-1">
            <span className="text-xs font-semibold text-text-primary uppercase tracking-wide block mb-1">
              {hoursLabel}
            </span>
            <span>{branch.hours}</span>
            <span className="mt-1.5 inline-flex items-center gap-1 text-xs bg-gold/10 text-gold font-medium px-2 py-0.5 rounded-full ms-2">
              {offDayLabel}: {branch.offDay}
            </span>
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex flex-col gap-2.5 pt-1">
          <a
            href={branch.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-gray-200 text-text-primary font-semibold text-sm hover:border-navy hover:text-navy hover:bg-navy/5 transition-all duration-200"
          >
            <MapPinIcon className="w-4 h-4" />
            {mapCta}
          </a>
          <a
            href={`https://wa.me/${branch.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gold/10 text-gold font-semibold text-sm hover:bg-gold hover:text-white border border-gold/20 hover:border-gold transition-all duration-200"
          >
            <WhatsAppIcon className="w-4 h-4" />
            {branchCta}
          </a>
        </div>
      </div>
    </div>
  );
}
