export type BannerItem = {
  image?: string | null;
  type?: "image" | "video" | string | null;
  title?: string;
  subTitle?: string;
  primaryButton?: string;
  primaryButtonUrl?: string;
  secondaryButton?: string;
  secondaryButtonUrl?: string;
  overlayType?: "linear" | "solid" | string | null;
  overlayColor?: string | null;
  overlayOpacity?: number | string | null;
  overlayDirection?: string | null;
};
