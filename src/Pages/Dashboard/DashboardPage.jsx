import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../slices/user';

import {
  Box,
  Center,
  Grid,
  GridItem,
  HStack,
  Heading,
  IconButton,
  Image,
  ScaleFade,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useFileUpload } from 'use-file-upload';
import userService from '../../services/user.services';
import { CustomToast } from '../../Components/Common/ToastNotification';

export default function Dashboard() {
  const user = useSelector(state => state.user);
  const auth = useSelector(state => state.auth);
  const [uploadButtonLoading, setUploadButtonLoading] = useState(false);
  const [files, selectFile] = useFileUpload();
  const { toastNotification } = CustomToast();

  const dispatch = useDispatch();

  const handleUpload = async () => {
    selectFile({ accept: 'image/*' }, ({ name, size, source, file }) => {
      setUploadButtonLoading(true);
      userService
        .updateUserProfilePic(file, auth.access_token)
        .then(res => {
          dispatch(getUserDetails(auth.access_token));
          toastNotification({
            title: 'Profile picture uploaded!',
            message: 'Your information has been updated successfully.',
            type: 'success',
            variant: 'solid',
            position: 'top-right',
            dashboard: true,
          });
          setUploadButtonLoading(false);
        })
        .catch(e => {
          toastNotification({
            title: 'Something went wrong!',
            message: 'Please try again.',
            type: 'error',
            variant: 'solid',
            position: 'top-right',
            dashboard: true,
          });
          setUploadButtonLoading(true);
        });
    });
  };

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
                      <ScaleFade
                        initialScale={0.1}
                        in={user.accountInfo.patient.profile_image.resource}
                      >
                        <Image
                          rounded={'full'}
                          src={
                            files?.source ||
                            user.accountInfo.patient.profile_image.resource
                          }
                          // fallbackSrc="https://placehold.co/150x150/000000/FFF?text=Loading..."
                          boxSize="150px"
                        />
                        <IconButton
                          isRound={true}
                          variant="solid"
                          colorScheme="gray"
                          aria-label="Done"
                          fontSize="20px"
                          ml={'30px'}
                          mt={'-35px'}
                          position={'absolute'}
                          icon={<AddIcon />}
                          isLoading={uploadButtonLoading}
                          onClick={() => handleUpload()}
                        />
                      </ScaleFade>
                    </Box>
                    <Box ml={7}>
                      <Heading textAlign={'start'}>Welcome</Heading>
                      <Heading color={'gray.500'}>
                        {user.accountInfo?.patient?.gender === null ||
                        user.accountInfo?.patient?.gender === 'other'
                          ? null
                          : user.accountInfo?.patient?.gender === 'male'
                          ? 'Mr '
                          : 'Mrs '}
                        {user.accountInfo.patient.name}
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
                      <Text
                        color={'gray.500'}
                        w={'100%'}
                        textAlign={'end'}
                        fontWeight={'semibold'}
                      >
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
                      <Text
                        color={'gray.500'}
                        w={'100%'}
                        textAlign={'end'}
                        fontWeight={'semibold'}
                      >
                        {user.accountInfo.patient.full_name}
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
                      <Text
                        color={'gray.500'}
                        w={'100%'}
                        textAlign={'end'}
                        fontWeight={'semibold'}
                      >
                        {user.accountInfo.patient.gender ?? 'N/A'}
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
                      <Text
                        color={'gray.500'}
                        w={'100%'}
                        textAlign={'end'}
                        fontWeight={'semibold'}
                      >
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
