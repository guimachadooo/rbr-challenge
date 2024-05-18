import { DragHandleIcon, QuestionIcon, SettingsIcon } from '@chakra-ui/icons'
import {
    Box,
    Button,
    Drawer,
    DrawerOverlay,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    DrawerContent,
    VStack,
  } from '@chakra-ui/react'
import Link from 'next/link'
  
  interface Props {
    onClose: Function
    isOpen: boolean
    variant: 'drawer' | 'sidebar'
  }
  
  const SidebarContent = ({ onClick }: { onClick: Function }) => (
    <VStack>
      <Button 
        w="100%"
        bg="none"
        justifyContent="flex-start"
        leftIcon={<DragHandleIcon />}
        as={Link}
        href="/dashboard"
      >
        Dashboard
      </Button>

      <Button 
        w="100%"
        bg="none"
        justifyContent="flex-start"
        leftIcon={<SettingsIcon />}
      >
        Configurações
      </Button>

      <Button 
        w="100%"
        bg="none"
        justifyContent="flex-start"
        leftIcon={<QuestionIcon />}
      >
        Sobre
      </Button>
    </VStack>
  )
  
  const Sidebar = ({ isOpen, variant, onClose }: Props) => {
    return variant === 'sidebar' ? (
      <Box h="100%">
        <SidebarContent onClick={() => onClose()} />
      </Box>
    ) : (
        <Drawer 
            isOpen={isOpen} 
            placement="left" 
            onClose={() => onClose()}
        >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>RBR Challenge</DrawerHeader>
            <DrawerBody>
              <SidebarContent onClick={onClose} />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
  }
  
  export default Sidebar
  