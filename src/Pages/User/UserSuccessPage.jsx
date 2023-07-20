import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon } from '@chakra-ui/icons';

import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';

export default function UserSuccess() {
  let navigate = useNavigate();

  return (
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
              <Text as={'b'}>Your account has been created successfully.</Text>
              <Button
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
          </Card>
          <Text ml={2} textColor={'white'} alignSelf={'start'} fontSize="15px">
            Version 1.0
          </Text>
        </VStack>
      </Center>
    </Box>
  );
}
