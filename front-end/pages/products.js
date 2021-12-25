import React from 'react';
import { Flex } from '@chakra-ui/react';
import connection from '/utils/axios';
import Header from '/components/Header';
import ProductCard from '../components/ProductCard';
import styles from '/styles/products.module.css';

function Products({ productsData }) {
  return (
    <>
      <Header />
      <Flex
        bgColor="blue.400"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        width="100vw"
      >
        <Flex
          bgColor="white"
          className={ styles['scrollbar-hidden'] }
          p="10"
          rounded="10"
          m="10"
          maxWidth="90vw"
          maxHeight="80vh"
          wrap="wrap"
          overflow="scroll"
        >
          {
            productsData.sort().map((product) => (
              <ProductCard key={product.productId} { ...product } />
            ))
          }
        </Flex>
      </Flex>
    </>
  );
}

export default Products;

export async function getStaticProps() {
  const { data } = await connection({
    endpoint: '/products',
  });
  return {
    props: {
      productsData: data,
    },
  };
}
