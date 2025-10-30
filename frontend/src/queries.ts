import _ky, { HTTPError } from "ky";
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { notFound } from "@tanstack/react-router";
import { DonutCommentDtoList, DonutDto, DonutDtoList } from "@/types";

const ky = _ky.extend({
  retry: 0,
  timeout: 5000,
});

const loadDonut = createServerFn({ method: "GET" })
  .inputValidator((data) => {
    if (typeof data !== "string") {
      throw new Error("no");
    }

    return data;
  })
  .handler(async ({ data: donutId }) => {
    const response = await ky
      .get(`http://localhost:7200/api/donuts/${donutId}?slow=0`)
      .json();
    return DonutDto.parse(response);
  });

export const fetchDonutDetails = (donutId: string) =>
  queryOptions({
    queryKey: ["donut", "details", donutId],
    async queryFn() {
      return loadDonut({
        data: donutId,
      });
    },
  });

type FetchDonutListOptsArgs = "" | "name" | "likes";

export const fetchDonutListOpts = (orderBy: FetchDonutListOptsArgs = "") =>
  queryOptions({
    queryKey: ["donuts", "list", { orderBy }],
    async queryFn() {
      const response = await ky
        .get("http://localhost:7200/api/donuts?orderBy=" + orderBy)
        .json();
      return DonutDtoList.parse(response);
    },
  });

export const fetchCommentsOpts = (donutId: string) =>
  queryOptions({
    queryKey: ["donuts", "detail", donutId, "comments"],
    async queryFn() {
      const r = await ky
        .get(`http://localhost:7200/api/donuts/${donutId}/comments?slow=2000`)
        .json();
      return DonutCommentDtoList.parse(r);
    },
  });
