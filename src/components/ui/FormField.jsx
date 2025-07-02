import { TextInput, PasswordInput } from '@mantine/core';

export function FormField({ label, type = 'text', id, ...rest }) {
  const InputComponent = type === 'password' ? PasswordInput : TextInput;

  return (
    <InputComponent
      label={label}
      id={id}
      type={type}
      required
      {...rest}
    />
  );
}
