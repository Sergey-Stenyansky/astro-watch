import { createApi } from "@reduxjs/toolkit/query/react";

import { AstroFeedRequest } from "@/services/api/requests";

import { AstroFeedResponseSchema, AstroFeedResponse } from "@/services/api/schema/feed";

import { baseQuery } from "./util/query";

import deployment from "@/deployment/deployment.json";
import { AstroDetailResponse, AstroDetailResponseSchema } from "./schema/asteroidDetail";

const getApiKey = () => deployment.envConfigs[deployment.env as "development"].apiKey;

const astroApi = createApi({
  baseQuery,
  tagTypes: ["feed", "neo"],
  endpoints: (builder) => ({
    getAtroFeed: builder.query<AstroFeedResponse, AstroFeedRequest>({
      query: (req) => ({
        url: "feed",
        params: {
          start_date: req.startDate,
          end_date: req.endDate,
          api_key: getApiKey(),
        },
      }),
      providesTags: ["feed"],
      extraOptions: { decoder: AstroFeedResponseSchema },
    }),
    getAtroDetail: builder.query<AstroDetailResponse, number>({
      query: (id) => ({
        url: `neo/${id}`,
        params: {
          api_key: getApiKey(),
        },
      }),
      providesTags: ["neo"],
      extraOptions: { decoder: AstroDetailResponseSchema },
    }),
  }),
});

export const { useGetAtroFeedQuery, useGetAtroDetailQuery } = astroApi;

export default astroApi;
