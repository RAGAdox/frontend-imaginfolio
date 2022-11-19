import {
  AppShell,
  Burger,
  Footer,
  Header,
  MediaQuery,
  Title,
  Tooltip,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useDocumentTitle, useMediaQuery } from "@mantine/hooks";
import { NavigationProgress } from "@mantine/nprogress";
import { IconPlus } from "@tabler/icons";
import { useCallback, useEffect, useState } from "react";
import CustomNavbar from "./components/CustomNavbar";
import CustomNavFooter from "./components/CustomNavFooter";
import { useAppDispatch, useAppSelector } from "./hooks/stateHooks";
import Router from "./routes/routes";
import { checkAuthentication } from "./store/Features/User/slice";
import { RootState } from "./store/store";
import { APPLICATION_LINKS, APPLICATION_TITLE } from "./utilities/constants";
import { sentenceCase } from "./utilities/utilities";

export default function App() {
  //HOOK VARIABLES
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();

  //REDUX STORE VARIABLES
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  //LOCAL STATES
  const [opened, setOpened] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState<boolean>(false);

  //COMPONENT SETUPS
  useDocumentTitle(sentenceCase(APPLICATION_TITLE));
  const isMobile = useMediaQuery("(max-width: 768px)", true, {
    getInitialValueInEffect: false,
  });

  //STATE CHANGE LISTENERS
  useEffect(() => {
    dispatch(checkAuthentication());
  }, [dispatch]);

  /* USING CALLBACKS FOR FUNCTIONS THAT ARE USINGS STATES OR STATE MODIFIERS */

  // FUNCTIONS USED AS PROPS
  const navbarItemsOnClick = useCallback(() => {
    if (isMobile) setOpened(false);
  }, [isMobile]);

  const toggelNavbar = useCallback(() => {
    setOpened((o) => !o);
  }, []);

  const openCreatePostModal = useCallback(() => {
    setIsCreatePostOpen(!isCreatePostOpen);
  }, [isCreatePostOpen]);

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
          navItemsOnClick={navbarItemsOnClick}
        />
      }
      footer={
        isMobile ? (
          <Footer height={60} className={"disp-f jc-se ai-c"}>
            <CustomNavFooter />
          </Footer>
        ) : (
          <></>
        )
      }
      header={
        <Header height={70} p="md">
          <div className="disp-f jc-sb ai-c">
            <div className="disp-f ai-c">
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={toggelNavbar}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <Title order={2} className="select-none" variant="gradient">
                {sentenceCase(APPLICATION_TITLE)}
              </Title>
            </div>
            {isAuthenticated && (
              <Tooltip
                label="Create Post"
                events={{ hover: true, focus: true, touch: false }}
                position="top"
                withArrow
                transitionDuration={0}
              >
                <UnstyledButton
                  className="disp-f"
                  onClick={openCreatePostModal}
                >
                  <IconPlus size={30} />
                </UnstyledButton>
              </Tooltip>
            )}
          </div>
          <NavigationProgress />
        </Header>
      }
    >
      <div className="select-none h100">
        <Router />
      </div>
    </AppShell>
  );
}
