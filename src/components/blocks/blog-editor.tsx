"use client";
import { revalidateLogic } from "@tanstack/react-form";
import type { FormHTMLAttributes } from "react";
import { useCallback } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/ui/rich-text";
import { useAppForm } from "@/components/ui/tanstack-form-field";

const blogSchema = z.object({
  title: z.string().min(1, {
    message: "Please enter a valid title.",
  }),
  content: z.string(),
});

interface FormProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {}

interface BlogEditorProps extends FormProps {
  onSubmit: (data: z.infer<typeof blogSchema>) => void;
  defaultValues?: z.infer<typeof blogSchema>;
}
function BlogEditor({
  onSubmit,
  defaultValues,
  className,
  ...props
}: BlogEditorProps) {
  const form = useAppForm({
    defaultValues: {
      title: defaultValues?.title ?? "",
      content: defaultValues?.content ?? "",
    },
    validators: { onDynamic: blogSchema },
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
    onSubmit: ({ formApi, value }) => {
      onSubmit(value);
      toast.success("Blog post created successfully!");
      formApi.reset();
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
            <field.Field>
              <field.FieldLabel>Title</field.FieldLabel>
              <field.FieldControl>
                <Input
                  placeholder="Enter blog title..."
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </field.FieldControl>
              <field.FieldError />
            </field.Field>
          )}
        />

        <form.AppField
          name="content"
          children={(field) => (
            <field.Field>
              <field.FieldLabel>Content</field.FieldLabel>
              <field.FieldControl>
                <RichTextEditor
                  value={field.state.value}
                  onChange={(value) => field.handleChange(value)}
                />
              </field.FieldControl>
              <field.FieldError />
            </field.Field>
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
