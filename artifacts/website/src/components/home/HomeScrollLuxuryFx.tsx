"use client";

import { useEffect } from "react";

export default function HomeScrollLuxuryFx() {
  useEffect(() => {
    const root = document.documentElement;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section")
    );
    const taggedNodes = new Set<HTMLElement>();

    const canAnimateNode = (node: HTMLElement) => {
      if (taggedNodes.has(node)) return false;
      if (node.closest("[data-luxury-skip='true']")) return false;
      if (node.style.transform || node.style.opacity) return false;
      if (node.childElementCount > 12) return false;
      return true;
    };

    const markNodes = (
      scope: HTMLElement,
      selector: string,
      className: string,
      limit: number,
      offset = 0
    ) => {
      let order = offset;
      scope.querySelectorAll<HTMLElement>(selector).forEach((node) => {
        if (order >= limit) return;
        if (!canAnimateNode(node)) return;
        node.classList.add(className);
        node.style.setProperty("--luxury-order", String(order));
        taggedNodes.add(node);
        order += 1;
      });
    };

    sections.forEach((section, index) => {
      section.classList.add("luxury-section");
      section.style.setProperty("--section-index", String(index));

      markNodes(section, "h1, h2, h3", "luxury-target-heading", 6);
      markNodes(section, "p", "luxury-target-copy", 8, 1);
      markNodes(section, "img, video", "luxury-target-media", 6, 2);
      markNodes(
        section,
        "[class*='grid'] > *, [class*='columns'] > *, ul > li",
        "luxury-target-item",
        12,
        2
      );
      markNodes(section, "a, button", "luxury-target-action", 6, 3);
    });

    const updateScrollVars = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      root.style.setProperty("--home-scroll-progress", progress.toFixed(4));
      root.style.setProperty("--home-scroll-y", String(window.scrollY));

    };

    updateScrollVars();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateScrollVars();
        ticking = false;
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      sections.forEach((section) => {
        section.classList.remove("luxury-section", "is-inview");
        section.style.removeProperty("--section-index");
      });
      taggedNodes.forEach((node) => {
        node.classList.remove(
          "luxury-target-heading",
          "luxury-target-copy",
          "luxury-target-media",
          "luxury-target-item",
          "luxury-target-action"
        );
        node.style.removeProperty("--luxury-order");
      });
    };
  }, []);

  return (
    <>
      <div className="home-luxury-progress" aria-hidden="true" />
      <div className="home-luxury-orbs" aria-hidden="true" />
    </>
  );
}
