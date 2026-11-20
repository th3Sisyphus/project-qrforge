export function Mark({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="7" fill="currentColor" />
      <g fill="var(--bg, #dfdedb)">
        <rect x="6" y="6" width="8" height="8" />
        <rect x="18" y="6" width="8" height="8" />
        <rect x="6" y="18" width="8" height="8" />
        <rect x="18" y="18" width="4" height="4" />
        <rect x="24" y="24" width="2" height="2" />
      </g>
      <g fill="currentColor">
        <rect x="8.5" y="8.5" width="3" height="3" />
        <rect x="20.5" y="8.5" width="3" height="3" />
        <rect x="8.5" y="20.5" width="3" height="3" />
      </g>
      <rect x="22" y="22" width="4" height="4" fill="#2456d6" />
    </svg>
  );
}
