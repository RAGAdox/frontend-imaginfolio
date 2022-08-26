import {
  Card,
  Image,
  Group,
  Text,
  Badge,
  Button,
  Stack,
  Grid,
  Modal,
} from "@mantine/core";
import {
  IconHeartPlus,
  IconMessagePlus,
  IconShare,
  IconBookmark,
} from "@tabler/icons";
import React, { useState } from "react";
interface CustomCardProps {
  src: string;
}
const CustomCard = ({ src }: CustomCardProps) => {
  const [isOpenInModal, setIsOpenInModal] = useState(false);
  const CustomCardComponent = ({ src, onClick = () => {} }: any) => (
    <Card shadow="sm" radius="md" my={!isOpenInModal?"md":0} onClick={onClick}>
      <Image src={src} alt="Norway" />

      <Card.Section p="sm">
        <Grid>
          <Grid.Col span={3} className="disp-f jc-c">
            <IconHeartPlus />
          </Grid.Col>
          <Grid.Col span={3} className="disp-f jc-c">
            <IconMessagePlus />
          </Grid.Col>
          <Grid.Col span={3} className="disp-f jc-c">
            <IconShare />
          </Grid.Col>
          <Grid.Col span={3} className="disp-f jc-c">
            <IconBookmark />
          </Grid.Col>
        </Grid>
        {/* <Grid>
          <Grid.Col span={3} className="disp-f jc-c">
            <Badge color="dark" variant="outline">
              12345678
            </Badge>
          </Grid.Col>
          <Grid.Col span={3} className="disp-f jc-c">
            <Badge color="dark" variant="outline">
              12342342355
            </Badge>
          </Grid.Col>
        </Grid> */}
      </Card.Section>
      <Card.Section p="sm">
        <Text size="sm" lineClamp={4} color="dimmed" span>
          <Text span mr="xs" color="dark" weight="bold">
            RAGAdox
          </Text>
          With Fjord Tours you can explore more of the magical fjord landscapes
          with tours and activities on and around the fjords of Norway
        </Text>
      </Card.Section>
    </Card>
  );
  return (
    <React.Fragment>
      <Modal
        opened={isOpenInModal}
        centered
        onClose={() => setIsOpenInModal(false)}
        padding={0}
        lockScroll
        overlayBlur={100}
        withCloseButton={false}
        radius="md"
      >
        <CustomCardComponent src={src} />
      </Modal>
      <CustomCardComponent
        src={src}
        onClick={() => {
          setIsOpenInModal(true);
        }}
      />
    </React.Fragment>
  );
};

export default CustomCard;
