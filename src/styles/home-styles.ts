export const homeStyles = `
  .glow-card {
    position: relative;
    transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
  }
  .glow-card::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(135deg,
      rgba(249,115,22,0.10) 0%,
      rgba(234,88,12,0.06) 40%,
      rgba(192,57,43,0.04) 100%
    );
    opacity: 0;
    transition: opacity 0.35s ease;
    pointer-events: none;
    z-index: 0;
  }
  .glow-card:hover::after {
    opacity: 1;
  }
  .glow-card:hover {
    border-color: rgba(249,115,22,0.35) !important;
    box-shadow:
      0 0 0 1px rgba(249,115,22,0.12),
      0 0 28px rgba(249,115,22,0.12),
      0 20px 48px rgba(0,0,0,0.45);
    transform: translateY(-3px);
  }
  .glow-card > * {
    position: relative;
    z-index: 1;
  }

  .cert-card:hover .cert-icon {
    background: rgba(249,115,22,0.18);
    border-color: rgba(249,115,22,0.35);
  }
  .cert-icon {
    transition: background 0.3s ease, border-color 0.3s ease;
  }

  .team-card:hover .team-initials {
    background: rgba(249,115,22,0.2);
    border-color: rgba(249,115,22,0.4);
    color: #f97316;
  }
  .team-initials {
    transition: background 0.3s, border-color 0.3s, color 0.3s;
  }
`;
