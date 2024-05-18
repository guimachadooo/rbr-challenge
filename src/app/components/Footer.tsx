import { Box, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {

  return (
    <Box flex={"display"} textAlign={"center"}>
      <Text>
        <a 
          href="https://linkedin.com/in/guimachadoo" 
          target="_blank"
        >
          Feito com ❤️ @guimachadoo
        </a>
      </Text>
    </Box>
  )
}

export default Footer;