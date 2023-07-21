import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  useDisclosure as Disclosure,
  useToast,
} from '@chakra-ui/react';

export const CustomToast = () => {
  const toast = useToast();
  // types are: "success", "info", "warning", "error"

  const toastNotification = newRes => {
    toast({
      title: newRes.title,
      description: newRes.message,
      status: newRes.type,
      position: newRes.position || 'top-right',
      variant: newRes.variant || 'left-accent',
      duration: 5000,
      render: props => {
        console.log(props);
        const {
          isOpen: isVisible,
          onClose,
          onOpen,
        } = Disclosure({ defaultIsOpen: true });

        return (
          isVisible && (
            <Alert
              mt={newRes.dashboard ? '70px' : '0px'}
              borderRadius={'md'}
              variant={props.variant}
              status={props.status}
            >
              <AlertIcon />
              <Box>
                <AlertTitle>{props.title}</AlertTitle>
                <AlertDescription>{props.description}</AlertDescription>
              </Box>
              <CloseButton
                alignSelf="flex-start"
                position="relative"
                right={-1}
                top={-1}
                onClick={onClose}
              />
            </Alert>
          )
        );
      },
    });
  };

  return { toastNotification };
};
