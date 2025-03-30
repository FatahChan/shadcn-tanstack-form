import { InputForm } from "@/components/input-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { createFileRoute } from "@tanstack/react-router";
import { PrismAsyncLight } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
export const Route = createFileRoute("/")({
  component: Index,
});

const installation = `npx shadcn@latest add ${window.location.origin}${import.meta.env.VITE_BASE_URL}/r/tanstack-form.json`;
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
    <main className="mx-auto w-4xl p-8">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <h1 className="mb-4 text-center font-bold text-2xl">
          Shadcn UI + TanStack Form Integration
        </h1>
        <p className="text-muted-foreground">
          This project showcases the integration of{" "}
          <a
            href="https://ui.shadcn.com"
            className="underline hover:text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shadcn UI
          </a>{" "}
          components with{" "}
          <a
            href="https://tanstack.com/form"
            className="underline hover:text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            TanStack Form
          </a>
          , creating a modern, type-safe form management solution. It combines
          elegant, accessible UI components with powerful form state management
          and validation capabilities. Built with React, TypeScript, and
          Tailwind CSS, this project demonstrates best practices for building
          robust form experiences.
        </p>
        <p className="mt-4 text-muted-foreground text-sm">
          Built by{" "}
          <a
            href="https://github.com/fatahchan"
            className="underline hover:text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            @fatahchan
          </a>
        </p>
      </div>
      <Card className="mx-auto w-sm">
        <CardHeader>
          <CardTitle>Input Form</CardTitle>
        </CardHeader>
        <CardContent>
          <InputForm />
        </CardContent>
      </Card>
      <div className="relative">
        <Label className="text-3xl">Installation </Label>
        <Button
          className="absolute top-0 right-0"
          onClick={() => navigator.clipboard.writeText(installation)}
        >
          Copy
        </Button>
        <PrismAsyncLight language="bash" style={materialDark}>
          {installation}
        </PrismAsyncLight>
      </div>
      <div className="relative">
        <Label className="text-3xl">Usage</Label>
        <Button
          className="absolute top-0 right-0"
          onClick={() => navigator.clipboard.writeText(usage)}
        >
          Copy
        </Button>
        <PrismAsyncLight language="jsx" style={materialDark}>
          {usage}
        </PrismAsyncLight>
      </div>
    </main>
  );
}
