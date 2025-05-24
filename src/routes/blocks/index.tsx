import registry from "@/../registry.json";
import BlockPreview from "@/components/block-preview";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { registryItemSchema } from "@/schemas/registry-item";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Filter } from "lucide-react";
import { z } from "zod";
export const Route = createFileRoute("/blocks/")({
  validateSearch: z.object({
    filter: z.array(z.string()).optional(),
  }),
  loader: () => {
    const blocks = registry.items.filter(
      (item) => item.type === "registry:block",
    );
    const categories = blocks.reduce((acc, block) => {
      if (block.categories) {
        for (const category of block.categories) {
          acc.add(category);
        }
      }
      return acc;
    }, new Set<string>());
    const parsedBlocks = z.array(registryItemSchema).parse(blocks);

    return {
      blocks: parsedBlocks,
      categories: Array.from(categories),
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { blocks, categories } = Route.useLoaderData();
  const { filter } = Route.useSearch();
  const navigate = useNavigate();
  const setFilter = (value: string) => {
    navigate({
      to: "/blocks",
      search: {
        filter: filter ? [...filter, value] : [value],
      },
      resetScroll: false,
    });
  };
  const removeFilter = (value: string) => {
    navigate({
      to: "/blocks",
      search: {
        filter: filter?.filter((f) => f !== value),
      },
      resetScroll: false,
    });
  };
  return (
    <div className="relative flex flex-col gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="fixed top-[2vw] right-[4vw] z-50 size-12 rounded-4xl">
            <div className="relative">
              <Filter className="size-6" />
              <span className="sr-only">Filter</span>
              {/* <PopoverAnchor className="-top-20 absolute right-4" /> */}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="z-50 flex max-w-sm flex-col">
          {categories
            .filter((category) => category !== "forms")
            .map((category) => (
              <div className="flex items-center gap-1" key={category}>
                <Checkbox
                  id={category}
                  className="size-6"
                  checked={filter?.includes(category)}
                  onCheckedChange={(checked) => {
                    return checked
                      ? setFilter(category)
                      : removeFilter(category);
                  }}
                />
                <Label htmlFor={category} className="p-4 capitalize">
                  {category}
                </Label>
              </div>
            ))}
        </PopoverContent>
      </Popover>
      {blocks
        .filter((block) => {
          if (!filter || filter.length === 0) return true;
          return block.categories?.some((c) => filter.includes(c));
        })
        .map((block) => (
          <BlockPreview key={block.name} {...block} />
        ))}
    </div>
  );
}
