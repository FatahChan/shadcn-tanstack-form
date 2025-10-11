import {
  Plate,
  PlateElement,
  type PlateElementProps,
  PlateLeaf,
  type PlateLeafProps,
  usePlateEditor,
} from "@udecode/plate/react";
import { BasicElementsPlugin } from "@udecode/plate-basic-elements/react";
import { BasicMarksPlugin } from "@udecode/plate-basic-marks/react";
import { ListPlugin } from "@udecode/plate-list/react";
import { useState } from "react";
import { BlockquoteElement } from "@/components/ui/blockquote-element";
import { Editor, EditorContainer } from "@/components/ui/editor";
import { FixedToolbar } from "@/components/ui/fixed-toolbar";
import { HeadingElement } from "@/components/ui/heading-element";
import { ListElement } from "@/components/ui/list-element";
import { ListToolbarButton } from "@/components/ui/list-toolbar-button";
import { MarkToolbarButton } from "@/components/ui/mark-toolbar-button";
import { ParagraphElement } from "@/components/ui/paragraph-element";
import { ToolbarButton } from "@/components/ui/toolbar";
import { cn } from "@/lib/utils";

export default function RichTextEditor({
  value,
  onChange,
  onBlur,
  placeholder,
  className,
}: {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
}) {
  const [_value, _setValue] = useState<string>();
  const editor = usePlateEditor({
    plugins: [BasicElementsPlugin, BasicMarksPlugin, ListPlugin],
    components: {
      blockquote: BlockquoteElement,
      p: ParagraphElement,
      h1: (props: PlateElementProps) => (
        <HeadingElement {...props} variant="h1" />
      ),
      h2: (props: PlateElementProps) => (
        <HeadingElement {...props} variant="h2" />
      ),
      h3: (props: PlateElementProps) => (
        <HeadingElement {...props} variant="h3" />
      ),
      bold: (props: PlateLeafProps) => <PlateLeaf {...props} as="strong" />,
      italic: (props: PlateLeafProps) => <PlateLeaf {...props} as="em" />,
      underline: (props: PlateLeafProps) => <PlateLeaf {...props} as="u" />,
      ul: (props: PlateElementProps) => <ListElement {...props} variant="ul" />,
      ol: (props: PlateElementProps) => <ListElement {...props} variant="ol" />,
      li: (props: PlateElementProps) => <PlateElement {...props} as="li" />,
      value: value
        ? JSON.parse(value)
        : _value
          ? JSON.parse(_value)
          : undefined,
    },
  });

  return (
    <Plate
      editor={editor}
      onChange={({ value }) => {
        if (onChange) {
          onChange(JSON.stringify(value));
        } else {
          _setValue(JSON.stringify(value));
        }
      }}
    >
      <div className="grid w-full">
        <FixedToolbar className="flex flex-wrap justify-start gap-1 border">
          <ToolbarButton onClick={() => editor.tf.toggleBlock("h1")}>
            H1
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.tf.toggleBlock("h2")}>
            H2
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.tf.toggleBlock("h3")}>
            H3
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.tf.toggleBlock("blockquote")}>
            Quote
          </ToolbarButton>
          <MarkToolbarButton nodeType="bold" tooltip="Bold (⌘+B)">
            B
          </MarkToolbarButton>
          <MarkToolbarButton nodeType="italic" tooltip="Italic (⌘+I)">
            I
          </MarkToolbarButton>
          <MarkToolbarButton nodeType="underline" tooltip="Underline (⌘+U)">
            U
          </MarkToolbarButton>
          <ListToolbarButton nodeType="ul" />
          <ListToolbarButton nodeType="ol" />
        </FixedToolbar>
        <EditorContainer>
          <Editor
            placeholder={placeholder}
            variant="none"
            className={cn("min-h-[200px] rounded-t-none border p-2", className)}
            onBlur={() => onBlur?.()}
          />
        </EditorContainer>
      </div>
    </Plate>
  );
}
