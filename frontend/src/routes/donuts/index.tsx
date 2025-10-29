import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import DonutList from "@/components/DonutList.tsx";
import { fetchDonutListOpts } from "@/queries.ts";

export const Route = createFileRoute("/donuts/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: donuts } = useSuspenseQuery(fetchDonutListOpts());

  return (
    <div className={"DonutListRouteComponent"}>
      <DonutList donuts={donuts} />
    </div>
  );
}
