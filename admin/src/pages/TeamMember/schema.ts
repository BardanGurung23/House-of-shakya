import { z } from "zod";

const optionalString = z.string().optional().nullable();

export const TeamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  designation: z.string().min(1, "Designation is required"),
  bio: optionalString,
  image: optionalString,
  email: z
    .string()
    .email("Invalid email")
    .optional()
    .or(z.literal(""))
    .nullable(),
  phone: optionalString,
  linkedinUrl: optionalString,
  sortOrder: z.preprocess(
    (value) => (value === "" || value === null ? 0 : Number(value)),
    z.number().optional(),
  ),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export type TeamMemberFormType = z.infer<typeof TeamMemberSchema>;
