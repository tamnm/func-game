import type { InputHTMLAttributes } from "react";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  ariaLabel?: string;
  label: string;
};

export function TextInput({
  ariaLabel,
  className = "",
  id,
  label,
  ...props
}: TextInputProps) {
  const fieldId = id ?? label.toLowerCase().replaceAll(" ", "-");

  return (
    <label className={`field ${className}`} htmlFor={fieldId}>
      <span>{label}</span>
      <input aria-label={ariaLabel} id={fieldId} type="text" {...props} />
    </label>
  );
}
