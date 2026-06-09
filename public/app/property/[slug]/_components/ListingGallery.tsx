"use client";

import { ChevronLeft, ChevronRight, Images, Play } from "lucide-react";
import { useState } from "react";
import { isVideoPath } from "@/utils/media";

export type ListingMedia = {
  src: string;
  alt: string;
  type?: "image" | "video";
};

const isVideoMedia = (media: ListingMedia) => {
  return media.type === "video" || isVideoPath(media.src);
};

const MediaView = ({
  media,
  className,
  controls = false,
}: {
  media: ListingMedia;
  className: string;
  controls?: boolean;
}) => {
  if (isVideoMedia(media)) {
    return (
      <video
        src={media.src}
        className={className}
        controls={controls}
        muted={!controls}
        playsInline
        preload="metadata"
      />
    );
  }

  return (
    <img
      src={media.src}
      alt={media.alt}
      className={className}
      width={1200}
      height={760}
      loading="lazy"
    />
  );
};

export default function ListingGallery({ images }: { images: ListingMedia[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] || images[0];
  const sideImages = images
    .filter((_, index) => index !== activeIndex)
    .slice(0, 2);

  const previous = () => {
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const next = () => {
    setActiveIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  if (!activeImage) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 lg:grid-cols-[1.35fr_0.8fr]">
        <div className="relative overflow-hidden rounded-lg bg-navy-deep">
          <MediaView
            media={activeImage}
            className="h-[320px] w-full object-cover md:h-[520px]"
            controls={isVideoMedia(activeImage)}
          />
          <button
            type="button"
            onClick={previous}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-navy-deep shadow-card transition-colors hover:bg-gold"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-navy-deep shadow-card transition-colors hover:bg-gold"
          >
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-cream px-3 py-1 text-xs font-semibold text-navy-deep">
            <Images size={14} />
            {activeIndex + 1} / {images.length}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {sideImages.map((image) => (
            <div
              key={image.src}
              className="overflow-hidden rounded-lg bg-cream"
            >
              <MediaView
                media={image}
                className="h-[156px] w-full object-cover md:h-[254px]"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 md:grid-cols-6">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`relative overflow-hidden rounded border transition-all ${
              index === activeIndex
                ? "border-forest"
                : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <MediaView media={image} className="h-20 w-full object-cover" />
            {isVideoMedia(image) && (
              <span className="absolute inset-0 flex items-center justify-center bg-navy-deep/25 text-cream">
                <Play size={16} fill="currentColor" />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
