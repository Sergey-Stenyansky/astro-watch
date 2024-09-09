import { createApi } from "@reduxjs/toolkit/query/react";

import { AstroFeedRequest } from "@/services/api/requests";

import { AstroFeedResponseSchema, AstroFeedResponse } from "@/services/api/schema/feed";

import { baseQuery } from "./util/query";

const astroApi = createApi({
  baseQuery,
  endpoints: (builder) => ({
    getAtroFeed: builder.query<AstroFeedResponse, AstroFeedRequest>({
      query: (req) => `feed?start_date=${req.startDate}&end_date=${req.endDate}&api_key=DEMO_KEY`,
      extraOptions: { decoder: AstroFeedResponseSchema },
    }),
  }),
});

export const { useGetAtroFeedQuery } = astroApi;

export default astroApi;
