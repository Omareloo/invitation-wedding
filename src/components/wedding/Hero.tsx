import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HiArrowDown } from "react-icons/hi2";
import heroImg from "@/assets/wedding/hero.jpg";
import { wedding } from "@/data/wedding";
import { Particles } from "./effects";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative h-screen overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={heroImg}
          alt="The couple at golden hour"
          width={1920}
          height={1280}
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(120% 80% at 50% 30%, transparent 40%, oklch(0.06 0.004 60 / 0.85) 100%)" }} />
      <Particles count={20} />

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="font-sans text-xs uppercase tracking-[0.5em] text-cream/80 md:text-sm"
        >
          Together with their families
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
          className="mt-6 font-script text-7xl leading-none text-gradient-gold sm:text-8xl md:text-[10rem]"
        >
          {wedding.groom}
          <span className="mx-3 align-middle text-5xl text-rose-gold md:text-7xl">&amp;</span>
          {wedding.bride}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8 flex items-center gap-4"
        >
          <span className="h-px w-16 bg-gold/60" />
          <p className="font-serif text-base tracking-[0.2em] text-cream md:text-lg">
            {wedding.dateLabel}
          </p>
          <span className="h-px w-16 bg-gold/60" />
        </motion.div>

        <motion.a
          href="#story"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="glow-border mt-12 rounded-full bg-gradient-to-r from-gold to-rose-gold px-10 py-4 font-sans text-xs font-medium uppercase tracking-[0.3em] text-primary-foreground"
        >
          Open Invitation
        </motion.a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-gold"
      >
        <HiArrowDown className="h-6 w-6 animate-bounce" />
      </motion.div>
    </section>
  );
}