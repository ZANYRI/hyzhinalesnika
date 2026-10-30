import React, { useId } from "react";
import type { CabinId } from "@/data/cabins";

interface CabinTreeEmojiProps {
  id: CabinId;
  className?: string;
}

/**
 * Custom full-color emoji-sized botanical illustrations for each cabin's namesake tree:
 * - "iva": Плакучая ива (weeping willow with long cascading emerald fronds)
 * - "bereza": Белоствольная берёза (white trunk with black lenticels & airy lime-gold crown)
 * - "buk": Кавказский горный бук (broad silver-grey buttressed trunk & dense emerald-copper canopy)
 */
export function CabinTreeEmoji({ id, className = "" }: CabinTreeEmojiProps) {
  const rawId = useId();
  const uid = rawId.replace(/:/g, "");

  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-[1.22em] w-[1.22em] shrink-0 items-center justify-center align-[-0.2em] select-none ${className}`}
    >
      {id === "iva" && <WillowEmojiSvg uid={uid} />}
      {id === "bereza" && <BirchEmojiSvg uid={uid} />}
      {id === "buk" && <BeechEmojiSvg uid={uid} />}
    </span>
  );
}

function WillowEmojiSvg({ uid }: { uid: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full overflow-visible"
    >
      <defs>
        <linearGradient id={`${uid}-w-trunk`} x1="15" y1="12" x2="21" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8B6343" />
          <stop offset="55%" stopColor="#63432B" />
          <stop offset="100%" stopColor="#3F2919" />
        </linearGradient>
        <linearGradient id={`${uid}-w-back`} x1="18" y1="4" x2="18" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2E754B" />
          <stop offset="100%" stopColor="#1B4A30" />
        </linearGradient>
        <linearGradient id={`${uid}-w-mid`} x1="18" y1="4" x2="18" y2="31" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#67BD72" />
          <stop offset="55%" stopColor="#45965B" />
          <stop offset="100%" stopColor="#2B6E43" />
        </linearGradient>
        <linearGradient id={`${uid}-w-top`} x1="14" y1="3" x2="22" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#B8EE9E" />
          <stop offset="55%" stopColor="#7AD17B" />
          <stop offset="100%" stopColor="#4BA360" />
        </linearGradient>
      </defs>

      {/* Subtle base shadow */}
      <ellipse cx="18" cy="33.7" rx="8.5" ry="1.5" fill="#07120C" fillOpacity="0.32" />

      {/* Back weeping canopy */}
      <path
        d="M18 4.2C10.5 4.2 5.2 8.8 4.6 15.8C4.2 20.5 4.7 25.4 5.5 29.2C5.7 30.1 6.9 30.2 7.3 29.3C8.2 27.2 8.7 23.8 9.4 20.5C9.8 24.4 10.2 27.9 11 29.8C11.4 30.7 12.6 30.5 12.8 29.5C13.5 26.2 14.1 20.8 14.8 17.5H21.2C21.9 20.8 22.5 26.2 23.2 29.5C23.4 30.5 24.6 30.7 25 29.8C25.8 27.9 26.2 24.4 26.6 20.5C27.3 23.8 27.8 27.2 28.7 29.3C29.1 30.2 30.3 30.1 30.5 29.2C31.3 25.4 31.8 20.5 31.4 15.8C30.8 8.8 25.5 4.2 18 4.2Z"
        fill={`url(#${uid}-w-back)`}
        stroke="#0D2216"
        strokeWidth="0.55"
        strokeOpacity="0.45"
      />

      {/* Curved willow trunk & arching boughs */}
      <path
        d="M13.6 33.4C15.5 32.1 16.3 29.2 16.4 24.8C16.5 21.3 16.1 18.8 14.4 16.4L11.2 12.4C10.8 11.9 11.4 11.2 12 11.6L16.3 15.2C16.9 13.3 17.3 11.2 17.6 9.4C17.7 8.8 18.5 8.8 18.6 9.4C18.8 11.3 19.1 13.2 19.7 15.1L24 11.6C24.6 11.2 25.2 11.9 24.8 12.4L21.5 16.5C19.8 18.8 19.5 21.3 19.6 24.8C19.7 29.2 20.6 32.1 22.4 33.4H13.6Z"
        fill={`url(#${uid}-w-trunk)`}
        stroke="#1C120B"
        strokeWidth="0.5"
        strokeOpacity="0.45"
      />

      {/* Mid-layer cascading weeping willow curtains */}
      <path
        d="M18 3.6C11.2 3.6 6.1 7.6 4.4 13.9C3.4 17.7 3.5 23.6 4.4 28.8C4.6 29.8 5.9 29.9 6.2 28.9C7.1 25.8 7.5 20.5 8.4 16.8C8.3 21.6 8.6 26.8 9.5 30.4C9.7 31.3 11 31.3 11.3 30.3C12.2 26.9 12.7 20.7 13.7 16.2C14.1 19.6 14.2 23.2 14.7 25.6C14.9 26.4 15.9 26.3 16 25.4C16.4 21.8 16.6 17.4 17.3 14.6C17.7 13.2 18.3 13.2 18.7 14.6C19.4 17.4 19.6 21.8 20 25.4C20.1 26.3 21.1 26.4 21.3 25.6C21.8 23.2 21.9 19.6 22.3 16.2C23.3 20.7 23.8 26.9 24.7 30.3C25 31.3 26.3 31.3 26.5 30.4C27.4 26.8 27.7 21.6 27.6 16.8C28.5 20.5 28.9 25.8 29.8 28.9C30.1 29.9 31.4 29.8 31.6 28.8C32.5 23.6 32.6 17.7 31.6 13.9C29.9 7.6 24.8 3.6 18 3.6Z"
        fill={`url(#${uid}-w-mid)`}
      />

      {/* Sunlit upper crown & graceful hanging willow strands */}
      <path
        d="M18 3.6C12.3 3.6 7.8 6.6 6.1 11.5C5.5 13.2 6.8 14.4 8 13.1C9.2 11.8 10.4 11.1 11.4 12.8C12 13.8 13.3 13.7 13.9 12.5C14.7 10.9 16 10.5 17.1 12.1C17.6 12.9 18.4 12.9 18.9 12.1C20 10.5 21.3 10.9 22.1 12.5C22.7 13.7 24 13.8 24.6 12.8C25.6 11.1 26.8 11.8 28 13.1C29.2 14.4 30.5 13.2 29.9 11.5C28.2 6.6 23.7 3.6 18 3.6Z"
        fill={`url(#${uid}-w-top)`}
      />

      {/* Fine sunlit drooping willow vine highlights */}
      <path
        d="M7.2 11.5C6.1 16.4 5.8 22.4 6.1 27.6M10.8 10.2C9.9 15.8 9.8 23.1 10.4 29.1M14.2 9.8C13.7 14.4 13.8 19.6 14.4 23.8M21.8 9.8C22.3 14.4 22.2 19.6 21.6 23.8M25.2 10.2C26.1 15.8 26.2 23.1 25.6 29.1M28.8 11.5C29.9 16.4 30.2 22.4 29.9 27.6"
        stroke="#B8F0A0"
        strokeWidth="1.05"
        strokeLinecap="round"
        strokeOpacity="0.82"
      />
    </svg>
  );
}

