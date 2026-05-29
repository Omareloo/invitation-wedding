import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { HiXMark } from "react-icons/hi2";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { gallery } from "@/data/wedding";
import { Reveal, SectionHeading } from "./effects";

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="Captured Moments" title="Our Gallery" />

        {/* Swiper coverflow slider */}
        <Reveal>
          <Swiper
            modules={[EffectCoverflow, Pagination, Autoplay]}
            effect="coverflow"
            grabCursor
            centeredSlides
            loop
            autoplay={{ delay: 3200, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            coverflowEffect={{ rotate: 0, stretch: 0, depth: 160, modifier: 2.4, slideShadows: false }}
            breakpoints={{ 0: { slidesPerView: 1.2 }, 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3 } }}
            className="!pb-14"
          >
            {gallery.map((img, i) => (
              <SwiperSlide key={i} className="!h-auto">
                <button
                  onClick={() => setActive(i)}
                  className="group block w-full overflow-hidden rounded-2xl glow-border"
                >
                  <img
                    src={img.src}
                    alt={`Wedding photo ${i + 1}`}
                    loading="lazy"
                    className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-110 md:h-96"
                  />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>

        {/* Masonry grid */}
        <div className="mt-10 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
          {gallery.map((img, i) => (
            <Reveal key={`m-${i}`} delay={(i % 3) * 0.08}>
              <button
                onClick={() => setActive(i)}
                className="group block w-full overflow-hidden rounded-2xl"
              >
                <img
                  src={img.src}
                  alt={`Wedding photo ${i + 1}`}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                    img.tall ? "aspect-[3/4]" : "aspect-[4/3]"
                  }`}
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-5 backdrop-blur-sm"
          >
            <button
              aria-label="Close"
              className="absolute right-5 top-5 text-cream/80 transition-colors hover:text-gold"
            >
              <HiXMark className="h-8 w-8" />
            </button>
            <motion.img
              key={active}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ ease: [0.22, 1, 0.36, 1] }}
              src={gallery[active].src}
              alt="Wedding photo"
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-full rounded-2xl object-contain glow-border"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}