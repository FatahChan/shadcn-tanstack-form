"use client";
import RichTextEditor from "@/components/form-fields/rich-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppForm } from "@/components/ui/tanstack-form";
import { useStore } from "@tanstack/react-form";
import { useCallback, useEffect } from "react";
import type { FormHTMLAttributes } from "react";
import { z } from "zod";

const blogSchema = z.object({
  title: z.string().min(1, {
    message: "Please enter a valid title.",
  }),
  content: z.string(),
});

interface FormProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {}

interface SignUpFormProps extends FormProps {
  onSubmit: (data: z.infer<typeof blogSchema>) => void;
  defaultValues?: z.infer<typeof blogSchema>;
}
function BlogEditor({
  onSubmit,
  defaultValues,
  className,
  ...props
}: SignUpFormProps) {
  const form = useAppForm({
    defaultValues: {
      title: defaultValues?.title ?? "",
      content: defaultValues?.content ?? "",
    },
    validators: { onBlur: blogSchema },
    onSubmit: ({ value }) => {
      onSubmit(value);
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
      <form
        className="mx-auto w-full max-w-lg space-y-6 rounded-lg border p-6"
        onSubmit={handleSubmit}
        noValidate
        {...props}
      >
        <form.AppField
          name="title"
          children={(field) => (
            <field.FormItem>
              <field.FormLabel>Title</field.FormLabel>
              <field.FormControl>
                <Input
                  placeholder="John Doe"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </field.FormControl>
              <field.FormMessage />
            </field.FormItem>
          )}
        />

        <form.AppField
          name="content"
          children={(field) => (
            <field.FormItem>
              <field.FormLabel>Content</field.FormLabel>
              <field.FormControl>
                <RichTextEditor
                  value={field.state.value}
                  onChange={(value) => field.handleChange(value)}
                />
              </field.FormControl>
              <field.FormMessage />
            </field.FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </form.AppForm>
  );
}

BlogEditor.displayName = "BlogEditor";

export default BlogEditor;
