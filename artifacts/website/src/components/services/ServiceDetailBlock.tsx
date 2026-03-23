import { getServiceIcon, WhatsAppIcon, CheckCircleIcon } from "@/components/home/Icons";

interface ServiceDetailBlockProps {
  icon: string;
  title: string;
  desc: string;
  detail: string;
  bullets: string[];
  ctaBtn: string;
  whatsapp: string;
  index: number;
}

export default function ServiceDetailBlock({
  icon,
  title,
  desc,
  detail,
  bullets,
  ctaBtn,
  whatsapp,
  index,
}: ServiceDetailBlockProps) {
  const isEven = index % 2 === 0;

  return (
    <section className={isEven ? "bg-white" : "bg-[#F7F6F2]"}>
      <div className="container-custom section-padding">
        <div
          className={`flex flex-col gap-10 lg:gap-16 lg:items-center ${
            isEven ? "lg:flex-row" : "lg:flex-row-reverse"
          }`}
        >
          <div className="flex-shrink-0 flex items-center justify-center lg:w-[340px]">
            <div className="relative w-full max-w-[280px] lg:max-w-none aspect-square rounded-3xl bg-navy/5 border border-navy/8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gold/8 via-transparent to-transparent" />
              <div className="relative flex flex-col items-center gap-5 p-10">
                <div className="w-20 h-20 rounded-2xl bg-navy flex items-center justify-center shadow-lg">
                  <span className="text-gold">
                    {getServiceIcon(icon, "w-10 h-10")}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span className="text-xs text-gold font-semibold">{detail}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary tracking-tight leading-tight">
              {title}
            </h2>
            <p className="mt-4 text-base lg:text-lg text-text-muted leading-relaxed max-w-xl">
              {desc}
            </p>

            <ul className="mt-6 space-y-3">
              {bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                    <CheckCircleIcon className="w-3 h-3 text-gold" />
                  </div>
                  <span className="text-sm lg:text-base text-text-primary leading-snug">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#25D366] text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-md hover:bg-[#1fba58] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="w-4 h-4" />
                {ctaBtn}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
