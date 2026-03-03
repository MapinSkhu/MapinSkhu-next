"use client";

import { useState, useEffect } from "react";

type Breakpoint = "mobile" | "tablet" | "pc";

function getBreakpoint(): Breakpoint {
  if (typeof window === "undefined") return "pc";
  const width = window.innerWidth;
  if (width < 500) return "mobile";
  if (width < 1024) return "tablet";
  return "pc";
}

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(getBreakpoint);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 499px)");
    const tabletQuery = window.matchMedia(
      "(min-width: 500px) and (max-width: 1023px)"
    );

    const handleChange = () => {
      setBreakpoint(getBreakpoint());
    };

    mobileQuery.addEventListener("change", handleChange);
    tabletQuery.addEventListener("change", handleChange);

    return () => {
      mobileQuery.removeEventListener("change", handleChange);
      tabletQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return breakpoint;
}
