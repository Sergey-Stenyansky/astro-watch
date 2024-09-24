import { string, object, number, boolean, z, array } from "zod";

import { CloseApproachDataSchema } from "./closeApproachData";

import { LinksSchema } from "./links";

export const MeasureSchema = object({
  estimated_diameter_min: number(),
  estimated_diameter_max: number(),
}).transform(function (obj) {
  return { diameterMin: obj.estimated_diameter_min, diameterMax: obj.estimated_diameter_max };
});

export type MeasureInterface = z.infer<typeof MeasureSchema>;

export const DiameterMeasures = object({
  kilometers: MeasureSchema.optional(),
  meters: MeasureSchema.optional(),
  miles: MeasureSchema.optional(),
  feet: MeasureSchema.optional(),
});

export type DiameterMeasuresInterface = z.infer<typeof DiameterMeasures>;

export const AstroObjectSchema = object({
  links: LinksSchema,
  id: string(),
  neo_reference_id: string(),
  name: string(),
  nasa_jpl_url: string(),
  absolute_magnitude_h: number(),
  estimated_diameter: DiameterMeasures,
  is_potentially_hazardous_asteroid: boolean(),
  close_approach_data: array(CloseApproachDataSchema),
  is_sentry_object: boolean(),
});

export const convertAstroObject = (obj: z.infer<typeof AstroObjectSchema>) => {
  return {
    links: obj.links,
    id: obj.id,
    neoReferenceId: obj.neo_reference_id,
    name: obj.name,
    nasaJplUrl: obj.nasa_jpl_url,
    absoluteMagnitudeH: obj.absolute_magnitude_h,
    estimatedDiameter: obj.estimated_diameter,
    isPotentiallyHazardous: obj.is_potentially_hazardous_asteroid,
    isSentryObject: obj.is_sentry_object,
    closeApproachData: obj.close_approach_data,
  };
};

export const AstroObjectTransformedSchema = AstroObjectSchema.transform(convertAstroObject);

export type AstroObjectInterface = z.infer<typeof AstroObjectTransformedSchema>;
