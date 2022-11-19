import { Collapse, Group, Text, Tooltip, UnstyledButton } from "@mantine/core";
import React, { useState } from "react";
import { sentenceCase } from "../utilities/utilities";
import { ILink } from "./CustomNavbar";
interface CustomNavLinkProps {
  links: ILink[];
  isMobile?: boolean;
  isParrentHorizontal?: boolean;
}
const CustomNavLink = ({
  links,
  isMobile = false,
  isParrentHorizontal = false,
}: CustomNavLinkProps) => {
  const [isCollapsibleOpened, setIsCollapsibleOpened] = useState<number[]>([]);
  return (
    <React.Fragment>
      {links.map((link: ILink, index: number) => {
        if (!(isParrentHorizontal && link.nestedLinks))
          return (
            <React.Fragment key={index}>
              <UnstyledButton
                onClick={(event: React.SyntheticEvent) => {
                  if (link.nestedLinks) {
                    setIsCollapsibleOpened((isOpened: number[]) =>
                      isOpened.includes(index)
                        ? isOpened.filter((id: number) => id !== index)
                        : [...isOpened, index]
                    );
                  }
                  if (link.onClick) {
                    link.onClick(event);
                  }
                }}
              >
                <Group position={`center`}>
                  {link.Icon && (
                    <Tooltip
                      label={sentenceCase(link.text)}
                      events={{ hover: true, focus: true, touch: true }}
                      position={isParrentHorizontal ? "top" : "right"}
                      withArrow
                      transitionDuration={0}
                      hidden={isMobile}
                    >
                      <div>
                        <link.Icon size={isMobile ? 30 : 35} />
                      </div>
                    </Tooltip>
                  )}
                  {isMobile && (
                    <Text size="lg" className="nav-text">
                      {sentenceCase(link.text)}
                    </Text>
                  )}
                </Group>
              </UnstyledButton>
              {!isParrentHorizontal &&
                link.nestedLinks &&
                link.nestedLinks.length > 0 && (
                  <Collapse in={isCollapsibleOpened.includes(index)}>
                    {
                      <div className={`disp-f fd-col  jc-c rg-2`}>
                        <CustomNavLink
                          links={link.nestedLinks}
                          isMobile={isMobile}
                        ></CustomNavLink>
                      </div>
                    }
                  </Collapse>
                )}
            </React.Fragment>
          );
      })}
    </React.Fragment>
  );
};

export default CustomNavLink;
