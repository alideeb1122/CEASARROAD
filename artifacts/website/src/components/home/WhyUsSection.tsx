import SectionHeading from "./SectionHeading";
import { getServiceIcon } from "./Icons";

interface WhyPoint {
  icon: string;
  title: string;
  desc: string;
}

interface WhyUsSectionProps {
  label: string;
  title: string;
  subtitle: string;
  points: WhyPoint[];
}

export default function WhyUsSection({
  label,
  title,
  subtitle,
  points,
}: WhyUsSectionProps) {
  return (
    <section className="bg-surface section-padding">
      <div className="container-custom">
        <SectionHeading label={label} title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {points.map((point, i) => (
            <div
              key={i}
              className="flex gap-5 p-6 bg-white rounded-2xl border border-gray-100 hover:border-brand-cta/20 hover:shadow-md transition-all duration-300"
            >
              {/* Icon circle */}
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-bg flex items-center justify-center">
                {getServiceIcon(point.icon, "w-6 h-6 text-brand-cta")}
              </div>

              {/* Text */}
              <div>
                <h3 className="font-bold text-text-primary mb-1.5">
                  {point.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {point.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
