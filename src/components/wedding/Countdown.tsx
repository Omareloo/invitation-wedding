import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";
import { Reveal, SectionHeading, useMounted } from "./effects";

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown() {
  const mounted = useMounted();
  const target = new Date(wedding.date).getTime();
  const [time, setTime] = useState(() => getRemaining(target));

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <section id="countdown" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-5">
        <SectionHeading eyebrow="Counting Every Moment" title="Until We Say I Do" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {units.map((u, i) => (
            <Reveal key={u.label} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                className="glass-card glow-border relative flex flex-col items-center rounded-2xl px-4 py-8"
              >
                <span className="font-serif text-4xl font-bold text-gradient-gold tabular-nums md:text-6xl">
                  {mounted ? String(u.value).padStart(2, "0") : "--"}
                </span>
                <span className="mt-2 font-sans text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:text-xs">
                  {u.label}
                </span>
              </motion.div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3} className="mt-10 text-center">
          <p className="font-serif text-lg italic text-cream/80">{wedding.dateLabel}</p>
        </Reveal>
      </div>
    </section>
  );
}