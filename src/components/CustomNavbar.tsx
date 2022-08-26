import "./CustomNavbar.scss";
import { sentenceCase } from "../utilities/utilities";
import { useHover, useMediaQuery } from "@mantine/hooks";

import {
  createStyles,
  ScrollArea,
  NavLink,
  Navbar,
  Anchor,
  NavbarProps,
  Button,
  UnstyledButton,
  Tooltip,
  Title,
  Text,
  Group,
  Center,
  Stack,
} from "@mantine/core";
import { useEffect, useState } from "react";
import {
  TablerIcon,
  IconLogin,
  IconUserCircle,
  IconAnkh,
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
} from "@tabler/icons";
import CustomNavLink from "./CustomNavLink";
export interface ILink {
  text: string;
  href: string;
  showText?: boolean;
  Icon?: any;
  nestedLinks?: ILink[];
}
interface CustomNavbarProps extends Omit<NavbarProps, "children"> {
  links: ILink[];
  isMobile?: boolean;
  showText?: boolean;
  showNavbar?: boolean;
  hoverToShow?: boolean;
}

const CustomNavbar = ({
  links = [],
  showText = false,
  showNavbar = true,
  isMobile = false,
  hoverToShow=false,
  ...props
}: CustomNavbarProps) => {


  const { hovered, ref } = useHover();
  const getNavElements = (navLinks: ILink[]) => {
    return <CustomNavLink links={navLinks} isMobile={isMobile}></CustomNavLink>;
  };
  return (
    <Navbar
      ref={ref}
      className={`custom-navber-container ${
        isMobile ? (!showNavbar ? "disp-n" : "") : hoverToShow && !hovered ? "hide-nav" : ""
      }`}
      width={!showText ? { sm: 100 } : { sm: 150 }}
      {...props}
    >
      {getNavElements(links)}
    </Navbar>
  );
};

export default CustomNavbar;
