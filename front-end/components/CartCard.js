import React, { useState } from 'react';
import { Button, Divider, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';

function CartCard({ productId, name, price, image, stock, removeFromCart }) {
  const api = process.env.NEXT_PUBLIC_API;
  const src = `${api}${image}`;
  const formatedPrice = Number(price).toFixed(2).toString().replace('.', ',');

  return (
    <Flex
      border="1px solid black"
      alignItems="center"
      p="5"
      gap="4"
      rounded="5"
    >
      <Image alt={ name } loader={ () => src } src={ src } width="100" height="80" />
      <Divider orientation="vertical" height="80px" />
      <Text width="200px">{ name }</Text>
      <Divider orientation="vertical" height="80px" />
      <Text width="120px">R$ { formatedPrice }</Text>
      <Divider orientation="vertical" height="80px" />
      <Text width="220px">Disponibilidade: { stock } un.</Text>
      <Divider orientation="vertical" height="80px" />
      <Button
        bgColor="red.500"
        color="white"
        onClick={ () => removeFromCart(productId) }
        >
          X
        </Button>
    </Flex>
  );
}

export default CartCard;