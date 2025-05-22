import { Schema } from "effect";
import { z } from "zod";

export const registryItemSchema = z.record(z.unknown()).and(
  z.object({
    name: z.string(),
    type: z.union([
      z.literal("registry:lib"),
      z.literal("registry:block"),
      z.literal("registry:component"),
      z.literal("registry:ui"),
      z.literal("registry:hook"),
      z.literal("registry:theme"),
      z.literal("registry:page"),
      z.literal("registry:file"),
      z.literal("registry:style"),
    ]),
    description: z.string().optional(),
    title: z.string().optional(),
    author: z.string().optional(),
    dependencies: z.array(z.string()).optional(),
    devDependencies: z.array(z.string()).optional(),
    registryDependencies: z.array(z.string()).optional(),
    files: z
      .array(
        z.record(z.unknown()).and(
          z.object({
            path: z.string().optional(),
            content: z.string().optional(),
            type: z
              .union([
                z.literal("registry:lib"),
                z.literal("registry:block"),
                z.literal("registry:component"),
                z.literal("registry:ui"),
                z.literal("registry:hook"),
                z.literal("registry:theme"),
                z.literal("registry:page"),
                z.literal("registry:file"),
              ])
              .optional(),
            target: z.string().optional(),
          }),
        ),
      )
      .optional(),
    tailwind: z
      .record(z.unknown())
      .and(
        z.object({
          config: z
            .record(z.unknown())
            .and(
              z.object({
                content: z.array(z.string()).optional(),
                theme: z.record(z.unknown()).optional(),
                plugins: z.array(z.string()).optional(),
              }),
            )
            .optional(),
        }),
      )
      .optional(),
    cssVars: z
      .record(z.unknown())
      .and(
        z.object({
          theme: z.record(z.string()).optional(),
          light: z.record(z.string()).optional(),
          dark: z.record(z.string()).optional(),
        }),
      )
      .optional(),
    css: z
      .record(
        z.union([
          z.string(),
          z.record(z.union([z.string(), z.record(z.string())])),
        ]),
      )
      .optional(),
    meta: z.record(z.unknown()).optional(),
    docs: z.string().optional(),
    categories: z.array(z.string()).optional(),
    extends: z.string().optional(),
  }),
);

export type RegistryItem = z.infer<typeof registryItemSchema>;
