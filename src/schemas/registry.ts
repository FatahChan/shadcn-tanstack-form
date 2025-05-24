import { z } from "zod";

export const registrySchema = z
  .object({ name: z.string(), homepage: z.string(), items: z.array(z.any()) })
  .describe("A shadcn registry of components, hooks, pages, etc.");
