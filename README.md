# Shadcn UI + TanStack Form Integration

A modern, type-safe form management solution that combines the elegant UI components from [Shadcn UI](https://ui.shadcn.com) with the powerful form state management capabilities of [TanStack Form](https://tanstack.com/form).

## Features

- 🎨 Beautiful, accessible UI components from Shadcn UI
- 🔒 Type-safe form management with TanStack Form
- ⚡ Built with React, TypeScript, and Tailwind CSS
- 📱 Responsive design
- 🔄 Real-time form validation
- 🎯 Best practices for form experiences

## Installation

```bash
npx shadcn@latest add https://fatahchan.github.io/shadcn-tanstack-form/r/tanstack-form.json
```

## Usage

The project demonstrates how to integrate Shadcn UI components with TanStack Form. Here's a basic example:

```tsx
import { Button } from "@/components/ui/button";
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
```

## Development

```bash
# Run development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Format code
pnpm format

# Lint code
pnpm lint

# Check and fix code
pnpm check
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Author

[@fatahchan](https://github.com/fatahchan)
