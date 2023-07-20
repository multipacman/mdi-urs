import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../Components/Navigation/Navbar';
import { getUserDetails } from '../../slices/user';

import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  ScaleFade,
  SimpleGrid,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const user = useSelector(state => state.user);
  const auth = useSelector(state => state.auth);

  let navigate = useNavigate();

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
            <Center>
              <Grid templateColumns="repeat(2)">
                <GridItem my={5} w="100%" h="auto">
                  <HStack>
                    <Box>
                      <Image
                        src="gibbresh.png"
                        fallbackSrc="https://via.placeholder.com/150"
                      />
                    </Box>
                    <Box>
                      <Heading textAlign={'start'}>
                        Welcome <br />
                        {user.accountInfo.name}
                      </Heading>
                    </Box>
                  </HStack>
                </GridItem>

                <GridItem my={5} w="100%" h="auto">
                  <HStack>
                    <Box w={'200px'}>
                      <Text textAlign={'start'} fontWeight={'bold'}>
                        E-mail Address
                      </Text>
                    </Box>
                    <Box w={'200px'}>
                      <Text w={'100%'} textAlign={'end'}>
                        {user.accountInfo.email}
                      </Text>
                    </Box>
                  </HStack>
                </GridItem>

                <GridItem my={5} w="100%" h="auto">
                  <HStack>
                    <Box w={'200px'}>
                      <Text textAlign={'start'} fontWeight={'bold'}>
                        Name
                      </Text>
                    </Box>
                    <Box w={'200px'}>
                      <Text w={'100%'} textAlign={'end'}>
                        {user.accountInfo.name}
                      </Text>
                    </Box>
                  </HStack>
                </GridItem>

                <GridItem my={5} w="100%" h="auto">
                  <HStack>
                    <Box w={'200px'}>
                      <Text w={'100%'} textAlign={'start'} fontWeight={'bold'}>
                        Gender
                      </Text>
                    </Box>
                    <Box w={'200px'}>
                      <Text w={'100%'} textAlign={'end'}>
                        {user.accountInfo.patient.gender}
                      </Text>
                    </Box>
                  </HStack>
                </GridItem>

                <GridItem my={5} w="100%" h="auto">
                  <HStack>
                    <Box w={'200px'}>
                      <Text w={'100%'} textAlign={'start'} fontWeight={'bold'}>
                        Date of birth
                      </Text>
                    </Box>
                    <Box w={'200px'}>
                      <Text w={'100%'} textAlign={'end'}>
                        {user.accountInfo.patient.dob}
                      </Text>
                    </Box>
                  </HStack>
                </GridItem>
              </Grid>
            </Center>
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
