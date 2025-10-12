import type React from "react";
import CodePanel from "@/components/preview/code-panel";
import type { RegistryItem } from "@/schemas/registry-item";
export const BlockPreview: React.FC<
  RegistryItem & { previewOnly?: boolean; codeOnly?: boolean }
> = ({ previewOnly, codeOnly, ...props }) => {
  const { name, files, title } = props;
  const content =
    files?.find((file) => {
      if (!file.type) return false;
      if (file.type === "registry:block") return true;
      if (file.type === "registry:component") return true;
      return false;
    })?.content || "";

  const preview = `/preview/${name}`;

  const terminalCode = `pnpm dlx shadcn@canary add https://shadcn-tanstack-form.netlify.app/r/${name}.json`;

  return (
    <CodePanel
      terminalCode={terminalCode}
      previewLink={preview}
      codeContent={content}
      codeOnly={codeOnly}
      previewOnly={previewOnly}
      name={name}
      title={title}
    />
  );
};

export default BlockPreview;
