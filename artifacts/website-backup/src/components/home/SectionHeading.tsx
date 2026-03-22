interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`${centered ? "text-center" : ""} mb-12 lg:mb-16`}>
      {label && (
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4 ${
            light
              ? "bg-white/10 text-brand-cta"
              : "bg-brand-cta/10 text-brand-cta"
          }`}
        >
          {label}
        </span>
      )}
      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight ${
          light ? "text-white" : "text-text-primary"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base lg:text-lg leading-relaxed max-w-2xl ${
            centered ? "mx-auto" : ""
          } ${light ? "text-brand-muted" : "text-text-muted"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
