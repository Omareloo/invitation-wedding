import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HiMiniMusicalNote, HiMiniPause } from "react-icons/hi2";

/*
 * Soft ambient instrumental generated with the Web Audio API so no external
 * audio asset is required. Plays a gentle, slowly-evolving major chord pad
 * with smooth fade in/out. Drop-in: replace with an <audio> element if you
 * have your own track.
 */
function useAmbientMusic() {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const nodesRef = useRef<OscillatorNode[]>([]);
  const lfoRef = useRef<OscillatorNode | null>(null);

  const start = useCallback(() => {
    if (ctxRef.current) {
      void ctxRef.current.resume();
      masterRef.current?.gain.cancelScheduledValues(ctxRef.current.currentTime);
      masterRef.current?.gain.setTargetAtTime(0.16, ctxRef.current.currentTime, 1.2);
      return;
    }
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AC();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    // gentle low-pass for warmth
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1100;
    filter.connect(master);

    // soft major 9 chord (C E G B D) — calming and romantic
    const freqs = [130.81, 164.81, 196.0, 246.94, 293.66];
    const oscs = freqs.map((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = i % 2 === 0 ? "sine" : "triangle";
      osc.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = 0.18 / freqs.length + i * 0.005;
      osc.connect(g);
      g.connect(filter);
      osc.start();
      return osc;
    });

    // slow tremolo to keep it alive
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.05;
    lfo.connect(lfoGain);
    lfoGain.connect(master.gain);
    lfo.start();

    master.gain.setTargetAtTime(0.16, ctx.currentTime, 1.5);

    ctxRef.current = ctx;
    masterRef.current = master;
    nodesRef.current = oscs;
    lfoRef.current = lfo;
  }, []);

  const stop = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setTargetAtTime(0, ctx.currentTime, 0.6);
  }, []);

  useEffect(() => {
    return () => {
      try {
        nodesRef.current.forEach((o) => o.stop());
        lfoRef.current?.stop();
        void ctxRef.current?.close();
      } catch {
        /* noop */
      }
    };
  }, []);

  return { start, stop };
}

export function MusicPlayer({ autoStart }: { autoStart: boolean }) {
  const { start, stop } = useAmbientMusic();
  const [playing, setPlaying] = useState(false);

  // Try to autoplay once the invitation opens; browsers may block until a
  // user gesture, so we also start on first interaction.
  useEffect(() => {
    if (!autoStart) return;
    const tryStart = () => {
      start();
      setPlaying(true);
      window.removeEventListener("pointerdown", tryStart);
    };
    // attempt immediately, fall back to first interaction
    try {
      start();
      setPlaying(true);
    } catch {
      window.addEventListener("pointerdown", tryStart, { once: true });
    }
    return () => window.removeEventListener("pointerdown", tryStart);
  }, [autoStart, start]);

  const toggle = () => {
    if (playing) {
      stop();
      setPlaying(false);
    } else {
      start();
      setPlaying(true);
    }
  };

  return (
    <motion.button
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      className="glass-card fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-gold transition-colors hover:text-cream"
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{ boxShadow: playing ? "var(--shadow-gold)" : "none" }}
      />
      {playing ? (
        <HiMiniPause className="relative h-6 w-6" />
      ) : (
        <HiMiniMusicalNote className="relative h-6 w-6" />
      )}
      {playing && (
        <span className="absolute inset-0 animate-ping rounded-full border border-gold/40" />
      )}
    </motion.button>
  );
}