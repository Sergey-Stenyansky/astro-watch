import { string, object, number, z } from "zod";

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
