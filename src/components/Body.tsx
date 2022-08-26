import "./Body.scss";
import {
  Container,
  Grid,
  Image,
  SimpleGrid,
  Skeleton,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import { IMAGE_LIST_1, IMAGE_LIST_2, IMAGE_LIST_3 } from "../utilities/constants";
import CustomCard from "./CustomCard";

const Body = () => {
  return (
    <Container fluid my="md">
      <Grid grow>
        <Grid.Col md={3}>
          {IMAGE_LIST_1.map((src: string, index: number) => (
            <CustomCard src={src} key={index}></CustomCard>
          ))}
        </Grid.Col>
        <Grid.Col md={3}>
          {IMAGE_LIST_2.map((src: string, index: number) => (
            <CustomCard src={src} key={index}></CustomCard>
          ))}
        </Grid.Col>
        <Grid.Col md={3}>
          {IMAGE_LIST_3.map((src: string, index: number) => (
            <CustomCard src={src} key={index}></CustomCard>
          ))}
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Body;
