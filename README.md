# Shadcn UI + TanStack Form Integration

A modern, type-safe form management solution that combines the elegant UI components from [Shadcn UI](https://ui.shadcn.com) with the powerful form state management capabilities of [TanStack Form](https://tanstack.com/form).

## Features

- 🎨 Beautiful, accessible UI components from Shadcn UI
- 🔒 Type-safe form management with TanStack Form
- ⚡ Built with React, TypeScript, and Tailwind CSS
- 📱 Responsive design
- 🔄 Real-time form validation
- 🎯 Best practices for form experiences

## Available Components

### Form Blocks
- 🔐 Login Form - Complete authentication form with validation
- 📦 Shipping Info Form - Address and contact information collection
- and more...

### UI Components
- 🔑 Password Input - Secure password field with show/hide functionality
- 📞 Phone Input - International phone number input with formatting
- coming soon...

## Explore

- **[📚 Documentation](https://shadcn-tanstack-form.netlify.app/docs)** - Complete guides and API reference
- **[🧱 Form Blocks](https://shadcn-tanstack-form.netlify.app/blocks)** - Pre-built form examples
- **[🎨 Components](https://shadcn-tanstack-form.netlify.app/components)** - Individual form field components
## Documentation

For comprehensive documentation, examples, and guides, visit:

- **📚 [Full Documentation](https://shadcn-tanstack-form.netlify.app/docs)** - Complete guide with installation, usage examples, and API reference
- **🎨 [Live Demo](https://shadcn-tanstack-form.netlify.app/)** - Interactive examples and component showcase

## Quick Start

### Installation

```bash
npx shadcn@canary add https://shadcn-tanstack-form.netlify.app/r/tanstack-form.json
## optionally install zod
npm install zod
```

> 💡 **Need help?** Check out our [comprehensive documentation](https://shadcn-tanstack-form.netlify.app/docs) for detailed installation instructions and examples.

## Usage

The project demonstrates how to integrate Shadcn UI components with TanStack Form. Here's a basic example:

> 📖 **For more examples and detailed guides**, visit our [documentation page](https://shadcn-tanstack-form.netlify.app/docs).

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppForm } from "@/components/ui/tanstack-form-field";
import { useCallback } from "react";
import { z } from "zod";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export function MyForm() {
  const form = useAppForm({
    validators: { onDynamic: FormSchema },
    onSubmit: ({ value }) => {
      console.log(value);
      // Handle form submission
    },
    defaultValues: {
      username: "",
      email: "",
    },
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
            <field.Field className="space-y-1.5">
              <field.FieldLabel>Username</field.FieldLabel>
              <field.FieldControl>
                <Input
                  placeholder="FatahChan"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </field.FieldControl>
              <field.FieldDescription>
                This is your public display name.
              </field.FieldDescription>
              <field.FieldError />
            </field.Field>
          )}
        />
        <form.AppField
          name="email"
          children={(field) => (
            <field.Field className="space-y-1.5">
              <field.FieldLabel>Email</field.FieldLabel>
              <field.FieldControl>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </field.FieldControl>
              <field.FieldDescription>
                Enter your email address.
              </field.FieldDescription>
              <field.FieldError />
            </field.Field>
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
