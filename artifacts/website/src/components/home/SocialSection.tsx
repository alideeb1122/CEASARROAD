import SectionHeading from "./SectionHeading";
import { getSocialIcon } from "./Icons";

const SOCIAL_COLORS: Record<string, string> = {
  whatsapp: "#25D366",
  instagram: "#E1306C",
  facebook: "#1877F2",
  youtube: "#FF0000",
  tiktok: "#010101",
  linkedin: "#0A66C2",
};

interface Social {
  platform: string;
  handle: string;
  url: string;
  type: string;
}

interface SocialSectionProps {
  label: string;
  title: string;
  subtitle: string;
  socials: Social[];
}

export default function SocialSection({
  label,
  title,
  subtitle,
  socials,
}: SocialSectionProps) {
  return (
    <section className="bg-surface section-padding">
      <div className="container-custom">
        <SectionHeading label={label} title={title} subtitle={subtitle} />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {socials.map((social, i) => {
            const color = SOCIAL_COLORS[social.type] ?? "#333";
            return (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ "--hover-color": color } as React.CSSProperties}
              >
                {/* Icon container */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: `${color}15`,
                  }}
                >
                  <span style={{ color }}>
                    {getSocialIcon(social.type, "w-6 h-6")}
                  </span>
                </div>

                {/* Text */}
                <div className="text-center">
                  <p className="text-xs font-bold text-text-primary leading-tight">
                    {social.platform}
                  </p>
                  <p className="text-xs text-text-muted mt-0.5 leading-tight">
                    {social.handle}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
