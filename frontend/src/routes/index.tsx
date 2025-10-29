import { createFileRoute } from "@tanstack/react-router";
import LandingPage from "@/components/LandingPage.tsx";

export const Route = createFileRoute("/")({
  component: LandingPage,
});
