import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  fetchCommentsOpts,
  fetchDonutDetails,
  fetchDonutListOpts,
} from "@/queries.ts";
import DonutDetail from "@/components/DonutDetail.tsx";
import LoadingIndicator from "@/components/LoadingIndicator.tsx";

export const Route = createFileRoute("/donuts/$donutId")({
  async loader({ params, context }) {
    context.queryClient.ensureQueryData(fetchCommentsOpts(params.donutId));

    return context.queryClient.ensureQueryData(
      fetchDonutDetails(params.donutId),
    );
  },

  component: RouteComponent,
  pendingComponent: () => <LoadingIndicator />,
});

function RouteComponent() {
  const { donutId } = Route.useParams();

  const { data: donut } = useSuspenseQuery(fetchDonutDetails(donutId));

  return <DonutDetail donut={donut} />;
}
