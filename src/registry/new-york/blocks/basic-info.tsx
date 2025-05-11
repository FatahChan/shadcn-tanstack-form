"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppForm } from "@/components/ui/tanstack-form";
import { Textarea } from "@/components/ui/textarea";
import { useCallback } from "react";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  age: z.number().min(8, {
    message: "Age must be at least 18 years.",
  }),
  bio: z.string().max(160, {
    message: "Bio must not exceed 160 characters.",
  }),
});

function BasicInfoForm() {
  const form = useAppForm({
    validators: { onBlur: FormSchema },
    defaultValues: {
      username: "",
      email: "",
      age: 0,
      bio: "",
    },
    onSubmit: ({ formApi, value }) => {
      formApi.reset();
      toast.success(<span>Username: {value.username}</span>);
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
        className="@container mx-auto w-full max-w-lg space-y-8 rounded-md border p-4 py-10"
        onSubmit={handleSubmit}
      >
        <div className="grid @md:grid-cols-2 grid-cols-1 items-start gap-4">
          <form.AppField
            name="username"
            children={(field) => (
              <field.FormItem className="space-y-1.5">
                <field.FormLabel>Username</field.FormLabel>
                <field.FormControl>
                  <Input
                    placeholder="FatahChan"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                </field.FormControl>
                <field.FormDescription className="text-xs">
                  This is your public display name.
                </field.FormDescription>
                <field.FormMessage className="text-xs" />
              </field.FormItem>
            )}
          />
          <form.AppField
            name="email"
            children={(field) => (
              <field.FormItem className="space-y-1.5">
                <field.FormLabel>Email</field.FormLabel>
                <field.FormControl>
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                </field.FormControl>
                <field.FormDescription className="text-xs">
                  Enter your email address for account verification.
                </field.FormDescription>
                <field.FormMessage className="text-xs" />
              </field.FormItem>
            )}
          />
          <form.AppField
            name="age"
            children={(field) => (
              <field.FormItem className="space-y-1.5">
                <field.FormLabel>Age</field.FormLabel>
                <field.FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    onBlur={field.handleBlur}
                  />
                </field.FormControl>
                <field.FormDescription className="text-xs">
                  Must be at least 18 years old.
                </field.FormDescription>
                <field.FormMessage className="text-xs" />
              </field.FormItem>
            )}
          />
          <form.AppField
            name="bio"
            children={(field) => (
              <field.FormItem className="space-y-1.5">
                <field.FormLabel>Bio</field.FormLabel>
                <field.FormControl>
                  <Textarea
                    placeholder="Tell us about yourself"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                </field.FormControl>
                <field.FormDescription className="text-xs">
                  A brief description about yourself (optional).
                </field.FormDescription>
                <field.FormMessage className="text-xs" />
              </field.FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>
    </form.AppForm>
  );
}

BasicInfoForm.displayName = "BasicInfoForm";

export default BasicInfoForm;
