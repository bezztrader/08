"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { type CSSProperties, useEffect, useRef } from "react";
import { GoldCTA } from "./cta";
import { CutText } from "./cut-text";
import { useFinePointerDesktop } from "./motion";
import { Reel } from "./reel";

const TITLE = "Experiência além do *corte.*";
const at = (s: number) => ({ "--at": s }) as CSSProperties;

/**
 * Hero, concept "O corte": on the first visit of the session a razor line
 * crosses the screen and the black sheet opens in two along it (CSS, first
 * paint; see .cut-* in globals.css). Motion adds the mouse depth on desktop and
 * the scroll-linked exit: the title slides apart along the cut, the 08 swells
 * and fades, the video rises faster than the text.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const desktop = useFinePointerDesktop();
  const live = !reduce;

  // scroll-linked exit
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const topX = useTransform(scrollYProgress, [0, 0.7], [0, -20]);
  const bottomX = useTransform(scrollYProgress, [0, 0.7], [0, 20]);
  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.65], [1, 0]);
  const bigScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.15]);
  const bigOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, -160]);

  // mouse depth (desktop mouse only)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 120, damping: 20, mass: 0.6 };
  const bigX = useSpring(useTransform(mx, [-1, 1], [-12, 12]), spring);
  const bigY = useSpring(useTransform(my, [-1, 1], [-10, 10]), spring);
  const vidX = useSpring(useTransform(mx, [-1, 1], [8, -8]), spring);
  const vidY = useSpring(useTransform(my, [-1, 1], [8, -8]), spring);

  useEffect(() => {
    if (!desktop || reduce) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [desktop, reduce, mx, my]);

  const depth = desktop && live;

  const title = (copy: boolean) => (
    <h1
      id={copy ? undefined : "hero-title"}
      aria-hidden={copy || undefined}
      aria-label={copy ? undefined : TITLE.replace(/\*/g, "")}
      className="display text-[clamp(3.4rem,13vw,8.5rem)] leading-[0.86] text-bone"
    >
      <CutText text={TITLE} />
    </h1>
  );

  return (
    <section ref={ref} id="topo" aria-labelledby="hero-title" className="hero grain relative overflow-hidden pt-24 lg:pt-28">
      {/* first-visit razor cut: two black halves + the blade line (CSS) */}
      <div aria-hidden="true" className="cut-overlay">
        <span className="cut-half cut-half-a" />
        <span className="cut-half cut-half-b" />
        <svg className="cut-line cut-line-diag">
          <line className="blade" x1="-1%" y1="74%" x2="101%" y2="26%" pathLength={100} />
          <line className="glint" x1="-1%" y1="74%" x2="101%" y2="26%" pathLength={100} />
        </svg>
        <svg className="cut-line cut-line-flat">
          <line className="blade" x1="-1%" y1="50%" x2="101%" y2="50%" pathLength={100} />
          <line className="glint" x1="-1%" y1="50%" x2="101%" y2="50%" pathLength={100} />
        </svg>
      </div>

      {/* giant 08: outline drawn, then a faint pinstripe fill (desktop) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -left-10 hidden lg:block"
        style={live ? { scale: bigScale, opacity: bigOpacity } : undefined}
      >
        <motion.div style={depth ? { x: bigX, y: bigY } : undefined}>
          <svg viewBox="0 0 100 80" className="hero08 h-[0.8em] w-[1.25em] overflow-visible">
            <defs>
              <pattern id="pinstripe08" width="2.4" height="10" patternUnits="userSpaceOnUse">
                <rect width="0.22" height="10" fill="rgb(184 146 62 / 0.5)" />
              </pattern>
            </defs>
            <text className="h08-fill" x="0" y="72" fontSize="90" textLength="100" lengthAdjust="spacingAndGlyphs" fill="url(#pinstripe08)">
              08
            </text>
            <text className="h08-stroke" x="0" y="72" fontSize="90" textLength="100" lengthAdjust="spacingAndGlyphs">
              08
            </text>
          </svg>
        </motion.div>
      </motion.div>

      {/* barber pole: black / gold / bone stripes turning slowly (md+) */}
      <div aria-hidden="true" className="pole hx-fade hidden md:block" style={at(1.2)}>
        <span className="pole-stripes" />
      </div>

      <div className="hero-body relative mx-auto grid max-w-[84rem] gap-12 px-4 pb-20 sm:px-8 lg:grid-cols-12 lg:pb-28">
        <div className="lg:col-span-7 lg:pt-10">
          <div className="hx-logo relative inline-block" style={at(0.55)}>
            <Image
              src="/images/logo-zerooito.png"
              alt="Barbearia Zero Oito"
              width={745}
              height={774}
              sizes="(min-width: 1024px) 144px, 112px"
              preload
              className="h-auto w-28 lg:w-36"
            />
            {/* the logo's star catches the light once */}
            <svg aria-hidden="true" viewBox="0 0 24 24" className="star-glint" style={at(1.7)}>
              <path d="M12 1.5l2.9 6.9 7.4.6-5.6 4.9 1.7 7.3L12 17.3l-6.4 3.9 1.7-7.3L1.7 9l7.4-.6z" />
            </svg>
          </div>

          {/* the title in two halves along the cut line, so it can split on scroll */}
          <div className="relative mt-10">
            <motion.div className="title-top" style={live ? { x: topX, opacity: titleOpacity } : undefined}>
              {title(false)}
            </motion.div>
            <motion.div className="title-bottom absolute inset-0" style={live ? { x: bottomX, opacity: titleOpacity } : undefined}>
              {title(true)}
            </motion.div>
          </div>

          <p className="label hx-up mt-5 text-bone-dim" style={at(0.95)}>
            Barbearia · Freguesia, Jacarepaguá
          </p>
          <p className="hx-up mt-6 max-w-[36ch] text-lg leading-relaxed text-bone/85 sm:text-xl" style={at(1.0)}>
            Aqui ninguém sai no improviso. Corte no capricho, barba na toalha quente e cabelo lavado no fim. Senta aí.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <div className="hx-up sheen-once" style={at(1.08)}>
              <GoldCTA />
            </div>
            <a
              href="#servicos"
              className="label hx-up inline-flex min-h-12 items-center text-bone underline decoration-gold decoration-1 underline-offset-[8px] hover:text-gold-hi"
              style={at(1.15)}
            >
              Ver o cardápio
            </a>
          </div>
        </div>

        <motion.div
          className="mx-auto w-full max-w-[340px] lg:col-span-4 lg:col-start-9 lg:mt-24 lg:max-w-none"
          style={live ? { y: videoY } : undefined}
        >
          <motion.div style={depth ? { x: vidX, y: vidY } : undefined}>
            <div className="hx-diag relative" style={at(0.7)}>
              <Reel
                src="/videos/video-experiencia.mp4"
                poster="/videos/video-experiencia-poster.jpg"
                label="O salão da Barbearia Zero Oito e os profissionais atendendo"
                priority
                intro
              />
              <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
                <rect className="frame-draw" style={at(1.0)} x="0" y="0" width="100%" height="100%" rx="18" pathLength={1} />
              </svg>
            </div>
            <p className="label hx-up mt-4 text-bone-dim" style={at(1.2)}>
              Rua Araguaia, 897
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* "Role" cue */}
      <div aria-hidden="true" className="scroll-cue hx-fade label" style={at(1.4)}>
        <span>Role</span>
        <span className="scroll-cue-line">
          <span />
        </span>
      </div>
    </section>
  );
}
