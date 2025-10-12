import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Check, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CodeSnippet: React.FC<
  { code: string } & React.ComponentProps<typeof Button>
> = ({ code, className, ...props }) => {
  const [cliCopied, cliCopy] = useCopyToClipboard();

  return (
    <Button
      onClick={() => cliCopy(code)}
      variant="outline"
      size={"lg"}
      className={cn("justify-between font-mono font-normal", className)}
      aria-label="copy code"
      {...props}
    >
      <span className="hidden font-mono text-xs md:block">{code}</span>
      {cliCopied ? (
        <Check className="size-4" />
      ) : (
        <Terminal className="!size-3.5" />
      )}
    </Button>
  );
};

export default CodeSnippet;
