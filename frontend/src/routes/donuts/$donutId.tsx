import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import ky from "ky";
import { DonutDto } from "@/types.ts";
import DonutDetail from "@/components/DonutDetail.tsx";
import { fetchCommentsOpts, fetchDonutDetailOpts } from "@/queries.ts";
import LoadingIndicator from "@/components/LoadingIndicator.tsx";

export const Route = createFileRoute("/donuts/$donutId")({
  component: RouteComponent,
  pendingComponent: LoadingIndicator,
  onError: (err) => {
    // https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#handling-errors-with-routeoptionsonerror
    console.log("ERROR in $donutId loader: ", err);
  },
  loader({ context, params }) {
    // Zeigen:
    //  -> Cache: Hin- und Her navigieren ist jetzt flink
    //  -> Queries werden beim Routen-wechsel IMMER
    //     ausgeführt, auch wenn Daten aus dem Cache
    //     kommen

    context.queryClient.ensureQueryData(fetchCommentsOpts(params.donutId));
    // make sure Donut Detail is SSR'ed on SERVER
    return context.queryClient.ensureQueryData(
      fetchDonutDetailOpts(params.donutId),
    );
  },
  head(ctx) {
    return {
      meta: [
        {
          title: `${ctx.loaderData!.name} - Donutigram`,
        },
      ],
    };
  },
});

function RouteComponent() {
  const { donutId } = Route.useParams();

  const { data: donut } = useSuspenseQuery(fetchDonutDetailOpts(donutId));

  return <DonutDetail donut={donut} />;
}
