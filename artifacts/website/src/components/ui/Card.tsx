interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function Card({ title, description, icon, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 p-6 lg:p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${className}`}
    >
      {icon && (
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 text-primary">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-dark mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
