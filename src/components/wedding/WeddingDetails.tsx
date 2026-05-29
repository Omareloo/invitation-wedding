import { motion } from "framer-motion";
import { HiCalendarDays, HiClock, HiMapPin, HiSparkles, HiPhone } from "react-icons/hi2";
import { wedding } from "@/data/wedding";
import { Reveal, SectionHeading } from "./effects";

const details = [
  { icon: HiCalendarDays, label: "The Date", value: wedding.dateLabel },
  { icon: HiClock, label: "The Time", value: wedding.timeLabel },
  { icon: HiMapPin, label: "The Venue", value: `${wedding.venue}\n${wedding.venueAddress}` },
  { icon: HiSparkles, label: "Dress Code", value: wedding.dressCode },
  { icon: HiPhone, label: "Contact", value: wedding.contact },
];

export function WeddingDetails() {
  return (
    <section id="details" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeading eyebrow="The Celebration" title="Wedding Details" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {details.map((d, i) => (
            <Reveal key={d.label} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -8 }}
                className="glass-card group h-full rounded-2xl p-7 text-center transition-shadow hover:shadow-[var(--shadow-gold)]"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-primary-foreground">
                  <d.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-script text-2xl text-gold">{d.label}</h3>
                <p className="mt-2 whitespace-pre-line font-sans text-sm leading-relaxed text-cream/85">
                  {d.value}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}