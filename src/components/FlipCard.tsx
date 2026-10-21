import { useState, type CSSProperties, type ReactNode } from "react";

type FlipCardProps = {
  className?: string;
  style?: CSSProperties;
  label: string;
  children: ReactNode;
};

export default function FlipCard({ className, style, label, children }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  const toggle = () => setFlipped((open) => !open);

  return (
    <div
      className={`flip-card ${flipped ? "is-flipped" : ""} ${className ?? ""}`}
      style={style}
      tabIndex={0}
      aria-label={label}
      aria-pressed={flipped}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("a")) return;
        toggle();
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggle();
        }
      }}
    >
      {children}
    </div>
  );
}
