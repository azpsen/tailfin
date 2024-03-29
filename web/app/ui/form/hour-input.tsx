import { FlightFormSchema } from "@/util/types";
import { CloseButton, NumberInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

function HourInput({
  form,
  field,
  label,
}: {
  form: UseFormReturnType<
    FlightFormSchema,
    (values: FlightFormSchema) => FlightFormSchema
  >;
  field: string;
  label: string;
}) {
  const field_key = field as keyof typeof form.getTransformedValues;

  return (
    <NumberInput
      label={label}
      decimalScale={1}
      step={0.1}
      min={0}
      fixedDecimalScale
      leftSection={
        <CloseButton
          aria-label="Clear input"
          onClick={() => form.setFieldValue(field, "")}
          style={{
            display:
              ["", null].indexOf(form.getTransformedValues()[field_key]) > -1
                ? "none"
                : undefined,
          }}
        />
      }
      {...form.getInputProps(field)}
    />
  );
}

function ZeroHourInput({
  form,
  field,
  label,
}: {
  form: UseFormReturnType<
    FlightFormSchema,
    (values: FlightFormSchema) => FlightFormSchema
  >;
  field: string;
  label: string;
}) {
  const field_key = field as keyof typeof form.getTransformedValues;

  return (
    <NumberInput
      label={label}
      decimalScale={1}
      step={0.1}
      min={0}
      fixedDecimalScale
      leftSection={
        <CloseButton
          aria-label="Clear input"
          onClick={() => form.setFieldValue(field, 0)}
          style={{
            display:
              form.getTransformedValues()[field_key] === 0 ? "none" : undefined,
          }}
        />
      }
      {...form.getInputProps(field)}
    />
  );
}

export { HourInput, ZeroHourInput };
