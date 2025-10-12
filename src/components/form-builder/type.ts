import z from "zod";

export const FormFieldSchema = z.object({
  type: z.string(),
  name: z.string(),
  variant: z.string().optional(),
  label: z.string().optional(),
  placeholder: z.string().optional(),
  description: z.string().optional(),
  disabled: z.boolean().optional(),
  required: z.boolean().optional(),
  className: z.string().optional(),
});

export const FormFieldsSchema = z.object({
  fields: z.array(z.union([FormFieldSchema, z.array(FormFieldSchema)])),
});

export type FormField = z.infer<typeof FormFieldSchema>;
export type FormFields = z.infer<typeof FormFieldsSchema>;
