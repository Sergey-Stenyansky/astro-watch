import { z } from "zod";
import { AstroObjectSchema, convertAstroObject } from "./astroObject";
import { OrbitalDataSchema } from "./orbitalData";

export const AstroDetailResponseSchema = AstroObjectSchema.extend({
  orbital_data: OrbitalDataSchema,
}).transform((o) => ({
  ...convertAstroObject(o),
  orbitalData: o.orbital_data,
}));

export type AstroDetailResponse = z.infer<typeof AstroDetailResponseSchema>;
