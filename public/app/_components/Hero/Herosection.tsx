"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { IMAGE_BASE_URL } from "@/constants";
import { getBannerOverlayBackground } from "@/utils/color";
import { getMediaUrl, isVideoPath } from "@/utils/media";
import { BannerItem } from "@/utils/propertyMapper";

const words = [
  "Building Trust.",
  "Creating Homes.",
  "Shaping Nepal's\nFuture of Housing.",
];

export default function HeroSection({
  banner,
}: {
  banner?: BannerItem | null;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const primaryButton = banner?.primaryButton?.trim();
  const secondaryButton = banner?.secondaryButton?.trim();
  const mediaPath = banner?.image || "";
  const mediaUrl = getMediaUrl(IMAGE_BASE_URL, mediaPath);
  const isVideoBanner = banner?.type === "video" || isVideoPath(mediaPath);
  const overlayBackground = getBannerOverlayBackground({
    type: banner?.overlayType,
    color: banner?.overlayColor,
    opacity: banner?.overlayOpacity,
    direction: banner?.overlayDirection,
    gradientStop: "75%",
  });

  return (
    <section
      ref={ref}
      className="relative h-svh min-h-[640px] overflow-hidden flex items-center justify-center"
    >
      {/* Background image with parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
        {isVideoBanner ? (
          <video
            src={mediaUrl}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={mediaUrl}
            alt="Aerial view of premium housing development in Pokhara, Nepal"
            className="w-full h-full object-cover"
            fetchPriority="high"
            width={1800}
            height={1200}
          />
        )}
        {/* Hero overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: overlayBackground,
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full mt-[13rem]"
      >
        {/* Headline */}
        <div className="overflow-hidden">
          {(banner?.title ? [banner.title] : words).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.85,
                delay: 0.35 + i * 0.14,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-tight text-cream"
                style={{ lineHeight: 1.1 }}
              >
                {line.split("\n").map((part, j) => (
                  <span
                    key={j}
                    className={j === 1 ? "block text-forest" : "block"}
                  >
                    {part}
                  </span>
                ))}
              </h1>
            </motion.div>
          ))}
        </div>

        {/* Subcopy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-6 text-base md:text-lg text-cream/70 max-w-md leading-relaxed"
        >
          {banner?.subTitle}
        </motion.p>

        {/* CTAs */}
        {(primaryButton || secondaryButton) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            {primaryButton && (
              <Link
                href={banner?.primaryButtonUrl || "/projects"}
                className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold rounded bg-forest text-cream hover:bg-forest-deep transition-all duration-200"
                style={{
                  boxShadow: "0 4px 24px oklch(0.42 0.09 155 / 0.35)",
                }}
              >
                {primaryButton}
              </Link>
            )}
            {secondaryButton && (
              <Link
                href={banner?.secondaryButtonUrl || "/contact"}
                className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold rounded border border-cream/30 text-cream hover:border-cream hover:bg-cream/10 transition-all duration-200"
              >
                {secondaryButton}
              </Link>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/40"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} className="scroll-bounce" />
      </motion.div>
    </section>
  );
}
