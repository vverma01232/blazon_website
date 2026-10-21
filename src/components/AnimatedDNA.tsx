import React from "react";
import { chemicalElements } from "@/data/home-constants";

const STRAND_COUNT = 20;
const PARTICLE_COUNT = 20;
const LABEL_SLOTS = [
  [500, 70],
  [520, 310],
  [500, 560],
  [250, 70],
  [70, 640],
  [430, 640],
  [70, 70],
];

type Point = { x: number; y: number };

function strandPoints(flip: boolean, offset: number): Point[] {
  return Array.from({ length: STRAND_COUNT }, (_, i) => {
    const t = i / (STRAND_COUNT - 1);
    const x =
      (flip ? 180 : 120) +
      Math.sin(t * Math.PI * 3 + offset) * (flip ? -40 : 40);
    const y = 150 + t * 400;
    return { x, y };
  });
}

function hexPoints(cx: number, cy: number, r: number, rot: number): Point[] {
  return [0, 60, 120, 180, 240, 300].map((angle) => {
    const a = ((angle + rot) * Math.PI) / 180;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  });
}

function setLine(el: SVGLineElement, a: Point, b: Point) {
  el.setAttribute("x1", String(a.x));
  el.setAttribute("y1", String(a.y));
  el.setAttribute("x2", String(b.x));
  el.setAttribute("y2", String(b.y));
}

function setCircle(el: SVGCircleElement, p: Point, r: number) {
  el.setAttribute("cx", String(p.x));
  el.setAttribute("cy", String(p.y));
  el.setAttribute("r", String(r));
}

