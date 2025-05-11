import registry from "@/../registry.json";
import BlockPreview from "@/components/block-preview";
import { CodeBlock } from "@/components/code-block";
import CodeSnippet from "@/components/code-snippet";
import { Button } from "@/components/ui/button";
import { registryItemSchema } from "@/schemas/registry-item";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/")({
  loader: () => {
    const basicInfoBlock = registry.items.find(
      (block) => block.name === "basic-info",
    );
    if (!basicInfoBlock) {
      throw new Error("Basic info block not found");
    }
    const parsedBasicInfoBlock = registryItemSchema.parse(basicInfoBlock);
    return {
      basicInfoBlock: parsedBasicInfoBlock,
    };
  },
  component: Index,
});

export function Index() {
  const { basicInfoBlock } = Route.useLoaderData();
  return (
    <main className="min-h-screen">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl">
            Shadcn UI + TanStack Form
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg">
            A modern, type-safe form management solution combining{" "}
            <a
              href="https://ui.shadcn.com"
              className="font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Shadcn UI
            </a>{" "}
            and{" "}
            <a
              href="https://tanstack.com/form"
              className="font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              TanStack Form
            </a>
          </p>
          <Button asChild className="mt-8 flex justify-center gap-4">
            <a
              href="https://github.com/FatahChan/shadcn-tanstack-form"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              ⭐ Star on GitHub
            </a>
          </Button>
        </div>

        {/** Get Started */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-2xl">Installation</h3>
          <CodeSnippet
            code={
              "pnpm dlx shadcn@canary add https://shadcn-tanstack-form.netlify.app/r/tanstack-form.json"
            }
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-2xl">Usage</h3>
          {/* Demo Section */}
          <BlockPreview {...basicInfoBlock} />
        </div>

        {/* Footer */}
        <footer className="text-center text-sm">
          Built with ❤️ by{" "}
          <a
            href="https://github.com/fatahchan"
            className="font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            @fatahchan
          </a>
        </footer>
      </div>
    </main>
  );
}
