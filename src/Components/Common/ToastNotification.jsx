import { useToast } from '@chakra-ui/react';

export const CustomToast = () => {
  const toast = useToast();
  // types are: "success", "info", "warning", "error"

  const toastNotification = newRes => {
    toast({
      title: newRes.title,
      description: newRes.message,
      status: newRes.type,
      position: newRes.position || 'top-right',
      variant: 'left-accent',
      duration: 5000,
      isClosable: true,
    });
  };

  return { toastNotification };
};
