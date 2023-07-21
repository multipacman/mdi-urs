import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckIcon } from '@chakra-ui/icons';

import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  ScaleFade,
  Text,
  VStack,
} from '@chakra-ui/react';

export default function UserSuccess() {
  let { state } = useLocation();
  let navigate = useNavigate();

  console.log();
  return (
    <>
      <Box paddingTop={'18%'} bg={'blue.700'}>
        <ScaleFade initialScale={'0.9'} in={true}>
          <Center>
            <VStack>
              <Card w={[300, 400, 500]} borderRadius="2xl">
                {!!state && state.view ? (
                  <>
                    <CardHeader mt={7} textAlign={'center'}>
                      <CheckIcon w={8} h={8} color="green.500" />
                    </CardHeader>
                    <CardBody>
                      <Heading mb={4} textColor={'blue.700'} size="xl">
                        Congratulations
                      </Heading>
                      <Text as={'b'}>
                        Your account has been created successfully.
                      </Text>
                      <Button
                        bg={'blue.700'}
                        size="lg"
                        w={'100%'}
                        mt={7}
                        colorScheme="blue"
                        variant="solid"
                        type="submit"
                        onClick={() => navigate('/')}
                      >
                        Go to Login
                      </Button>
                    </CardBody>
                  </>
                ) : (
                  <CardBody>
                    <Heading mb={4} textColor={'blue.700'} size="xl">
                      Do you wish to register?
                    </Heading>
                    <Text as={'b'}>Few steps and you're good to go!</Text>
                    <Button
                      bg={'blue.700'}
                      size="lg"
                      w={'100%'}
                      mt={7}
                      colorScheme="blue"
                      variant="solid"
                      type="submit"
                      onClick={() => navigate('/register')}
                    >
                      Go to register
                    </Button>
                  </CardBody>
                )}
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
      </Box>
    </>
  );
}
