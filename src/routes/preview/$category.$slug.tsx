import { createFileRoute } from "@tanstack/react-router";
import { lazy, use, useEffect, useState } from "react";

export const Route = createFileRoute("/preview/$category/$slug")({
  beforeLoad: ({ params }) => {
    return {
      category: params.category,
      slug: params.slug,
    };
  },
  loader: ({ params }) => {
    return {
      category: params.category,
      slug: params.slug,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { category, slug } = Route.useLoaderData();
  const Component = use(
    import(`../../registry/new-york/blocks/${category}/${slug}.tsx`).then(
      (module) => module.default,
    ),
  );

  return (
    <div className="p-4">
      <Component />
    </div>
  );
}
