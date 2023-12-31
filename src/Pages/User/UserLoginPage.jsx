import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  ScaleFade,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { getUserDetails } from '../../slices/user';
import { clearAuthInfo, userLogin } from '../../slices/auth';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { CustomToast } from '../../Components/Common/ToastNotification';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import authService from '../../services/auth.services';

export default function UserLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toastNotification } = CustomToast();
  let checkAuth = authService.isLoggedIn();

  let navigate = useNavigate();

  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);

  const formRef = useRef(null);
  const validationSchema = Yup.object({
    username: Yup.string().email('Please type a valid email'),
    password: Yup.string().min(4),
  });

  const handleSubmit = async values => {
    dispatch(userLogin(values)).then(res => {
      if (res?.payload === undefined) {
        toastNotification({
          title: 'User not found!',
          message: 'Please check if your username and password is valid.',
          type: 'error',
        });
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    if (!!auth.access_token) {
      dispatch(getUserDetails(auth.access_token)).then(res => {
        if (
          (res.payload.accountInfo?.status_code === 200 && auth.access_token) ||
          res.payload.response.status !== 401
        ) {
          navigate('/profile');
        } else {
          dispatch(clearAuthInfo());
        }
      });
    }
  }, [auth, navigate, dispatch]);

  return !!checkAuth ? (
    <Center h={'100vh'}>
      <Spinner />
    </Center>
  ) : (
    <Center bg={'blue.700'}>
      <ScaleFade initialScale={'0.9'} in={true}>
        <Center>
          <VStack>
            <Heading ml={2} textColor={'white'} alignSelf={'start'} size={'xl'}>
              Welcome Back
            </Heading>
            <Text
              ml={2}
              textColor={'whiteAlpha.800'}
              alignSelf={'start'}
              size={'sm'}
              as={'b'}
            >
              Login to your account
            </Text>

            <Card w={[300, 400, 500]} borderRadius="2xl">
              <CardHeader textAlign={'center'}>
                <Heading textColor={'blue.700'} size="xl">
                  ABC COMPANY
                </Heading>
              </CardHeader>
              <CardBody>
                <Formik
                  innerRef={formRef}
                  enableReinitialize
                  initialValues={{ username: '', password: '' }}
                  validationSchema={validationSchema}
                  onSubmit={async values => {
                    await handleSubmit(values);
                    setIsLoading(true);
                  }}
                >
                  {({ values, handleChange, errors, touched }) => {
                    return (
                      <Form>
                        <FormControl
                          isInvalid={errors.username && touched.username}
                        >
                          <FormLabel fontWeight={'bold'}>User Name</FormLabel>
                          <Field
                            as={Input}
                            name="username"
                            id="username"
                            placeholder="Enter username"
                            onChange={handleChange}
                            value={values.username}
                          />
                          <FormErrorMessage>{errors.username}</FormErrorMessage>
                        </FormControl>

                        <FormControl
                          mt={4}
                          isInvalid={errors.password && touched.password}
                        >
                          <FormLabel fontWeight={'bold'}>Password</FormLabel>
                          <InputGroup>
                            <Field
                              as={Input}
                              name="password"
                              id="password"
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Enter password"
                              onChange={handleChange}
                              value={values.password}
                            />
                            <InputRightElement
                              onClick={() => setShowPassword(!showPassword)}
                              mr={2}
                              cursor={'pointer'}
                              children={
                                showPassword ? (
                                  <ViewOffIcon color="gray.700" />
                                ) : (
                                  <ViewIcon color="gray.700" />
                                )
                              }
                            />
                          </InputGroup>

                          <FormErrorMessage>{errors.password}</FormErrorMessage>
                        </FormControl>
                        <Button
                          bg={'blue.700'}
                          size="lg"
                          w={'100%'}
                          mt={7}
                          colorScheme="blue"
                          variant="solid"
                          type="submit"
                          isLoading={isLoading}
                          isDisabled={!values.username || !values.password}
                        >
                          Login
                        </Button>
                      </Form>
                    );
                  }}
                </Formik>
              </CardBody>
              <CardFooter mb={4}>
                <Text as={'b'}>
                  Still no account?{' '}
                  <Link
                    onClick={() => navigate('../register')}
                    textColor={'orange.400'}
                  >
                    SIGNUP
                  </Link>{' '}
                  here
                </Text>
              </CardFooter>
            </Card>
            <Text
              ml={2}
              textColor={'white'}
              alignSelf={'start'}
              fontSize="15px"
            >
              Version 1.0
            </Text>
          </VStack>
        </Center>
      </ScaleFade>
    </Center>
  );
}
