import { getServiceIcon, WhatsAppIcon, CheckCircleIcon } from "@/components/home/Icons";

interface ServiceCardProps {
  icon: string;
  title: string;
  desc: string;
  detail: string;
  ctaBtn: string;
  whatsapp: string;
}

export default function ServiceCard({
  icon,
  title,
  desc,
  detail,
  ctaBtn,
  whatsapp,
}: ServiceCardProps) {
  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-gray-100 hover:border-gold/30 hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="p-6 pb-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-navy/5 group-hover:bg-gold/10 transition-colors duration-300 mb-5">
          <span className="text-navy group-hover:text-gold transition-colors duration-300">
            {getServiceIcon(icon, "w-6 h-6")}
          </span>
        </div>

        <h3 className="text-xl font-bold text-text-primary mb-3">{title}</h3>
        <p className="text-sm text-text-muted leading-relaxed">{desc}</p>

        <div className="flex items-center gap-2 mt-4">
          <CheckCircleIcon className="w-3.5 h-3.5 text-gold flex-shrink-0" />
          <span className="text-xs text-gold font-medium">{detail}</span>
        </div>
      </div>

      <div className="p-6 pt-4 mt-auto">
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gold/10 text-gold font-semibold text-sm hover:bg-gold hover:text-white border border-gold/20 hover:border-gold transition-all duration-200"
        >
          <WhatsAppIcon className="w-4 h-4" />
          {ctaBtn}
        </a>
      </div>
    </div>
  );
}
