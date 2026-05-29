import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";
import { FloatingHearts } from "./effects";

export function ThankYou() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gradient-night)" }} />
      <FloatingHearts count={16} />
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 px-6 text-center"
      >
        <p className="font-sans text-xs uppercase tracking-[0.5em] text-gold/80">
          From our hearts
        </p>
        <h2 className="mt-4 font-script text-6xl text-gradient-gold md:text-8xl">Thank You</h2>
        <p className="mx-auto mt-8 max-w-xl font-serif text-lg italic leading-relaxed text-cream/85 md:text-xl">
          &ldquo;And so the adventure begins. Thank you for being part of our story —
          your love and blessings mean the world to us.&rdquo;
        </p>
        <div className="gold-divider mx-auto mt-10 w-40" />
        <p className="mt-6 font-script text-3xl text-gold">
          {wedding.groom} &amp; {wedding.bride}
        </p>
      </motion.div>
    </section>
  );
}