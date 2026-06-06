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

  // Subtle idle bob + hair sway
  const bob = Math.sin((frame / fps) * 1.6) * 1.6;
  const hairSway = Math.sin((frame / fps) * 1.3) * 1.4;

  const loopFade = interpolate(frame, [durationInFrames - 18, durationInFrames - 1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // === Object-anchored geometry ===
  // Shoebox: translate(360, 365 + boxY), box bottom at local y=140 → absolute y = 505 + boxY.
  const SHOEBOX_BOTTOM = 505 + boxY;
  const SHOEBOX_CX = 490;
  const SHOEBOX_HALF_W = 130;

  // Girl: rendered with `translate(80 ${100 + bob}) scale(1.55)`. Her local feet center
  // is around (40, 205); the scale + translate places it at absolute (~142, ~418 + bob).
  const GIRL_SCALE = 1.55;
  const GIRL_TX = 80;
  const GIRL_TY = 100;
  const GIRL_FEET_Y = GIRL_TY + 205 * GIRL_SCALE + bob;
  const GIRL_CX = GIRL_TX + 40 * GIRL_SCALE;

  // Phone reticle approx local position inside the girl group, settled state.
  // Computed once for the scan-beam origin so the cone actually starts at the phone.
  const PHONE_TIP_X = GIRL_TX + 148 * GIRL_SCALE; // ~309
  const PHONE_TIP_Y = GIRL_TY + 76 * GIRL_SCALE;  // ~218
  const BARCODE_LEFT = 390;
  const BARCODE_RIGHT = 487;
  const BARCODE_TOP = 421 + boxY;
  const BARCODE_BOTTOM = 453 + boxY;

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
          <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
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
            <stop offset="0%" stopColor="oklch(0.348 0.110 34)" />
            <stop offset="100%" stopColor="oklch(0.235 0.045 28)" />
          </linearGradient>
          <linearGradient id="hairHighlight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.554 0.181 38)" />
            <stop offset="100%" stopColor="oklch(0.348 0.110 34)" />
          </linearGradient>
          <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.925 0.030 38)" />
            <stop offset="100%" stopColor="oklch(0.880 0.034 38)" />
          </linearGradient>
          <linearGradient id="legGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.880 0.034 38)" />
            <stop offset="100%" stopColor="oklch(0.770 0.052 36)" />
          </linearGradient>
        </defs>

        {/* ============== SHADOWS (matched to objects) ============== */}
        {/* Shoebox shadow — narrower than the box (since elevated light), aligned to base */}
        <ellipse
          cx={SHOEBOX_CX}
          cy={SHOEBOX_BOTTOM + 6}
          rx={SHOEBOX_HALF_W - 14}
          ry="10"
          fill="oklch(0.155 0.018 36)"
          opacity="0.18"
          filter="url(#softShadow)"
        />
        {/* Girl shadow — sized to her scaled feet span */}
        <ellipse
          cx={GIRL_CX}
          cy={GIRL_FEET_Y + 8}
          rx={42}
          ry="9"
          fill="oklch(0.155 0.018 36)"
          opacity="0.20"
          filter="url(#softShadow)"
        />

        {/* ============== SHOEBOX ============== */}
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
          <g transform="translate(150 58)" fontFamily="system-ui, -apple-system, sans-serif">
            <text x="0" y="0" fontSize="10" fontWeight="800" fill="oklch(0.155 0.018 36)" letterSpacing="0.5">
              STRIDE RUNNER
            </text>
            <text x="0" y="14" fontSize="8" fill="oklch(0.385 0.018 42)">
              Size 38 · Black
            </text>
            <text
              x="0"
              y="42"
              fontSize="18"
              fontWeight="900"
              fill="oklch(0.155 0.018 36)"
              fontFamily="ui-monospace, Menlo, monospace"
              letterSpacing="-0.5"
            >
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

        {/* ============== GIRL — iconic illustration style ============== */}
        <g transform={`translate(${GIRL_TX} ${GIRL_TY + bob}) scale(${GIRL_SCALE})`}>
          {/* === LEGS (slim, side-by-side) === */}
          <rect x="22" y="155" width="13" height="48" rx="6.5" fill="url(#legGrad)" />
          <rect x="45" y="155" width="13" height="48" rx="6.5" fill="url(#legGrad)" />

          {/* === SHOES === */}
          <g>
            {/* Left shoe */}
            <ellipse cx="28" cy="204" rx="14" ry="5" fill="oklch(0.295 0.055 30)" />
            <ellipse cx="28" cy="201" rx="13" ry="4" fill="oklch(0.700 0.196 42)" />
            <ellipse cx="28" cy="200" rx="9" ry="2" fill="oklch(0.880 0.120 85)" opacity="0.7" />
            {/* Right shoe */}
            <ellipse cx="52" cy="206" rx="14" ry="5" fill="oklch(0.295 0.055 30)" />
            <ellipse cx="52" cy="203" rx="13" ry="4" fill="oklch(0.700 0.196 42)" />
            <ellipse cx="52" cy="202" rx="9" ry="2" fill="oklch(0.880 0.120 85)" opacity="0.7" />
          </g>

          {/* === SKIRT (A-line, cream) === */}
          <path
            d="M 12 110 Q 40 102 70 110 L 78 158 Q 40 168 4 158 Z"
            fill="url(#skirtGrad)"
            stroke="oklch(0.295 0.055 30)"
            strokeWidth="0.6"
          />
          {/* Skirt hem accent */}
          <path
            d="M 4 158 Q 40 168 78 158"
            stroke="oklch(0.700 0.196 42)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Waistband */}
          <rect x="14" y="106" width="56" height="6" rx="2" fill="oklch(0.700 0.196 42)" />

          {/* === TOP (orange blouse, tapered, slight curve at waist) === */}
          <path
            d="M 16 56 Q 40 48 64 56 Q 70 84 68 108 Q 40 114 12 108 Q 10 84 16 56 Z"
            fill="url(#topGrad)"
          />
          {/* Top highlight */}
          <path
            d="M 18 62 Q 40 54 62 62"
            stroke="oklch(0.880 0.120 85 / 0.45)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          {/* V-neck collar opening */}
          <path
            d="M 33 53 Q 40 64 47 53 Q 44 66 40 67 Q 36 66 33 53 Z"
            fill="oklch(0.946 0.052 60)"
          />

          {/* === NECK === */}
          <path d="M 34 42 Q 40 48 46 42 L 46 54 Q 40 56 34 54 Z" fill="url(#skinGrad)" />

          {/* === HAIR (back layer, long flowing) === */}
          <g transform={`translate(${hairSway * 0.4} 0)`}>
            <path
              d="M 14 18 Q 4 60 8 138 Q 14 142 22 138 L 28 22 Z"
              fill="url(#hairGrad)"
            />
            <path
              d="M 66 18 Q 76 60 72 138 Q 66 142 58 138 L 52 22 Z"
              fill="url(#hairGrad)"
            />
            {/* Subtle highlight strands */}
            <path
              d="M 18 40 Q 14 80 18 130"
              stroke="url(#hairHighlight)"
              strokeWidth="1.3"
              fill="none"
              opacity="0.55"
            />
            <path
              d="M 62 40 Q 66 80 62 130"
              stroke="url(#hairHighlight)"
              strokeWidth="1.3"
              fill="none"
              opacity="0.55"
            />
          </g>

          {/* === HEAD === */}
          <ellipse cx="40" cy="22" rx="17" ry="19" fill="url(#skinGrad)" />

          {/* Ear hint */}
          <ellipse cx="24" cy="24" rx="2.4" ry="3.5" fill="oklch(0.770 0.052 36)" />

          {/* === HAIR (top — voluminous, side-swept bangs) === */}
          <path
            d="M 22 8 Q 40 -6 60 8 Q 64 18 60 24 Q 58 14 54 12 Q 40 4 26 12 Q 22 14 20 24 Q 18 18 22 8 Z"
            fill="url(#hairGrad)"
          />
          {/* Side-swept bangs across forehead */}
          <path
            d="M 24 12 Q 38 6 54 14 Q 58 18 56 22 Q 44 18 28 24 Q 22 22 24 12 Z"
            fill="oklch(0.235 0.045 28)"
          />
          {/* Stray hair tendril over face */}
          <path
            d="M 30 14 Q 38 20 46 16"
            stroke="oklch(0.180 0.035 26)"
            strokeWidth="0.9"
            fill="none"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* === BLUSH === */}
          <ellipse cx="32" cy="27" rx="3" ry="2" fill="oklch(0.78 0.18 28)" opacity="0.30" />
          <ellipse cx="48" cy="27" rx="3" ry="2" fill="oklch(0.78 0.18 28)" opacity="0.30" />

          {/* === EYEBROWS === */}
          <path
            d="M 34 17 Q 36 15 38 17"
            stroke="oklch(0.180 0.035 26)"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 42 17 Q 44 15 46 17"
            stroke="oklch(0.180 0.035 26)"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />

          {/* === EYES (closed-arc style — sweeter, no eyeball complexity) === */}
          <path
            d="M 34 22 Q 36 25 38 22"
            stroke="oklch(0.155 0.018 36)"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 42 22 Q 44 25 46 22"
            stroke="oklch(0.155 0.018 36)"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
          />
          {/* Tiny lash flicks */}
          <path d="M 34 22 L 33 21" stroke="oklch(0.155 0.018 36)" strokeWidth="0.9" strokeLinecap="round" />
          <path d="M 46 22 L 47 21" stroke="oklch(0.155 0.018 36)" strokeWidth="0.9" strokeLinecap="round" />

          {/* === NOSE (tiny) === */}
          <path
            d="M 40 26 Q 40 29 38 30"
            stroke="oklch(0.770 0.052 36)"
            strokeWidth="0.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.55"
          />

          {/* === MOUTH (small sweet smile) === */}
          <path
            d="M 36 33 Q 40 35 44 33"
            stroke="oklch(0.450 0.149 36)"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
          />
          {/* Hint of upper lip */}
          <path
            d="M 36 33 Q 40 32 44 33"
            stroke="oklch(0.700 0.196 42)"
            strokeWidth="0.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* === EARRINGS === */}
          <circle cx="24" cy="30" r="1.3" fill="oklch(0.880 0.120 85)" />

          {/* === BACK ARM (resting at side) === */}
          <rect
            x="9"
            y="62"
            width="11"
            height="50"
            rx="5.5"
            fill="url(#topGrad)"
            transform="rotate(3 14.5 87)"
          />
          {/* Back hand */}
          <circle cx="16" cy="113" r="5" fill="url(#skinGrad)" />

          {/* === FRONT ARM — extended forward holding phone === */}
          <g
            transform={`translate(60 70) rotate(${phoneRotate + 18})`}
            style={{ opacity: phoneOpacity }}
          >
            {/* Upper arm (orange sleeve) */}
            <rect x="0" y="-2" width="44" height="14" rx="7" fill="url(#topGrad)" />
            {/* Sleeve cuff */}
            <rect x="40" y="-3" width="3" height="16" rx="1" fill="oklch(0.554 0.181 38)" />
            {/* Forearm (skin) */}
            <rect x="42" y="-1" width="42" height="11" rx="5.5" fill="url(#skinGrad)" />
            {/* Wrist line */}
            <path
              d="M 70 -1 L 70 10"
              stroke="oklch(0.700 0.196 42 / 0.5)"
              strokeWidth="0.7"
            />
            {/* Hand cupping phone */}
            <ellipse cx="84" cy="5" rx="10" ry="8" fill="url(#skinGrad)" />
            {/* Thumb */}
            <ellipse
              cx="87"
              cy="0"
              rx="3.4"
              ry="5"
              fill="url(#skinGrad)"
              transform="rotate(22 87 0)"
            />

            {/* PHONE */}
            <g transform={`translate(${66 + phoneTranslateY * 0.2} ${-46 + phoneTranslateY})`}>
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
            opacity={beamOpacity}
            filter="url(#beamGlow)"
          >
            <path
              d={`M ${PHONE_TIP_X - 6} ${PHONE_TIP_Y - 4} L ${PHONE_TIP_X + 8} ${PHONE_TIP_Y + 10} L ${BARCODE_RIGHT} ${BARCODE_BOTTOM} L ${BARCODE_LEFT} ${BARCODE_TOP} Z`}
              fill="oklch(0.700 0.196 42 / 0.18)"
            />
            <rect
              x={BARCODE_LEFT}
              y={BARCODE_TOP + beamProgress * (BARCODE_BOTTOM - BARCODE_TOP)}
              width={BARCODE_RIGHT - BARCODE_LEFT}
              height="3"
              rx="1.5"
              fill="oklch(0.700 0.196 42)"
            />
            <rect
              x={BARCODE_LEFT}
              y={BARCODE_TOP}
              width={BARCODE_RIGHT - BARCODE_LEFT}
              height={beamProgress * (BARCODE_BOTTOM - BARCODE_TOP)}
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
