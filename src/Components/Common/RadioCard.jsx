import { Box, useRadio } from '@chakra-ui/react';

export default function RadioCard(props) {
  const { getInputProps, getRadioProps } = useRadio(props.props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        fontWeight={'semibold'}
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          color: 'blue.700',
          borderColor: 'blue.600',
          borderWidth: '2px',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={12}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}
