import { string, object, number, record, z, array } from "zod";

import { LinksSchema } from "./links";
import { AstroObjectTransformedSchema } from "./astroObject";

const NearObjectsSchema = record(string(), array(AstroObjectTransformedSchema));

type NearObjects = z.infer<typeof NearObjectsSchema>;

function aggregateByDate(nearEarthObjects: NearObjects) {
  return Object.entries(nearEarthObjects).flatMap(([date, objects]) => {
    return objects.map((o) => ({ date, ...o }));
  });
}

export const AstroFeedResponseSchema = object({
  links: LinksSchema,
  element_count: number(),
  near_earth_objects: NearObjectsSchema,
}).transform((obj) => {
  return {
    links: obj.links,
    elementCount: obj.element_count,
    nearEarthObjects: aggregateByDate(obj.near_earth_objects),
  };
});

export type AstroFeedResponse = z.infer<typeof AstroFeedResponseSchema>;
