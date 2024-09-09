import { http, HttpResponse } from "msw";
import RequestManager from "@/util/request";

import feed from "./data/feed.json";

export const handlers = [
  http.get(`${RequestManager.baseUrl}/feed`, () => {
    return HttpResponse.json(feed, {
      status: 200,
      statusText: "Success",
    });
  }),
];
