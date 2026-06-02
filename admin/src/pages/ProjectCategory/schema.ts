import { z } from "zod";

export const ProjectCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type ProjectCategoryFormType = z.infer<typeof ProjectCategorySchema>;
