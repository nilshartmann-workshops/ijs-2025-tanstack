import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchDonutDetailsOpts } from "@/queries.ts";
import DonutDetail from "@/components/DonutDetail.tsx";
import LoadingIndicator from "@/components/LoadingIndicator.tsx";

export const Route = createFileRoute("/donuts/$donutId")({
  head({ params }) {
    return {
      meta: [
        {
          // TypeSafe!
          title: "Donut " + params.donutId,
        },
      ],
    };
  },
  component: RouteComponent,
  pendingComponent: () => <LoadingIndicator />,
});

function RouteComponent() {
  const { donutId } = Route.useParams();
  //         ^---- TypeSafe!
  const { data: donut } = useSuspenseQuery(fetchDonutDetailsOpts(donutId));

  return <DonutDetail donut={donut} />;
}
