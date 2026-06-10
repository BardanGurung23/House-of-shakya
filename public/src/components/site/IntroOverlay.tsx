"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const KEY = "hos_intro_seen_v1";

export function IntroOverlay() {
  const [stage, setStage] = useState<"prompt" | "playing" | "done">("done");
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!sessionStorage.getItem(KEY)) setStage("prompt");
  }, []);

  const start = (withSound: boolean) => {
    setMuted(!withSound);
    setStage("playing");
    setTimeout(() => finish(), 5800);
  };

  const finish = () => {
    sessionStorage.setItem(KEY, "1");
    setStage("done");
  };

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-ink text-foreground"
        >
          {stage === "prompt" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex h-full w-full flex-col items-center justify-center px-6 text-center"
            >
              <div className="eyebrow mb-6">House of Shakya</div>
              <h2 className="font-display text-3xl md:text-5xl font-light text-balance max-w-2xl">
                Experience the studio with sound.
              </h2>
              <p className="mt-4 text-sm text-muted-foreground max-w-md">
                A short cinematic introduction. Best with audio on.
              </p>
              <div className="mt-12 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => start(true)}
                  className="group inline-flex items-center gap-3 bg-foreground px-8 py-4 text-ink text-xs uppercase tracking-[0.3em] hover:bg-gold transition-colors"
                >
                  <Volume2 className="h-4 w-4" /> Enter with sound
                </button>
                <button
                  onClick={() => start(false)}
                  className="inline-flex items-center gap-3 border border-border px-8 py-4 text-xs uppercase tracking-[0.3em] hover:border-foreground transition-colors"
                >
                  <VolumeX className="h-4 w-4" /> Continue silent
                </button>
              </div>
              <button
                onClick={finish}
                className="mt-10 text-[11px] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground"
              >
                Skip intro
              </button>
            </motion.div>
          )}

          {stage === "playing" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative h-full w-full overflow-hidden"
            >
              <video
                autoPlay
                muted={muted}
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
                src="https://cdn.coverr.co/videos/coverr-an-empty-luxury-room-7715/1080p.mp4"
                poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
              />
              <div className="absolute inset-0 bg-ink/40" />
              <div className="absolute inset-0 vignette" />
              <div className="relative z-10 flex h-full w-full items-end justify-between p-8 md:p-12">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1 }}
                >
                  <div className="eyebrow">est. Kathmandu</div>
                  <div className="font-display text-2xl md:text-4xl font-light mt-2">
                    Built without chaos.
                  </div>
                </motion.div>
                <button
                  onClick={finish}
                  className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground"
                >
                  Skip
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
