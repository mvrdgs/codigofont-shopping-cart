import React, { useEffect, useState } from 'react';
import { Flex, FormControl, FormErrorMessage, FormLabel, Input, Link } from '@chakra-ui/react';
import Router from 'next/router';
import regex from '/utils/regex';
import connection from '/utils/axios';
import jwt from 'jsonwebtoken';

function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '', submit: '' });
  const [disableSubmit, setDisableSubmit] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token && jwt.decode(token).exp * 1000 > Date.now()) {
      Router.push('/products');
    };
  });

  useEffect(() => {
    const hasEmptyFields = Object.values(loginData).some((value) => value === '');
    const hasErrors = Object.values(errors).some((value) => value !== '');
    setDisableSubmit(hasErrors || hasEmptyFields);
  }, [loginData, errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { data: { token } } = await connection({
        endpoint: '/login',
        method: 'post',
        data: loginData,
      });
  
      localStorage.setItem('token', token);
      Router.push('/products');
    } catch (error) {
      const { message } = error.response.data;
      setErrors({ ...errors, submit: message })
    }
  };

  const handleChange = ({ target }) => {
    if (errors.submit) setErrors({ ...errors, submit: '' });

    const { name, value } = target;
    const updatedData = { ...loginData };
    updatedData[name] = value;
    setLoginData(updatedData);
  };

  const checkError = (field, condition, message) => {
    if (!condition) {
      setErrors({ ...errors, [field]: message });
    } else {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <Flex alignItems="center" justifyContent="center" height="100vh" bgColor="blue.400">
      <Flex direction="column" shadow="2xl" rounded="10" p="10" bgColor="white">
        <form onSubmit={ handleSubmit }>
          <FormControl id="email" isInvalid={ errors.email } mb="6">
            <FormLabel>
              Email
              <Input
                autoComplete="off"
                name="email"
                type="text"
                onBlur={ () => checkError('email', regex.email.test(loginData.email), 'Email inválido') }
                onChange={ handleChange }
                placeholder="exemplo@email.com"
              />
            </FormLabel>
            <FormErrorMessage>{ errors.email }</FormErrorMessage>
          </FormControl>
          <FormControl id="password" isInvalid={ errors.password } mb="6">
            <FormLabel>
              Senha
              <Input
                autoComplete="off"
                name="password"
                type="password"
                onBlur={ () => checkError('password', regex.email.test(loginData.email), 'Senha inválida') }
                onChange={ handleChange }
                placeholder="******"
              />
            </FormLabel>
            <FormErrorMessage>{ errors.password }</FormErrorMessage>
          </FormControl>
          <FormControl id="submit" isInvalid={ errors.submit }>
            <Input
              type="submit"
              value="Login"
              mb="6"
              isDisabled={ disableSubmit }
            />
            <FormErrorMessage>{ errors.submit }</FormErrorMessage>
          </FormControl>
        </form>
        <Link href="/register">Registre-se</Link>
      </Flex>
    </Flex>
  );
}

export default Login;
