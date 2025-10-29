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

export const fetchDonutDetailsOpts = (donutId: string) =>
  queryOptions({
    queryKey: ["donuts", "details", donutId],
    async queryFn() {
      const response = await ky
        // 🤔 what happens, when we slow down here?
        // 🤔 what happens, when we NAVIGATE from donut to LIST and back?
        //    -> Cache!
        // ⚠️ Waterfall: first list, then comments
        .get(`http://localhost:7200/api/donuts/${donutId}?slow=2400`)
        .json();
      return DonutDto.parse(response);
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
      // ACHTUNG! fetchDonutDetailsOpts slow=0 setzen
      const r = await ky
        .get(`http://localhost:7200/api/donuts/${donutId}/comments?slow=2000`)
        .json();
      return DonutCommentDtoList.parse(r);
    },
  });
