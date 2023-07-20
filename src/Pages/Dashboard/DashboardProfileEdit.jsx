import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../Components/Navigation/Navbar';
import { getUserDetails } from '../../slices/user';
import {
  Box,
  Button,
  Card,
  ScaleFade,
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
  Spinner,
  VStack,
  useRadioGroup,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';

import { useNavigate } from 'react-router-dom';
import RadioCard from '../../Components/Common/RadioCard';

export default function DashboardProfileEdit() {
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector(state => state.user);
  const auth = useSelector(state => state.auth);

  const formRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const options = ['male', 'female', 'other'];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'gender',
    defaultValue: 'make',
    onChange: console.log,
  });

  const group = getRootProps();

  useEffect(() => {
    if (!!auth.access_token || !!user) {
      dispatch(getUserDetails(auth.access_token));
    }
  }, [auth, dispatch]);

  return (
    <>
      {!!user.accountInfo ? (
        <>
          <ScaleFade initialScale={0.9} in={!!user.accountInfo}>
            <Box paddingTop={'4%'}>
              <Center>
                <VStack>
                  <Heading mb={10}>Edit Profile</Heading>
                  <Formik
                    innerRef={formRef}
                    // enableReinitialize
                    initialValues={{
                      first_name: '',
                      last_name: '',
                      email: '',
                      dob: '',
                      mobile: '',
                      password: '',
                      re_password: '',
                    }}
                    // validationSchema={validationSchema}
                    // onSubmit={async values => {
                    //   await handleSubmit(values);
                    //   setIsLoading(true);
                    // }}
                  >
                    {({ values, handleChange, errors, touched }) => {
                      return (
                        <Form>
                          <HStack>
                            <Box>
                              <FormControl
                                isInvalid={
                                  errors.first_name && touched.first_name
                                }
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
                                isInvalid={
                                  errors.last_name && touched.last_name
                                }
                              >
                                <FormLabel fontWeight={'bold'}>
                                  Last Name
                                </FormLabel>
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
                            <FormErrorMessage textAlign={'left'}>
                              {errors.email}
                            </FormErrorMessage>
                          </FormControl>

                          <FormControl
                            mt={4}
                            isInvalid={errors.dob && touched.dob}
                          >
                            <FormLabel fontWeight={'bold'}>Date</FormLabel>
                            <SingleDatepicker
                              name="dob"
                              id="dob"
                              date={date}
                              onDateChange={e => {
                                setDate(e);
                              }}
                              maxDate={new Date()}
                            />
                            <FormErrorMessage>{errors.dob}</FormErrorMessage>
                          </FormControl>

                          <HStack
                            mt={8}
                            justifyContent={'space-between'}
                            {...group}
                          >
                            {options.map(value => {
                              const radio = getRadioProps({ value });
                              return (
                                <RadioCard key={value} {...radio}>
                                  {value}
                                </RadioCard>
                              );
                            })}
                          </HStack>

                          <Button
                            size="lg"
                            w={'100%'}
                            mt={7}
                            colorScheme="blue"
                            variant="solid"
                            type="submit"
                            isLoading={isLoading}
                            // onClick={() => navigate('/user-success')}
                          >
                            Update profile details
                          </Button>
                        </Form>
                      );
                    }}
                  </Formik>
                </VStack>
              </Center>
            </Box>
          </ScaleFade>
        </>
      ) : (
        <Center h={'100vh'}>
          <Spinner />
        </Center>
      )}
    </>
  );
}
