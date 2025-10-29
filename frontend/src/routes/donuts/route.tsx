import { Outlet, createFileRoute } from "@tanstack/react-router";
import NavBar from "@/components/NavBar.tsx";

export const Route = createFileRoute("/donuts")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <NavBar />
      <Outlet />
    </main>
  );
}
