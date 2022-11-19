import {
  Avatar,
  Navbar,
  NavbarProps,
  Text,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { IconAnkh, IconHome2, IconLogin, IconLogout } from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/stateHooks";
import { openLoginModal, openLogoutModalConfirmation } from "../modals";
import { RootState } from "../store/store";

export interface ILink {
  text: string;
  href: string;
  showText?: boolean;
  Icon?: any;
  nestedLinks?: ILink[];
  onClick?: (event: React.SyntheticEvent) => void;
}
interface CustomNavbarProps extends Omit<NavbarProps, "children"> {
  links: ILink[];
  isMobile?: boolean;
  showText?: boolean;
  showNavbar?: boolean;
  hoverToShow?: boolean;
  navItemsOnClick?: () => void;
}

const CustomNavbar = ({
  links = [],
  showText = false,
  showNavbar = true,
  isMobile = false,
  hoverToShow = false,
  navItemsOnClick = () => {},
  ...props
}: CustomNavbarProps) => {
  const { isAuthenticated, currentUser } = useAppSelector(
    (state: RootState) => state.auth
  );

  return (
    <Navbar
      className={`rg-2 fd-col jc-c ai-c ${
        isMobile && !showNavbar ? "disp-n" : ""
      }`}
      width={!showText ? { sm: 100 } : { sm: 150 }}
      {...props}
    >
      <Link
        to="/"
        className="disp-f jc-c text-decoration-none"
        onClick={navItemsOnClick}
      >
        <Tooltip
          label="Home"
          events={{ hover: true, focus: true, touch: true }}
          position="right"
          withArrow
          transitionDuration={0}
          hidden={isMobile}
        >
          <UnstyledButton className="disp-f fd-col ai-c">
            <IconHome2 size={isMobile ? 30 : 45} />
            {isMobile && <Text>Home</Text>}
          </UnstyledButton>
        </Tooltip>
      </Link>

      <Link
        to="/about"
        className="disp-f jc-c text-decoration-none"
        onClick={navItemsOnClick}
      >
        <Tooltip
          label="About us"
          events={{ hover: true, focus: true, touch: true }}
          position="right"
          withArrow
          transitionDuration={0}
          hidden={isMobile}
        >
          <UnstyledButton className="disp-f fd-col ai-c">
            <IconAnkh size={isMobile ? 30 : 45} />
            {isMobile && <Text>About Us</Text>}
          </UnstyledButton>
        </Tooltip>
      </Link>

      {!isAuthenticated && (
        <Link
          to="#"
          className="disp-f jc-c text-decoration-none"
          onClick={navItemsOnClick}
        >
          <Tooltip
            label="Login"
            events={{ hover: true, focus: true, touch: true }}
            position="right"
            withArrow
            transitionDuration={0}
            hidden={isMobile}
          >
            <UnstyledButton
              className="disp-f fd-col ai-c"
              onClick={openLoginModal}
            >
              <IconLogin size={isMobile ? 30 : 45} />
              {isMobile && <Text>Login</Text>}
            </UnstyledButton>
          </Tooltip>
        </Link>
      )}
      {isAuthenticated && (
        <Link
          to={`/profile/${currentUser?.username}`}
          className="disp-f jc-c text-decoration-none"
          onClick={navItemsOnClick}
        >
          <Tooltip
            label={currentUser?.fullName}
            events={{ hover: true, focus: true, touch: true }}
            position="right"
            withArrow
            transitionDuration={0}
            hidden={isMobile}
          >
            <UnstyledButton className="disp-f fd-col ai-c">
              <Avatar radius="xl">
                {(currentUser?.fullName || "")
                  .split(" ")
                  .map((c) => c[0])
                  .join("")
                  .toUpperCase()
                  .substring(0, 2)}
              </Avatar>

              {isMobile && <Text>{currentUser?.fullName}</Text>}
            </UnstyledButton>
          </Tooltip>
        </Link>
      )}
      {isAuthenticated && (
        <Link
          to="#"
          className="disp-f jc-c text-decoration-none"
          onClick={navItemsOnClick}
        >
          <Tooltip
            label="Logout"
            events={{ hover: true, focus: true, touch: true }}
            position="right"
            withArrow
            transitionDuration={0}
            hidden={isMobile}
          >
            <UnstyledButton
              className="disp-f fd-col ai-c"
              onClick={openLogoutModalConfirmation}
            >
              <IconLogout size={isMobile ? 30 : 45} />
              {isMobile && <Text>Logout</Text>}
            </UnstyledButton>
          </Tooltip>
        </Link>
      )}
    </Navbar>
  );
};

export default CustomNavbar;
