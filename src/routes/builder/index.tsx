import { createFileRoute } from "@tanstack/react-router";
import { Builder } from "@/components/form-builder/builder";

export const Route = createFileRoute("/builder/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Builder />;
}
