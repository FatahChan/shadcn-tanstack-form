import { createFileRoute, Link } from "@tanstack/react-router";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Check, Terminal } from "lucide-react";
import CodePanel from "@/components/preview/code-panel";
import CodeSnippet from "@/components/preview/code-snippet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/docs")({
  component: DocsComponent,
});

function DocsComponent() {
  const [cliCopied, cliCopy] = useCopyToClipboard();
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Button asChild variant="outline" className="mb-6">
            <Link to="/">← Back to Home</Link>
          </Button>
          <h1 className="font-extrabold text-4xl sm:text-5xl">Documentation</h1>
          <p className="text-lg text-muted-foreground">
            Learn how to use Shadcn UI + TanStack Form integration in your
            projects.
          </p>
        </div>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="mb-6 font-bold text-3xl">Quick Start</h2>

          <Card className="mb-6 p-6">
            <h3 className="font-semibold text-xl">Installation</h3>
            <p className="text-muted-foreground">
              Install the TanStack Form Field component using the Shadcn CLI:
            </p>
            <Button
              onClick={() =>
                cliCopy(
                  "pnpm dlx shadcn@canary add https://shadcn-tanstack-form.netlify.app/r/tanstack-form-field.json",
                )
              }
              size="lg"
              className="w-full justify-between shadow-none"
              variant="outline"
              aria-label="copy code"
            >
              <span className="hidden font-mono text-xs md:block">
                pnpm dlx shadcn@canary add
                https://shadcn-tanstack-form.netlify.app/r/tanstack-form-field.json
              </span>
              {cliCopied ? (
                <Check className="size-4" />
              ) : (
                <Terminal className="!size-3.5" />
              )}
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-xl">Basic Usage</h3>
            <p className="text-muted-foreground">
              Here's a complete example of how to create a form using the
              TanStack Form integration:
            </p>
            <CodePanel
              name="MyForm"
              defaultHeight={800}
              codeOnly
              codeContent={`import { revalidateLogic } from "@tanstack/react-form";
import { useCallback } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppForm } from "@/components/ui/tanstack-form-field";

const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

function MyForm({ onSubmit }) {
  const form = useAppForm({
    validators: { onDynamic: FormSchema },
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
    defaultValues: {
      email: "",
      username: "",
    },
  });

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      form.handleSubmit();
    },
    [form]
  );

  return (
    <form.AppForm>
      <form onSubmit={handleSubmit} className="space-y-4">
        <form.AppField
          name="email"
          children={(field) => (
            <field.Field className="space-y-2">
              <field.FieldLabel>Email</field.FieldLabel>
              <field.FieldControl>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </field.FieldControl>
              <field.FieldDescription>
                Enter your email address
              </field.FieldDescription>
              <field.FieldError />
            </field.Field>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </form.AppForm>
  );
}`}
            />
          </Card>
        </section>

        {/* API Reference */}
        <section className="mb-12">
          <h2 className="mb-6 font-bold text-3xl">API Reference</h2>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-xl">Form Structure</h3>
              <p className="text-muted-foreground">
                Use form.AppForm as the root and form.AppField for each field.
              </p>
              <CodePanel
                defaultHeight={600}
                name="Form Structure"
                codeOnly
                codeContent={`<form.AppForm>
  <form onSubmit={handleSubmit}>
    <form.AppField
      name="fieldName"
      children={(field) => (
        <field.Field className="space-y-2">
          <field.FieldLabel>Label</field.FieldLabel>
          <field.FieldControl>
            <Input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
          </field.FieldControl>
          <field.FieldDescription>
            Help text for the field
          </field.FieldDescription>
          <field.FieldError />
        </field.Field>
      )}
    />
  </form>
</form.AppForm>`}
              />
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-xl">Field Components</h3>
              <p className="text-muted-foreground">
                Available field components for building accessible forms.
              </p>
              <div className="space-y-2 text-sm">
                <div>
                  <code className="rounded bg-muted px-2 py-1">
                    field.Field
                  </code>{" "}
                  - Field wrapper container
                </div>
                <div>
                  <code className="rounded bg-muted px-2 py-1">
                    field.FieldLabel
                  </code>{" "}
                  - Field label with proper accessibility
                </div>
                <div>
                  <code className="rounded bg-muted px-2 py-1">
                    field.FieldControl
                  </code>{" "}
                  - Input wrapper with validation states
                </div>
                <div>
                  <code className="rounded bg-muted px-2 py-1">
                    field.FieldDescription
                  </code>{" "}
                  - Help text for the field
                </div>
                <div>
                  <code className="rounded bg-muted px-2 py-1">
                    field.FieldError
                  </code>{" "}
                  - Error message display
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Components */}
        <section className="mb-12">
          <h2 className="mb-6 font-bold text-3xl">Available Components</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <h3 className="mb-3 font-semibold text-xl">Form Fields</h3>
              <p className="text-muted-foreground">
                Pre-built form field components with validation and styling.
              </p>
              <Button asChild variant="outline">
                <Link to="/components">View Components</Link>
              </Button>
            </Card>

            <Card className="p-6">
              <h3 className="mb-3 font-semibold text-xl">Form Blocks</h3>
              <p className="text-muted-foreground">
                Complete form examples and patterns for common use cases.
              </p>
              <Button asChild variant="outline">
                <Link to="/blocks">View Blocks</Link>
              </Button>
            </Card>
          </div>
        </section>

        {/* Resources */}
        <section className="mb-12">
          <h2 className="mb-6 font-bold text-3xl">Resources</h2>

          <div className="flex flex-col gap-4">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="mb-2 font-semibold text-xl">
                    TanStack Form Documentation
                  </h3>
                  <p className="text-muted-foreground">
                    Learn more about TanStack Form's powerful features and API.
                  </p>
                </div>
                <Button asChild variant="outline">
                  <a
                    href="https://tanstack.com/form"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Docs
                  </a>
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="mb-2 font-semibold text-xl">Shadcn UI</h3>
                  <p className="text-muted-foreground">
                    Explore the component library that powers our design system.
                  </p>
                </div>
                <Button asChild variant="outline">
                  <a
                    href="https://ui.shadcn.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Docs
                  </a>
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="mb-2 font-semibold text-xl">
                    GitHub Repository
                  </h3>
                  <p className="text-muted-foreground">
                    View the source code, report issues, and contribute to the
                    project.
                  </p>
                </div>
                <Button asChild variant="outline">
                  <a
                    href="https://github.com/FatahChan/shadcn-tanstack-form"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t pt-8 text-center text-muted-foreground text-sm">
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
    </div>
  );
}
