import { ZodError, ZodSchema } from "zod";
import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";

import RequestManager from "@/util/requestManager";

export type QueryOptions = { decoder?: ZodSchema };

export type BaseQuery = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  QueryOptions,
  FetchBaseQueryMeta
>;

type QueryResult = Awaited<ReturnType<BaseQuery>>;

type QueryMiddleware = (result: QueryResult, options: QueryOptions) => QueryResult;

function withValidation(result: QueryResult, options: QueryOptions): QueryResult {
  const { data } = result;

  const decoder = options.decoder;

  if (!data || !decoder) return result;

  try {
    result.data = decoder.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error);
      return {
        error: {
          data: data.toString(),
          error: error.toString(),
          originalStatus: result.meta?.response?.status || -1,
          status: "PARSING_ERROR",
        },
      };
    }
    throw error;
  }

  return result;
}

const queryMiddlewares: QueryMiddleware[] = [withValidation];

function withMiddlewares(baseQuery: BaseQuery): BaseQuery {
  return async function (args, api, options) {
    let result = await baseQuery(args, api, options);

    for (const middleware of queryMiddlewares) {
      result = middleware(result, options);
    }

    return result;
  };
}

const fetcher = fetchBaseQuery({ baseUrl: RequestManager.baseUrl });

export const baseQuery = withMiddlewares(fetcher);
