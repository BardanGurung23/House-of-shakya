"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BannerItem } from "@/types/bannerType";
import { getMediaUrl, isVideoPath } from "../../../../utils/media";
import { getBannerOverlayBackground } from "../../../../utils/color";
import { IMAGE_BASE_URL } from "@/constants";
import { useRef } from "react";

const getHeroTitleParts = (title?: string) => {
  const fallbackTitle = "Built without chaos.";
  const words = (title?.trim() || fallbackTitle).split(/\s+/);

  if (words.length === 1) {
    return {
      lead: "",
      highlight: words[0],
    };
  }

  return {
    lead: words.slice(0, -1).join(" "),
    highlight: words[words.length - 1],
  };
};

export default function HeroBanner({ banner }: { banner?: BannerItem }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const mediaPath = banner?.image || "";
  const mediaUrl = getMediaUrl(IMAGE_BASE_URL, mediaPath);
  const isVideoBanner = banner?.type === "video" || isVideoPath(mediaPath);
  const titleParts = getHeroTitleParts(banner?.title);
  const overlayBackground = getBannerOverlayBackground({
    type: banner?.overlayType,
    color: banner?.overlayColor,
    opacity: banner?.overlayOpacity,
    direction: banner?.overlayDirection,
    gradientStop: "75%",
  });
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-ink">
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        src="https://cdn.coverr.co/videos/coverr-an-empty-luxury-room-7715/1080p.mp4"
        poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
      /> */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink" />
      <div className="absolute inset-0 vignette" /> */}
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
      <div className="relative z-10 container-luxe h-full flex flex-col justify-end pb-20 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div className="eyebrow mb-6">Interior Design · Nepal</div>
          <h1 className="font-display text-[14vw] md:text-[8vw] leading-[0.9] font-light text-balance">
            {titleParts.lead && (
              <>
                {titleParts.lead}
                <br />
              </>
            )}
            <em className="text-gold not-italic">{titleParts.highlight}</em>
          </h1>
          <p className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground">
            {banner?.subTitle}
          </p>
          <div className="mt-10 flex items-center gap-6">
            <Link
              href={banner?.primaryButtonUrl || "/projects"}
              className="group inline-flex items-center gap-3 bg-foreground text-ink px-8 py-4 text-xs uppercase tracking-[0.3em] hover:bg-gold transition-colors"
            >
              {banner?.primaryButton || "Start a Consultation"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={banner?.secondaryButtonUrl || "/about"}
              className="text-xs uppercase tracking-[0.3em] border-b border-border pb-1 hover:border-gold hover:text-gold transition"
            >
              {banner?.secondaryButton || "See our work"}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
