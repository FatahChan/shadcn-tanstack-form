import fs from "node:fs";
import path from "node:path";
import {
  type BlockMetadata,
  blockMetadataSchema,
} from "@/schemas/block-meta-data";
import type { RegistryItem } from "@/schemas/registry-item";

async function createItemRegistry(
  file: fs.Dirent,
  blockMetadata: BlockMetadata,
) {
  try {
    const registryItem: RegistryItem = {
      name: file.name.replace(".tsx", ""),
      type: "registry:block",
      title: blockMetadata.title,
      description: blockMetadata.description,
      files: [
        {
          type: "registry:block",
          path: `src/registry/new-york/blocks/${file.name}`,
          content: await fs.promises.readFile(
            path.join(
              process.cwd(),
              "src",
              "registry",
              "new-york",
              "blocks",
              file.name,
            ),
            "utf-8",
          ),
        },
      ],
      categories: blockMetadata.categories,
      dependencies: blockMetadata.dependencies,
      registryDependencies: blockMetadata.registryDependencies,
    };
    return { success: true, data: registryItem };
  } catch (error) {
    return { success: false, error };
  }
}

function addItemRegistry(registryItems: RegistryItem[]) {
  try {
    const registry = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "registry.json"), "utf-8"),
    );
    const items = registry.items;
    for (const registryItem of registryItems) {
      const itemIndex = items.findIndex(
        (item: RegistryItem) => item.name === registryItem.name,
      );
      if (itemIndex !== -1) {
        items.splice(itemIndex, 1);
      }
      items.push(registryItem);
    }
    registry.items = items;
    fs.writeFileSync(
      path.join(process.cwd(), "registry.json"),
      JSON.stringify(registry, null, 2),
      { encoding: "utf-8" },
    );

    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

async function processBlock(file: fs.Dirent) {
  const metadata = fs.readFileSync(
    path.join(
      process.cwd(),
      "src",
      "registry",
      "new-york",
      "blocks",
      file.name.replace(".tsx", ".json"),
    ),
    "utf-8",
  );
  const { success: metadataSuccess, data: parsedMetadata } =
    blockMetadataSchema.safeParse(JSON.parse(metadata));

  if (!metadataSuccess || !parsedMetadata) {
    console.error(`Failed to parse metadata for block ${file.name}`);
    return;
  }

  const { success: registryCreateSuccess, data: itemRegistry } =
    await createItemRegistry(file, parsedMetadata);
  if (!registryCreateSuccess || !itemRegistry) {
    console.error(`Failed to create registry item for block ${file.name}`);
    return;
  }
  return itemRegistry;
}
function processBlocks() {
  const blocksDir = path.join(
    process.cwd(),
    "src",
    "registry",
    "new-york",
    "blocks",
  );

  const files = fs.readdirSync(blocksDir, { withFileTypes: true });

  const filteredFiles = files.filter((file) => {
    if (!file.isFile()) return false;
    if (!file.name.endsWith(".tsx")) return false;
    return true;
  });
  const processBlocksProcess = filteredFiles.map((file) => {
    console.log(`Processing block ${file.name}`);
    return processBlock(file);
  });
  Promise.all(processBlocksProcess).then((results) => {
    const filteredResults = results.filter((result) => result !== undefined);
    addItemRegistry(filteredResults);
    console.log("Updated registry for blocks");
  });
}

fs.watch(
  path.join(process.cwd(), "src", "registry", "new-york", "blocks"),
  (_, filename) => {
    if (filename?.endsWith(".tsx")) {
      console.log(`File ${filename} changed, updating registry...`);
      processBlocks();
    }
  },
);
