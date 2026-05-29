import { motion } from "framer-motion";
import { HiMapPin } from "react-icons/hi2";
import { wedding } from "@/data/wedding";
import { Reveal, SectionHeading } from "./effects";

export function MapSection() {
  const q = encodeURIComponent(wedding.mapQuery);
  const embed = `https://www.google.com/maps?q=${q}&output=embed`;
  const open = `https://www.google.com/maps/search/?api=1&query=${q}`;

  return (
    <section id="map" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeading eyebrow="Find Your Way" title="The Location" />
        <Reveal>
          <div className="glass-card glow-border overflow-hidden rounded-3xl p-2">
            <div className="relative overflow-hidden rounded-2xl">
              <iframe
                title="Wedding venue location"
                src={embed}
                loading="lazy"
                className="h-[320px] w-full grayscale-[0.3] contrast-110 md:h-[440px]"
                style={{ border: 0 }}
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20" />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15} className="mt-8 text-center">
          <p className="font-serif text-lg text-cream">{wedding.venue}</p>
          <p className="mt-1 font-sans text-sm text-muted-foreground">{wedding.venueAddress}</p>
          <motion.a
            href={open}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-rose-gold px-7 py-3 font-sans text-xs uppercase tracking-[0.25em] text-primary-foreground"
          >
            <HiMapPin className="h-4 w-4" /> Open in Google Maps
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}