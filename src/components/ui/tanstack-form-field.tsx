"use client";

import { Slot } from "@radix-ui/react-slot";
import {
  createFormHook,
  createFormHookContexts,
  useStore,
} from "@tanstack/react-form";
import * as React from "react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

const {
  fieldContext,
  formContext,
  useFieldContext: useFormFieldContext,
  useFormContext,
} = createFormHookContexts();

type FormFieldContextValue = {
  id: string;
};

const FieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const useFieldContext = () => {
  const { id } = React.useContext(FieldContext);
  const { name, ...fieldContext } = useFormFieldContext();
  if (!fieldContext) {
    throw new Error("useFieldContext should be used within <form.Field>");
  }

  return {
    id,
    name,
    formFieldId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldContext,
  };
};

function FieldWrapper(props: React.ComponentProps<typeof Field>) {
  const id = React.useId();
  return (
    <FieldContext.Provider value={{ id }}>
      <Field {...props} />
    </FieldContext.Provider>
  );
}

function FieldControl({
  valuePropName,
  ...props
}: React.ComponentProps<typeof Slot> & {
  valuePropName?: string;
}) {
  const { formFieldId, formDescriptionId, formMessageId, store } =
    useFieldContext();

  const isInvalid = useStore(
    store,
    (state) => state.meta.isTouched && !state.meta.isValid,
  );
  return (
    <Slot
      data-slot="field-control"
      id={formFieldId}
      aria-invalid={isInvalid}
      aria-describedby={`${formDescriptionId} ${isInvalid ? formMessageId : ""}`}
      {...props}
    />
  );
}

function FieldLabelWrapper({
  className,
  ...props
}: React.ComponentProps<typeof FieldLabel>) {
  const { formFieldId } = useFieldContext();
  return <FieldLabel htmlFor={formFieldId} {...props} />;
}

function FieldDescriptionWrapper(
  props: React.ComponentProps<typeof FieldDescription>,
) {
  const { formDescriptionId } = useFieldContext();
  return <FieldDescription id={formDescriptionId} {...props} />;
}

function FieldErrorWrapper({
  errors: errorsProps,
  ...props
}: React.ComponentProps<typeof FieldError>) {
  const { store, formMessageId } = useFieldContext();
  const _errors = useStore(store, (state) => state.meta.errors);
  const isInvalid = useStore(
    store,
    (state) => state.meta.isTouched && !state.meta.isValid,
  );
  if (!isInvalid) return null;

  const errors = errorsProps ?? _errors;
  return <FieldError id={formMessageId} errors={errors} {...props} />;
}

const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    Field: FieldWrapper,
    FieldLabel: FieldLabelWrapper,
    FieldDescription: FieldDescriptionWrapper,
    FieldError: FieldErrorWrapper,
    FieldControl,
  },
  formComponents: {},
});

export { useAppForm, useFieldContext, useFormContext, withForm };