function BirchEmojiSvg({ uid }: { uid: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full overflow-visible"
    >
      <defs>
        <linearGradient id={`${uid}-bi-back`} x1="18" y1="3" x2="18" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6BC253" />
          <stop offset="65%" stopColor="#469642" />
          <stop offset="100%" stopColor="#2B6B32" />
        </linearGradient>
        <linearGradient id={`${uid}-bi-front`} x1="13" y1="2.5" x2="24" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E6DC63" />
          <stop offset="42%" stopColor="#9EE065" />
          <stop offset="100%" stopColor="#5BB04B" />
        </linearGradient>
        <linearGradient id={`${uid}-bi-trunk`} x1="15" y1="12" x2="21" y2="33" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="65%" stopColor="#EEF2EE" />
          <stop offset="100%" stopColor="#CFD8D1" />
        </linearGradient>
      </defs>

      {/* Subtle base shadow */}
      <ellipse cx="18" cy="33.7" rx="7.5" ry="1.5" fill="#07120C" fillOpacity="0.32" />

      {/* Back airy birch crown */}
      <path
        d="M18 2.4C14.2 2.4 11.3 5.1 10.2 8.5C7.6 9.5 6 12.1 6.3 15.1C6.5 17.7 8.1 19.9 10.5 20.9C11.5 22.4 13.3 23.2 15.3 23H20.7C22.7 23.2 24.5 22.4 25.5 20.9C27.9 19.9 29.5 17.7 29.7 15.1C30 12.1 28.4 9.5 25.8 8.5C24.7 5.1 21.8 2.4 18 2.4Z"
        fill={`url(#${uid}-bi-back)`}
        stroke="#0D2216"
        strokeWidth="0.55"
        strokeOpacity="0.45"
      />

      {/* Signature white birch trunk & slender white branches */}
      <path
        d="M14.7 33.5C15.8 31.8 16.2 28.7 16.3 24.4C16.4 21.5 16.4 19.3 16.5 17.5L12.6 13.7C12.1 13.2 12.7 12.5 13.3 12.9L16.6 15.6C16.8 13.5 17.1 11.5 17.4 9.8C17.5 9.1 18.5 9.1 18.6 9.8C18.8 11.2 19 12.8 19.2 14.5L22.7 11.8C23.3 11.4 23.9 12.1 23.4 12.6L19.4 16.3C19.5 18.6 19.6 21.3 19.7 24.4C19.8 28.7 20.2 31.8 21.3 33.5H14.7Z"
        fill={`url(#${uid}-bi-trunk)`}
        stroke="#18241C"
        strokeWidth="0.65"
        strokeOpacity="0.55"
      />

      {/* Dark rough basal bark (комлевая кора берёзы) */}
      <path
        d="M14.7 33.5C15.3 32.5 15.7 31.3 15.9 30.1L17.6 31.4L18.7 29.9L20.1 31.1C20.4 32 20.8 32.8 21.3 33.5H14.7Z"
        fill="#222A25"
      />

      {/* Signature black horizontal birch bark lenticels (чечевички) */}
      <path
        d="M16.6 15.4L18.5 15.8L16.5 16.3Z"
        fill="#1A221D"
      />
      <path
        d="M19.4 18.1L17.2 18.6L19.5 19.1Z"
        fill="#1A221D"
      />
      <path
        d="M16.4 21.1L18.9 21.6L16.4 22.2Z"
        fill="#1A221D"
      />
      <path
        d="M19.6 24.0L17.1 24.6L19.7 25.2Z"
        fill="#1A221D"
      />
      <path
        d="M16.1 27.1L18.8 27.6L16.0 28.3Z"
        fill="#1A221D"
      />

      {/* Front sunlit lime & golden birch foliage clusters (framing the white trunk) */}
      <path
        d="M18 2.4C14.8 2.4 12.2 4.6 11.4 7.7C8.9 8.5 7.4 10.8 7.8 13.4C8.1 15.6 9.9 17.3 12.2 17.5C13.6 17.6 14.9 16.8 15.5 15.4C15.9 14.5 15.7 13.1 16.5 12.3C17.3 11.5 18.7 11.5 19.5 12.3C20.3 13.1 20.1 14.5 20.5 15.4C21.1 16.8 22.4 17.6 23.8 17.5C26.1 17.3 27.9 15.6 28.2 13.4C28.6 10.8 27.1 8.5 24.6 7.7C23.8 4.6 21.2 2.4 18 2.4Z"
        fill={`url(#${uid}-bi-front)`}
      />

      {/* Golden autumn birch leaf accents */}
      <circle cx="15.2" cy="6.4" r="2.1" fill="#F2E26B" fillOpacity="0.85" />
      <circle cx="21.4" cy="8.1" r="1.8" fill="#EBD358" fillOpacity="0.8" />
      <circle cx="10.8" cy="12.6" r="1.6" fill="#C7EE74" fillOpacity="0.85" />
      <circle cx="25.1" cy="12.9" r="1.6" fill="#DDF06E" fillOpacity="0.8" />
    </svg>
  );
}

