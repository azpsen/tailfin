import { FlightFormSchema } from "@/util/types";
import { Pill, PillsInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useState } from "react";

export default function ListInput({
  form,
  field,
  label,
  mt = "",
  canAdd = true,
}: {
  form: UseFormReturnType<
    FlightFormSchema,
    (values: FlightFormSchema) => FlightFormSchema
  >;
  field: string;
  label: string;
  mt?: string;
  canAdd?: boolean;
}) {
  const field_key = field as keyof typeof form.getTransformedValues;
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const values = form.getTransformedValues()[field_key] as string[];
      const newItem = inputValue.trim();
      if (newItem && values.indexOf(newItem) == -1) {
        form.setFieldValue(field, [...values, newItem]);
        setInputValue("");
      }
    } else if (event.key === "Backspace") {
      const values = form.getTransformedValues()[field_key] as string[];
      const newItem = inputValue.trim();
      if (newItem === "") {
        form.setFieldValue(field, values.slice(0, -1));
      }
    }
  };

  return (
    <PillsInput
      mt={mt}
      label={label}
      description={canAdd ? "Press enter or comma to add item" : ""}
    >
      <Pill.Group>
        {(form.getTransformedValues()[field_key] as string[]).map(
          (item: string) => (
            <Pill
              radius="sm"
              key={item}
              withRemoveButton
              onRemove={() =>
                form.setFieldValue(
                  field,
                  (form.getTransformedValues()[field_key] as string[]).filter(
                    (value: string) => value !== item
                  )
                )
              }
            >
              {item}
            </Pill>
          )
        )}
        {canAdd ? (
          <PillsInput.Field
            value={inputValue}
            onChange={(event) => setInputValue(event.currentTarget.value)}
            onKeyDown={handleKeyDown}
          />
        ) : null}
      </Pill.Group>
    </PillsInput>
  );
}
