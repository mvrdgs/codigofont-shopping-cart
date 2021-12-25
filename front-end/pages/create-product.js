import React, { useState, useEffect } from 'react';
import {
  Flex,
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage,
  InputLeftAddon,
  InputRightAddon,
  InputGroup,
  NumberInput,
  NumberInputField,
  Button,
  Text,
} from '@chakra-ui/react';
import connection from '/utils/axios';
import Header from '/components/Header';

function CreateProduct() {
  const [productData, setProductData] = useState({ name: '', price: '', stock: '', image: '' });
  const [fileInput, setFileInput] = useState(null);
  const [error, setError] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(true);
  
  const handleChange = ({ target }) => {
    if (error) setError(false);

    const { name, value } = target;
    const updatedData = { ...productData };
    updatedData[name] = value;
    setProductData(updatedData);
  };

  useEffect(() => {
    const productDataValues = Object.values(productData);
    const hasEmptyField = productDataValues.some((value) => value === '')
    if (error || hasEmptyField) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [error, productData]);

  const uploadFileHandler = ({ target }) => {
    const file = target.files[0];
    setProductData({ ...productData, image: file });
  };

  const submitHandler = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData;
      formData.append('image', productData.image);
      const { data: { fileUrl } } = await connection({
        method: 'post',
        endpoint: '/image-upload',
        data: formData,
        token,
      });

      const { name, price, stock } = productData;
      const data = { name, price, stock, image: fileUrl };

      const result = await connection({
        method: 'post',
        endpoint: '/create-product',
        data,
        token,
      });
      console.log(result);

      fileInput.value = '';
      setProductData({ name: '', price: '', stock: '', image: '' })
    } catch (error) {
      const { message } = error.response.data;
      setError(message)
    }
  };

  return (
    <>
      <Header />
      <Flex alignItems="center" justifyContent="center" height="100vh" bgColor="blue.400">
        <Flex bgColor="white" display="column" p="10" rounded="10">
          <FormControl id="name" mb="6">
            <FormLabel display="column">
              Nome do produto
              <Input
                autoComplete="off"
                name="name"
                onChange={ handleChange }
                type="text"
                value={ productData.name }
              />
              <FormErrorMessage></FormErrorMessage>
            </FormLabel>
          </FormControl>
          <Flex>
          <FormControl id="price">
              <FormLabel display="column">
                Preço
                <InputGroup>
                  <InputLeftAddon>R$</InputLeftAddon>
                  <NumberInput step="0.01" min="0.01" precision="2" value={ productData.price }>
                    <NumberInputField
                      autoComplete="off"
                      display="block"
                      name="price"
                      onChange={ handleChange }
                      placeholder="0.00"
                      textAlign="right"
                      type="text"
                />
                  </NumberInput>
                </InputGroup>
                <FormErrorMessage></FormErrorMessage>
              </FormLabel>
            </FormControl>
            <FormControl id="stock" ml="6">
              <FormLabel display="column">
                Quantidade
                <InputGroup>
                  <NumberInput step="1" min="0" precision="0" value={ productData.stock }>
                    <NumberInputField
                      autoComplete="off"
                      display="block"
                      name="stock"
                      onChange={ handleChange }
                      placeholder="0"
                      textAlign="right"
                      type="number"
                      value={ productData.stock }
                    />
                  </NumberInput>
                  <InputRightAddon>Un</InputRightAddon>
                </InputGroup>
                <FormErrorMessage></FormErrorMessage>
              </FormLabel>
            </FormControl>
          </Flex>
          <FormControl id="image" mb="6">
            <FormLabel display="column">
              <Text>Imagem do produto</Text>
              <input
                type="file"
                onChange={ uploadFileHandler }
                ref={ (input) => setFileInput(input) }
                style={ { display: 'none' } }
              />
              <Button
                onClick={ () => fileInput.click() }
              >
                Adicionar imagem
              </Button>
              <Text ml="2" display="inline">{ productData.image && productData.image.name }</Text>
            </FormLabel>
          </FormControl>
          <Button type="button" isDisabled={ disableSubmit } onClick={ submitHandler }>Cadastrar</Button>
        </Flex>
      </Flex>
    </>
  );
}

export default CreateProduct;