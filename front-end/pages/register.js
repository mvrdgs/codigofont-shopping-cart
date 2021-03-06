import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { Flex, FormLabel, Input, FormControl, FormErrorMessage } from '@chakra-ui/react';
import regex from '/utils/regex';
import connection from '/utils/axios';

function Register() {
  const [registerData, setRegisterData] = useState({ email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' })
  const [disableSubmit, setDisableSubmit] = useState(true);

  useEffect(() => {
    const hasEmptyFields = Object.values(registerData).some((value) => value === '');
    const hasErrors = Object.values(errors).some((value) => value !== '');
    setDisableSubmit(hasErrors || hasEmptyFields);
  }, [registerData, errors]);

  const checkError = (field, condition, message) => {
    if (!condition) {
      setErrors({ ...errors, [field]: message });
    } else {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: { token } } = await connection({
        endpoint: '/register',
        method: 'post',
        data: registerData,
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
    const updatedData = { ...registerData };
    updatedData[name] = value;
    setRegisterData(updatedData);
  };

  return (
    <Flex alignItems="center" justifyContent="center" height="100vh" bgColor="blue.400">
      <Flex direction="column" shadow="2xl" rounded="10" p="10" bgColor="white">
        <form onSubmit={ handleSubmit }>
          <FormControl mb="6" isInvalid={ errors.email } id="email">
            <FormLabel>
              Email
              <Input
                autoComplete="off"
                name="email"
                onBlur={ () => checkError('email', regex.email.test(registerData.email), 'Email inv??lido') }
                onChange={ handleChange }
                placeholder="Digite seu email"
                type="text"
              />
            </FormLabel>
            <FormErrorMessage>{ errors.email }</FormErrorMessage>
          </FormControl>
          <FormControl mb="6" isInvalid={ errors.password } id="password">
            <FormLabel>
              Senha
              <Input
                autoComplete="off"
                name="password"
                onBlur={ () => checkError('password', regex.password.test(registerData.password), 'Password inv??lido') }
                onChange={ handleChange }
                placeholder="Digite sua senha"
                type="password"
              />
            </FormLabel>
            <FormErrorMessage>{ errors.password }</FormErrorMessage>
          </FormControl>
          <FormControl mb="6" isInvalid={ errors.confirmPassword } id="confirmPassword">
            <FormLabel>
              Confirme sua senha
              <Input
                autoComplete="off"
                name="confirmPassword"
                type="password"
                onBlur={ () => checkError(
                  'confirmPassword',
                  registerData.password === registerData.confirmPassword,
                  'Senhas n??o coincidem',
                ) }
                placeholder="Confirme sua senha"
                onChange={ handleChange }
              />
            </FormLabel>
            <FormErrorMessage>{ errors.confirmPassword }</FormErrorMessage>
          </FormControl>
          <FormControl id="submit" isInvalid={ errors.submit }>
            <Input
              id="submit-button"
              type="submit"
              value="Registrar"
              mb="6"
              isDisabled={disableSubmit}
            />
            <FormErrorMessage>{ errors.submit }</FormErrorMessage>
          </FormControl>
        </form>
      </Flex>
    </Flex>
  );
}

export default Register;
