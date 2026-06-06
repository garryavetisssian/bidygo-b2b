"use client";

import * as React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

/**
 * The Bidygo "scan moment" — a stylised girl scanning the barcode on a
 * shoebox with her phone, then Bidygo answers with an auto-accepted offer.
 *
 * 6 seconds @ 30fps (180 frames), loops smoothly.
 * Pure SVG + CSS, no external assets.
 */
export const ScanComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Start fully visible so the first paint shows even if the player has not
  // advanced a frame yet (e.g. during very-early hydration).
  const sceneFade = 1;

  const boxDrop = spring({ frame, fps, config: { damping: 14, stiffness: 130 } });
  const boxY = interpolate(boxDrop, [0, 1], [-40, 0]);

  const phoneSpring = spring({ frame: frame - 22, fps, config: { damping: 16, stiffness: 140 } });
  const phoneTranslateY = interpolate(phoneSpring, [0, 1], [40, 0]);
  const phoneRotate = interpolate(phoneSpring, [0, 1], [-14, -4]);
  const phoneOpacity = interpolate(frame, [22, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const beamProgress = interpolate(frame, [55, 92], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const beamOpacity = interpolate(frame, [55, 60, 90, 96], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });

  const pingScale = interpolate(frame, [95, 122], [0.4, 2.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const pingOpacity = interpolate(frame, [95, 100, 118, 122], [0, 1, 0.4, 0], {
    extrapolateRight: "clamp",
  });
  const pingScale2 = interpolate(frame, [105, 132], [0.4, 2.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const pingOpacity2 = interpolate(frame, [105, 110, 128, 132], [0, 0.6, 0.25, 0], {
    extrapolateRight: "clamp",
  });

  const cardSpring = spring({ frame: frame - 110, fps, config: { damping: 11, stiffness: 110 } });
  const cardTranslateY = interpolate(cardSpring, [0, 1], [30, 0]);
  const cardScale = interpolate(cardSpring, [0, 1], [0.92, 1]);
  const cardOpacity = interpolate(frame, [110, 122], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Idle micro-motion: hair sway + soft body bob
  const bob = Math.sin((frame / fps) * 1.6) * 1.8;
  const hairSway = Math.sin((frame / fps) * 1.3) * 1.5;

  const loopFade = interpolate(frame, [durationInFrames - 18, durationInFrames - 1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, oklch(0.974 0.010 75) 0%, oklch(0.946 0.052 60) 55%, oklch(0.895 0.099 55) 100%)",
        overflow: "hidden",
        opacity: loopFade,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "60%",
          aspectRatio: "1",
          borderRadius: "50%",
          background: "radial-gradient(closest-side, oklch(0.700 0.196 42 / 0.35), transparent)",
          filter: "blur(48px)",
          top: "-15%",
          right: "-10%",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(oklch(0.155 0.018 36 / 0.10) 1.2px, transparent 1.3px)",
          backgroundSize: "26px 26px",
          opacity: 0.6,
          maskImage: "radial-gradient(60% 60% at 50% 50%, #000 30%, transparent)",
          WebkitMaskImage: "radial-gradient(60% 60% at 50% 50%, #000 30%, transparent)",
        }}
      />

      <svg
        viewBox="0 0 800 600"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <filter id="beamGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="shoeboxTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.890 0.034 38)" />
            <stop offset="100%" stopColor="oklch(0.770 0.052 36)" />
          </linearGradient>
          <linearGradient id="shoeboxSide" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.770 0.052 36)" />
            <stop offset="100%" stopColor="oklch(0.450 0.060 34)" />
          </linearGradient>
          <linearGradient id="phoneScreen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.762 0.176 45)" />
            <stop offset="100%" stopColor="oklch(0.554 0.181 38)" />
          </linearGradient>
          <linearGradient id="topGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.762 0.176 45)" />
            <stop offset="100%" stopColor="oklch(0.638 0.196 40)" />
          </linearGradient>
          <linearGradient id="skirtGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.974 0.010 75)" />
            <stop offset="100%" stopColor="oklch(0.915 0.020 75)" />
          </linearGradient>
          <linearGradient id="hairGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.295 0.055 30)" />
            <stop offset="100%" stopColor="oklch(0.180 0.035 26)" />
          </linearGradient>
          <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.925 0.030 38)" />
            <stop offset="100%" stopColor="oklch(0.880 0.034 38)" />
          </linearGradient>
        </defs>

        <ellipse cx="460" cy="500" rx="240" ry="14" fill="oklch(0.155 0.018 36 / 0.12)" />
        <ellipse cx="270" cy="510" rx="60" ry="6" fill="oklch(0.155 0.018 36 / 0.10)" />

        {/* SHOEBOX */}
        <g transform={`translate(360 ${365 + boxY})`}>
          <rect
            x="0"
            y="20"
            width="260"
            height="120"
            rx="6"
            fill="url(#shoeboxSide)"
            stroke="oklch(0.295 0.055 30)"
            strokeWidth="2"
          />
          <rect
            x="-6"
            y="6"
            width="272"
            height="28"
            rx="6"
            fill="url(#shoeboxTop)"
            stroke="oklch(0.295 0.055 30)"
            strokeWidth="2"
          />
          <rect x="20" y="14" width="100" height="6" rx="3" fill="oklch(0.700 0.196 42)" />
          <rect
            x="22"
            y="48"
            width="110"
            height="78"
            rx="4"
            fill="white"
            stroke="oklch(0.155 0.018 36 / 0.18)"
          />
          <g transform="translate(30 56)">
            {[
              [0, 2], [4, 3], [9, 1], [12, 2], [16, 4], [22, 2], [27, 3], [32, 1],
              [35, 4], [41, 2], [45, 3], [50, 1], [53, 2], [58, 4], [64, 2], [69, 3],
              [74, 1], [78, 2], [83, 3], [88, 1], [92, 2],
            ].map(([x, w], i) => (
              <rect key={i} x={x} y={0} width={w} height={32} fill="oklch(0.155 0.018 36)" />
            ))}
            <text
              x="0"
              y="46"
              fontSize="7"
              fontFamily="ui-monospace, Menlo, monospace"
              fill="oklch(0.295 0.018 40)"
              letterSpacing="0.8"
            >
              5 901234 567890
            </text>
          </g>
          {/* Right meta — price now in high-contrast ink, not red */}
          <g transform="translate(150 58)" fontFamily="system-ui, -apple-system, sans-serif">
            <text x="0" y="0" fontSize="10" fontWeight="800" fill="oklch(0.155 0.018 36)" letterSpacing="0.5">
              STRIDE RUNNER
            </text>
            <text x="0" y="14" fontSize="8" fill="oklch(0.385 0.018 42)">
              Size 38 · Black
            </text>
            <text x="0" y="42" fontSize="18" fontWeight="900" fill="oklch(0.155 0.018 36)" fontFamily="ui-monospace, Menlo, monospace" letterSpacing="-0.5">
              $180
            </text>
            <text x="0" y="56" fontSize="7" fill="oklch(0.385 0.018 42)" fontWeight="700" letterSpacing="0.6">
              LIST PRICE
            </text>
          </g>
          <path
            d="M 200 100 Q 240 85 248 70 L 252 72 Q 246 90 218 110 Z"
            fill="oklch(0.700 0.196 42)"
            opacity="0.85"
          />
          <circle cx="232" cy="92" r="3" fill="white" />
        </g>

        {/* ============== GIRL — refined ============== */}
        <g transform={`translate(160 ${175 + bob})`}>
          {/* Back leg (subtle) */}
          <rect
            x="60"
            y="200"
            width="11"
            height="92"
            rx="5.5"
            fill="url(#skirtGrad)"
            stroke="oklch(0.295 0.055 30)"
            strokeWidth="0.5"
            opacity="0.9"
          />
          {/* Front leg (bent slightly forward) */}
          <path
            d="M 44 200 L 36 240 L 38 290 L 50 290 L 54 245 L 60 202 Z"
            fill="url(#skirtGrad)"
            stroke="oklch(0.295 0.055 30)"
            strokeWidth="0.5"
            opacity="0.95"
          />
          {/* Shoes — clean ballet/sneaker silhouette */}
          <ellipse cx="44" cy="296" rx="18" ry="5" fill="oklch(0.295 0.055 30)" />
          <ellipse cx="44" cy="294" rx="16" ry="3.5" fill="oklch(0.700 0.196 42)" />
          <ellipse cx="44" cy="293" rx="11" ry="2" fill="oklch(0.762 0.176 45)" opacity="0.7" />

          <ellipse cx="74" cy="298" rx="18" ry="5" fill="oklch(0.295 0.055 30)" />
          <ellipse cx="74" cy="296" rx="16" ry="3.5" fill="oklch(0.700 0.196 42)" />
          <ellipse cx="74" cy="295" rx="11" ry="2" fill="oklch(0.762 0.176 45)" opacity="0.7" />

          {/* Skirt (A-line, cream with brand hem) */}
          <path
            d="M 28 165 Q 58 158 100 165 L 110 215 Q 60 225 18 215 Z"
            fill="url(#skirtGrad)"
            stroke="oklch(0.295 0.055 30)"
            strokeWidth="0.5"
          />
          {/* Skirt hem line */}
          <path
            d="M 18 215 Q 60 225 110 215"
            stroke="oklch(0.700 0.196 42)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Skirt waistband */}
          <rect x="34" y="160" width="62" height="6" rx="2" fill="oklch(0.700 0.196 42)" opacity="0.9" />

          {/* Top (orange blouse with subtle taper) */}
          <path
            d="M 38 95 Q 65 84 92 95 Q 98 130 96 162 Q 65 168 34 162 Q 32 130 38 95 Z"
            fill="url(#topGrad)"
          />
          {/* Top highlight */}
          <path
            d="M 40 100 Q 65 90 90 100"
            stroke="oklch(0.880 0.120 85 / 0.40)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          {/* V-neck collar */}
          <path
            d="M 56 90 Q 65 100 74 90 L 74 92 Q 65 102 56 92 Z"
            fill="oklch(0.946 0.052 60)"
          />

          {/* Neck */}
          <path
            d="M 58 78 Q 65 84 72 78 L 72 90 Q 65 92 58 90 Z"
            fill="url(#skinGrad)"
          />

          {/* Long flowing hair — back layer, sways gently */}
          <g transform={`translate(${hairSway * 0.4} 0)`}>
            <path
              d="M 32 50 Q 22 100 28 175 Q 35 178 42 175 L 50 165 L 50 50 Z"
              fill="url(#hairGrad)"
            />
            <path
              d="M 98 50 Q 108 100 102 175 Q 95 178 88 175 L 80 165 L 80 50 Z"
              fill="url(#hairGrad)"
            />
            {/* Hair strand highlights */}
            <path
              d="M 36 70 Q 32 110 35 160"
              stroke="oklch(0.450 0.060 34)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.5"
            />
            <path
              d="M 96 75 Q 102 115 99 165"
              stroke="oklch(0.450 0.060 34)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.5"
            />
          </g>

          {/* Head (smaller, more proportional) */}
          <ellipse cx="65" cy="52" rx="20" ry="22" fill="url(#skinGrad)" />

          {/* Ear */}
          <ellipse cx="46" cy="55" rx="3" ry="5" fill="oklch(0.770 0.052 36)" />
          <ellipse cx="46" cy="56" rx="1.5" ry="2.5" fill="oklch(0.638 0.060 32)" />

          {/* Hair top — side-swept with bangs */}
          <path
            d="M 47 38 Q 48 30 56 26 Q 65 18 76 24 Q 84 28 86 38 Q 86 32 80 30 Q 65 22 50 30 Q 47 34 47 38 Z"
            fill="url(#hairGrad)"
          />
          {/* Side-swept bangs across forehead */}
          <path
            d="M 50 35 Q 60 28 78 32 Q 85 34 84 42 Q 70 40 50 44 Z"
            fill="oklch(0.180 0.035 26)"
          />
          {/* Stray strand */}
          <path
            d="M 55 32 Q 62 38 70 35"
            stroke="oklch(0.450 0.060 34)"
            strokeWidth="0.8"
            fill="none"
            opacity="0.7"
          />

          {/* Subtle blush */}
          <ellipse cx="55" cy="58" rx="4" ry="2.4" fill="oklch(0.78 0.18 28)" opacity="0.32" />
          <ellipse cx="76" cy="58" rx="4" ry="2.4" fill="oklch(0.78 0.18 28)" opacity="0.32" />

          {/* Eyebrows — thin, arched */}
          <path
            d="M 56 43 Q 60 41 64 43"
            stroke="oklch(0.180 0.035 26)"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 70 43 Q 74 41 78 43"
            stroke="oklch(0.180 0.035 26)"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
          />

          {/* Eyes — almond shape with whites */}
          <ellipse cx="60" cy="48" rx="2.8" ry="2.4" fill="white" />
          <ellipse cx="74" cy="48" rx="2.8" ry="2.4" fill="white" />
          {/* Irises */}
          <circle cx="60" cy="48.4" r="1.8" fill="oklch(0.295 0.055 30)" />
          <circle cx="74" cy="48.4" r="1.8" fill="oklch(0.295 0.055 30)" />
          {/* Pupils */}
          <circle cx="60.3" cy="48.6" r="0.9" fill="oklch(0.155 0.018 36)" />
          <circle cx="74.3" cy="48.6" r="0.9" fill="oklch(0.155 0.018 36)" />
          {/* Eye highlights */}
          <circle cx="61" cy="47.5" r="0.6" fill="white" />
          <circle cx="75" cy="47.5" r="0.6" fill="white" />

          {/* Eyelashes — top corners, suggestive */}
          <path d="M 57 46 Q 56 44.5 56 44" stroke="oklch(0.155 0.018 36)" strokeWidth="0.9" strokeLinecap="round" fill="none" />
          <path d="M 58.5 45.5 L 58 44" stroke="oklch(0.155 0.018 36)" strokeWidth="0.9" strokeLinecap="round" fill="none" />
          <path d="M 60 45.4 L 60 44" stroke="oklch(0.155 0.018 36)" strokeWidth="0.9" strokeLinecap="round" fill="none" />
          <path d="M 61.5 45.5 L 62 44" stroke="oklch(0.155 0.018 36)" strokeWidth="0.9" strokeLinecap="round" fill="none" />

          <path d="M 71 46 Q 70 44.5 70 44" stroke="oklch(0.155 0.018 36)" strokeWidth="0.9" strokeLinecap="round" fill="none" />
          <path d="M 72.5 45.5 L 72 44" stroke="oklch(0.155 0.018 36)" strokeWidth="0.9" strokeLinecap="round" fill="none" />
          <path d="M 74 45.4 L 74 44" stroke="oklch(0.155 0.018 36)" strokeWidth="0.9" strokeLinecap="round" fill="none" />
          <path d="M 75.5 45.5 L 76 44" stroke="oklch(0.155 0.018 36)" strokeWidth="0.9" strokeLinecap="round" fill="none" />

          {/* Nose (subtle) */}
          <path
            d="M 67 53 Q 67 56 65 57"
            stroke="oklch(0.770 0.052 36)"
            strokeWidth="0.9"
            fill="none"
            strokeLinecap="round"
            opacity="0.55"
          />

          {/* Lips — full, brand-tinted */}
          <path
            d="M 61 62 Q 67 64.5 73 62 Q 71 66 67 66 Q 63 66 61 62 Z"
            fill="oklch(0.700 0.196 42)"
            opacity="0.85"
          />
          <path
            d="M 61 62 Q 67 63 73 62"
            stroke="oklch(0.450 0.149 36)"
            strokeWidth="0.5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Lip highlight */}
          <path
            d="M 65 63.5 Q 67 64.5 69 63.5"
            stroke="white"
            strokeWidth="0.4"
            fill="none"
            opacity="0.6"
          />

          {/* Small earrings */}
          <circle cx="46" cy="62" r="1.2" fill="oklch(0.880 0.120 85)" />
          <circle cx="84" cy="62" r="1.2" fill="oklch(0.880 0.120 85)" />

          {/* Back arm (resting at side) */}
          <rect
            x="22"
            y="100"
            width="11"
            height="55"
            rx="5.5"
            fill="url(#topGrad)"
            transform="rotate(4 27.5 130)"
          />
          {/* Back hand */}
          <circle cx="29" cy="158" r="5" fill="url(#skinGrad)" />

          {/* FRONT ARM — extended forward, refined */}
          <g
            transform={`translate(94 108) rotate(${phoneRotate + 24})`}
            style={{ opacity: phoneOpacity }}
          >
            {/* Upper arm */}
            <rect x="0" y="-2" width="48" height="14" rx="7" fill="url(#topGrad)" />
            {/* Forearm (skin) */}
            <rect x="38" y="-1" width="42" height="11" rx="5.5" fill="url(#skinGrad)" />
            {/* Wrist accent (subtle bracelet line) */}
            <path
              d="M 65 -1 L 65 10"
              stroke="oklch(0.700 0.196 42)"
              strokeWidth="0.8"
              opacity="0.6"
            />
            {/* Hand cupping the phone */}
            <ellipse cx="80" cy="6" rx="10" ry="8" fill="url(#skinGrad)" />
            {/* Thumb */}
            <ellipse cx="84" cy="2" rx="3" ry="5" fill="url(#skinGrad)" transform="rotate(20 84 2)" />

            {/* PHONE */}
            <g transform={`translate(${64 + phoneTranslateY * 0.2} ${-44 + phoneTranslateY})`}>
              <rect
                x="0"
                y="0"
                width="42"
                height="68"
                rx="7"
                fill="oklch(0.155 0.018 36)"
                stroke="oklch(0.295 0.018 40)"
                strokeWidth="1"
              />
              <rect x="3" y="6" width="36" height="50" rx="3" fill="url(#phoneScreen)" />
              <path d="M 8 14 L 8 11 L 11 11" stroke="white" strokeWidth="1.4" fill="none" />
              <path d="M 31 11 L 34 11 L 34 14" stroke="white" strokeWidth="1.4" fill="none" />
              <path d="M 8 47 L 8 50 L 11 50" stroke="white" strokeWidth="1.4" fill="none" />
              <path d="M 31 50 L 34 50 L 34 47" stroke="white" strokeWidth="1.4" fill="none" />
              <circle cx="21" cy="30" r="4" fill="none" stroke="white" strokeWidth="1.4" opacity="0.9" />
              <rect x="15" y="60" width="12" height="2" rx="1" fill="oklch(0.295 0.018 40)" />
              <rect x="16" y="3" width="10" height="1.5" rx="0.75" fill="oklch(0.295 0.018 40)" />
            </g>
          </g>
        </g>

        {/* SCAN BEAM */}
        {beamOpacity > 0 && (
          <g
            transform={`translate(390 ${412 + boxY})`}
            opacity={beamOpacity}
            filter="url(#beamGlow)"
          >
            <path
              d={`M -130 -110 L -100 -100 L 110 32 L 110 ${32 + 34} L -100 -90 Z`}
              fill="oklch(0.700 0.196 42 / 0.18)"
            />
            <rect
              x="0"
              y={beamProgress * 32}
              width="100"
              height="3"
              rx="1.5"
              fill="oklch(0.700 0.196 42)"
            />
            <rect
              x="0"
              y="0"
              width="100"
              height={beamProgress * 32}
              fill="oklch(0.700 0.196 42 / 0.22)"
            />
          </g>
        )}

        {/* PINGS */}
        {pingOpacity > 0 && (
          <circle
            cx="490"
            cy={440 + boxY}
            r={26 * pingScale}
            fill="none"
            stroke="oklch(0.755 0.158 165)"
            strokeWidth="3"
            opacity={pingOpacity}
          />
        )}
        {pingOpacity2 > 0 && (
          <circle
            cx="490"
            cy={440 + boxY}
            r={26 * pingScale2}
            fill="none"
            stroke="oklch(0.700 0.196 42)"
            strokeWidth="2"
            opacity={pingOpacity2}
          />
        )}

        {/* LIVE pill top-left */}
        <g transform="translate(40 40)" opacity={sceneFade}>
          <rect width="180" height="32" rx="16" fill="white" stroke="oklch(0.155 0.018 36 / 0.08)" />
          <circle cx="20" cy="16" r="4" fill="oklch(0.755 0.158 165)" />
          <text
            x="34"
            y="21"
            fontSize="11"
            fontWeight="700"
            fill="oklch(0.295 0.018 40)"
            fontFamily="ui-monospace, Menlo, monospace"
            letterSpacing="0.5"
          >
            LIVE · BIDYGO
          </text>
        </g>
      </svg>

      {/* OFFER CARD */}
      <div
        style={{
          position: "absolute",
          right: "6%",
          top: "18%",
          opacity: cardOpacity,
          transform: `translateY(${cardTranslateY}px) scale(${cardScale})`,
          background: "white",
          borderRadius: 18,
          padding: "16px 22px",
          boxShadow:
            "0 26px 50px -12px oklch(0.700 0.196 42 / 0.45), 0 8px 18px oklch(0.155 0.018 36 / 0.10)",
          border: "1px solid oklch(0.700 0.196 42 / 0.20)",
          minWidth: 230,
        }}
      >
        <div
          style={{
            fontSize: 10,
            color: "oklch(0.485 0.018 45)",
            textTransform: "uppercase",
            fontWeight: 800,
            letterSpacing: "0.14em",
            marginBottom: 6,
          }}
        >
          Your offer
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 900,
            color: "oklch(0.155 0.018 36)",
            lineHeight: 1,
            fontFamily: "ui-monospace, Menlo, monospace",
            letterSpacing: "-0.02em",
          }}
        >
          $148
        </div>
        <div
          style={{
            fontSize: 11,
            color: "oklch(0.40 0.12 165)",
            fontWeight: 800,
            marginTop: 8,
            letterSpacing: "0.04em",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "oklch(0.755 0.158 165)",
              color: "white",
              fontSize: 9,
              lineHeight: "14px",
              textAlign: "center",
              fontWeight: 900,
            }}
          >
            ✓
          </span>
          Auto-accepted · 1.2s
        </div>
      </div>
    </AbsoluteFill>
  );
};
