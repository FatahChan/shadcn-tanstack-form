import { cn } from "@/lib/utils";
import {
  BoldIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import Quill, { type QuillOptions } from "quill/core";
import "quill/dist/quill.snow.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  type HtmlHTMLAttributes,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface RichTextEditorProps
  extends Omit<HtmlHTMLAttributes<HTMLDivElement>, "value" | "onChange"> {
  quillOptions?: QuillOptions;
  value?: string;
  onChange?: (value: string) => void;
}

const EditorContext = createContext<{
  editorContainerRef: React.RefObject<HTMLDivElement | null>;
  quill: Quill | null;
  formats: { [key: string]: unknown };
} | null>(null);

const RichTextEditorRoot = ({
  children,
  quillOptions,
  value,
  onChange,
  ...props
}: RichTextEditorProps) => {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const [quill, setQuill] = useState<Quill | null>(null);
  useEffect(() => {
    const editorContainer = editorContainerRef.current;
    if (!editorContainer) {
      throw new Error("editorContainer or toolbarContainer is not found");
    }
    const quill = new Quill(editorContainer, {
      ...quillOptions,
      modules: {
        ...quillOptions?.modules,
      },
    });

    setQuill(quill);
    return () => {
      setQuill(null);
      editorContainer.innerHTML = "";
    };
  }, [quillOptions]);

  const [formats, setFormats] = useState<{ [key: string]: unknown }>({});
  useEffect(() => {
    if (!quill) return;
    const updateFormats = () => {
      const formats = quill.getFormat();
      console.log(formats);
      setFormats((prev) => {
        if (JSON.stringify(prev) === JSON.stringify(formats)) return prev;
        return formats;
      });
    };
    for (const event of Object.values(Quill.events)) {
      quill.on(event, updateFormats);
    }
    return () => {
      for (const event of Object.values(Quill.events)) {
        quill.off(event, updateFormats);
      }
    };
  }, [quill]);

  return (
    <EditorContext.Provider
      value={{
        editorContainerRef,
        quill,
        formats,
      }}
    >
      <div
        className="prose grid min-w-3xl items-center justify-items-start gap-4"
        {...props}
      >
        {children}
      </div>
    </EditorContext.Provider>
  );
};

const HeaderSelect = () => {
  const { quill, formats } = useEditorContext();

  return (
    <Select
      defaultValue="0"
      value={formats.header?.toString() || "0"}
      onValueChange={(value) => quill?.format("header", Number(value))}
    >
      <SelectTrigger className="min-w-32">
        <SelectValue placeholder="Select a header" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">H1</SelectItem>
        <SelectItem value="2">H2</SelectItem>
        <SelectItem value="3">H3</SelectItem>
        <SelectItem value="4">H4</SelectItem>
        <SelectItem value="0">Normal</SelectItem>
      </SelectContent>
    </Select>
  );
};

const FormatToggle = () => {
  const { quill, formats } = useEditorContext();

  const selectedFormats = useMemo(() => {
    return Object.keys(formats)
      .filter((key) => ["bold", "italic", "underline", "strike"].includes(key))
      .sort() as string[];
  }, [formats]);

  const handleFormatChange = useCallback(
    (format: string) => {
      if (!quill) return;
      const formats = quill.getFormat();
      console.log(formats);
      if (formats[format] === true) {
        quill.format(format, false);
        return;
      }
      quill.format(format, true);
    },
    [quill],
  );

  return (
    <ToggleGroup type="multiple" value={selectedFormats} variant="outline">
      <ToggleGroupItem
        value="bold"
        aria-label="bold"
        onClick={() => handleFormatChange("bold")}
      >
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="italic"
        aria-label="italic"
        onClick={() => handleFormatChange("italic")}
      >
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="underline"
        aria-label="underline"
        onClick={() => handleFormatChange("underline")}
      >
        <UnderlineIcon />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="strike"
        aria-label="strikethrough"
        onClick={() => handleFormatChange("strike")}
      >
        <StrikethroughIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

const ListToggle = () => {
  const { quill, formats } = useEditorContext();

  const handleFormatChange = useCallback(
    (format: string, value: "ordered" | "bullet") => {
      if (!quill) return;
      const formats = quill.getFormat();
      if (formats.list === value) {
        quill.format(format, false);
        return;
      }
      quill.format(format, value);
    },
    [quill],
  );

  return (
    <ToggleGroup
      type="single"
      value={(formats.list as "bullet" | "ordered" | undefined) ?? ""}
      variant="outline"
    >
      <ToggleGroupItem
        value="bullet"
        aria-label="bullet-list"
        onClick={() => handleFormatChange("list", "bullet")}
      >
        <ListIcon />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="ordered"
        aria-label="ordered-list"
        onClick={() => handleFormatChange("list", "ordered")}
      >
        <ListOrderedIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditorContext must be used within an EditorProvider");
  }
  return context;
};

const Editor = ({
  className,
  ...props
}: HtmlHTMLAttributes<HTMLDivElement>) => {
  const { editorContainerRef } = useEditorContext();
  return (
    <div
      ref={editorContainerRef}
      className={cn(
        "min-h-16 w-full rounded-md border border-input bg-transparent text-base shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );
};

function RichTextEditor() {
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <RichTextEditorRoot value={value} onChange={setValue}>
      <div className="flex w-full gap-2">
        <HeaderSelect />
        <FormatToggle />
        <ListToggle />
      </div>
      <Editor />
    </RichTextEditorRoot>
  );
}

export default RichTextEditor;
