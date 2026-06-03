"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type IntroPhase = "enter" | "exit" | "done";

interface HomepageIntroProps {
  children: React.ReactNode;
  kicker: string;
  title: string;
}

const ENTER_MS = 1650;
const EXIT_MS = 950;

export default function HomepageIntro({
  children,
  kicker,
  title,
}: HomepageIntroProps) {
  const [phase, setPhase] = useState<IntroPhase>("enter");

  const reduceMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (phase === "done") {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const exitDelay = window.setTimeout(
      () => setPhase("exit"),
      reduceMotion ? 240 : ENTER_MS,
    );
    const doneDelay = window.setTimeout(
      () => setPhase("done"),
      reduceMotion ? 480 : ENTER_MS + EXIT_MS,
    );

    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(exitDelay);
      window.clearTimeout(doneDelay);
    };
  }, [phase, reduceMotion]);

  const introActive = phase !== "done";
  const isExiting = phase === "exit";

  return (
    <>
      <div
        aria-hidden={introActive ? "true" : "false"}
        className={`homepage-intro-shell ${introActive ? "is-locked" : "is-ready"} ${isExiting ? "is-exiting" : ""}`}
      >
        {children}
      </div>

      {introActive ? (
        <div
          aria-hidden="true"
          className={`homepage-intro-overlay ${isExiting ? "is-exiting" : ""}`}
        >
          <div className="homepage-intro-noise" />
          <div className="homepage-intro-aurora homepage-intro-aurora-a" />
          <div className="homepage-intro-aurora homepage-intro-aurora-b" />
          <div className="homepage-intro-grid" />

          <div className="homepage-intro-center">
            <div className={`homepage-intro-mark-wrap ${isExiting ? "is-exiting" : ""}`}>
              <div className="homepage-intro-ribbon homepage-intro-ribbon-gold" />
              <div className="homepage-intro-ribbon homepage-intro-ribbon-blue" />
              <div className="homepage-intro-halo homepage-intro-halo-a" />
              <div className="homepage-intro-halo homepage-intro-halo-b" />
              <div className="homepage-intro-mark-glow" />
              <Image
                src="/branding/logo-caesar-mark.svg"
                alt="Caesar Road"
                width={210}
                height={296}
                priority
                className="homepage-intro-mark"
              />
            </div>

            <div className={`homepage-intro-copy ${isExiting ? "is-exiting" : ""}`}>
              <span className="homepage-intro-kicker">{kicker}</span>
              <span className="homepage-intro-title">{title}</span>
              <span className="homepage-intro-rule" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
