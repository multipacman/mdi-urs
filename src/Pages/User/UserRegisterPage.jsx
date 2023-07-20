import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export default function UserRegister() {
  let navigate = useNavigate();
  const formRef = useRef(null);

  const validationSchema = Yup.object({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    email: Yup.string().email('Please type a valid email').required(),
    mobile: Yup.string()
      .matches(
        /^(\+\d{1,3}[- ]?)?\d{10}$/,
        'Please enter a valid phone number & must be exactly 10 digits'
      )
      .length(10),
    password: Yup.string().min(4).required(),
    re_password: Yup.string().min(4).required(),
  });

  return (
    <Box paddingTop={'4%'} bg={'blue.600'}>
      <Center>
        <VStack>
          <HStack alignSelf={'start'}>
            <IconButton
              variant={'unstyled'}
              fontSize="40px"
              mt={'-20px'}
              color={'white'}
              colorScheme="blue"
              aria-label="Search database"
              onClick={() => navigate('/')}
              icon={<ChevronLeftIcon />}
            />
            <Heading textColor={'white'} alignSelf={'start'} size={'xl'}>
              Create Account
            </Heading>
          </HStack>

          <Card w={[300, 400, 500]} borderRadius="2xl">
            <CardHeader textAlign={'center'}>
              <Heading
                textColor={'blue.600'}
                textTransform={'uppercase'}
                size="xl"
              >
                ABC Company
              </Heading>
            </CardHeader>
            <CardBody>
              <Formik
                innerRef={formRef}
                enableReinitialize
                initialValues={{
                  first_name: '',
                  last_name: '',
                  email: '',
                  mobile: '',
                  password: '',
                  re_password: '',
                }}
                validationSchema={validationSchema}
                // onSubmit={async values => {
                //   await handleSubmit(values);
                //   // setIsLoading(true);
                // }}
              >
                {({ values, handleChange, errors, touched }) => {
                  return (
                    <Form>
                      <HStack>
                        <Box>
                          <FormControl
                            isInvalid={errors.first_name && touched.first_name}
                          >
                            <FormLabel fontWeight={'bold'}>
                              First Name
                            </FormLabel>
                            <Field
                              as={Input}
                              name="first_name"
                              id="first_name"
                              placeholder="Enter first name"
                              onChange={handleChange}
                              value={values.first_name}
                            />
                            <FormErrorMessage>
                              {errors.first_name}
                            </FormErrorMessage>
                          </FormControl>
                        </Box>
                        <Box>
                          <FormControl
                            isInvalid={errors.last_name && touched.last_name}
                          >
                            <FormLabel fontWeight={'bold'}>Last Name</FormLabel>
                            <Field
                              as={Input}
                              name="last_name"
                              id="last_name"
                              placeholder="Enter last name"
                              onChange={handleChange}
                              value={values.last_name}
                            />
                            <FormErrorMessage>
                              {errors.last_name}
                            </FormErrorMessage>
                          </FormControl>
                        </Box>
                      </HStack>

                      <FormControl
                        mt={4}
                        isInvalid={errors.email && touched.email}
                      >
                        <FormLabel fontWeight={'bold'}>Email</FormLabel>
                        <Field
                          as={Input}
                          name="email"
                          id="email"
                          placeholder="Enter email"
                          onChange={handleChange}
                          value={values.email}
                        />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                      </FormControl>

                      <FormControl
                        mt={4}
                        isInvalid={errors.mobile && touched.mobile}
                      >
                        <FormLabel fontWeight={'bold'}>Mobile Number</FormLabel>
                        <InputGroup>
                          <InputLeftAddon children="+94" />
                          <Field
                            borderBottomLeftRadius={0}
                            borderTopLeftRadius={0}
                            as={Input}
                            name="mobile"
                            id="mobile"
                            placeholder="Enter mobile number"
                            onChange={handleChange}
                            value={values.mobile}
                          />
                        </InputGroup>
                        <FormErrorMessage>{errors.mobile}</FormErrorMessage>
                      </FormControl>

                      <FormControl
                        mt={4}
                        isInvalid={errors.password && touched.password}
                      >
                        <FormLabel fontWeight={'bold'}>Password</FormLabel>
                        <Field
                          as={Input}
                          name="password"
                          id="password"
                          placeholder="Enter password"
                          onChange={handleChange}
                          value={values.password}
                        />
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                      </FormControl>
                      <FormControl
                        mt={4}
                        isInvalid={errors.re_password && touched.re_password}
                      >
                        <FormLabel fontWeight={'bold'}>
                          Re-enter Password
                        </FormLabel>
                        <Field
                          as={Input}
                          name="re_password"
                          id="re_password"
                          placeholder="Enter password"
                          onChange={handleChange}
                          value={values.re_password}
                        />
                        <FormErrorMessage>
                          {errors.re_password}
                        </FormErrorMessage>
                      </FormControl>

                      <Button
                        size="lg"
                        w={'100%'}
                        mt={7}
                        colorScheme="blue"
                        variant="solid"
                        type="submit"
                        onClick={() => navigate('/user-success')}
                      >
                        Create Account
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
            </CardBody>
          </Card>
          <Text ml={2} textColor={'white'} alignSelf={'start'} fontSize="15px">
            Version 1.0
          </Text>
        </VStack>
      </Center>
    </Box>
  );
}
