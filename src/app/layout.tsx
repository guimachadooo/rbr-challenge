"use client";

import React, { useState } from "react";

import {
  Box,
  Grid,
  GridItem,
  useMediaQuery,
  ChakraProvider,
} from "@chakra-ui/react";

import { Inter } from "next/font/google";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";
import TanstackProvider from "@/components/TanstackProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = usePathname();
  const [isMobile] = useMediaQuery("(max-width: 800px)", {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });
  const [isSidebarOpen, setSidebarOpen] = useState(isMobile);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <html lang="pt-br">
      <head>
        <title>RBR Challenge vwo</title>

        <link rel="preconnect" href="https://dev.visualwebsiteoptimizer.com" />
        
      </head>

      <body className={inter.className}>
        <TanstackProvider>
          <ChakraProvider>
            {router !== "/" ? (
              <Grid
                templateAreas={`
                  "header header"
                  "nav main"
                  "nav footer"
                `}
                gridTemplateRows={"60px 1fr 30px"}
                gridTemplateColumns={!isMobile ? "250px 1fr" : "0px 1fr"}
                h="100vh"
                color="blackAlpha.700"
                fontWeight="bold"
              >
                <GridItem area={"header"}>
                  <Box ml={0}>
                    <Header
                      showSidebarButton={isMobile}
                      onShowSidebar={toggleSidebar}
                    />
                  </Box>
                </GridItem>

                <GridItem pl="2" p="4" bg="gray.300" area={"nav"}>
                  <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={toggleSidebar}
                    variant={isMobile ? "drawer" : "sidebar"}
                  />
                </GridItem>

                {/* retorna o conteudo */}
                <GridItem pl="2" bg="white" area={"main"}>
                  {children}
                </GridItem>

                <GridItem pl="2" bg="gray.100" area={"footer"}>
                  <Footer />
                </GridItem>
              </Grid>
            ) : (
              children
            )}
          </ChakraProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
