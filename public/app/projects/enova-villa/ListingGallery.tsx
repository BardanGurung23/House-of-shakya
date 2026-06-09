"use client";

import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
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

const GalleryTile = ({
  image,
  index,
  className,
  onOpen,
}: {
  image: ListingMedia;
  index: number;
  className: string;
  onOpen: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group relative h-[260px] overflow-hidden rounded-xl bg-cream text-left shadow-card ${className}`}
      aria-label={`Open gallery media ${index + 1}`}
    >
      <MediaView
        media={image}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {isVideoMedia(image) && (
        <span className="absolute inset-0 flex items-center justify-center text-cream">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-deep/65 backdrop-blur">
            <Play size={18} fill="currentColor" />
          </span>
        </span>
      )}
    </button>
  );
};

export default function ListingGallery({ images }: { images: ListingMedia[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const activeImage = images[activeIndex] || images[0];
  const galleryImages = images.slice(0, 6);
  const tileClasses = [
    "md:h-[420px]",
    "md:h-[180px]",
    "md:h-[180px]",
    "md:h-[255px]",
    "md:h-[255px]",
    "md:h-[245px]",
  ];

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
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 ">
          <div className="text-center">
            <h2 className="text-4xl font-light leading-tight text-navy-deep md:text-5xl">
              The best tour of this property
            </h2>
            <p className="font-serif text-4xl italic leading-tight text-navy-deep md:text-5xl">
              in gallery photos
            </p>
          </div>
        </div>

        <div className="grid gap-7 md:grid-cols-[0.9fr_1.3fr]">
          <div className="grid gap-7">
            {[0, 1, 2].map((imageIndex) => {
              const image = galleryImages[imageIndex];
              if (!image) return null;

              return (
                <GalleryTile
                  key={image.src}
                  image={image}
                  index={imageIndex}
                  className={tileClasses[imageIndex]}
                  onOpen={() => {
                    setActiveIndex(imageIndex);
                    setIsPreviewOpen(true);
                  }}
                />
              );
            })}
          </div>

          <div className="grid gap-7">
            {galleryImages[3] && (
              <GalleryTile
                image={galleryImages[3]}
                index={3}
                className={tileClasses[3]}
                onOpen={() => {
                  setActiveIndex(3);
                  setIsPreviewOpen(true);
                }}
              />
            )}
            <div className="grid gap-7 sm:grid-cols-2">
              {[4, 5].map((imageIndex) => {
                const image = galleryImages[imageIndex];
                if (!image) return null;

                return (
                  <GalleryTile
                    key={image.src}
                    image={image}
                    index={imageIndex}
                    className={tileClasses[imageIndex]}
                    onOpen={() => {
                      setActiveIndex(imageIndex);
                      setIsPreviewOpen(true);
                    }}
                  />
                );
              })}
            </div>
            {galleryImages[0] && (
              <GalleryTile
                image={galleryImages[0]}
                index={0}
                className="md:h-[245px]"
                onOpen={() => {
                  setActiveIndex(0);
                  setIsPreviewOpen(true);
                }}
              />
            )}
          </div>
        </div>
      </div>

      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/90 p-4 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setIsPreviewOpen(false)}
            aria-label="Close gallery preview"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 bg-cream/10 text-cream transition-colors hover:bg-forest"
          >
            <X size={18} />
          </button>
          <button
            type="button"
            onClick={previous}
            aria-label="Previous image"
            className="absolute left-5 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 bg-cream/10 text-cream transition-colors hover:bg-forest md:flex"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute right-5 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 bg-cream/10 text-cream transition-colors hover:bg-forest md:flex"
          >
            <ChevronRight size={18} />
          </button>
          <div className="w-full max-w-6xl">
            <div className="overflow-hidden rounded-xl bg-black">
              <MediaView
                media={activeImage}
                className="max-h-[78vh] w-full object-contain"
                controls={isVideoMedia(activeImage)}
              />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-cream">
              <div>
                <p className="text-sm font-semibold">{activeImage.alt}</p>
                <p className="mt-1 text-xs text-cream/60">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(images.length).padStart(2, "0")}
                </p>
              </div>
              <div className="flex gap-2 md:hidden">
                <button
                  type="button"
                  onClick={previous}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 bg-cream/10"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 bg-cream/10"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
