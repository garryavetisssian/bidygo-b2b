"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type AsTag = "div" | "section" | "article" | "aside" | "li" | "ul" | "ol" | "span" | "header" | "footer";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: AsTag;
  /** Trigger threshold (0..1). Default 0.12. */
  threshold?: number;
  /** Stagger children by this many ms each. If set, every direct child gets its own delay. */
  staggerChildren?: number;
}

/**
 * Reveals children as they enter the viewport.
 * Respects prefers-reduced-motion.
 * Use staggerChildren for grids/lists to cascade entrance.
 */
export function ScrollReveal({
  children,
  delay = 0,
  className,
  as = "div",
  threshold = 0.12,
  staggerChildren,
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window !== "undefined" && window.matchMedia) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        setVisible(true);
        return;
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const Comp = as as React.ElementType;

  if (staggerChildren) {
    const arr = React.Children.toArray(children);
    return (
      <Comp ref={ref as React.Ref<HTMLElement>} className={className}>
        {arr.map((child, i) => (
          <div
            key={i}
            className={cn(
              "h-full flex transition-all duration-[750ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
              "[&>*]:w-full [&>*]:h-full",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            )}
            style={{ transitionDelay: visible ? `${delay + i * staggerChildren}ms` : "0ms" }}
          >
            {child}
          </div>
        ))}
      </Comp>
    );
  }

  return (
    <Comp
      ref={ref as React.Ref<HTMLElement>}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={cn(
        "transition-all duration-[750ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
        className
      )}
    >
      {children}
    </Comp>
  );
}
