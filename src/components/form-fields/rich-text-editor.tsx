import { cn } from "@/lib/utils";
import Quill, { type QuillOptions } from "quill";
import {
  type HtmlHTMLAttributes,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
import "quill/dist/quill.snow.css";
interface RichTextEditorProps
  extends Omit<HtmlHTMLAttributes<HTMLDivElement>, "value" | "onChange"> {
  quillOptions?: QuillOptions;
  value?: string;
  onChange?: (value: string) => void;
}

const EditorContext = createContext<{
  toolbarContainerRef: React.RefObject<HTMLDivElement | null>;
  editorContainerRef: React.RefObject<HTMLDivElement | null>;
  quillRef: React.RefObject<Quill | null>;
} | null>(null);

const RichTextEditorRoot = ({
  children,
  quillOptions,
  value,
  onChange,
  ...props
}: RichTextEditorProps) => {
  const toolbarContainerRef = useRef<HTMLDivElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  useEffect(() => {
    const editorContainer = editorContainerRef.current;
    const toolbarContainer = toolbarContainerRef.current;
    if (!editorContainer || !toolbarContainer) {
      throw new Error("editorContainer or toolbarContainer is not found");
    }
    const quill = new Quill(editorContainer, {
      ...quillOptions,
      modules: {
        ...quillOptions?.modules,
        toolbar: {
          container: toolbarContainer,
        },
      },
    });

    quillRef.current = quill;
    return () => {
      quillRef.current = null;
      editorContainer.innerHTML = "";
      toolbarContainer.innerHTML = "";
    };
  }, [quillOptions]);

  return (
    <EditorContext.Provider
      value={{ toolbarContainerRef, editorContainerRef, quillRef }}
    >
      <div className="flex flex-col" {...props}>
        {children}
      </div>
    </EditorContext.Provider>
  );
};

const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditorContext must be used within an EditorProvider");
  }
  return context;
};

const Toolbar = () => {
  const { toolbarContainerRef } = useEditorContext();
  return (
    <div ref={toolbarContainerRef}>
      <select className="ql-size">
        <option value="small">Small</option>
        <option selected>Medium</option>
        <option value="large">Large</option>
        <option value="huge">Huge</option>
      </select>
      <button className="ql-bold" type="button">
        B old
      </button>
      <button className="ql-script" value="sub" type="button">
        Subscript
      </button>
      <button className="ql-script" value="super" type="button">
        Superscript
      </button>
    </div>
  );
};
// Editor is an uncontrolled React component
const Editor = ({ quillOptions, className, ...props }: RichTextEditorProps) => {
  const { editorContainerRef } = useEditorContext();
  return (
    <div
      ref={editorContainerRef}
      className={cn("min-w-lg rounded-md border-2", className)}
      {...props}
    />
  );
};

function RichTextEditor() {
  return (
    <RichTextEditorRoot>
      <Toolbar />
      <Editor />
    </RichTextEditorRoot>
  );
}

export default RichTextEditor;
