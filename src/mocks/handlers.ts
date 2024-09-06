import { http, HttpResponse } from "msw";
import appEntry from "../appEntry";

import feed from "./data/feed.json";

export const handlers = [
  http.get(`${appEntry.baseUrl}/feed`, ({ request, params, cookies }) => {
    return HttpResponse.json(feed, {
      status: 200,
      statusText: "Success",
    });
  }),
];
