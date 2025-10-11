import { useCopyToClipboard } from "@uidotdev/usehooks";

import { Check, Copy } from "lucide-react";
import type React from "react";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";

const DEFAULT_HEIGHT = 224;

export const CodeSnippet: React.FC<{
  code: string;
  height?: number;
}> = ({ code, height }) => {
  const [copied, copy] = useCopyToClipboard();

  return (
    <section className="group mb-16 border-b [--color-border:color-mix(in_oklab,var(--color-zinc-200)_75%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-zinc-800)_60%,transparent)]">
      <div className="flex items-center justify-between dark:bg-zinc-900/50">
        <CodeBlock
          code={code}
          lang="tsx"
          className="w-full [&_pre]:min-h-[0rem]"
          maxHeight={height || DEFAULT_HEIGHT}
        />
        <Button
          onClick={() => copy(code)}
          size="sm"
          variant="ghost"
          aria-label="copy code"
          className="size-16 bg-transparent"
        >
          {copied ? (
            <Check className="size-4" />
          ) : (
            <Copy className="!size-3.5" />
          )}
        </Button>
      </div>
    </section>
  );
};

export default CodeSnippet;
