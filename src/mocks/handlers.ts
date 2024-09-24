import { http, HttpResponse } from "msw";
import RequestManager from "@/util/requestManager";

import feed from "./data/feed.json";
import detail from "./data/detail.json";
import browse from "./data/browse.json";
import asyncTimeout from "@/util/asyncTimeout";

export const handlers = [
  http.get(`${RequestManager.baseUrl}/feed`, async () => {
    await asyncTimeout(300);
    return HttpResponse.json(feed, {
      status: 200,
      statusText: "Success",
    });
  }),
  http.get(`${RequestManager.baseUrl}/neo/*`, async () => {
    await asyncTimeout(300);
    return HttpResponse.json(detail, {
      status: 200,
      statusText: "Success",
    });
  }),
  http.get(`${RequestManager.baseUrl}/browse`, async () => {
    await asyncTimeout(300);
    return HttpResponse.json(browse, {
      status: 200,
      statusText: "Success",
    });
  }),
];
