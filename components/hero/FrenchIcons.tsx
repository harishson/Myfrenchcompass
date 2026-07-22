/* =========================================================================
   FrenchIcons — minimalist line-art motifs for the hero constellation.

   House rules for every glyph in here:
     • Drawn in a 0–40 local box so they can be placed and scaled uniformly.
     • Stroke only, no fills. Colour and stroke-width come from the parent
       <g>, so the whole set can be re-lit in one place.
     • Silhouette-first: each must stay readable at ~34px and 30% opacity.
       Interior detail is the first thing to cut, not the last.

   These are engraved instrument etchings, not travel-poster clip-art —
   thin, monoline, no colour fills, no mascots.
   ========================================================================= */

export function EiffelTower() {
  return (
    <g>
      <path d="M20,3 L20,7" />
      <path d="M20,7 C20,7 16.5,15 12.5,25 L9,37" />
      <path d="M20,7 C20,7 23.5,15 27.5,25 L31,37" />
      <path d="M16.5,15 L23.5,15" />
      <path d="M13.8,23 L26.2,23" />
      <path d="M9,37 L31,37" />
      {/* the ground-level arch is what makes it read as the Tower */}
      <path d="M14.5,37 C14.5,30 25.5,30 25.5,37" />
    </g>
  )
}

export function ArcDeTriomphe() {
  return (
    <g>
      <path d="M7,37 L7,15 C7,11.5 12,9.5 20,9.5 C28,9.5 33,11.5 33,15 L33,37" />
      <path d="M4.5,15 L35.5,15" />
      <path d="M6,11.5 L34,11.5" />
      {/* central arch */}
      <path d="M14.5,37 L14.5,26 C14.5,21.5 25.5,21.5 25.5,26 L25.5,37" />
      <path d="M5,37 L35,37" />
    </g>
  )
}

export function NotreDame() {
  return (
    <g>
      {/* twin towers */}
      <path d="M8,37 L8,13 L17,13 L17,37" />
      <path d="M23,37 L23,13 L32,13 L32,37" />
      <path d="M8,13 L8,9.5 L17,9.5 L17,13" />
      <path d="M23,13 L23,9.5 L32,9.5 L32,13" />
      {/* rose window + central bay */}
      <circle cx="20" cy="22" r="4.2" />
      <path d="M17,37 L17,28 L23,28 L23,37" />
      <path d="M6,37 L34,37" />
    </g>
  )
}

export function HotAirBalloon() {
  return (
    <g>
      <path d="M20,4 C27.5,4 33,10.5 33,17 C33,23.5 26.5,28.5 20,29.5 C13.5,28.5 7,23.5 7,17 C7,10.5 12.5,4 20,4 Z" />
      {/* meridians give it volume without any shading */}
      <path d="M20,4 C16,10 16,24 20,29.5" />
      <path d="M20,4 C24,10 24,24 20,29.5" />
      <path d="M16.5,29 L17.8,33.5" />
      <path d="M23.5,29 L22.2,33.5" />
      <path d="M17.2,33.5 L22.8,33.5 L21.8,37.5 L18.2,37.5 Z" />
    </g>
  )
}

export function LavenderSprig() {
  return (
    <g>
      <path d="M20,37 C20,29 20,22 20,13" />
      {/* buds, alternating up the stem */}
      <path d="M20,13 C17.5,11 17.5,7.5 20,5 C22.5,7.5 22.5,11 20,13 Z" />
      <path d="M20,17 C17,16 15.5,13 16.5,10.5" />
      <path d="M20,17 C23,16 24.5,13 23.5,10.5" />
      <path d="M20,22 C16.8,21 15,18 16,15.5" />
      <path d="M20,22 C23.2,21 25,18 24,15.5" />
      {/* leaves */}
      <path d="M20,29 C17,29 15,27 14.5,24.5" />
      <path d="M20,29 C23,29 25,27 25.5,24.5" />
    </g>
  )
}

export function Croissant() {
  return (
    <g>
      <path d="M6,25 C4,17.5 9.5,9.5 18.5,8.5 C27.5,7.5 34.5,13 34.5,20.5 C34.5,26 30,29.5 25.5,29" />
      <path d="M6,25 C9,30 14,32 18.5,31" />
      <path d="M18.5,31 C22,30.5 24.5,29.8 25.5,29" />
      {/* two interior seams — enough to read as laminated pastry */}
      <path d="M13,12.5 C14.5,17 15,24 13.5,29.5" />
      <path d="M22,9.2 C23,14 23.2,23 21.5,30.8" />
    </g>
  )
}

