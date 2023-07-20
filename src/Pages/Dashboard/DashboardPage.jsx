import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../Components/Navigation/Navbar';
import { getUserDetails } from '../../slices/user';

import { Box, Button, Center, ScaleFade, Spinner } from '@chakra-ui/react';
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
            <Box p={4}>
              <Button
                size="lg"
                w={'100%'}
                mt={7}
                colorScheme="blue"
                variant="solid"
                type="submit"
                onClick={() => navigate('/profile-edit')}
              >
                Login
              </Button>
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
