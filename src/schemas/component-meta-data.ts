import { z } from "zod";

export const componentMetadataSchema = z.object({
  categories: z.array(z.string()),
  title: z.string(),
  description: z.string(),
  dependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
});

export type ComponentMetadata = z.infer<typeof componentMetadataSchema>;
