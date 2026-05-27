import { z } from "zod";

export const PropertySchema = z.object({
  propertyCategoryId: z.union([z.coerce.number(), z.literal("")]).optional(),
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  beds: z.coerce.number().min(0, "Beds cannot be negative").optional(),
  bath: z.coerce.number().min(0, "Bath cannot be negative").optional(),
  anna: z.coerce.number().min(0, "Anna cannot be negative").optional(),
  price: z.coerce.number().min(0, "Price is required"),
  images: z.array(z.string()).optional(),
});

export type PropertyFormType = z.infer<typeof PropertySchema>;
