import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The Bidygo logos are real raster assets shipped from /public/brand/.
 * - bidygo-icon.png — 240×240 square mark
 * - bidygo-wordmark.png — 880×350 horizontal wordmark
 *
 * The `variant` and `showWord` props are kept to preserve existing call sites.
 */
export function LogoMark({
  className,
}: {
  className?: string;
  variant?: "color" | "white" | "ink";
}) {
  return (
    <span className={cn("relative inline-block shrink-0 size-8", className)}>
      <Image
        src="/brand/bidygo-icon.png"
        alt="Bidygo"
        fill
        sizes="40px"
        className="object-contain rounded-[22%]"
        priority
      />
    </span>
  );
}

export function Logo({
  className,
  showWord = true,
}: {
  className?: string;
  variant?: "color" | "white" | "ink";
  showWord?: boolean;
}) {
  if (!showWord) {
    return (
      <span
        aria-label="Bidygo"
        className={cn(
          "inline-flex items-center leading-none transition-transform duration-300 ease-out hover:scale-[1.04]",
          className
        )}
      >
        <LogoMark className="size-8" />
      </span>
    );
  }

  return (
    <span
      aria-label="Bidygo"
      className={cn(
        "inline-flex items-center leading-none transition-transform duration-300 ease-out hover:scale-[1.02]",
        className
      )}
    >
      <Image
        src="/brand/bidygo-wordmark.png"
        alt="Bidygo"
        width={140}
        height={56}
        className="h-7 sm:h-8 w-auto select-none"
        priority
      />
    </span>
  );
}
