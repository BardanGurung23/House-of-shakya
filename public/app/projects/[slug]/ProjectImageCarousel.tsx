"use client";

import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useState } from "react";
import { isVideoPath } from "@/utils/media";

type ProjectImage = {
  src: string;
  alt: string;
  type?: "image" | "video";
};

const isVideoMedia = (media: ProjectImage) => {
  return media.type === "video" || isVideoPath(media.src);
};

export default function ProjectImageCarousel({
  images,
}: {
  images: ProjectImage[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  };

  if (!activeImage) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-lg bg-navy-deep">
        {isVideoMedia(activeImage) ? (
          <video
            src={activeImage.src}
            className="h-[360px] w-full object-cover md:h-[540px]"
            controls
            playsInline
            preload="metadata"
          />
        ) : (
          <img
            src={activeImage.src}
            alt={activeImage.alt}
            className="h-[360px] w-full object-cover md:h-[540px]"
            width={1400}
            height={900}
          />
        )}
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{
            background:
              "linear-gradient(to top, oklch(0.18 0.05 255 / 0.65), transparent)",
          }}
        />
        <div className="absolute bottom-4 left-4 rounded-full bg-cream px-3 py-1 text-xs font-semibold text-navy-deep">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(images.length).padStart(2, "0")}
        </div>
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            type="button"
            onClick={goToPrevious}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 bg-navy-deep/70 text-cream transition-colors duration-200 hover:bg-forest"
            aria-label="Previous project image"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 bg-navy-deep/70 text-cream transition-colors duration-200 hover:bg-forest"
            aria-label="Next project image"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`overflow-hidden rounded border transition-all duration-200 ${
              activeIndex === index
                ? "border-forest"
                : "border-transparent opacity-70 hover:opacity-100"
            }`}
            aria-label={`Show project image ${index + 1}`}
          >
            {isVideoMedia(image) ? (
              <span className="relative block">
                <video
                  src={image.src}
                  className="h-20 w-full object-cover md:h-28"
                  muted
                  playsInline
                  preload="metadata"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-navy-deep/25 text-cream">
                  <Play size={16} fill="currentColor" />
                </span>
              </span>
            ) : (
              <img
                src={image.src}
                alt={image.alt}
                className="h-20 w-full object-cover md:h-28"
                width={400}
                height={260}
                loading="lazy"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
