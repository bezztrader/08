"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE, useIsMobile } from "./motion";

/**
 * The service board, like an old barbershop menu: name, a dotted leader drawn
 * left to right, and one short line. Each row enters in stagger.
 */
export function ServiceMenu({ items }: { items: { name: string; text: string }[] }) {
  const reduce = useReducedMotion();
  const mobile = useIsMobile();
  const dur = mobile ? 0.5 : 0.7;
  const view = { once: true, margin: "0px 0px -8% 0px" } as const;

  return (
    <ol className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
      {items.map((item, i) => (
        <motion.li
          key={item.name}
          className="grid gap-x-6 gap-y-2 py-6 sm:py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:items-baseline"
          initial={{ opacity: 0, y: mobile ? 10 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: dur, ease: EASE, delay: i * 0.07 }}
        >
          <div className="flex items-baseline gap-4">
            <span className="label w-6 shrink-0 text-gold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="display shrink-0 text-[clamp(1.6rem,4.5vw,2.4rem)] leading-none text-bone">{item.name}</h3>
            <motion.span
              aria-hidden="true"
              className="leader mb-[0.35em] flex-1 origin-left"
              initial={reduce ? { opacity: 0 } : { scaleX: 0 }}
              whileInView={reduce ? { opacity: 1 } : { scaleX: 1 }}
              viewport={view}
              transition={{ duration: dur + 0.2, ease: EASE, delay: i * 0.07 + 0.2 }}
            />
          </div>
          <p className="pl-10 text-base leading-relaxed text-bone/80 md:pl-0 md:text-lg">{item.text}</p>
        </motion.li>
      ))}
    </ol>
  );
}
