import type { DragEndEvent, DraggableAttributes } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext as DndSortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import type React from "react";
import { createContext, useCallback, useContext, useMemo } from "react";
import { Button } from "../ui/button";

interface SortableListItemContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
  attributes?: DraggableAttributes;
}

const SortableListItemContext = createContext<SortableListItemContextProps>({});

export const DragHandle: React.FC = (
  props: React.ComponentProps<typeof Button>,
) => {
  const { setActivatorNodeRef, listeners, attributes } = useContext(
    SortableListItemContext,
  );
  return (
    <Button
      variant="ghost"
      type="button"
      size="icon"
      className="cursor-move"
      ref={setActivatorNodeRef}
      {...props}
      {...attributes}
      {...listeners}
    >
      <GripVertical />
    </Button>
  );
};

export const SortableItemContext = <C extends React.ElementType = "div">({
  as,
  itemKey,
  style,
  ...props
}: {
  itemKey: string;
} & React.ComponentPropsWithoutRef<C>) => {
  const Component = as || "div";
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: itemKey });

  const itemStyle: React.CSSProperties = useMemo(
    () => ({
      ...style,
      transform: CSS.Translate.toString(transform),
      transition,
      ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
    }),
    [isDragging, transform, transition, style],
  );

  const memoizedValue = useMemo<SortableListItemContextProps>(
    () => ({ setActivatorNodeRef, listeners, attributes }),
    [setActivatorNodeRef, listeners, attributes],
  );
  return (
    <SortableListItemContext.Provider value={memoizedValue}>
      <Component {...props} ref={setNodeRef} style={itemStyle} />
    </SortableListItemContext.Provider>
  );
};

export const SortableContext = ({
  children,
  keys,
  onDragEnd: onDragEndProp,
}: {
  children: React.ReactNode;
  keys: string[];
  onDragEnd: (event: DragEndEvent) => void;
}) => {
  const onDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) {
        return;
      }
      if (active.id !== over.id) {
        onDragEndProp(event);
      }
    },
    [onDragEndProp],
  );
  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <DndSortableContext items={keys} strategy={verticalListSortingStrategy}>
        {children}
      </DndSortableContext>
    </DndContext>
  );
};
