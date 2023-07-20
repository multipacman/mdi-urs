import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../Components/Navigation/Navbar';
import { getUserDetails } from '../../slices/user';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  VStack,
  Center,
  Spinner,
  ScaleFade,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

export default function DashboardProfileEdit() {
  const user = useSelector(state => state.user);
  const auth = useSelector(state => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
            <Box paddingTop={'18%'} bg={'blue.600'}>
              <Center>
                <VStack>
                  <Card w={[300, 400, 500]} borderRadius="2xl">
                    <CardHeader mt={7} textAlign={'center'}>
                      <CheckIcon w={8} h={8} color="green.500" />
                    </CardHeader>
                    <CardBody>
                      <Heading mb={4} textColor={'blue.600'} size="xl">
                        Congratulations
                      </Heading>
                      <Text as={'b'}>
                        Your account has been created successfully.
                      </Text>
                      <Button
                        size="lg"
                        w={'100%'}
                        mt={7}
                        colorScheme="blue"
                        variant="solid"
                        type="submit"
                        onClick={() => navigate('/profile')}
                      >
                        Go to Login
                      </Button>
                    </CardBody>
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
