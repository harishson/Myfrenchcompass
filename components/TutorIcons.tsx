// Male tutor icon (for Harish and Balaji)
export const MaleTutorIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="currentColor"
    className="w-10 h-10"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Graduation cap */}
    <path d="M32 8L20 14v2h24v-2l-12-6z" fill="currentColor" />
    <rect x="18" y="16" width="28" height="2" fill="currentColor" />
    
    {/* Head */}
    <circle cx="32" cy="26" r="6" fill="currentColor" />
    
    {/* Suit/body */}
    <path d="M32 32c-8 0-10 4-10 8v16h20V40c0-4-2-8-10-8z" fill="currentColor" />
    
    {/* Tie accent */}
    <path d="M32 32v8" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

// Female tutor icon (for Samyukta)
export const FemaleTutorIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="currentColor"
    className="w-10 h-10"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Graduation cap */}
    <path d="M32 6L16 14v2h32v-2l-16-8z" fill="currentColor" />
    <rect x="14" y="16" width="36" height="2" fill="currentColor" />
    
    {/* Head with hair */}
    <circle cx="32" cy="25" r="6.5" fill="currentColor" />
    
    {/* Hair/feminine features */}
    <path d="M25.5 22c-2-1-4 1-4 3v2h21v-2c0-2-2-4-4-3" fill="currentColor" opacity="0.8" />
    
    {/* Body/dress */}
    <path d="M32 31.5c-9 0-11 5-11 9v17h22V40.5c0-4-2-9-11-9z" fill="currentColor" />
  </svg>
);

// Journey icons for the waypoints
export const JourneyIcons = {
  layers: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-6 h-6"
    >
      <path d="M12 2L2 7v5l10 5 10-5V7L12 2z" />
      <path d="M2 12l10 5 10-5" />
      <path d="M2 17l10 5 10-5" />
    </svg>
  ),
  book: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-6 h-6"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v13H6.5A2.5 2.5 0 0 1 4 12.5V4.5A2.5 2.5 0 0 1 6.5 2z" />
      <line x1="10" y1="6" x2="14" y2="6" />
      <line x1="10" y1="9" x2="14" y2="9" />
    </svg>
  ),
  pin: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-6 h-6"
    >
      <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8z" />
      <circle cx="12" cy="10" r="2.5" fill="currentColor" />
    </svg>
  ),
  leaf: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-6 h-6"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.7 5 21 9.8 21 16a7 7 0 0 1-7 7z" />
      <path d="M11 4a2 2 0 0 1 2 2v12a4 4 0 0 1-4 4H7a2 2 0 0 1-2-2v-9a4 4 0 0 1 4-4h2z" />
    </svg>
  ),
  overlapping: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-6 h-6"
    >
      <path d="M3 3h8v8H3z" />
      <path d="M13 3h8v8h-8z" />
      <path d="M8 13h8v8H8z" />
    </svg>
  ),
  star: () => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
};
