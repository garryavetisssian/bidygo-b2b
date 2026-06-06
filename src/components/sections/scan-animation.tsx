"use client";

import * as React from "react";
import { Player } from "@remotion/player";
import { ScanComposition } from "@/remotion/scan-composition";

/**
 * Client wrapper around the Remotion composition.
 * Renders the Player immediately — no mount gate.
 *
 * The composition's first frame is fully opaque (sceneFade pinned to 1),
 * so the initial paint already shows the scene; Player's autoPlay then
 * advances frames without waiting for a useEffect-based hydration delay.
 */
export function ScanAnimation({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        width: "100%",
        aspectRatio: "4 / 3",
        position: "relative",
        background:
          "linear-gradient(135deg, oklch(0.974 0.010 75) 0%, oklch(0.946 0.052 60) 55%, oklch(0.895 0.099 55) 100%)",
        borderRadius: "1.5rem",
        overflow: "hidden",
      }}
    >
      <Player
        component={ScanComposition}
        durationInFrames={180}
        fps={30}
        compositionWidth={800}
        compositionHeight={600}
        loop
        autoPlay
        controls={false}
        clickToPlay={false}
        showVolumeControls={false}
        allowFullscreen={false}
        doubleClickToFullscreen={false}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
