import { Suspense } from "react";
import { DonutDto } from "@/types.ts";
import CommentList from "@/components/CommentList.tsx";
import Donut from "@/components/Donut.tsx";
import CommentLoadingIndicator from "@/components/CommentListLoadingIndicator.tsx";

type DonutDetailProps = {
  donut: DonutDto;
};
export default function DonutDetail({ donut }: DonutDetailProps) {
  return (
    <div className={"DonutDetail"}>
      <Donut donut={donut} />

      <div className={"CommentList"}>
        <h1>What the Snackers Say</h1>
        <Suspense fallback={<CommentLoadingIndicator />}>
          <CommentList donutId={donut.id} />
        </Suspense>
      </div>
    </div>
  );
}
