import { WhatsAppIcon } from "@/components/home/Icons";

interface FinalCtaSectionProps {
  title: string;
  subtitle: string;
  ctaBtn: string;
  whatsapp: string;
}

export default function FinalCtaSection({
  title,
  subtitle,
  ctaBtn,
  whatsapp,
}: FinalCtaSectionProps) {
  return (
    <section className="bg-navy section-padding">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            {title}
          </h2>
          <p className="mt-4 text-white/60 text-base lg:text-lg leading-relaxed">
            {subtitle}
          </p>
          <div className="mt-8">
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-[#1fba58] transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="w-6 h-6" />
              {ctaBtn}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
