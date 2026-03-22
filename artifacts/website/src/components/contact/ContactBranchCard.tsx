import { MapPinIcon, ClockIcon, WhatsAppIcon, ExternalLinkIcon } from "@/components/home/Icons";

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

interface ContactBranchCardProps {
  branch: Branch;
  branchCta: string;
  mapCta: string;
  hoursLabel: string;
  offDayLabel: string;
}

export default function ContactBranchCard({
  branch,
  branchCta,
  mapCta,
  hoursLabel,
  offDayLabel,
}: ContactBranchCardProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-100 bg-white overflow-hidden hover:shadow-lg hover:border-gold/30 transition-all duration-300">
      <div className="bg-navy px-5 py-4">
        <h3 className="text-lg font-bold text-white">{branch.city}</h3>
        <p className="text-xs text-white/55 mt-0.5">{branch.country}</p>
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3.5">
        <a
          href={branch.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-2.5 text-sm text-text-muted hover:text-gold transition-colors group/link"
        >
          <MapPinIcon className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold" />
          <span className="leading-snug flex-1">{branch.address}</span>
          <ExternalLinkIcon className="w-3 h-3 mt-0.5 flex-shrink-0 opacity-0 group-hover/link:opacity-50 transition-opacity" />
        </a>

        <div className="flex items-start gap-2.5 text-sm text-text-muted">
          <ClockIcon className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold" />
          <div>
            <span className="text-xs font-semibold text-text-primary uppercase tracking-wide block mb-0.5">
              {hoursLabel}
            </span>
            <span className="text-xs">{branch.hours}</span>
            <span className="mt-1 text-xs block text-gold/80 font-medium">
              {offDayLabel}: {branch.offDay}
            </span>
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex gap-2 pt-1">
          <a
            href={branch.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-gray-200 text-text-primary font-medium text-xs hover:border-navy hover:text-navy hover:bg-navy/5 transition-all duration-200"
          >
            <MapPinIcon className="w-3.5 h-3.5" />
            {mapCta}
          </a>
          <a
            href={`https://wa.me/${branch.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gold/10 text-gold font-medium text-xs hover:bg-gold hover:text-white border border-gold/20 hover:border-gold transition-all duration-200"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            {branchCta}
          </a>
        </div>
      </div>
    </div>
  );
}
