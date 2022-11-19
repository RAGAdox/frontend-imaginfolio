import { PasswordInput, TextInput, TextInputProps } from "@mantine/core";
import React, { useEffect, useState } from "react";

interface TextINputWrapperProps
  extends Omit<TextInputProps, "onChange" | "onChangeCapture" | "onBlur"> {
  handelChange?: (_: string) => void;
  validateChange?: (_: string) => void;
}

const TextInputWrapper = ({
  type = "text",
  label,
  value,
  withAsterisk,
  handelChange = () => {},
  validateChange = () => {},
  error,
  ...props
}: TextINputWrapperProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [isChanged, setIsChange] = useState(false);

  useEffect(() => {
    if (isChanged) {
      validateChange(inputValue as string);
      handelChange(inputValue as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);
  const onChange = (event: any) => {
    setInputValue(event.target.value);
  };
  if (type === "password")
    return (
      <PasswordInput
        pb="xs"
        label={label}
        withAsterisk
        name="fullName"
        value={inputValue}
        onChange={onChange}
        onChangeCapture={() => setIsChange(true)}
        onBlur={() => validateChange(inputValue as string)}
        error={error}
        spellCheck={false}
        {...props}
      />
    );
  return (
    <TextInput
      pb="xs"
      label={label}
      withAsterisk
      name="fullName"
      value={inputValue}
      type={type}
      onChange={onChange}
      onChangeCapture={() => setIsChange(true)}
      onBlur={() => validateChange(inputValue as string)}
      error={error}
      spellCheck={false}
      {...props}
    />
  );
};

export default React.memo(TextInputWrapper);
