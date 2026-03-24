"use client";

import React from "react";
import { useReveal } from "@/components/home/useReveal";

interface RevealWrapperProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function RevealWrapper({ children, delay = 0, className }: RevealWrapperProps) {
  const { ref, visible } = useReveal(0.1);

  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
