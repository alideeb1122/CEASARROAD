interface Stat {
  value: number;
  suffix: string;
  label: string;
}

interface StatsSectionProps {
  label: string;
  title: string;
  stats: Stat[];
}

export default function StatsSection({ label, title, stats }: StatsSectionProps) {
  return (
    <section className="bg-brand-section section-padding-sm">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-3 bg-white/10 text-brand-cta">
            {label}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-brand-section px-6 py-8 text-center first:rounded-tl-2xl last:rounded-br-2xl"
            >
              {/* Number — data-target enables future count-up JS */}
              <p
                className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums"
                data-stat-value={stat.value}
                data-stat-suffix={stat.suffix}
              >
                <span className="stat-number">{stat.value.toLocaleString()}</span>
                <span className="text-brand-cta">{stat.suffix}</span>
              </p>
              <p className="mt-2 text-sm sm:text-base text-brand-muted font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
