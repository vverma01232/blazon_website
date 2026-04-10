import React from "react";
import { chemicalElements } from "@/data/home-constants";

export const AnimatedDNA = React.memo(() => {
  const offsetRef = React.useRef(0);
  const [offset, setOffset] = React.useState(0);
  const rafRef = React.useRef<number | undefined>(undefined);

  React.useEffect(() => {
    const animate = () => {
      offsetRef.current += 0.02;
      setOffset(offsetRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current!);
  }, []);

  const strandPoints = (flip: boolean) =>
    Array.from({ length: 20 }).map((_, i) => {
      const t = i / 19;
      const x =
        (flip ? 180 : 120) +
        Math.sin(t * Math.PI * 3 + offset) * (flip ? -40 : 40);
      const y = 150 + t * 400;
      return { x, y };
    });

  const strand1 = strandPoints(false);
  const strand2 = strandPoints(true);

  const toPolyline = (pts: { x: number; y: number }[]) =>
    pts.map((p) => `${p.x},${p.y}`).join(" ");

  const getHexPoints = (cx: number, cy: number, r: number, rot: number) =>
    [0, 60, 120, 180, 240, 300].map((angle) => {
      const a = ((angle + rot) * Math.PI) / 180;
      return {
        x: cx + r * Math.cos(a),
        y: cy + r * Math.sin(a),
      };
    });

  return (
    <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none overflow-hidden opacity-60">
      <svg
        viewBox="0 0 600 700"
        className="absolute right-0 top-1/2 -translate-y-1/2 w-full h-full"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* GRID BACKGROUND */}
        <g opacity="0.15">
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={120 + i * 40}
              x2="600"
              y2={120 + i * 40}
              stroke="rgba(255,255,255,0.08)"
            />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={200 + i * 50}
              y1="100"
              x2={200 + i * 50}
              y2="650"
              stroke="rgba(255,255,255,0.05)"
            />
          ))}
        </g>

        {/* BACKGROUND GLOW */}
        <circle
          cx="420"
          cy="250"
          r="220"
          fill="url(#bgGlow)"
          style={{
            transform: `translateY(${Math.sin(offset) * 10}px)`,
          }}
        />

        {/* TOP BENZENE ROTATING */}
        {(() => {
          const rot = offset * 20;
          const pulse = 0.5 + 0.5 * Math.sin(offset * 2);
          const pts = getHexPoints(420, 180, 70, rot);

          return (
            <>
              {pts.map((p, i) => {
                const next = pts[(i + 1) % pts.length];
                return (
                  <line
                    key={i}
                    x1={p.x}
                    y1={p.y}
                    x2={next.x}
                    y2={next.y}
                    stroke={`rgba(192,57,43,${0.4 + pulse * 0.3})`}
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    style={{ strokeDashoffset: offset * 10 }}
                    filter="url(#glow)"
                  />
                );
              })}
              {pts.map((p, i) => (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r={4 + pulse * 2}
                  fill={`rgba(255,80,60,${0.6 + pulse * 0.3})`}
                  filter="url(#glow)"
                />
              ))}
            </>
          );
        })()}

        {/* BOTTOM BENZENE */}
        {(() => {
          const rot = -offset * 15;
          const floatY = Math.sin(offset) * 10;
          const pulse = 0.5 + 0.5 * Math.sin(offset * 2 + Math.PI);
          const pts = getHexPoints(300, 380 + floatY, 55, rot);

          return (
            <>
              {pts.map((p, i) => {
                const next = pts[(i + 1) % pts.length];
                return (
                  <line
                    key={i}
                    x1={p.x}
                    y1={p.y}
                    x2={next.x}
                    y2={next.y}
                    stroke={`rgba(59,130,246,${0.35 + pulse * 0.3})`}
                    strokeWidth="1.5"
                    filter="url(#glow)"
                  />
                );
              })}
              {pts.map((p, i) => (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r={3.5 + pulse * 1.5}
                  fill={`rgba(96,165,250,${0.5 + pulse * 0.3})`}
                  filter="url(#glow)"
                />
              ))}
            </>
          );
        })()}

        {/* DNA CONNECTION FLOW */}
        {strand1.map((p, i) => (
          <line
            key={i}
            x1={p.x}
            y1={p.y}
            x2={strand2[i].x}
            y2={strand2[i].y}
            stroke="rgba(255,255,255,0.08)"
            strokeDasharray="2 4"
            style={{ strokeDashoffset: offset * 10 }}
          />
        ))}

        {/* DNA STRANDS */}
        <polyline
          points={toPolyline(strand1)}
          fill="none"
          stroke="rgba(192,57,43,0.35)"
          strokeWidth="2"
        />
        <polyline
          points={toPolyline(strand2)}
          fill="none"
          stroke="rgba(59,130,246,0.35)"
          strokeWidth="2"
        />

        {/* DNA NODES */}
        {strand1.map((p, i) => {
          const pulse = 0.5 + 0.5 * Math.sin(offset * 2 + i * 0.5);
          return (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={3.5 + pulse * 1.5}
              fill={`rgba(192,57,43,${0.4 + pulse * 0.3})`}
              filter="url(#glow)"
            />
          );
        })}

        {strand2.map((p, i) => {
          const pulse = 0.5 + 0.5 * Math.sin(offset * 2 + i * 0.5 + Math.PI);
          return (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={3 + pulse * 1.5}
              fill={`rgba(59,130,246,${0.4 + pulse * 0.3})`}
              filter="url(#glow)"
            />
          );
        })}

        {/* FLOATING PARTICLES */}
        {Array.from({ length: 20 }).map((_, i) => {
          const x = 250 + Math.sin(offset + i) * 200;
          const y = 200 + ((i * 20 + offset * 40) % 500);

          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="1.5"
              fill="rgba(255,255,255,0.15)"
            />
          );
        })}

        {/* FLOATING CHEMICAL TEXT */}
        {chemicalElements.map((text, i) => {
          const x = 220 + Math.sin(offset * 0.8 + i) * 180;
          const y = 120 + ((i * 80 + offset * 30) % 500);
          const opacity = 0.15 + 0.25 * Math.sin(offset + i);

          return (
            <text
              key={i}
              x={x}
              y={y}
              fill={
                i % 2 === 0
                  ? `rgba(59,130,246,${opacity})`
                  : `rgba(249,115,22,${opacity})`
              }
              fontSize="14"
              fontFamily="monospace"
              letterSpacing="1px"
              filter="url(#textGlow)"
            >
              {text}
            </text>
          );
        })}
      </svg>
    </div>
  );
});

AnimatedDNA.displayName = "AnimatedDNA";

export default AnimatedDNA;
