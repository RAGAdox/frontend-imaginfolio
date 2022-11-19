import { Text, UnstyledButton, UnstyledButtonProps } from "@mantine/core";
import classname from "classnames";
import React, { CSSProperties } from "react";
interface IconButtonProps extends UnstyledButtonProps {
  Icon: React.FC;
  label?: string;
  style?: CSSProperties;
  labelClassName?: string;
  onClick?: (e: React.SyntheticEvent) => {};
}

const IconButton = ({
  Icon,
  label,
  labelClassName,
  className,
  onClick = (event: React.SyntheticEvent): any => {
    event.stopPropagation();
  },
  ...props
}: IconButtonProps) => {
  return (
    <UnstyledButton
      {...props}
      className={classname("disp-i-f ai-c", className)}
      onClick={(event: React.SyntheticEvent) => {
        event.stopPropagation();
        onClick(event);
      }}
    >
      <Icon />
      {label && <Text className={labelClassName}>{label}</Text>}
    </UnstyledButton>
  );
};

export default IconButton;
