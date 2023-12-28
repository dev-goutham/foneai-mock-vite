import React, { useState } from 'react';
import { useDisclosure, Divider, Button, Spacer, Flex } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

export const useTransferModalHook = (
  submitFn,
  buttonLabel,
  data,
  deleteFn,
  showDeleteBtn = true
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // console.clear();
  console.log(data);

  const TransferModalComponent = () => {
    console.log(data);
    const [value, setValue] = useState({
      context: data?.context ? data.context : '',
      extension: data?.extension ? data.extension : '',
    });

    const deleteNode = () => {
      deleteFn(data);
      onClose();
    };

    const updateNode = () => {
      if (data) submitFn(data, value);
      else submitFn('transfer', value);
      onClose();
    };
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={'sm'}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        onCloseComplete={() =>
          setValue({
            context: '',
            extension: '',
          })
        }
        scrollBehavior={'inside'}
      >
        <ModalOverlay />
        <ModalContent borderRadius="30px" mt={'25vh'}>
          <ModalHeader>
            <FormattedMessage id="transferCall" />
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

          <ModalBody p={12}>
            <FormControl>
              <FormLabel fontSize={'md'} fontWeight={'semibold'}>
                <FormattedMessage id="transferContext" />
              </FormLabel>
              <Input
                type={'text'}
                size={'lg'}
                w={'80%'}
                py={1}
                px={5}
                maxLength={25}
                defaultValue={value.context}
                resize={'none'}
                onChange={e => {
                  setValue({
                    ...value,
                    context: e.target.value,
                  });
                }}
              />
              <FormErrorMessage>Invalid Number</FormErrorMessage>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize={'md'} fontWeight={'semibold'}>
                <FormattedMessage id="transferExtension" />
              </FormLabel>
              <Input
                type={'text'}
                size={'lg'}
                w={'80%'}
                py={1}
                px={5}
                maxLength={15}
                resize={'none'}
                defaultValue={value.extension}
                onChange={e => {
                  setValue({
                    ...value,
                    extension: e.target.value,
                  });
                }}
              />
              <FormErrorMessage>Invalid Number</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <Divider color={'gray.300'} />

          <ModalFooter>
            <Flex w={'100%'} justifyContent={'space-between'}>
              {showDeleteBtn && data && (
                <Button
                  type="reset"
                  colorScheme="red"
                  variant={'outline'}
                  ml={3}
                  minWidth="15%"
                  onClick={deleteNode}
                >
                  <FormattedMessage id="deleteNode" />
                </Button>
              )}
              <Spacer />
              <Button
                type="submit"
                colorScheme="primary"
                mr={1}
                minWidth="15%"
                onClick={updateNode}
                isDisabled={value.extension.trim().length === 0}
              >
                {buttonLabel}
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return {
    TransferModalComponent,
    onOpen,
    onClose,
  };
};
