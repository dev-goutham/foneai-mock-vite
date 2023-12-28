import {
  Button,
  Center,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  useRadioGroup,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getWebhooks } from '../api';
import { FormattedMessage } from 'react-intl';
import { WebhookCheckboxCard } from '../components/CheckboxCard';

export const useWebhookModalHook = (handleSubmit, webhook, deleteFn) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const WebhookModalComponent = () => {
    const [webhooks, setWebhooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      getWebhooks().then(res => {
        setWebhooks(res);
        setLoading(false);
      });
    }, []);

    const {
      value: webhookValue,
      setValue: setWebhookValue,
      getRadioProps: getWebhookCheckboxProps,
    } = useRadioGroup({
      defaultValue: webhook,
    });

    const handleClick = () => {
      if (webhook) {
        handleSubmit(webhookValue);
        onClose();
      } else {
        handleSubmit('webhook', webhookValue);
      }
    };

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="30px" minW={'850px'} minH={'600px'}>
          <ModalHeader>
            <Text fontSize={'2xl'} fontWeight={'semibold'}>
              <FormattedMessage id="webhooks" />
            </Text>
            <ModalCloseButton
              backgroundColor={'red.400'}
              _hover={{ backgroundColor: 'red.600' }}
              borderRadius={'full'}
              mr={-4}
              mt={-4}
            />
          </ModalHeader>
          <Divider color={'gray.300'} />

          <ModalBody>
            <Stack
              direction={'row'}
              spacing={'2%'}
              align={'center'}
              width={'100%'}
              my={'auto'}
            >
              {loading ? (
                <Flex
                  p={'2%'}
                  minChildWidth="200px"
                  top={'0px'}
                  position={'relative'}
                  minHeight={'480px'}
                  // h={'60vh'}
                  spacing="15px"
                  gap={'20px'}
                  width={'850px'}
                  overflowY={'scroll'}
                  backgroundColor={'gray.100'}
                  borderRadius={'20px'}
                  flexWrap={'wrap'}
                  className="no-scrollbar"
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <Spinner color="primary.500" size={'xl'} thickness="6px" />
                </Flex>
              ) : (
                <Flex
                  p={'2%'}
                  minChildWidth="200px"
                  top={'0px'}
                  position={'relative'}
                  minHeight={'480px'}
                  // h={'60vh'}
                  spacing="15px"
                  gap={'20px'}
                  width={'850px'}
                  overflowY={'scroll'}
                  backgroundColor={'gray.100'}
                  borderRadius={'20px'}
                  flexWrap={'wrap'}
                  className="no-scrollbar"
                >
                  {webhooks.map((webhook, i) => {
                    return (
                      <WebhookCheckboxCard
                        key={i}
                        webhookName={webhook.webhookName}
                        {...getWebhookCheckboxProps({
                          value: webhook.webhookName,
                        })}
                      />
                    );
                  })}
                </Flex>
              )}
            </Stack>
          </ModalBody>
          <Divider color={'gray.300'} />

          <ModalFooter minH={'60px'}>
            <Flex
              w={'100%'}
              alignItems={'center'}
              justifyContent={webhook ? 'space-between' : 'flex-end'}
            >
              {webhook && (
                <Button
                  type="reset"
                  colorScheme="red"
                  variant={'outline'}
                  ml={3}
                  minWidth="15%"
                  onClick={deleteFn}
                >
                  <FormattedMessage id="deleteNode" />
                </Button>
              )}
              <Button
                type="submit"
                colorScheme="primary"
                mr={1}
                minWidth="15%"
                my={'5px'}
                maxH={'50px'}
                onClick={handleClick}
                // isDisabled={
                //   intentsTypeArray.length < 2 ||
                //   !intentsTypeArray.includes('flowing')
                // }
              >
                <FormattedMessage id={webhook ? 'updateNode' : 'addNode'} />
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return {
    isOpen,
    onClose,
    onOpen,
    WebhookModalComponent,
  };
};
