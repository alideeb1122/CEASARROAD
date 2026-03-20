interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tight?: boolean;
}

export default function Section({ children, className = "", id, tight }: SectionProps) {
  return (
    <section
      id={id}
      className={`${tight ? "py-12 lg:py-16" : "py-16 lg:py-24"} ${className}`}
    >
      <div className="w-full max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
