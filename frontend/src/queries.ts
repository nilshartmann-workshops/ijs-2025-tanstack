import _ky, { HTTPError } from "ky";
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createIsomorphicFn, createServerFn } from "@tanstack/react-start";
import { notFound } from "@tanstack/react-router";
import { DonutCommentDtoList, DonutDto, DonutDtoList } from "@/types";

const ky = _ky.extend({
  retry: 0,
  timeout: 5000,
});

const isOnTheServer = createIsomorphicFn()
  .client((a: string) => {
    console.log("Here is the client", a);
    return false;
  })
  .server((a) => {
    console.log("I'm on the server", a);
    return true;
  });

const loadSingleDonut = createServerFn({ method: "GET" })
  .inputValidator((data) => {
    if (typeof data !== "string") {
      throw new Error("Please specify donutId");
    }
    return data;
  })
  .handler(async ({ data: donutId }) => {
    try {
      console.log("Loading Donut", donutId);
      const response = await ky
        .get(`http://localhost:7200/api/donuts/${donutId}?slow=r10`)
        .json();
      return DonutDto.parse(response);
    } catch (err) {
      if (err instanceof HTTPError && err.response?.status === 404) {
        throw notFound();
      }
      throw err;
    }
  });

export const fetchDonutDetailsOpts = (donutId: string) =>
  queryOptions({
    queryKey: ["donuts", "details", donutId],
    // WHERE IS OUR REQUEST EXECUTED?
    //  -> loaders are isomorphic!!
    //  -> components are rendered both at server AND client
    //  -> using a server function, we can be sure that we're on the serverside

    async queryFn() {
      const isOnServer = isOnTheServer(donutId);
      console.log("Am I on the server", isOnServer);

      return loadSingleDonut({ data: donutId });
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
        .get(`http://localhost:7200/api/donuts/${donutId}/comments?slow=0`)
        .json();
      return DonutCommentDtoList.parse(r);
    },
  });

export const useLikeMutation = (donutId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn() {
      const response = await ky
        .put(`http://localhost:7200/api/donuts/${donutId}/likes`)
        .json();
      return DonutDto.parse(response);
    },
    onSuccess(newValue) {
      // invalidate the donut list
      //  ⚠️ Open LIST and click on like!
      //  ⚠️ Details are re-fetched, thus automatically up-to-date
      //     -> but what happens when we like on the DETAIL page?
      //
      queryClient.invalidateQueries({
        queryKey: fetchDonutListOpts().queryKey.slice(0, 2),
      });

      // we can even set the cache directly => no network call neccessary here
      queryClient.setQueryData(
        fetchDonutDetailsOpts(donutId).queryKey,
        (currentValue) => {
          return newValue;
        },
      );
    },
  });
};
