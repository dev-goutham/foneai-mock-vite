import React, { useState } from 'react';
import {
  useDisclosure,
  Button,
  Flex,
  Text,
  Spacer,
  Divider,
  Stack,
  useToast,
} from '@chakra-ui/react';
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
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { usePlayModalHook } from './usePlayModalHook';
import { useSpeakModalHook } from './useSpeakModalHook';
import { useTransferModalHook } from './useTransferModalHook';
import { setFallback as setFallbackAPI } from '../api';
import { FormattedMessage } from 'react-intl';

export const useFallbackModalHook = (
  setFallbackExists,
  botId,
  savedFallback,
  setSavedFallback
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const FallbackModalComponent = () => {
    const toast = useToast();

    console.log(savedFallback);

    const setFallbackFn = fallback => {
      setFallbackAPI(botId, fallback)
        .then(res => {
          console.log(res);
          setFallbackExists(true);
          setSavedFallback(res.data.fallback);
          toast({
            title: 'Fallback set',
            description: 'Fallback set successfully',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          onClose();
        })
        .catch(err => {
          console.log(err);
          toast({
            title: 'Error',
            description: 'Error setting fallback',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          onClose();
        });
    };

    const [fallback, setFallback] = useState(
      savedFallback || {
        fallbackMessageType: '',
        fallbackPayload: [],
        defaultFallbackActionType: 'terminate',
        fallbackLimit: 1,
        fallbackAction: {
          context: '',
          extension: '',
        },
      }
    );

    const setFallbackPayload = (type, x) => {
      if (type === 'play') {
        setFallback({
          ...fallback,
          fallbackPayload: x,
        });
      } else if (type === 'speak') {
        setFallback({
          ...fallback,
          fallbackPayload: [x],
        });
      }
    };

    const setFallbackAction = (type, value) => {
      setFallback({
        ...fallback,
        defaultFallbackActionType: type,
        fallbackAction: {
          context: value?.context,
          extension: value?.extension,
        },
      });
      closeTransferModal();
    };

    const {
      onOpen: openPlayModal,
      onClose: closePlayModal,
      PlayModalComponent,
    } = usePlayModalHook(
      setFallbackPayload,
      <FormattedMessage id="addFallbackMessage" />
    );
    const {
      onOpen: openSpeakModal,
      onClose: closeSpeakModal,
      SpeakModalComponent,
    } = useSpeakModalHook(
      setFallbackPayload,
      <FormattedMessage id="addFallbackMessage" />
    );

    const {
      onOpen: openTransferModal,
      onClose: closeTransferModal,
      TransferModalComponent,
    } = useTransferModalHook(
      setFallbackAction,
      <FormattedMessage id="addFallbackAction" />
    );

    const handleMessageTypeChange = e => {
      if (e.target.value === 'play') {
        openPlayModal();
      } else if (e.target.value === 'speak') {
        openSpeakModal();
      }
      setFallback({
        ...fallback,
        fallbackMessageType: e.target.value,
      });
    };

    const handleActionTypeChange = e => {
      if (e.target.value === 'transfer') {
        openTransferModal();
      } else {
        setFallback({
          ...fallback,
          defaultFallbackActionType: e.target.value,
          fallbackAction: {
            context: '',
            extension: '',
          },
        });
      }
    };

    return (
      <Modal
        size={'xl'}
        minW={'700px'}
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        closeOnEsc={false}
      >
        <ModalOverlay />
        <ModalContent mt={'15vh'} borderRadius="30px" minH={'35vh'}>
          <ModalHeader height={'15vh'}>
            <FormattedMessage
              id="configureFallback"
              defaultMessage="Fallback"
            />
          </ModalHeader>
          <ModalCloseButton
            backgroundColor={'red.400'}
            _hover={{ backgroundColor: 'red.600' }}
            borderRadius={'full'}
            mr={-4}
            mt={-4}
            type="reset"
          />

          <Divider color={'gray.300'} />

          <ModalBody height={'30vh'} p={0}>
            <Flex direction={'column'} width={'100%'} p={6} m={2} spacing={4}>
              <Stack direction={'row'} width={'100%'} p={6} m={2} spacing={4}>
                <FormControl id="fallbackMessageType" isRequired>
                  <FormLabel>
                    <FormattedMessage
                      id="fallbackMessageType"
                      defaultMessage="Fallback message type"
                    />
                  </FormLabel>
                  <Select
                    placeholder="Select option"
                    width={'120px'}
                    value={fallback.fallbackMessageType}
                    onChange={handleMessageTypeChange}
                  >
                    <option value="play">
                      <FormattedMessage
                        id="playAudio"
                        defaultMessage="Play Audio"
                      />
                    </option>
                    <option value="speak">
                      <FormattedMessage
                        id="speakText"
                        defaultMessage="Speak Text"
                      />
                    </option>
                  </Select>
                </FormControl>
                {(fallback.fallbackMessageType === 'play' ||
                  fallback.fallbackMessageType === 'speak') && (
                  <Text
                    fontFamily="Inter"
                    lineHeight="2"
                    fontWeight="semibold"
                    fontSize="16px"
                    color="#3182CE"
                    width="490px"
                    height="38px"
                    maxWidth="100%"
                    textAlign="center"
                  >
                    {fallback?.fallbackPayload?.length > 0
                      ? fallback.fallbackPayload[0]
                      : ''}
                    {fallback?.fallbackPayload?.length > 1 &&
                      fallback.fallbackMessageType === 'play' &&
                      `+ ${fallback.fallbackPayload.length - 1}  more`}
                  </Text>
                )}
              </Stack>
              {/* make a flex equally distibuted threee inputs */}
              <Stack direction={'row'} width={'100%'} p={6} m={2} spacing={4}>
                <FormControl id="fallbackLimit" isRequired>
                  <FormLabel>
                    <FormattedMessage
                      id="fallbackLimit"
                      defaultMessage="Fallback limit"
                    />
                  </FormLabel>
                  <NumberInput
                    defaultValue={fallback.fallbackLimit}
                    min={1}
                    max={10}
                    width={'80px'}
                    onChange={value =>
                      setFallback({
                        ...fallback,
                        fallbackLimit: Number(value),
                      })
                    }
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl id="defaultFallbackActionType" isRequired>
                  <FormLabel>
                    <FormattedMessage
                      id="defaultFallbackActionType"
                      defaultMessage="Default fallback action type"
                    />
                  </FormLabel>
                  <Select
                    placeholder="Select option"
                    width={'150px'}
                    value={fallback.defaultFallbackActionType}
                    onChange={handleActionTypeChange}
                  >
                    <option value="terminate">
                      <FormattedMessage
                        id="hangupCall"
                        defaultMessage="Hangup"
                      />
                    </option>
                    <option value="transfer">
                      <FormattedMessage
                        id="transferCall"
                        defaultMessage="Transfer"
                      />
                    </option>
                  </Select>
                </FormControl>
                {fallback.defaultFallbackActionType === 'transfer' && (
                  <Text
                    fontFamily="Inter"
                    lineHeight="2"
                    p={2}
                    verticalAlign={'middle'}
                    fontWeight="semibold"
                    fontSize="16px"
                    color="#3182CE"
                    width="490px"
                    height="38px"
                    maxWidth="100%"
                    textAlign="center"
                  >
                    <FormattedMessage
                      id="transferContext"
                      defaultMessage="Transfer Context"
                    />
                    : {fallback.fallbackAction.context}
                    <br />
                    <FormattedMessage
                      id="transferExtension"
                      defaultMessage="Transfer Extension"
                    />
                    : {fallback.fallbackAction.extension}
                  </Text>
                )}
              </Stack>
            </Flex>
            <PlayModalComponent />
            <SpeakModalComponent />
            <TransferModalComponent />
          </ModalBody>

          <Divider color={'gray.300'} />

          <ModalFooter>
            <Flex direction={'row'} width={'100%'}>
              <Spacer />
              <Button
                onClick={e => setFallbackFn(fallback)}
                colorScheme="primary"
                mr={4}
                minWidth="15%"
                isDisabled={
                  !(
                    fallback.fallbackMessageType === 'play' ||
                    fallback.fallbackMessageType === 'speak'
                  )
                }
              >
                <FormattedMessage id="configureFallback" />
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return {
    FallbackModalComponent,
    onOpen,
    onClose,
  };
};
