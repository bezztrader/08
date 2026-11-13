"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { EASE, useIsMobile } from "./motion";

/**
 * Portrait 9:16 video. The frame settles in (scale 0.95 → 1) while a thin gold
 * border is drawn around it. Plays only while on screen and pauses off screen
 * (no autoPlay attribute, so off-screen reels never download past their
 * metadata). With reduced motion only the poster is shown.
 */
export function Reel({
  src,
  poster,
  label,
  priority = false,
  sizes = "(min-width: 1024px) 380px, 90vw",
  radius = 18,
  intro = false,
}: {
  src: string;
  poster: string;
  label: string;
  priority?: boolean;
  sizes?: string;
  radius?: number;
  /** the hero draws its own entrance (diagonal cut + CSS border), so skip ours */
  intro?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const mobile = useIsMobile();
  const view = { once: true, margin: "0px 0px -10% 0px" } as const;

  useEffect(() => {
    const video = ref.current;
    if (!video || reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <motion.div
      data-cursor
      className="relative aspect-[9/16] w-full"
      initial={intro ? false : { scale: 0.95 }}
      whileInView={intro ? undefined : { scale: 1 }}
      viewport={view}
      transition={{ duration: mobile ? 0.6 : 0.9, ease: EASE }}
    >
      <div className="absolute inset-0 overflow-hidden bg-ink-2" style={{ borderRadius: radius }}>
        {/* The poster paints first (and is the LCP in the hero); the video sits on top. */}
        <Image
          src={poster}
          alt={label}
          fill
          sizes={sizes}
          preload={priority}
          fetchPriority={priority ? "high" : undefined}
          className="object-cover"
        />
        {reduce ? null : (
          <video
            ref={ref}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            src={src}
            muted
            loop
            playsInline
            preload="metadata"
          />
        )}
      </div>
      {/* gold border drawn around the frame */}
      {intro ? null : (
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        <motion.rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx={radius}
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1"
          initial={reduce ? { opacity: 0 } : { pathLength: 0 }}
          whileInView={reduce ? { opacity: 1 } : { pathLength: 1 }}
          viewport={view}
          transition={{ duration: mobile ? 0.9 : 1.4, ease: [0.45, 0, 0.2, 1], delay: 0.2 }}
        />
      </svg>
      )}
    </motion.div>
  );
}
