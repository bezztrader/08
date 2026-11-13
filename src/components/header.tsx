"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { InstagramButton } from "./cta";
import { EASE } from "./motion";

const NAV = [
  { href: "#casa", label: "A casa" },
  { href: "#servicos", label: "Serviços" },
  { href: "#galeria", label: "Galeria" },
  { href: "#clube", label: "Clube" },
  { href: "#onde", label: "Onde fica" },
];

/**
 * Transparent at the top; once scrolled, a translucent black blurred bar
 * fades in and the header compacts (transform + opacity only).
 */
export function Header() {
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setCompact(v > 24));
  const t = { duration: 0.35, ease: EASE };

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-20 origin-top border-b border-gold/20 bg-ink/75 backdrop-blur-md"
        initial={false}
        animate={{ opacity: compact ? 1 : 0, scaleY: compact ? 0.8 : 1 }}
        transition={t}
      />
      <motion.div
        className="relative mx-auto flex h-20 max-w-[84rem] items-center justify-between gap-6 px-4 sm:px-8"
        initial={false}
        animate={{ y: compact ? -8 : 0 }}
        transition={t}
      >
        <a href="#topo" aria-label="Barbearia Zero Oito, início" className="block">
          {/* hidden at the top, where the hero already shows the big logo */}
          <motion.span
            className="block origin-left"
            initial={false}
            animate={{ scale: compact ? 0.82 : 1, opacity: compact ? 1 : 0 }}
            transition={t}
          >
            <Image src="/images/logo-zerooito.png" alt="" width={745} height={774} sizes="56px" className="h-14 w-auto" />
          </motion.span>
        </a>
        <nav aria-label="Seções" className="hidden lg:block">
          <ul className="flex gap-1 text-sm font-semibold tracking-wider uppercase">
            {NAV.map((item) => (
              <li key={item.href}>
                <a className="inline-flex min-h-12 items-center px-3 text-bone/85 transition-colors hover:text-gold" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <InstagramButton compact />
      </motion.div>
    </header>
  );
}