export function Baguette() {
  return (
    <g>
      <path d="M7,31.5 C4.8,27.8 9,21 17,15.5 C25,10 32.5,9 34.5,12.5 C36.7,16.2 32.5,23 24.5,28.5 C16.5,34 9.2,35.2 7,31.5 Z" />
      {/* scoring slashes */}
      <path d="M13.5,26.5 L17,22" />
      <path d="M18.5,23 L22,18.5" />
      <path d="M23.5,19.5 L27,15" />
    </g>
  )
}

export function WineGrapes() {
  return (
    <g>
      <path d="M20,11 C20,8 21.5,5.5 24.5,4.5" />
      {/* leaf */}
      <path d="M24.5,4.5 C28,3.5 31.5,5 32,8.5 C29,9.5 25.5,8 24.5,4.5 Z" />
      {/* cluster */}
      <circle cx="20" cy="14.5" r="3.4" />
      <circle cx="14.8" cy="19.5" r="3.4" />
      <circle cx="25.2" cy="19.5" r="3.4" />
      <circle cx="20" cy="21.5" r="3.4" />
      <circle cx="16.6" cy="26.6" r="3.4" />
      <circle cx="23.4" cy="26.6" r="3.4" />
      <circle cx="20" cy="32" r="3.4" />
    </g>
  )
}

export function StreetLamp() {
  return (
    <g>
      <path d="M20,37 L20,13.5" />
      <path d="M15,37 L25,37" />
      <path d="M16.8,33.5 L23.2,33.5" />
      {/* lantern */}
      <path d="M14.5,13.5 L25.5,13.5 L23,5.5 L17,5.5 Z" />
      <path d="M17,9.5 L23,9.5" />
      <path d="M18.6,3.5 L21.4,3.5" />
      <path d="M20,3.5 L20,5.5" />
    </g>
  )
}

export function CafeCup() {
  return (
    <g>
      <path d="M9,15.5 L11,27.5 C11.3,29.8 13.5,31 16.5,31 L21.5,31 C24.5,31 26.7,29.8 27,27.5 L29,15.5 Z" />
      {/* handle */}
      <path d="M29,19 C32.8,19 34,23.5 30.6,25.5" />
      <path d="M6.5,34.5 L31.5,34.5" />
      {/* steam */}
      <path d="M16.5,11.5 C14.5,9 18,7.5 16,5" />
      <path d="M22.5,11.5 C20.5,9 24,7.5 22,5" />
    </g>
  )
}

export function Bicycle() {
  return (
    <g>
      <circle cx="11" cy="28" r="7.5" />
      <circle cx="29" cy="28" r="7.5" />
      <path d="M11,28 L19,15" />
      <path d="M19,15 L27,15" />
      <path d="M19,15 L23,28" />
      <path d="M23,28 L11,28" />
      <path d="M27,15 L29,28" />
      <path d="M16,13.5 L21,13.5" />
      <path d="M25,12.5 L30,12.5" />
      <circle cx="23" cy="28" r="1.6" />
    </g>
  )
}

export function WineGlass() {
  return (
    <g>
      <path d="M13,6 L27,6 C27,15 24,19 20,19.5 C16,19 13,15 13,6 Z" />
      {/* the fill line is what turns a funnel into a glass of wine */}
      <path d="M13.7,10.5 L26.3,10.5" />
      <path d="M20,19.5 L20,31" />
      <path d="M13.5,32.5 C13.5,30.5 26.5,30.5 26.5,32.5" />
    </g>
  )
}

/** A simple three-petal fleur-de-lis, outlined rather than filled. */
export function FleurOutline() {
  return (
    <g>
      <path d="M20,5 C16.5,10 16.5,16 20,20 C23.5,16 23.5,10 20,5 Z" />
      <path d="M20,18 C13.5,16 10,10.5 12,5.5 C7.5,10 6.5,18.5 14,23.5 C16,25 18,25 20,23.5" />
      <path d="M20,18 C26.5,16 30,10.5 28,5.5 C32.5,10 33.5,18.5 26,23.5 C24,25 22,25 20,23.5" />
      <path d="M14,27 L26,27" />
      <path d="M18.4,27 L18.4,34 M21.6,27 L21.6,34" />
      <path d="M15,34 C18,31.5 22,31.5 25,34" />
    </g>
  )
}
