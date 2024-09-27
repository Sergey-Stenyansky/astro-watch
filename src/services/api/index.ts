import { createApi } from "@reduxjs/toolkit/query/react";

import { AstroBrowseRequest, AstroFeedRequest } from "@/services/api/requests";

import { AstroFeedResponseSchema, AstroFeedResponse } from "@/services/api/schema/feed";

import { baseQuery } from "./util/query";

import deployment from "@/deployment/deployment.json";
import { AstroDetailResponse, AstroDetailResponseSchema } from "./schema/detail";

import { AstroBrowseResponse, AstroBrowseResponseSchema } from "./schema/browse";

const getApiKey = () => deployment.envConfigs[deployment.env as "development"].apiKey;

const astroApi = createApi({
  baseQuery,
  tagTypes: ["feed", "neo", "neo/browse"],
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
    getAstroBrowse: builder.query<AstroBrowseResponse, AstroBrowseRequest>({
      query: ({ page, perPage }) => ({
        url: "neo/browse",
        params: {
          api_key: getApiKey(),
          page,
          number: perPage,
        },
      }),
      providesTags: ["neo/browse"],
      extraOptions: { decoder: AstroBrowseResponseSchema },
    }),
  }),
});

export const { useGetAtroFeedQuery, useGetAtroDetailQuery, useGetAstroBrowseQuery } = astroApi;

export default astroApi;
