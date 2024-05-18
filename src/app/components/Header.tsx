import React from "react";
import {
  Box,
  Center,
  Text,
  Flex,
  useColorModeValue,
  HStack,
  Button,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import Link from "next/link";
import { CloseIcon, EmailIcon, HamburgerIcon } from "@chakra-ui/icons";

interface Props {
  onShowSidebar: Function;
  showSidebarButton?: boolean;
}

const Header = ({ showSidebarButton = true, onShowSidebar }: Props) => {
  return (
    <Box flex={1} bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={showSidebarButton ? "flex-end" : "space-between"}>
        {showSidebarButton ? (
          <Button
            position="absolute"
            left="5%"
            bg="gray.400"
            onClick={() => onShowSidebar()}
            leftIcon={<HamburgerIcon w={6} h={6} />}
          />
        ) : (
          <HStack spacing={8} alignItems={"center"}>
            <Box>RBR Digital</Box>
          </HStack>
        )}

        <Flex>
          <Button
            variant={"solid"}
            colorScheme={"teal"}
            size={"sm"}
            mr={4}
            leftIcon={<EmailIcon />}
            as={Link}
            href="mailto:dev.guimachado@gmail.com"
          >
            dev.guimachado@gmail.com
          </Button>

          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar
                size={"sm"}
                src={
                  "https://media.licdn.com/dms/image/D4D03AQElGlX51RJo6w/profile-displayphoto-shrink_800_800/0/1715804331530?e=1721260800&v=beta&t=7pC1M0di7RrLAxV9TMqMaPjcUdvaT2rU7dEFNyXMvF0"
                }
              />
            </MenuButton>
            <MenuList>
              <MenuItem
                as={Link}
                href="https://linkedin.com/in/guimachadoo"
                target="_blank"
              >
                LinkedIn
              </MenuItem>
              <MenuItem
                as={Link}
                href="https://instagram.com/guimachadooo"
                target="_blank"
              >
                Instagram
              </MenuItem>
              <MenuDivider />
              <MenuItem>
                <a href="/">
                  <CloseIcon /> Sair
                </a>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
