import React, { useRef, useState } from 'react';
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
  ScaleFade,
  Text,
  VStack,
  useRadioGroup,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import userService from '../../services/user.services';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { CustomToast } from '../../Components/Common/ToastNotification';
import RadioCard from '../../Components/Common/RadioCard';

export default function UserRegister() {
  const [checkEmail, setCheckEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const { toastNotification } = CustomToast();

  let navigate = useNavigate();
  const formRef = useRef(null);

  const validationSchema = Yup.object({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    email: Yup.string()
      .email('Please type a valid email')
      .required('Email is required'),
    dob: Yup.date()
      .max(new Date(), 'Select a valid date')
      .required('DOB is required'),
    mobile: Yup.string()
      .matches(
        /^(\+\d{1,3}[- ]?)?\d{10}$/,
        'Please enter a valid phone number & must be exactly 10 digits'
      )
      .length(10)
      .required('Mobile is required'),
    password: Yup.string().min(4).required('Password is required'),
    re_password: Yup.string()
      .min(4)
      .required('Re-password is required')
      .oneOf([Yup.ref('password'), null], 'Password does not match'),
    gender: Yup.string().required('Gender is required'),
  });

  const handleSubmit = async values => {
    let payload = {
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      password: values.password,
      confirm_password: values.re_password,
      dob: date.toISOString().substring(0, 10),
      mobile_number: values.mobile,
      gender: values.gender,
    };

    userService
      .registerNewUser({ payload })
      .then(res => {
        if (res.status === 200) {
          navigate('/user-success', { state: { view: true } });
          setIsLoading(false);
        }
      })
      .catch(e => {
        toastNotification({
          title: 'Something went wrong!',
          message: 'Please try again.',
          type: 'error',
        });
      });
  };

  const options = ['male', 'female', 'other'];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'gender',
  });

  const group = getRootProps();

  return (
    <Box paddingTop={'4%'} bg={'blue.700'}>
      <ScaleFade initialScale={'0.9'} in={true}>
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
                  textColor={'blue.700'}
                  textTransform={'uppercase'}
                  size="xl"
                >
                  ABC Company
                </Heading>
              </CardHeader>
              <CardBody>
                <Formik
                  innerRef={formRef}
                  // enableReinitialize
                  initialValues={{
                    first_name: '',
                    last_name: '',
                    email: '',
                    dob: date,
                    mobile: '',
                    password: '',
                    re_password: '',
                  }}
                  validationSchema={validationSchema}
                  onSubmit={async values => {
                    await handleSubmit(values);
                    setIsLoading(true);
                  }}
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
                              isInvalid={errors.last_name && touched.last_name}
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
                          isInvalid={
                            (errors.email && touched.email) || checkEmail.exist
                          }
                        >
                          <FormLabel fontWeight={'bold'}>Email</FormLabel>
                          <Field
                            as={Input}
                            name="email"
                            id="email"
                            placeholder="Enter email"
                            onChange={handleChange}
                            onBlur={() => {
                              if (values.email !== '') {
                                userService
                                  .emailAvailabilityCheck(values.email)
                                  .then(res => {
                                    setCheckEmail(res.data.result);
                                  });
                              }
                            }}
                            value={values.email}
                          />
                          <FormErrorMessage textAlign={'left'}>
                            {errors.email || checkEmail.message}
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

                        <FormControl
                          mt={4}
                          isInvalid={errors.mobile && touched.mobile}
                        >
                          <FormLabel fontWeight={'bold'}>
                            Mobile Number
                          </FormLabel>
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

                        <FormControl mt={4} isInvalid={errors.gender}>
                          <FormLabel fontWeight={'bold'}>Gender</FormLabel>
                          <HStack
                            // mt={8}
                            justifyContent={'space-between'}
                            {...group}
                            onChange={handleChange}
                            name="gender"
                            id="gender"
                          >
                            {options.map(value => {
                              const radio = getRadioProps({ value });
                              return (
                                <RadioCard key={value} props={radio}>
                                  {value}
                                </RadioCard>
                              );
                            })}
                          </HStack>
                          <FormErrorMessage>{errors.gender}</FormErrorMessage>
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
                          isDisabled={!values.password.length}
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
                          bg={'blue.700'}
                          size="lg"
                          w={'100%'}
                          mt={7}
                          colorScheme="blue"
                          variant="solid"
                          type="submit"
                          isLoading={isLoading}
                        >
                          Create Account
                        </Button>
                      </Form>
                    );
                  }}
                </Formik>
              </CardBody>
            </Card>
            <Text
              mb={12}
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
    </Box>
  );
}
