import registry from "@/../registry.json";
import BlockPreview from "@/components/block-preview";
import { registryItemSchema } from "@/schemas/registry-item";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
export const Route = createFileRoute("/blocks/")({
  loader: () => {
    const blocks = registry.items.filter(
      (item) => item.type === "registry:block",
    );

    const parsedBlocks = z.array(registryItemSchema).parse(blocks);

    return {
      blocks: parsedBlocks,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { blocks } = Route.useLoaderData();
  return (
    <div className="flex flex-col gap-4">
      {blocks.map((block) => (
        <BlockPreview key={block.name} {...block} />
      ))}
    </div>
  );
}
