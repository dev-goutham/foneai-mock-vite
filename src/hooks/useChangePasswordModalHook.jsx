import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { changePasswordFunction } from '../api';

export const useChangePasswordModalHook = () => {
  const {
    isOpen: isChangePasswordOpen,
    onOpen: openChangePassword,
    onClose: closeChangePassword,
  } = useDisclosure();

  const ChangePasswordModal = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const toast = useToast();

    const handleSubmit = async event => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const newPassword = formData.get('newPassword');
      const confirmPassword = formData.get('confirmNewPassword');

      if (!newPassword) {
        setErrors(prev => ({
          ...prev,
          newPassword: 'Enter a valid password',
        }));
        return;
      }

      if (!confirmPassword) {
        setErrors(prev => ({
          ...prev,
          confirmNewPassword: 'Please enter confirm password',
        }));
        return;
      }

      if (confirmPassword !== newPassword) {
        setErrors(prev => ({
          ...prev,
          confirmNewPassword: 'Passwords do not match',
        }));
        return;
      }

      setLoading(true);

      await changePasswordFunction(newPassword);

      setLoading(false);
      closeChangePassword();
    };

    return (
      <Modal
        isOpen={isChangePasswordOpen}
        onClose={closeChangePassword}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent borderRadius="30px" mt={'15vh'}>
          <form method="post" id="login-form" onSubmit={handleSubmit}>
            <ModalHeader>
              <FormattedMessage id="changePassword" />
            </ModalHeader>
            <ModalCloseButton
              type="reset"
              backgroundColor={'red.400'}
              _hover={{ backgroundColor: 'red.600' }}
              borderRadius={'full'}
              mr={-4}
              mt={-4}
            />
            <Divider color={'gray.300'} />
            <ModalBody rounded={'lg'} borderRadius="30px" bg={'white'} p={8}>
              <Stack mx={'auto'} spacing={4}>
                <FormControl
                  isInvalid={Boolean(errors.newPassword)}
                  id="newPassword"
                >
                  <FormLabel>
                    <FormattedMessage id="newPassword" />
                  </FormLabel>
                  <Input
                    aria-label="New Password"
                    type="password"
                    name="newPassword"
                  />
                  <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={Boolean(errors.confirmNewPassword)}
                  id="confirmNewPassword"
                >
                  <FormLabel>
                    <FormattedMessage id="confirmNewPassword" />
                  </FormLabel>
                  <Input
                    type="password"
                    aria-label="Confirm New Password"
                    name="confirmNewPassword"
                  />

                  <FormErrorMessage>
                    {errors.confirmNewPassword}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
            </ModalBody>
            <Divider color={'gray.300'} />

            <ModalFooter>
              <Button
                leftIcon={loading && <Spinner />}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                type="submit"
              >
                <FormattedMessage id="changePassword" />
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    );
  };

  return {
    isChangePasswordOpen,
    openChangePassword,
    closeChangePassword,
    ChangePasswordModal,
  };
};
