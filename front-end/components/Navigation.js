import React, { useRef } from 'react';
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Link, useDisclosure } from '@chakra-ui/react';

function Navigation(props) {
  const menuRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        ref={ menuRef }
        onClick={ onOpen }
      >
        Menu
      </Button>
      <Drawer
        isOpen={ isOpen }
        placement="left"
        onClose={ onClose }
        finalFocusRef={ menuRef }
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Navegação</DrawerHeader>
          <DrawerBody>
            <Link display="block" href="/products">Produtos</Link>
            <Link display="block" href="/create-product">Criar Produtos</Link>
            <Link display="block" href="/checkout">Carrinho</Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Navigation;