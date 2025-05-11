import { createFileRoute } from "@tanstack/react-router";
import { lazy, use, useEffect, useState } from "react";

export const Route = createFileRoute("/preview/$name")({
  beforeLoad: ({ params }) => {
    return {
      name: params.name,
    };
  },
  loader: ({ params }) => {
    return {
      name: params.name,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const Component = use(
    import(
      `../../registry/new-york/blocks/${Route.useLoaderData().name}.tsx`
    ).then((m) => m.default),
  );
  if (!Component) return null;
  return (
    <div className="p-4">
      <Component />
    </div>
  );
}
