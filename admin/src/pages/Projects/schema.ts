import { z } from "zod";

const optionalText = z.string().optional().nullable();
const optionalNumber = z.union([z.coerce.number(), z.literal("")]).optional();

export const ProjectsSchema = z.object({
  projectCategoryId: z.union([z.coerce.number(), z.literal("")]).optional(),
  agentId: z.union([z.coerce.number(), z.literal("")]).optional(),
  slug: optionalText,
  type: z.string().min(1, "Type is required"),
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  googleMapURL: z.string().min(1, "Google URL is required"),
  description: z.string().min(1, "Description is required"),
  overview: optionalText,
  address: optionalText,
  price: optionalNumber,
  status: optionalText,
  size: optionalText,
  bedrooms: optionalNumber,
  bathrooms: optionalNumber,
  parking: optionalNumber,
  view: optionalText,
  yearBuilt: optionalNumber,
  completionDate: optionalText,
  latitude: optionalNumber,
  longitude: optionalNumber,
  bannerMedia: optionalText,
  bannerMediaType: z.enum(["image", "video"]).optional().nullable(),
  images: z.array(z.string()).optional(),
  features: z
    .array(
      z.object({
        title: z.string().min(1, "Feature title is required"),
        icon: optionalText,
        sortOrder: optionalNumber,
      }),
    )
    .optional(),
  nearbyPlaces: z
    .array(
      z.object({
        name: z.string().min(1, "Nearby place name is required"),
        type: optionalText,
        distance: optionalText,
        sortOrder: optionalNumber,
      }),
    )
    .optional(),
});

export type ProjectsFormType = z.infer<typeof ProjectsSchema>;
