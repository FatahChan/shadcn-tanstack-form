"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppForm } from "@/components/ui/tanstack-form";
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
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  bio: z.string().max(160, {
    message: "Bio must not exceed 160 characters.",
  }),
});

export function InputForm() {
  const form = useAppForm({
    validators: { onChange: FormSchema },
    defaultValues: {
      username: "",
      email: "",
      password: "",
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
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
            name="password"
            children={(field) => (
              <field.FormItem className="space-y-1.5">
                <field.FormLabel>Password</field.FormLabel>
                <field.FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                </field.FormControl>
                <field.FormDescription className="text-xs">
                  Must be at least 8 characters long.
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
                  <Input
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
