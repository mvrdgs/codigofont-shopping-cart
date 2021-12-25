import React, { useEffect, useState } from 'react';
import { Button, Grid, GridItem } from '@chakra-ui/react';
import Image from 'next/image';

function ProductCard({ productId, name, price, image, stock }) {
  const [cartData, setCartData] = useState([]);
  const api = process.env.NEXT_PUBLIC_API;
  const src = `${api}${image}`;
  const formatedPrice = Number(price).toFixed(2).toString().replace('.', ',');
  
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    if (cart) {
      setCartData(cart);
    }
  }, []);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);

    setCartData(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const removeFromCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter((product) => product !== productId)

    setCartData(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <Grid
      border="1px solid black"
      rounded="5"
      p="3"
      gap="3"
      m="2"
    >
      <GridItem colSpan={2} rowSpan={2}>
        <Image alt={ name } loader={ () => src } src={ src } width="250" height="200" />
      </GridItem>
      <GridItem colSpan={2}>{ name }</GridItem>
      <GridItem colSpan={1}>Preço: { formatedPrice }</GridItem>
      <GridItem justifySelf="center" colSpan="2">
        <Button
          bgColor="green"
          color="white"
          onClick={ addToCart }
          isDisabled={ stock < 1 }
          hidden={ cartData.includes(productId) }
        >
            Adicionar ao carrinho
        </Button>
        <Button
          bgColor="red.400"
          color="white"
          onClick={ removeFromCart }
          hidden={ !cartData.includes(productId) }
        >
          Remover do carrinho
        </Button>
      </GridItem>
    </Grid>
  );
}

export default ProductCard;