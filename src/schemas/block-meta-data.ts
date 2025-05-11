import { z } from "zod";

export const blockMetadataSchema = z.object({
  categories: z.array(z.string()),
  title: z.string(),
  description: z.string(),
  dependencies: z.array(z.string()),
  registryDependencies: z.array(z.string()),
});

export type BlockMetadata = z.infer<typeof blockMetadataSchema>;
