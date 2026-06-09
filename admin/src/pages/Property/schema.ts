import { z } from "zod";

const optionalText = z.string().optional().nullable();
const optionalNumber = z
  .union([z.coerce.number(), z.literal("")])
  .optional()
  .nullable();

export const PropertySchema = z.object({
  propertyCategoryId: z.union([z.coerce.number(), z.literal("")]).optional(),
  agentId: z.union([z.coerce.number(), z.literal("")]).optional().nullable(),
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  description: optionalText,
  overview: optionalText,
  address: optionalText,
  beds: optionalNumber,
  bath: optionalNumber,
  anna: optionalNumber,
  price: z.coerce.number().min(0, "Price is required"),
  status: optionalText,
  size: optionalText,
  parking: optionalNumber,
  view: optionalText,
  yearBuilt: optionalNumber,
  completionDate: optionalText,
  latitude: optionalNumber,
  longitude: optionalNumber,
  googleMapURL: optionalText,
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

export type PropertyFormType = z.infer<typeof PropertySchema>;
