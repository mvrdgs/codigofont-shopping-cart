import React, { useEffect, useState } from 'react';
import { Flex, FormLabel, Input, FormControl, FormErrorMessage } from '@chakra-ui/react';
import regex from '../utils/regex';

function Register() {
  const [registerData, setRegisterData] = useState({ email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' })

  const checkError = (field, condition, message) => {
    if (!condition) {
      setErrors({ ...errors, [field]: message });
    } else {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(registerData);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    const updatedData = { ...registerData };
    updatedData[name] = value;
    setRegisterData(updatedData);
  };

  return (
    <Flex alignItems="center" justifyContent="center" height="100vh" bgColor="blue.400">
      <Flex direction="column" shadow="2xl" rounded="10" p="10" bgColor="white">
        <form onSubmit={ handleSubmit }>
          <FormControl mb="6" isInvalid={ errors.email !== '' }>
            <FormLabel>
              Email
              <Input
                autoComplete="off"
                name="email"
                onBlur={ () => checkError('email', regex.email.test(registerData.email), 'Email inválido') }
                onChange={ handleChange }
                placeholder="Digite seu email"
                type="text"
              />
            </FormLabel>
            <FormErrorMessage>{ errors.email }</FormErrorMessage>
          </FormControl>
          <FormControl mb="6" isInvalid={ errors.password !== '' }>
            <FormLabel>
              Senha
              <Input
                name="password"
                onBlur={ () => checkError('password', regex.password.test(registerData.password), 'Password inválido') }
                onChange={ handleChange }
                placeholder="Digite sua senha"
                type="password"
              />
            </FormLabel>
            <FormErrorMessage>{ errors.password }</FormErrorMessage>
          </FormControl>
          <FormControl mb="6" isInvalid={ errors.confirmPassword !== '' }>
            <FormLabel>
              Confirme sua senha
              <Input
                name="confirmPassword"
                type="password"
                onBlur={ () => checkError(
                  'confirmPassword',
                  registerData.password === registerData.confirmPassword,
                  'Senhas não coincidem',
                ) }
                placeholder="Confirme sua senha"
                onChange={ handleChange }
              />
            </FormLabel>
            <FormErrorMessage>{ errors.confirmPassword }</FormErrorMessage>
          </FormControl>
          <Input
            type="submit"
            value="Registrar"
            mb="6"
          />
        </form>
      </Flex>
    </Flex>
  );
}

export default Register;
