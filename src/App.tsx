import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Title,
  ScrollArea,
} from "@mantine/core";
import CustomNavbar from "./components/CustomNavbar";
import { APPLICATION_LINKS, APPLICATION_TITLE } from "./utilities/constants";
import { sentenceCase } from "./utilities/utilities";
import CustomNavFooter from "./components/CustomNavFooter";
import { useMediaQuery } from "@mantine/hooks";
import Body from "./components/Body";

export default function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)", true, {
    getInitialValueInEffect: false,
  });
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbar={
        <CustomNavbar
          hoverToShow={false}
          isMobile={isMobile}
          links={APPLICATION_LINKS}
          showNavbar={opened}
        />
      }
      // aside={
      //   <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
      //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
      //       <Text>Application sidebar</Text>
      //     </Aside>
      //   </MediaQuery>
      // }
      footer={
        isMobile ? (
          <Footer height={60} className={"disp-f jc-se"}>
            <CustomNavFooter links={APPLICATION_LINKS} />
          </Footer>
        ) : (
          <></>
        )
      }
      header={
        <Header height={70} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Title order={2} className="select-none">
              {sentenceCase(APPLICATION_TITLE)}
            </Title>
          </div>
        </Header>
      }
    >
      {/* <ScrollArea type="always" style={{ height: `${isMobile?'80vh':'88vh'}` }} offsetScrollbars> */}
        <Body />
      {/* </ScrollArea> */}
    </AppShell>
  );
}