function BeechEmojiSvg({ uid }: { uid: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full overflow-visible"
    >
      <defs>
        <linearGradient id={`${uid}-bu-trunk`} x1="14" y1="17" x2="23" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#B8B3A9" />
          <stop offset="55%" stopColor="#858077" />
          <stop offset="100%" stopColor="#57534D" />
        </linearGradient>
        <linearGradient id={`${uid}-bu-deep`} x1="18" y1="6" x2="18" y2="23" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#347548" />
          <stop offset="100%" stopColor="#1B472B" />
        </linearGradient>
        <linearGradient id={`${uid}-bu-mid`} x1="8" y1="5" x2="28" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5AA65F" />
          <stop offset="55%" stopColor="#3B7F4B" />
          <stop offset="100%" stopColor="#285E38" />
        </linearGradient>
        <linearGradient id={`${uid}-bu-copper`} x1="14" y1="3.5" x2="29" y2="17" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F3BE6F" />
          <stop offset="50%" stopColor="#D98841" />
          <stop offset="100%" stopColor="#A65726" />
        </linearGradient>
      </defs>

      {/* Subtle base shadow */}
      <ellipse cx="18" cy="33.7" rx="9" ry="1.5" fill="#07120C" fillOpacity="0.34" />

      {/* Sturdy smooth silver-grey mountain beech trunk with buttress roots */}
      <path
        d="M11.6 33.5C13.9 32.2 14.9 29.7 15.1 25.6V21.5L10.8 17.8C10.2 17.3 10.9 16.4 11.6 16.8L15.6 19.4L17.4 15.8C17.7 15.2 18.4 15.2 18.7 15.8L20.4 19.4L24.4 16.8C25.1 16.4 25.8 17.3 25.2 17.8L20.9 21.5V25.6C21.1 29.7 22.1 32.2 24.4 33.5H20.4L19.1 31.2L18 33.5H16.9L15.8 31.2L14.5 33.5H11.6Z"
        fill={`url(#${uid}-bu-trunk)`}
        stroke="#1B1F1C"
        strokeWidth="0.6"
        strokeOpacity="0.48"
      />

      {/* Lower wide Caucasian beech shadow canopy */}
      <path
        d="M18 4.2C11.9 4.2 7.3 7.2 5.7 11.4C3.7 12.4 2.6 14.5 2.9 16.9C3.3 19.8 5.9 21.8 9.2 21.8C10.9 21.8 12.4 21.2 13.5 20.3C14.8 21.1 16.3 21.5 18 21.5C19.7 21.5 21.2 21.1 22.5 20.3C23.6 21.2 25.1 21.8 26.8 21.8C30.1 21.8 32.7 19.8 33.1 16.9C33.4 14.5 32.3 12.4 30.3 11.4C28.7 7.2 24.1 4.2 18 4.2Z"
        fill={`url(#${uid}-bu-deep)`}
        stroke="#0D2216"
        strokeWidth="0.55"
        strokeOpacity="0.48"
      />

      {/* Mid layered lush beech canopy */}
      <path
        d="M17.6 3.8C12.3 3.8 8.1 6.4 6.8 10.3C4.8 11.1 3.8 13.1 4.3 15.2C4.8 17.4 7.1 18.9 9.8 18.7C11.4 18.6 12.7 17.9 13.6 16.9C14.8 17.9 16.4 18.5 18.2 18.5C20.1 18.5 21.8 17.8 23 16.7C24 17.8 25.5 18.5 27.2 18.5C29.8 18.5 31.8 16.8 32 14.6C32.2 12.5 31 10.7 29 10C27.5 6.3 23.1 3.8 17.6 3.8Z"
        fill={`url(#${uid}-bu-mid)`}
      />

      {/* Signature Caucasian copper-gold autumn beech crown crest */}
      <path
        d="M19.2 3.8C15.5 3.8 12.4 5.4 11.1 8.1C11.9 9.7 13.7 10.7 15.8 10.5C17.1 10.4 18.2 9.8 19 9.1C19.6 10.6 21.1 11.7 23 11.7C24.2 11.7 25.3 11.2 26.1 10.5C26.5 12.2 28.1 13.5 30 13.4C31.3 13.3 32.1 12.3 31.7 11C30.3 6.8 25.4 3.8 19.2 3.8Z"
        fill={`url(#${uid}-bu-copper)`}
      />

      {/* Sunlit emerald-olive & copper leaf cluster highlights */}
      <path
        d="M9.6 10.6C8.1 10.6 6.8 11.7 6.8 13.1C6.8 14.3 7.8 15.3 9.2 15.3C10.4 15.3 11.4 14.6 11.7 13.6C12.3 14.3 13.3 14.8 14.5 14.8C16.2 14.8 17.6 13.7 17.6 12.2C17.6 10.8 16.3 9.7 14.6 9.7C13.5 9.7 12.5 10.2 11.9 10.9C11.3 10.7 10.5 10.6 9.6 10.6Z"
        fill="#7CC86B"
        fillOpacity="0.78"
      />
    </svg>
  );
}
