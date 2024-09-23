import { string, object, z } from "zod";

export const LinksSchema = object({
  next: string().optional(),
  previous: string().optional(),
  self: string().optional(),
});

export type LinksInterface = z.infer<typeof LinksSchema>;
