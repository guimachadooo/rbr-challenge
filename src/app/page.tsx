"use client";

import React from "react";
import {
  Button,
  FormControl,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";

const DashboardPage: React.FC = () => {
  const [isMobile] = useMediaQuery("(max-width: 800px)", {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });

  return (
    <Grid h="100vh" templateColumns={isMobile ? "1fr" : "repeat(3, 1fr)"}>
      {!isMobile && (
        <GridItem colSpan={2} bgGradient="linear(to-r, #333, #000)" h="100vh" />
      )}

      <GridItem
        colSpan={1}
        bg="#333"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        padding={10}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image
            mb={20}
            src="https://media.licdn.com/dms/image/C4D0BAQHY9sJuSlFm0A/company-logo_200_200/0/1633627954150?e=1724284800&v=beta&t=vjKqP31xFPsa9HyAFKWaH5e8U9KcCK2QAQqoGRD5AhE"
          />
        </div>
        <Heading mb={2} color={"#fff"}>
          RBR Challenge
        </Heading>
        <Text mb={20} color={"#fff"}>
          Gestão de funcionários
        </Text>

        <FormControl>
          <Input
            height="3rem"
            width="100%"
            defaultValue="dev.guimachado@gmail.com"
            variant="filled"
            type="email"
            mb={8}
            disabled
          />

          <Input
            height="3rem"
            width="100%"
            defaultValue="********"
            placeholder="********"
            variant="filled"
            type="password"
            disabled
          />
        </FormControl>

        <a href="/dashboard">
          <Button
            mt={8}
            type="submit"
            height="4rem"
            width="100%"
            colorScheme="red"
            leftIcon={<LockIcon />}
          >
            Acessar Dashboard
          </Button>
        </a>
      </GridItem>
    </Grid>
  );
};

export default DashboardPage;
