import * as RadioGroup from "@radix-ui/react-radio-group";
import { ClientOnly, Link } from "@tanstack/react-router";
import {
  useCopyToClipboard,
  useIntersectionObserver,
} from "@uidotdev/usehooks";
import { Check, Code2, Copy, Eye, Maximize } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import {
  type ImperativePanelGroupHandle,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import { CodeBlock } from "@/components/code-block";
import CodeSnippet from "@/components/code-snippet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useIframeHeight } from "@/hooks/use-iframe-height";
import { usePreload } from "@/hooks/use-preload";
import { cn } from "@/lib/utils";

const radioItem =
  "rounded-(--radius) duration-200 flex items-center justify-center h-8 px-2.5 gap-2 transition-[color] data-[state=checked]:bg-muted";

const DEFAULTSIZE = 100;
const SMSIZE = 30;
const MDSIZE = 62;
const LGSIZE = 82;

const DEFAULT_HEIGHT = 224;

type CodePanelProps = {
  terminalCode?: string;
  previewOnly?: boolean;
  codeOnly?: boolean;
  name: string;
  title?: string;
  codeContent?: string;
  previewLink?: string;
  defaultHeight?: number;
};
const CodePanel: React.FC<CodePanelProps> = ({
  terminalCode,
  previewOnly,
  codeOnly,
  name,
  title = "Code Preview",
  codeContent: content,
  previewLink,
  defaultHeight = DEFAULT_HEIGHT,
}) => {
  const [width, setWidth] = useState(DEFAULTSIZE);
  const [mode, setMode] = useState<"preview" | "code">(
    codeOnly ? "code" : "preview",
  );
  const { iframeHeight, measureRef } = useIframeHeight({
    slug: name,
    defaultHeight: defaultHeight,
  });

  const [copied, copy] = useCopyToClipboard();

  const ref = useRef<ImperativePanelGroupHandle>(null);

  const [blockRef, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });
  const shouldLoadIframe = entry?.isIntersecting;

  useEffect(() => {
    if (shouldLoadIframe) {
      blockRef(null);
    }
  }, [blockRef, shouldLoadIframe]);

  usePreload({
    link: previewLink || "",
    condition: shouldLoadIframe && !codeOnly,
  });

  return (
    <section className="group mb-16 border-b [--color-border:color-mix(in_oklab,var(--color-zinc-200)_75%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-zinc-800)_60%,transparent)]">
      <div className="relative border-y">
        <div
          aria-hidden
          className="-top-14 pointer-events-none absolute inset-x-4 bottom-0 mx-auto max-w-7xl lg:inset-x-0"
        >
          <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent to-(--color-border) to-75%" />
          <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent to-(--color-border) to-75%" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-7xl justify-between py-1.5 pr-6 pl-8 [--color-border:var(--color-zinc-200)] md:py-2 lg:pr-2 lg:pl-6 dark:[--color-border:var(--color-zinc-800)]">
          <div className="-ml-3 flex items-center gap-3">
            {content && (
              <RadioGroup.Root className="flex gap-0.5">
                {!codeOnly && (
                  <RadioGroup.Item
                    onClick={() => setMode("preview")}
                    aria-label="Block preview"
                    value="100"
                    checked={mode === "preview"}
                    className={radioItem}
                  >
                    <Eye className="size-3.5 sm:opacity-50" />
                    <span className="hidden text-[13px] sm:block">Preview</span>
                  </RadioGroup.Item>
                )}

                <RadioGroup.Item
                  onClick={() => setMode("code")}
                  aria-label="Code"
                  value="0"
                  checked={mode === "code"}
                  className={radioItem}
                >
                  <Code2 className="size-3.5 sm:opacity-50" />
                  <span className="hidden text-[13px] sm:block">Code</span>
                </RadioGroup.Item>
              </RadioGroup.Root>
            )}
            {previewOnly ? (
              <>
                <Separator
                  orientation="vertical"
                  className="!h-4 hidden lg:block"
                />{" "}
                <span className="ml-2 text-sm capitalize">{title}</span>
                <Separator orientation="vertical" className="!h-4" />{" "}
                <Button asChild variant="ghost" size="sm" className="size-8">
                  <Link to={previewLink} target="_blank">
                    <Maximize className="size-4" />
                  </Link>
                </Button>
                <Separator
                  orientation="vertical"
                  className="!h-4 hidden lg:block"
                />
                <span className="hidden text-muted-foreground text-sm lg:block">
                  {width < MDSIZE
                    ? "Mobile"
                    : width < LGSIZE
                      ? "Tablet"
                      : "Desktop"}
                </span>
              </>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            {content && (
              <>
                {terminalCode ? (
                  <CodeSnippet
                    code={terminalCode}
                    size="sm"
                    className="size-8 shadow-none md:w-fit"
                  />
                ) : null}
                <Separator className="!h-4" orientation="vertical" />

                <Button
                  onClick={() => copy(content)}
                  size="sm"
                  variant="ghost"
                  aria-label="copy code"
                  className="size-8"
                >
                  {copied ? (
                    <Check className="size-4" />
                  ) : (
                    <Copy className="!size-3.5" />
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          aria-hidden
          className="-bottom-14 absolute inset-x-4 mx-auto h-14 max-w-7xl lg:inset-x-0"
        >
          <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-(--color-border)" />
          <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-(--color-border)" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:border-r lg:px-0">
          <div
            className={cn("bg-white dark:bg-transparent", {
              hidden: mode !== "preview",
            })}
          >
            <PanelGroup direction="horizontal" tagName="div" ref={ref}>
              <Panel
                id={`preview-${name}`}
                order={1}
                onResize={(size) => {
                  setWidth(Number(size));
                }}
                defaultSize={DEFAULTSIZE}
                minSize={SMSIZE}
                className="h-fit border-x"
              >
                <div ref={blockRef}>
                  {shouldLoadIframe ? (
                    <iframe
                      key={`${name}-iframe`}
                      loading={
                        iframeHeight !== DEFAULT_HEIGHT ? "eager" : "lazy"
                      }
                      allowFullScreen
                      onLoad={(e) => {
                        const body =
                          e.currentTarget?.contentWindow?.document.body;
                        if (!body) return;
                        measureRef(body);
                      }}
                      title={title}
                      style={
                        {
                          "--iframe-height": `${iframeHeight}px`,
                          display: "block",
                        } as React.CSSProperties
                      }
                      className={cn(
                        "block h-(--iframe-height) min-h-56 w-full",
                        {
                          "duration-200 will-change-auto":
                            iframeHeight === DEFAULT_HEIGHT,
                        },
                      )}
                      src={previewLink}
                      id={`${title}`}
                    />
                  ) : (
                    <div className="flex min-h-56 items-center justify-center">
                      <div className="size-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    </div>
                  )}
                </div>
              </Panel>

              <PanelResizeHandle className="relative hidden w-2 before:absolute before:inset-0 before:m-auto before:h-12 before:w-1 before:rounded-full before:bg-zinc-300 before:transition-[height,background] hover:before:h-16 hover:before:bg-zinc-400 focus:before:bg-zinc-400 lg:block dark:before:bg-zinc-600 dark:focus:before:bg-zinc-400 dark:hover:before:bg-zinc-500" />
              <Panel
                id={`code-${title}`}
                order={2}
                defaultSize={100 - DEFAULTSIZE}
                className="-mr-[0.5px] ml-px"
              />
            </PanelGroup>
          </div>

          {content ? (
            <div
              className={cn("bg-white dark:bg-transparent", {
                hidden: mode !== "code",
              })}
            >
              <ClientOnly
                fallback={
                  <CodeBlock
                    code={content}
                    lang="tsx"
                    className="min-h-32"
                    maxHeight={DEFAULT_HEIGHT}
                  />
                }
              >
                <CodeBlock
                  code={content}
                  lang="tsx"
                  className="min-h-32"
                  maxHeight={iframeHeight || DEFAULT_HEIGHT}
                />
              </ClientOnly>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default CodePanel;
