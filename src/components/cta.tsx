"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/site";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { useFinePointerDesktop } from "./motion";

const MAGNET = { stiffness: 220, damping: 22, mass: 0.6 };
const PULL = 0.18; // subtle: share of the pointer offset the button follows
const MAX_PULL = 6; // px

/**
 * Button shell: slight lift on hover, a gold sheen sweeping across, and a
 * barely-there magnetic pull on desktop mice.
 */
function SheenButton({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const magnetic = useFinePointerDesktop() && !reduce;
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, MAGNET);
  const y = useSpring(my, MAGNET);

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (!magnetic) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, (e.clientX - (r.left + r.width / 2)) * PULL)));
    my.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, (e.clientY - (r.top + r.height / 2)) * PULL)));
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={magnetic ? { x, y } : undefined}
      className={`sheen group relative isolate inline-flex min-h-12 items-center overflow-hidden ${className}`}
    >
      <span className="lift inline-flex items-center gap-3">{children}</span>
    </motion.a>
  );
}

/** Solid CTA with icon: gold with black text (dark variant on the bone band). */
export function GoldCTA({
  label = "Agendar pelo WhatsApp",
  href = WHATSAPP_URL,
  className = "",
  variant = "gold",
}: {
  label?: string;
  href?: string;
  className?: string;
  /** "dark": ink button for the one bone section */
  variant?: "gold" | "dark";
}) {
  return (
    <SheenButton
      href={href}
      className={`${variant === "dark" ? "btn-dark" : "btn-gold"} rounded-md px-6 py-3.5 text-base font-bold tracking-wide uppercase sm:px-7 sm:text-lg ${className}`}
    >
      <WhatsAppIcon className="size-6 shrink-0" />
      <span>{label}</span>
      <span className="sr-only">(abre o WhatsApp em nova aba)</span>
    </SheenButton>
  );
}

export function InstagramButton({ compact = false }: { compact?: boolean }) {
  return (
    <SheenButton
      href={INSTAGRAM_URL}
      className={`btn-outline rounded-md font-semibold ${compact ? "px-3.5 text-sm sm:px-4" : "px-5 text-base"}`}
    >
      <InstagramIcon className="size-5 shrink-0" />
      <span>{INSTAGRAM_HANDLE}</span>
      <span className="sr-only">no Instagram (abre em nova aba)</span>
    </SheenButton>
  );
}

const PULSE_EVERY = 6; // seconds

/** Floating WhatsApp button; "Agendar" label beside it from md up. */
export function FloatingWhatsApp() {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar pelo WhatsApp (abre em nova aba)"
      initial="rest"
      whileHover="hover"
      className="fixed right-4 bottom-4 z-50 flex items-center gap-3 sm:right-6 sm:bottom-6"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <motion.span
        aria-hidden="true"
        className="fab-label hidden rounded-md px-4 py-2.5 text-sm font-bold tracking-wide uppercase md:block"
        variants={{ rest: { x: 0 }, hover: { x: -4 } }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        Agendar
      </motion.span>
      <motion.span
        className="relative flex size-15"
        variants={{ rest: { y: 0 }, hover: { y: -3 } }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {reduce ? null : (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-[var(--wa)]"
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: [1, 1.5], opacity: [0.45, 0] }}
            transition={{ duration: 1.4, ease: "easeOut", repeat: Infinity, repeatDelay: PULSE_EVERY - 1.4, delay: 2 }}
          />
        )}
        <span className="fab relative flex size-15 items-center justify-center rounded-full">
          <WhatsAppIcon className="size-8" />
        </span>
      </motion.span>
    </motion.a>
  );
}
