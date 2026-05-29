import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import type { ReactNode } from "react";

/* Scroll progress bar pinned to top */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-gold via-rose-gold to-gold"
    />
  );
}

/* Soft golden cursor glow (desktop only) */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    let raf = 0;
    const move = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${e.clientX - 200}px, ${e.clientY - 200}px, 0)`;
      });
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[55] hidden h-[400px] w-[400px] rounded-full opacity-60 mix-blend-screen blur-3xl md:block"
      style={{
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--gold) 35%, transparent) 0%, transparent 60%)",
      }}
    />
  );
}

/* Floating glowing particles */
export function Particles({ count = 26 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        size: 2 + Math.random() * 5,
        delay: Math.random() * 14,
        duration: 12 + Math.random() * 12,
        opacity: 0.3 + Math.random() * 0.5,
      })),
    [count],
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full bg-gold"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            boxShadow: "0 0 10px color-mix(in oklab, var(--gold) 80%, transparent)",
            animation: `rise ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* Floating hearts/petals */
export function FloatingHearts({ count = 14 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        size: 12 + Math.random() * 18,
        delay: Math.random() * 12,
        duration: 14 + Math.random() * 10,
        opacity: 0.25 + Math.random() * 0.45,
      })),
    [count],
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-0 text-rose-gold"
          style={{
            left: `${p.left}%`,
            fontSize: p.size,
            opacity: p.opacity,
            animation: `rise ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          ❤
        </span>
      ))}
    </div>
  );
}

/* Scroll-reveal wrapper */
export function Reveal({
  children,
  delay = 0,
  y = 36,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Decorative gold section heading with script eyebrow */
export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
      <p className="font-script text-3xl text-gold md:text-4xl">{eyebrow}</p>
      <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-cream md:text-5xl">
        {title}
      </h2>
      <div className="mx-auto mt-6 flex items-center justify-center gap-3">
        <span className="h-px w-12 bg-gold/60" />
        <span className="text-gold">✦</span>
        <span className="h-px w-12 bg-gold/60" />
      </div>
    </Reveal>
  );
}

/* tiny hook to detect mount for client-only effects */
export function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}