import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { AstroFeedRequest } from "./requests";

import { AstroFeedResponseSchema, AstroFeedResponse } from "./schema";

const astroApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.nasa.gov/neo/rest/v1/" }),
  endpoints: (builder) => ({
    getAtroFeed: builder.query<AstroFeedResponse, AstroFeedRequest>({
      query: (req) => `feed?start_date=${req.startDate}&end_date=${req.endDate}&api_key=DEMO_KEY`,
      transformResponse: (res) => {
        const { data, error } = AstroFeedResponseSchema.safeParse(res);
        if (error) {
          return null!;
        }
        return data;
      },
    }),
  }),
});

export const { useGetAtroFeedQuery } = astroApi;

export default astroApi;
