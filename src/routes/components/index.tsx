import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Filter } from "lucide-react";
import { z } from "zod";
import registry from "@/../registry.json";
import BlockPreview from "@/components/preview/block-preview";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { registryItemSchema } from "@/schemas/registry-item";
export const Route = createFileRoute("/components/")({
  validateSearch: z.object({
    filter: z.array(z.string()).optional(),
  }),
  loader: () => {
    const components = registry.items.filter(
      (item) => item.type === "registry:component",
    );
    const categories = components.reduce((acc, component) => {
      if (component.categories) {
        for (const category of component.categories) {
          acc.add(category);
        }
      }
      return acc;
    }, new Set<string>());
    const parsedComponents = z.array(registryItemSchema).parse(components);

    return {
      components: parsedComponents,
      categories: Array.from(categories),
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { components, categories } = Route.useLoaderData();
  const { filter } = Route.useSearch();
  const navigate = useNavigate();
  const setFilter = (value: string) => {
    navigate({
      to: "/components",
      search: {
        filter: filter ? [...filter, value] : [value],
      },
      resetScroll: false,
    });
  };
  const removeFilter = (value: string) => {
    navigate({
      to: "/components",
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
      {components
        .filter((component) => {
          if (!filter || filter.length === 0) return true;
          return component.categories?.some((c) => filter.includes(c));
        })
        .map((component) => (
          <BlockPreview key={component.name} {...component} />
        ))}
    </div>
  );
}
