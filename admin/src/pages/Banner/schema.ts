import { z } from "zod";

export const BannerSchema = z.object({
  name: z.string().min(1, "Name is Required"),
  video_url: z.string().nullable().optional(),
  bannerItems: z.array(
    z.object({
      image: z.string().min(1, "Media is Required"),
      type: z.enum(["image", "video"]).optional(),
      caption: z.string().optional(),
      title: z.string().min(1, "Title is Required"),
      subTitle: z.string().min(1, "Sub Title is Required"),
      primaryButton: z.string().optional(),
      primaryButtonUrl: z.string().optional(),
      secondaryButton: z.string().optional(),
      secondaryButtonUrl: z.string().optional(),
      overlayType: z.enum(["linear", "solid"]).optional(),
      overlayColor: z.string().optional(),
      overlayOpacity: z.coerce.number().min(0).max(1).optional(),
      overlayDirection: z.string().optional(),
    }),
  ),
});
