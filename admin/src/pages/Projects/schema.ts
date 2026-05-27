import { z } from "zod";

export const ProjectsSchema = z.object({
  type: z.string().min(1, "Type is required"),
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
  img: z.string().optional(),
});

export type ProjectsFormType = z.infer<typeof ProjectsSchema>;
