import { string, object, number, boolean, record, z, array } from "zod";

export const MeasureSchema = object({
  estimated_diameter_min: number(),
  estimated_diameter_max: number(),
}).transform(function decoder(obj: any) {
  return { diameterMin: obj.estimated_diameter_min, diameterMax: obj.estimated_diameter_max };
});

export type MeasureInterface = z.infer<typeof MeasureSchema>;

export const LinksSchema = object({
  next: string().optional(),
  previous: string().optional(),
  self: string().optional(),
});

export type LinksInterface = z.infer<typeof LinksSchema>;

export const DiameterMeasures = object({
  kilometers: MeasureSchema.optional(),
  meters: MeasureSchema.optional(),
  miles: MeasureSchema.optional(),
  feet: MeasureSchema.optional(),
});

export type DiameterMeasuresInterface = z.infer<typeof DiameterMeasures>;

export const CloseApproachDataSchema = object({
  close_approach_date: string(),
  close_approach_date_full: string(),
  epoch_date_close_approach: number(),
  relative_velocity: object({
    kilometers_per_second: string(),
    kilometers_per_hour: string(),
    miles_per_hour: string(),
  }),
  miss_distance: object({
    astronomical: string(),
    lunar: string(),
    kilometers: string(),
    miles: string(),
  }),
  orbiting_body: string(),
}).transform((obj) => {
  return {
    closeApproachDate: obj.close_approach_date,
    closeApproachDateFull: obj.close_approach_date_full,
    epochDateCloseApproach: obj.epoch_date_close_approach,
    relativeVelocity: {
      kilometersPerSecond: obj.relative_velocity.kilometers_per_second,
      kilometersPerHour: obj.relative_velocity.kilometers_per_hour,
      milesPerHour: obj.relative_velocity.miles_per_hour,
    },
    missDistance: {
      astronomical: obj.miss_distance.astronomical,
      lunar: obj.miss_distance.lunar,
      kilometers: obj.miss_distance.kilometers,
      miles: obj.miss_distance.miles,
    },
    orbitingDody: obj.orbiting_body,
  };
});

export type CloseApproachDataInterface = z.infer<typeof CloseApproachDataSchema>;

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
}).transform((obj) => {
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
});

export type AstroObjectInterface = z.infer<typeof AstroObjectSchema>;

const NearObjectsSchema = record(string(), array(AstroObjectSchema));

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
