import { AnimatePresence, motion } from "framer-motion";
import { wedding } from "@/data/wedding";
import { Particles } from "./effects";

export function Loader({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div
            className="absolute inset-0"
            style={{ background: "var(--gradient-night)" }}
          />
          <Particles count={18} />
          <div className="relative z-10 px-6 text-center">
            <motion.p
              className="font-script text-2xl text-gold md:text-3xl"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              The Wedding of
            </motion.p>
            <motion.h1
              className="mt-3 font-script text-6xl text-gradient-gold md:text-8xl"
              initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.5, duration: 1.1, ease: "easeOut" }}
            >
              {wedding.groom} &amp; {wedding.bride}
            </motion.h1>
            <motion.div
              className="mx-auto mt-10 h-px w-48 overflow-hidden bg-gold/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                className="h-full bg-gold"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ delay: 1, duration: 1.6, ease: "easeInOut", repeat: Infinity }}
              />
            </motion.div>
            <motion.p
              className="mt-6 font-sans text-xs uppercase tracking-[0.4em] text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Preparing a beautiful moment
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}