import { createFileRoute } from "@tanstack/react-router";

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
});

function RouteComponent() {
  const { donutId } = Route.useParams();
  //         ^---- TypeSafe!
  return <div>Hello Donut with Id {donutId}</div>;
}
