import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../slices/user';
import {
  Box,
  Button,
  ScaleFade,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  Spinner,
  VStack,
  useRadioGroup,
  FormHelperText,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';

import RadioCard from '../../Components/Common/RadioCard';
import userService from '../../services/user.services';
import { CustomToast } from '../../Components/Common/ToastNotification';
import moment from 'moment';

export default function DashboardProfileEdit() {
  const user = useSelector(state => state.user);
  const auth = useSelector(state => state.auth);

  const [checkEmail, setCheckEmail] = useState(false);
  const [date, setDate] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toastNotification } = CustomToast();

  const formRef = useRef(null);
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    email: Yup.string()
      .email('Please type a valid email')
      .required('Email is required'),
    dob: Yup.date()
      .max(new Date(), 'Select a valid date')
      .required('DOB is required'),
  });

  const handleSubmit = async values => {
    let payload = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      dob: !date ? values.dob : moment(date).format('YYYY-MM-DD'),
      gender: values.gender,
    };

    userService
      .updateUserDetails(payload, auth.access_token)
      .then(res => {
        if (res.status === 200) {
          dispatch(getUserDetails(auth.access_token));
          toastNotification({
            title: 'Change profile details!',
            message: 'Your information has been updated successfully.',
            type: 'success',
            variant: 'solid',
            position: 'top-right',
            dashboard: true,
          });
          setIsLoading(false);
        }
      })
      .catch(e => {
        setIsLoading(false);
        toastNotification({
          title: 'Something went wrong!',
          message: 'Please try again.',
          type: 'error',
          variant: 'solid',
          position: 'top-right',
          dashboard: true,
        });
      });
  };

  const options = ['male', 'female', 'other'];

  const checkClicked = () => {
    setClicked(true);
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'gender',
    defaultValue: user.accountInfo?.patient.gender,
    onChange: checkClicked,
  });

  const group = getRootProps();

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
                      first_name: user.accountInfo?.patient.first_name,
                      last_name: user.accountInfo?.patient.last_name,
                      email: user.accountInfo?.email,
                      dob: user.accountInfo?.patient.dob,
                      gender: user.accountInfo?.patient.gender,
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
                            isInvalid={
                              (errors.email && touched.email) ||
                              checkEmail.exist
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
                                if (
                                  values.email !== user.accountInfo.email &&
                                  values.email !== ''
                                ) {
                                  userService
                                    .emailAvailabilityCheck(values.email)
                                    .then(res => {
                                      setCheckEmail(res.data.result);
                                    });
                                }
                              }}
                              value={values.email}
                            />
                            <FormHelperText noOfLines={2} textAlign={'left'}>
                              email does not get updated via API call but is
                              implemented
                            </FormHelperText>
                            <FormErrorMessage textAlign={'left'}>
                              {errors.email ||
                                (checkEmail.message &&
                                  'Email address is already exist in the system.')}
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
                              date={
                                !!date
                                  ? date
                                  : new Date(user.accountInfo.patient.dob)
                              }
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
                            onChange={handleChange}
                            name="gender"
                            id="gender"
                          >
                            {options.map(value => {
                              const radio = getRadioProps({ value });

                              const data = () => {
                                if (
                                  Object.values(radio).includes(
                                    user.accountInfo.patient.gender
                                  ) &&
                                  clicked === false &&
                                  user.accountInfo.patient.gender !== null
                                ) {
                                  let data = Object.assign(
                                    { ...radio },
                                    { isChecked: true }
                                  );
                                  return data;
                                }
                                return radio;
                              };

                              return (
                                <RadioCard key={value} props={data()}>
                                  {value}
                                </RadioCard>
                              );
                            })}
                          </HStack>

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
