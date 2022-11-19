import { Button, Tooltip } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import "./FloatIcon.scss";
const FloatIcon = ({ size = 45, onClick = () => {} }) => {
  return (
    <Tooltip
      label="Create post"
      events={{ hover: true, focus: true, touch: false }}
      withArrow
      transitionDuration={0}
    >
      <Button className="float-action-icon" onClick={onClick}>
        <IconPlus size={size} />
      </Button>
    </Tooltip>
  );
};

export default FloatIcon;
