interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  size?: "sm" | "md" | "lg";
}

export default function Section({
  children,
  className = "",
  id,
  size = "md",
}: SectionProps) {
  const padding =
    size === "sm"
      ? "py-10 lg:py-14"
      : size === "lg"
        ? "py-20 lg:py-32"
        : "py-16 lg:py-24";

  return (
    <section id={id} className={`${padding} ${className}`}>
      <div className="container-custom">{children}</div>
    </section>
  );
}
