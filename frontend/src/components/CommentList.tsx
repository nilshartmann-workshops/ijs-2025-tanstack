import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import LoadingIndicator from "@/components/LoadingIndicator.tsx";
import { DonutCommentDtoList } from "@/types.ts";

type CommentListProps = {
  donutId: string;
};

export default function CommentList({ donutId }: CommentListProps) {
  // todo:
  // load comments from backend
  //
  // ----> copy into src/queries.ts:
  // export const fetchCommentsOpts = (donutId: string) =>
  //   queryOptions({
  //     queryKey: ["donuts", "detail", donutId, "comments"],
  //     async queryFn() {
  //       const r = await ky
  //         .get(`http://localhost:7200/api/donuts/${donutId}/comments`)
  //         .json();
  //       return DonutCommentDtoList.parse(r);
  //     },
  //   });
  //  -------------------------------
  //  ----> remove this line:
  const comments: DonutCommentDtoList = [];
  //  ----> ...and use this line instead to load comments here:
  // const { data: comments } = useSuspenseQuery(fetchCommentsOpts(donutId));

  return comments.map((c) => (
    <div key={c.id} className={"CommentItem"}>
      <p>
        {c.text} <span className={"text-dough"}>({c.author})</span>
      </p>
    </div>
  ));
}
