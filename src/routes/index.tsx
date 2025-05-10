import { InputForm } from "@/components/input-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { PrismAsyncLight } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

export const Route = createFileRoute("/")({
  component: Index,
});

const installation = `npx shadcn@latest add ${window.location.origin}${import.meta.env.VITE_BASE_URL ?? ""}/r/tanstack-form.json`;
const usage = `import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppForm } from "@/components/ui/tanstack-form";
import { useCallback } from "react";
import { z } from "zod";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function InputForm() {
  const form = useAppForm({
    validators: { onChange: FormSchema },
    defaultValues: {
      username: "",
    },
    onSubmit: ({ value }) => console.log(value),
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();
      form.handleSubmit();
    },
    [form],
  );
  return (
    <form.AppForm>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <form.AppField
          name="username"
          children={(field) => (
            <field.FormItem>
              <field.FormLabel>Username</field.FormLabel>
              <field.FormControl>
                <Input
                  placeholder="FatahChan"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </field.FormControl>
              <field.FormDescription>
                This is your public display name.
              </field.FormDescription>
              <field.FormMessage />
            </field.FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </form.AppForm>
  );
}
`;
export function Index() {
  return (
    <main className="dark min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl">
            Shadcn UI + TanStack Form
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            A modern, type-safe form management solution combining{" "}
            <a
              href="https://ui.shadcn.com"
              className="font-medium text-primary hover:text-primary/80"
              target="_blank"
              rel="noopener noreferrer"
            >
              Shadcn UI
            </a>{" "}
            and{" "}
            <a
              href="https://tanstack.com/form"
              className="font-medium text-primary hover:text-primary/80"
              target="_blank"
              rel="noopener noreferrer"
            >
              TanStack Form
            </a>
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="https://github.com/FatahChan/shadcn-tanstack-form"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90"
              target="_blank"
              rel="noopener noreferrer"
            >
              ⭐ Star on GitHub
            </a>
          </div>
        </div>

        {/* Demo Section */}
        <div className="mt-16 space-y-8">
          <Card className="overflow-hidden border-2 border-muted bg-muted/5">
            <CardHeader className="px-4 py-2">
              <CardTitle className="font-medium text-sm">
                Interactive Demo
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-2">
              <InputForm />
            </CardContent>
          </Card>

          {/* Installation & Usage */}
          <div className="space-y-6">
            <div className="rounded-lg border-2 border-muted bg-muted/5 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-xl">Installation</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(installation)}
                >
                  Copy
                </Button>
              </div>
              <PrismAsyncLight language="bash" style={dracula}>
                {installation}
              </PrismAsyncLight>
            </div>

            <div className="rounded-lg border-2 border-muted bg-muted/5 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-xl">Usage</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(usage)}
                >
                  Copy
                </Button>
              </div>
              <PrismAsyncLight language="jsx" style={dracula}>
                {usage}
              </PrismAsyncLight>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-muted-foreground text-sm">
          Built with ❤️ by{" "}
          <a
            href="https://github.com/fatahchan"
            className="font-medium text-primary hover:text-primary/80"
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
