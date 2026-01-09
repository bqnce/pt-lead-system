import { z } from "zod";

export const leadSchema = z.object({
  slug: z.string().min(1),
  coachName: z.string().min(1),
  emailTo: z.string().email(),
  name: z.string().min(2),
  contact: z.string().min(3),
  goal: z.string().optional(),
  experience: z.string().optional(),
  availability: z.string().optional(),
  message: z.string().optional(),
  website: z.string().optional(),
});

export type LeadPayload = z.infer<typeof leadSchema>;
