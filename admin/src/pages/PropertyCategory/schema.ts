import { z } from "zod";

export const PropertyCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type PropertyCategoryFormType = z.infer<typeof PropertyCategorySchema>;
