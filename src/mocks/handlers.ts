import { http, HttpResponse } from "msw";
import appEntry from "@/appEntry/index.ts";

import feed from "./data/feed.json";

export const handlers = [
  http.get(`${appEntry.baseUrl}/feed`, () => {
    return HttpResponse.json(feed, {
      status: 200,
      statusText: "Success",
    });
  }),
];
