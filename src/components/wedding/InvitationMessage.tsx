import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";
import { Particles, Reveal } from "./effects";

const text =
  "With hearts full of joy and love, we invite you to share in the beginning of our forever. Your presence would make our celebration complete.";

export function InvitationMessage() {
  const words = text.split(" ");
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <div className="absolute inset-0" style={{ background: "var(--gradient-night)" }} />
      <Particles count={14} />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <span className="font-script text-7xl leading-none text-gold/40">&ldquo;</span>
        </Reveal>
        <p className="-mt-6 font-serif text-2xl leading-relaxed text-cream md:text-3xl md:leading-relaxed">
          {words.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
              className="inline-block"
            >
              {w}&nbsp;
            </motion.span>
          ))}
        </p>
        <Reveal delay={0.3} className="mt-10">
          <div className="gold-divider mx-auto w-40" />
          <p className="mt-6 font-script text-4xl text-gradient-gold md:text-5xl">
            {wedding.groom} &amp; {wedding.bride}
          </p>
        </Reveal>
      </div>
    </section>
  );
}