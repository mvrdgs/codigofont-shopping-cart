import { Button, Flex, Text } from '@chakra-ui/react';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import CartCard from '../components/CartCard';
import Header from '/components/Header';
import connection from '/utils/axios';

function Cart() {
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState('Seu carrinho está vazio');

  const getData = async (productsList) => {
    const token = localStorage.getItem('token');
    const { data } = await connection({
      method: 'post',
      endpoint: '/products-list',
      data: productsList,
      token,
    });

    setCartData(data);
  };

  useEffect(() => {
    const totalPrice = cartData.reduce((result, curr) => result + Number(curr.price), 0);

    setTotalPrice(totalPrice);
  }, [cartData])

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const productsList = { productsList: cart };

    getData(productsList);
  }, []);

  const removeFromCart = (productId) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter((product) => product !== productId)
    const updatedCartData = cartData.filter((product) => product.productId !== productId)

    setCartData(updatedCartData);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const checkoutHandler = async () => {
    try {
      const token = localStorage.getItem('token');
      await connection({
        method: 'post',
        endpoint: '/checkout',
        data: { productsList: cartData },
        token,
      });

      localStorage.setItem('cart', '[]');
      setCartData([]);
      setMessage('Compra realizada com sucesso');

      setTimeout(() => Router.push('/products'), 10000)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <Flex alignItems="center" justifyContent="center" bgColor="blue.400" height="100vh">
        <Flex bgColor="white" p="10" direction="column" gap="3" rounded="10">
          {
            cartData.length ? (
              <>
                {
                  cartData.map((product) => <CartCard key={ product.productId } { ...product } removeFromCart={ removeFromCart } />)
                }
                <Flex mt="5" justifyContent="space-between">
                  <Text>Total: R$ { totalPrice.toFixed(2).toString().replace('.', ',') }</Text>
                  <Button onClick={ checkoutHandler } color="white" bgColor="green">Comprar</Button>
                </Flex>
              </>
            )
            : (
              <Flex
                alignItems="center"
                justifyContent="center"    
                minWidth="50vw"
                minHeight="30vh"
              >
                { message }
              </Flex>
            )
          }
        </Flex>
      </Flex>
    </>
  );
}

export default Cart;
