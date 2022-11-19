import { Tooltip, UnstyledButton } from "@mantine/core";
import { IconAnkh, IconHome2, IconUserCircle } from "@tabler/icons";
import { Link } from "react-router-dom";

const CustomNavFooter = () => {
  return (
    <>
      <Link to="/">
        <Tooltip
          label="Home"
          events={{ hover: true, focus: true, touch: false }}
          position="top"
          withArrow
          transitionDuration={0}
        >
          <UnstyledButton className="disp-f fd-col ai-c">
            <IconHome2 size={30} />
          </UnstyledButton>
        </Tooltip>
      </Link>
      <Link to="/about">
        <Tooltip
          label="About us"
          events={{ hover: true, focus: true, touch: false }}
          position="top"
          withArrow
          transitionDuration={0}
        >
          <UnstyledButton className="disp-f fd-col ai-c">
            <IconAnkh size={30} />
          </UnstyledButton>
        </Tooltip>
      </Link>
      <Link to="/profile">
        <Tooltip
          label="Profile"
          events={{ hover: true, focus: true, touch: false }}
          position="top"
          withArrow
          transitionDuration={0}
        >
          <UnstyledButton className="disp-f fd-col ai-c">
            <IconUserCircle size={30} />
          </UnstyledButton>
        </Tooltip>
      </Link>
    </>
  );
};

export default CustomNavFooter;
