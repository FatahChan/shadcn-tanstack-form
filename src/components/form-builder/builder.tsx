import type { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useStore } from "@tanstack/react-form";
import { useCallback } from "react";
import {
  DragHandle,
  SortableContext,
  SortableItemContext,
} from "@/components/form-builder/sortable";
import {
  type FormField,
  type FormFields,
  FormFieldsSchema,
} from "@/components/form-builder/type";
import { Button } from "@/components/ui/button";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { useAppForm } from "@/components/ui/tanstack-form-field";

const fieldToKey = (field: FormField | FormField[]) => {
  if (Array.isArray(field)) {
    return field.map((f) => f.name).join(", ");
  }
  return field.name;
};
export const Builder = () => {
  const form = useAppForm({
    validators: {
      onDynamic: FormFieldsSchema,
    },
    defaultValues: {
      fields: [],
    } as FormFields,
  });

  const fieldsKeys = useStore(form.store, (store) =>
    store.values.fields.map(fieldToKey),
  );

  const onDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (active.id && over?.id && active.id !== over.id) {
        form.setFieldValue("fields", (prevState) => {
          const activeIndex = prevState.findIndex(
            (i) => fieldToKey(i) === active.id,
          );
          const overIndex = prevState.findIndex(
            (i) => fieldToKey(i) === over.id,
          );

          return arrayMove(prevState, activeIndex, overIndex);
        });
      }
    },
    [form],
  );
  return (
    <form.AppForm>
      <form>
        <form.Field
          name="fields"
          children={(fields) => {
            return (
              <FieldSet>
                <FieldLegend variant="label">Form Fields</FieldLegend>
                <FieldDescription>
                  Manage the fields in your form. You can add, remove, and
                  reorder fields as needed.
                </FieldDescription>
                <SortableContext keys={fieldsKeys} onDragEnd={onDragEnd}>
                  <FieldGroup>
                    {fields.state.value.map((field) => {
                      const key = fieldToKey(field);
                      if (Array.isArray(field)) return null;
                      return (
                        <SortableItemContext key={key} itemKey={key}>
                          <Item variant="outline">
                            <ItemActions>
                              <DragHandle />
                            </ItemActions>
                            <ItemContent>
                              <ItemTitle>
                                Default Variant {field.name}
                              </ItemTitle>
                              <ItemDescription>
                                Standard styling with subtle background and
                                borders.
                              </ItemDescription>
                            </ItemContent>
                          </Item>
                        </SortableItemContext>
                      );
                    })}
                  </FieldGroup>
                </SortableContext>
                <Button
                  type="button"
                  onClick={() => {
                    fields.pushValue({
                      type: "text",
                      name: `field_${Math.random().toString(36).substring(2, 15)}`,
                      label: `Field ${fields.state.value.length + 1}`,
                    });
                  }}
                >
                  Add Field
                </Button>
              </FieldSet>
            );
          }}
        />
      </form>
    </form.AppForm>
  );
};
