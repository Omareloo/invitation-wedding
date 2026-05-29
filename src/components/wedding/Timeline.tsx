import { motion } from "framer-motion";
import { timeline } from "@/data/wedding";
import { Particles, Reveal, SectionHeading } from "./effects";

export function Timeline() {
  return (
    <section id="story" className="relative overflow-hidden py-24 md:py-32">
      <Particles count={12} />
      <div className="relative mx-auto max-w-5xl px-5">
        <SectionHeading eyebrow="Our Journey" title="The Love Story" />

        <div className="relative">
          {/* center line */}
          <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-16 md:space-y-24">
            {timeline.map((item, i) => {
              const left = i % 2 === 0;
              return (
                <div
                  key={item.title}
                  className={`relative flex flex-col gap-6 md:flex-row md:items-center ${
                    left ? "" : "md:flex-row-reverse"
                  }`}
                >
                  {/* node */}
                  <span className="absolute left-5 top-2 z-10 h-4 w-4 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_16px_var(--gold)] md:left-1/2" />

                  {/* image */}
                  <motion.div
                    initial={{ opacity: 0, x: left ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="ml-10 w-full overflow-hidden rounded-2xl md:ml-0 md:w-1/2"
                  >
                    <div className="group relative overflow-hidden rounded-2xl glow-border">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        width={900}
                        height={1100}
                        className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110 md:h-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  </motion.div>

                  {/* text */}
                  <Reveal
                    delay={0.15}
                    className={`ml-10 w-full md:ml-0 md:w-1/2 ${left ? "md:pl-12" : "md:pr-12 md:text-right"}`}
                  >
                    <p className="font-script text-4xl text-gold">{item.year}</p>
                    <h3 className="mt-1 font-serif text-2xl font-semibold text-cream md:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
                      {item.description}
                    </p>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}