"use client";

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