export const AnimatedDNA = React.memo(() => {
  const svgRef = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let offset = 0;
    let frame = 0;
    let running = false;

    const links = [...svg.querySelectorAll<SVGLineElement>("[data-link]")];
    const nodes1 = [...svg.querySelectorAll<SVGCircleElement>("[data-node='1']")];
    const nodes2 = [...svg.querySelectorAll<SVGCircleElement>("[data-node='2']")];
    const strand1 = svg.querySelector<SVGPolylineElement>("[data-strand='1']");
    const strand2 = svg.querySelector<SVGPolylineElement>("[data-strand='2']");
    const topLines = [...svg.querySelectorAll<SVGLineElement>("[data-hex='top']")];
    const topDots = [...svg.querySelectorAll<SVGCircleElement>("[data-hexdot='top']")];
    const bottomLines = [...svg.querySelectorAll<SVGLineElement>("[data-hex='bottom']")];
    const bottomDots = [...svg.querySelectorAll<SVGCircleElement>("[data-hexdot='bottom']")];
    const particles = [...svg.querySelectorAll<SVGCircleElement>("[data-particle]")];
    const labels = [...svg.querySelectorAll<SVGTextElement>("[data-label]")];
    const glow = svg.querySelector<SVGCircleElement>("[data-glow]");

    const tick = () => {
      if (!running) return;
      offset += 0.02;

      const a = strandPoints(false, offset);
      const b = strandPoints(true, offset);
      strand1?.setAttribute("points", a.map((p) => `${p.x},${p.y}`).join(" "));
      strand2?.setAttribute("points", b.map((p) => `${p.x},${p.y}`).join(" "));

      a.forEach((p, i) => {
        setLine(links[i], p, b[i]);
        links[i].style.strokeDashoffset = String(offset * 10);
        const pulse = 0.5 + 0.5 * Math.sin(offset * 2 + i * 0.5);
        setCircle(nodes1[i], p, 3.5 + pulse * 1.5);
        nodes1[i].setAttribute("fill", `rgba(192,57,43,${0.4 + pulse * 0.3})`);
        const pulse2 = 0.5 + 0.5 * Math.sin(offset * 2 + i * 0.5 + Math.PI);
        setCircle(nodes2[i], b[i], 3 + pulse2 * 1.5);
        nodes2[i].setAttribute("fill", `rgba(59,130,246,${0.4 + pulse2 * 0.3})`);
      });

      const topPulse = 0.5 + 0.5 * Math.sin(offset * 2);
      const top = hexPoints(420, 180, 70, offset * 20);
      top.forEach((p, i) => {
        const next = top[(i + 1) % top.length];
        setLine(topLines[i], p, next);
        topLines[i].setAttribute("stroke", `rgba(192,57,43,${0.4 + topPulse * 0.3})`);
        topLines[i].style.strokeDashoffset = String(offset * 10);
        setCircle(topDots[i], p, 4 + topPulse * 2);
        topDots[i].setAttribute("fill", `rgba(255,80,60,${0.6 + topPulse * 0.3})`);
      });

      const floatY = Math.sin(offset) * 10;
      const bottomPulse = 0.5 + 0.5 * Math.sin(offset * 2 + Math.PI);
      const bottom = hexPoints(300, 380 + floatY, 55, -offset * 15);
      bottom.forEach((p, i) => {
        const next = bottom[(i + 1) % bottom.length];
        setLine(bottomLines[i], p, next);
        bottomLines[i].setAttribute("stroke", `rgba(59,130,246,${0.35 + bottomPulse * 0.3})`);
        setCircle(bottomDots[i], p, 3.5 + bottomPulse * 1.5);
        bottomDots[i].setAttribute("fill", `rgba(96,165,250,${0.5 + bottomPulse * 0.3})`);
      });

      if (glow) glow.style.transform = `translateY(${Math.sin(offset) * 10}px)`;

      particles.forEach((el, i) => {
        el.setAttribute("cx", String(250 + Math.sin(offset + i) * 200));
        el.setAttribute("cy", String(200 + ((i * 20 + offset * 40) % 500)));
      });

      labels.forEach((el, i) => {
        const [x, y] = LABEL_SLOTS[i] ?? [500, 80];
        el.setAttribute("x", String(x + Math.sin(offset * 0.8 + i) * 6));
        el.setAttribute("y", String(y + Math.cos(offset + i) * 6));
        const opacity = 0.2 + 0.25 * Math.sin(offset + i);
        el.setAttribute(
          "fill",
          i % 2 === 0
            ? `rgba(59,130,246,${opacity})`
            : `rgba(249,115,22,${opacity})`,
        );
      });

      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting;
      if (visible && !running) {
        running = true;
        frame = requestAnimationFrame(tick);
      } else if (!visible && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
    });
    observer.observe(svg);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none overflow-hidden opacity-50 md:opacity-60">
      <svg
        ref={svgRef}
        viewBox="0 0 600 700"
        className="absolute right-0 top-1/2 -translate-y-1/2 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="textGlow">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
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

        <circle data-glow="" cx="420" cy="250" r="220" fill="url(#bgGlow)" />

        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={`top-line-${i}`}
            data-hex="top"
            x1="0"
            y1="0"
            x2="0"
            y2="0"
            stroke="rgba(192,57,43,0.5)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            filter="url(#glow)"
          />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <circle key={`top-dot-${i}`} data-hexdot="top" cx="0" cy="0" r="4" filter="url(#glow)" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={`bottom-line-${i}`}
            data-hex="bottom"
            x1="0"
            y1="0"
            x2="0"
            y2="0"
            stroke="rgba(59,130,246,0.5)"
            strokeWidth="1.5"
            filter="url(#glow)"
          />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <circle key={`bottom-dot-${i}`} data-hexdot="bottom" cx="0" cy="0" r="3.5" filter="url(#glow)" />
        ))}

        {Array.from({ length: STRAND_COUNT }).map((_, i) => (
          <line
            key={`link-${i}`}
            data-link=""
            x1="0"
            y1="0"
            x2="0"
            y2="0"
            stroke="rgba(255,255,255,0.08)"
            strokeDasharray="2 4"
          />
        ))}
        <polyline data-strand="1" fill="none" stroke="rgba(192,57,43,0.35)" strokeWidth="2" />
        <polyline data-strand="2" fill="none" stroke="rgba(59,130,246,0.35)" strokeWidth="2" />
        {Array.from({ length: STRAND_COUNT }).map((_, i) => (
          <circle key={`n1-${i}`} data-node="1" cx="0" cy="0" r="3" filter="url(#glow)" />
        ))}
        {Array.from({ length: STRAND_COUNT }).map((_, i) => (
          <circle key={`n2-${i}`} data-node="2" cx="0" cy="0" r="3" filter="url(#glow)" />
        ))}
        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
          <circle key={`p-${i}`} data-particle="" cx="0" cy="0" r="1.5" fill="rgba(255,255,255,0.15)" />
        ))}
        {chemicalElements.map((text, i) => (
          <text
            key={text}
            data-label=""
            x={LABEL_SLOTS[i]?.[0] ?? 500}
            y={LABEL_SLOTS[i]?.[1] ?? 80}
            fontSize="14"
            fontFamily="monospace"
            letterSpacing="1px"
            filter="url(#textGlow)"
          >
            {text}
          </text>
        ))}
      </svg>
    </div>
  );
});

AnimatedDNA.displayName = "AnimatedDNA";

export default AnimatedDNA;
