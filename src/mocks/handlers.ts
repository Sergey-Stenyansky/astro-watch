import { http, HttpResponse } from "msw";
import RequestManager from "@/util/requestManager";

import feed from "./data/feed.json";
import asyncTimeout from "@/util/asyncTimeout";

export const handlers = [
  http.get(`${RequestManager.baseUrl}/feed`, async () => {
    await asyncTimeout(300);
    return HttpResponse.json(feed, {
      status: 200,
      statusText: "Success",
    });
  }),
];
