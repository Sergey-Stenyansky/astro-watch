import { object, number, z, array } from "zod";

import { LinksSchema } from "./links";

import { AstroObjectSchema } from "./astroObject";
import { OrbitalDataSchema } from "./orbitalData";

import { convertAstroObject } from "./astroObject";

export const PaginationSchema = object({
  size: number(),
  total_elements: number(),
  total_pages: number(),
  number: number(),
}).transform((o) => ({
  size: o.size,
  totalElements: o.total_elements,
  totalPages: o.total_pages,
  number: o.number,
}));

export const AstroObjectExtendedSchema = AstroObjectSchema.extend({
  orbital_data: OrbitalDataSchema,
}).transform((o) => ({
  ...convertAstroObject(o),
  orbitalData: o.orbital_data,
}));

export const AstroBrowseResponseSchema = object({
  links: LinksSchema,
  page: PaginationSchema,
  near_earth_objects: array(AstroObjectExtendedSchema),
}).transform((o) => {
  return {
    links: o.links,
    page: o.page,
    nearEarthObjects: o.near_earth_objects,
  };
});

export type AstroBrowseResponse = z.infer<typeof AstroBrowseResponseSchema>;
