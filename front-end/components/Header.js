import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { Button, Flex, Spacer, Text } from '@chakra-ui/react';
import jwt from 'jsonwebtoken';

function Header() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || jwt.decode(token).exp * 1000 < Date.now()) {
      Router.push('/login');
    };

    const { email } = jwt.decode(token);
    setEmail(email);
  });

  const logoutHandler = () => {
    localStorage.removeItem('token');
    Router.push('/login')
  };

  return (
    <Flex
      alignItems="center"
      bgColor="white"
      height="5vh"
      position="absolute"
      rounded="2"
      width="100%"
    >
      <Text ml="6">Awesome Store</Text>
      <Spacer />
      <Text mr="6">{ email }</Text>
      <Button type="button" onClick={ logoutHandler } mr="6">Logout</Button>
    </Flex>
  );
}

export default Header;