"use client";

interface AnimatedWordsProps {
  text: string;
  visible: boolean;
  baseDelay?: number;
  step?: number;
  className?: string;
}

export default function AnimatedWords({
  text,
  visible,
  baseDelay = 0,
  step = 70,
  className,
}: AnimatedWordsProps) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block will-change-transform"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
            transition:
              "opacity 0.62s cubic-bezier(0.16,1,0.3,1), transform 0.62s cubic-bezier(0.16,1,0.3,1)",
            transitionDelay: `${baseDelay + index * step}ms`,
          }}
        >
          {word}
          {index < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}
