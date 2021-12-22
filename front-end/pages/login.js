import React, { useState } from 'react';
import { Flex, FormLabel, Input, Link } from '@chakra-ui/react';
import connection from '../utils/axios';

function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(loginData);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    const updatedData = { ...loginData };
    updatedData[name] = value;
    setLoginData(updatedData);
  };

  return (
    <Flex alignItems="center" justifyContent="center" height="100vh" bgColor="blue.400">
      <Flex direction="column" shadow="2xl" rounded="10" p="10" bgColor="white">
        <form onSubmit={ handleSubmit }>
          <FormLabel mb="6">
            Email
            <Input
              name="email"
              type="text"
              onChange={ handleChange }
              autoComplete="off"
            />
          </FormLabel>
          <FormLabel mb="6">
            Senha
            <Input
              name="password"
              type="password"
              onChange={ handleChange }
            />
          </FormLabel>
          <Input
            type="submit"
            value="Login"
            mb="6"
          />
        </form>
        <Link href="/register">Registre-se</Link>
      </Flex>
    </Flex>
  );
}

export default Login;
