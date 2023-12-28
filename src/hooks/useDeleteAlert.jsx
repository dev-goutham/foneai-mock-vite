import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  Divider,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

export const useDeleteAlert = (title, onDelete) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const DeleteAlert = () => {
    return (
      <AlertDialog
        isOpen={isOpen}
        // leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent mt={'30vh'} borderRadius={'30px'}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <FormattedMessage id={title} />
              <AlertDialogCloseButton
                backgroundColor={'red.400'}
                _hover={{ backgroundColor: 'red.600' }}
                borderRadius={'full'}
                mr={-4}
                mt={-4}
              />
            </AlertDialogHeader>
            <Divider />
            <AlertDialogBody py={6}>
              <FormattedMessage id="deleteAlertMessage" />
            </AlertDialogBody>
            <Divider />
            <AlertDialogFooter>
              <Flex w={'full'} justifyContent={'space-between'}>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    onDelete();
                    onClose();
                  }}
                  width={'100%'}
                >
                  <FormattedMessage id="delete" />
                </Button>
              </Flex>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    );
  };

  return {
    onDeleteAlertOpen: onOpen,
    DeleteAlert,
    onDeleteAlertClose: onClose,
  };
};
