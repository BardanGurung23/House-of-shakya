"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About Us" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
] as const;

export function SideNav() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 80 || path !== "/");
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [path]);

  useEffect(() => setOpen(false), [path]);

  return (
    <>
      {/* Top brand bar */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: shown ? 0 : -20, opacity: shown ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-40 mix-blend-difference"
      >
        <div className="container-luxe flex items-center justify-between py-6">
          <Link href="/" className="font-display text-lg tracking-wide text-white">
            House of Shakya<span className="text-gold">.</span>
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white"
            aria-label="Open menu"
          >
            <span className="hidden sm:inline">Menu</span>
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[60] w-full sm:w-[440px] bg-ink border-l border-border flex flex-col"
          >
            <div className="flex items-center justify-between p-6">
              <span className="eyebrow">Navigation</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center gap-2 px-10">
              {links.map((l, i) => {
                const active = path === l.to || (l.to !== "/" && path.startsWith(l.to));
                return (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.6 }}
                  >
                    <Link href={l.to} className="group flex items-baseline gap-4 py-3">
                      <span className="font-mono text-[10px] text-muted-foreground">0{i + 1}</span>
                      <span
                        className={`font-display text-4xl md:text-5xl font-light transition-colors ${
                          active ? "text-gold" : "text-foreground group-hover:text-gold"
                        }`}
                      >
                        {l.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            <div className="p-10 border-t border-border">
              <div className="eyebrow mb-2">Studio</div>
              <p className="text-sm text-muted-foreground">
                Lalitpur, Nepal
                <br />
                hello@houseofshakya.com
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
