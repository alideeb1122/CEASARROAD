import { WhatsAppIcon } from "./Icons";

interface FinalCtaSectionProps {
  label: string;
  title: string;
  subtitle: string;
  btnText: string;
  whatsappNumber?: string;
}

export default function FinalCtaSection({
  label,
  title,
  subtitle,
  btnText,
  whatsappNumber = "971501234567",
}: FinalCtaSectionProps) {
  return (
    <section className="relative bg-brand-bg overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 start-1/4 w-64 h-64 bg-brand-cta/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 end-1/4 w-80 h-80 bg-brand-section/80 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10 py-20 lg:py-24">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-5 bg-white/10 text-brand-cta">
            {label}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
            {title}
          </h2>
          <p className="text-brand-muted text-base sm:text-lg mb-10 leading-relaxed">
            {subtitle}
          </p>

          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-brand-cta text-brand-bg font-bold rounded-xl hover:bg-brand-cta-hover transition-all duration-200 text-base shadow-xl shadow-brand-cta/25 hover:shadow-brand-cta/35 hover:-translate-y-0.5"
          >
            <WhatsAppIcon className="w-5 h-5" />
            {btnText}
          </a>
        </div>
      </div>
    </section>
  );
}
