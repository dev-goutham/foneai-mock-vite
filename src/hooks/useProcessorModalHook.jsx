import React, { useState, useEffect, useRef } from 'react';
import {
  Spinner,
  useDisclosure,
  useCheckboxGroup,
  Flex,
  Text,
  Spacer,
  Divider,
  Stack,
  StackDivider,
  useCheckbox,
  chakra,
  Box,
  HStack,
  Switch,
  Card,
  Icon,
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
import { SimpleGrid, Center, VStack, Button } from '@chakra-ui/react';

import { IntentCheckboxCard } from '../components/CheckboxCard';
import { SelectedIntentCard } from '../components/SelectedCardModal';
import { IntentStatus } from '../components/ModalStatus';

import useStore from '../store';
import { shallow } from 'zustand/shallow';
import { FormattedMessage } from 'react-intl';
import { usePagination } from './usePagination';
import { Pagination } from '../components/Pagination';
import { MdWarning } from 'react-icons/md';
import PaginationContainer from '../components/AppLayout/PaginationContainer';

const selector = state => ({
  intents: state.intents,
});

export const useProcessorModalHook = (
  submitFn,
  buttonLabel,
  data,
  deleteFn
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const ProcessorModalComponent = () => {
    const { intents } = useStore(selector, shallow);
    const maxIntentsCount = 25;
    const [customFallback, setCustomFallback] = useState(
      Boolean(
        (data?.intents || []).find(i => i.intentName === 'CUSTOM_FALLBACK')
      )
    );

    const { currentPage, handlePageChange, isDisabled, pages, pagesCount } =
      usePagination({
        total: intents.length,
        pageSize: 8,
        shouldNavigate: false,
      });

    const [checked, setChecked] = useState(false);

    const handleClick = () => {
      setChecked(prev => !prev);
    };

    let defaultIntents = [];
    console.log(data);
    if (data?.intents.length > 0) {
      defaultIntents = data?.intents.map(intent => intent.intentName);
    }
    const [intentsTypeArray, setIntentsTypeArray] = useState([]);

    const {
      value: processorValue,
      setValue: setProcessorValue,
      getCheckboxProps: getProcessorCheckboxProps,
    } = useCheckboxGroup({
      defaultValue: defaultIntents,
    });

    console.log(processorValue);

    useEffect(() => {
      if (processorValue.length >= maxIntentsCount) {
        setProcessorValue(processorValue.slice(0, maxIntentsCount));
      }
    }, [processorValue[processorValue.length - 1]]);

    useEffect(() => {
      setIntentsTypeArray(
        processorValue.map(
          selectedIntentName =>
            intents.find(intent => intent.intentName === selectedIntentName)
              ?.intentType
        )
      );
    }, [processorValue]);

    function unCheckNlp(intentName) {
      setProcessorValue(
        processorValue.filter(
          selectedIntentNae => selectedIntentNae !== intentName
        )
      );
    }

    const deleteNode = () => {
      deleteFn(data);
      onClose();
    };

    const handleSubmit = e => {
      e.preventDefault();
      if (data?.intents.length > 0) {
        console.log('line 83', defaultIntents, processorValue, checked);
        submitFn(data, defaultIntents, processorValue);
      } else submitFn('process', processorValue, checked);
      //
      onClose();
    };

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        scrollBehavior={'outside'}
        onCloseComplete={() => setProcessorValue([])}
      >
        <ModalOverlay />
        <ModalContent borderRadius="30px" minW={'1100px'} minH={'600px'}>
          <ModalHeader>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              spacing={'45%'}
            >
              <Text fontSize={'2xl'} fontWeight={'semibold'}>
                <FormattedMessage id="processSpeech" />
              </Text>
              {/* <Button
                onClick={handleClick}
                variant={checked ? 'solid' : 'outline'}
                colorScheme="green"
                mr={16}
              >
                <Text>Custom Fallback</Text>
              </Button> */}
            </Stack>
            <ModalCloseButton
              backgroundColor={'red.400'}
              _hover={{ backgroundColor: 'red.600' }}
              borderRadius={'full'}
              mr={-4}
              mt={-4}
            />
          </ModalHeader>

          <Divider color={'gray.300'} />

          <ModalBody height={'64vh'} minH={'480px'}>
            <Stack
              direction={'row'}
              spacing={'2%'}
              align={'center'}
              width={'100%'}
            >
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
                {[...intents]
                  .slice((currentPage - 1) * 8, currentPage * 8)
                  .map(intent => {
                    return (
                      <IntentCheckboxCard
                        key={intent._id}
                        intentName={intent.intentName}
                        intentType={intent?.intentType}
                        {...getProcessorCheckboxProps({
                          value: intent.intentName,
                        })}
                      />
                    );
                  })}
              </Flex>
              <Center height={'480px'}>
                <Divider
                  orientation={'vertical'}
                  color={'primary.500'}
                  width="10px"
                />
              </Center>

              <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={4}
                mt={'10px'}
                align="top"
                width={'25%'}
                height={'450px'}
              >
                <Text
                  fontSize={'md'}
                  fontWeight={'semibold'}
                  color={'primary.500'}
                  maxLength={200}
                >
                  <FormattedMessage id="selectedIntents" />:{' '}
                </Text>

                <Stack
                  direction={'column'}
                  gap={'20px'}
                  height={'90%'}
                  pr="15px"
                  overflowY={'scroll'}
                  className="no-scrollbar"
                  maxW="235px"
                  minW="235px"
                >
                  {processorValue
                    .filter(name => name !== 'CUSTOM_FALLBACK')
                    .map(selectedIntentName => {
                      return (
                        <SelectedIntentCard
                          w={'80%'}
                          key={selectedIntentName}
                          unCheckNlp={unCheckNlp}
                          intentName={selectedIntentName}
                        />
                      );
                    })}
                </Stack>
                {intentsTypeArray.length < 2 ? (
                  <Card
                    background="orange.200"
                    borderRadius="10px"
                    alignItems="center"
                    p={'10px'}
                  >
                    <Flex alignItems={'center'}>
                      <Icon as={MdWarning} color="orange.800" fontSize="40px" />
                      <Text
                        fontSize={'md'}
                        fontWeight={'normal'}
                        color={'orange.800'}
                        textAlign={'center'}
                      >
                        <FormattedMessage id="minIntents" />
                      </Text>
                    </Flex>
                  </Card>
                ) : (
                  <HStack pl="20px" spacing={'10px'} align={'center'}>
                    <Text>Custom Fallback:</Text>
                    <Switch
                      defaultChecked={Boolean(
                        (data?.intents || []).find(
                          i => i.intentName === 'CUSTOM_FALLBACK'
                        )
                      )}
                      onChange={e => {
                        if (e.target.checked) {
                          setProcessorValue(prev => [
                            ...prev,
                            'CUSTOM_FALLBACK',
                          ]);
                        } else {
                          setProcessorValue(prev =>
                            prev.filter(p => p !== 'CUSTOM_FALLBACK')
                          );
                        }
                      }}
                      size={'lg'}
                    />
                  </HStack>
                )}

                {/* <IntentStatus intentsTypeArray={intentsTypeArray} /> */}
              </VStack>
            </Stack>
          </ModalBody>

          <Divider color={'gray.300'} />

          <ModalFooter minH={'60px'}>
            <Flex
              w={'100%'}
              alignItems={'center'}
              justifyContent={data ? 'space-between' : 'flex-end'}
            >
              {data && (
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
              {/* <Spacer /> */}
              <>
                <Pagination
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                  isDisabled={isDisabled}
                  pages={pages}
                  pagesCount={pagesCount}
                />
              </>
              <Button
                type="submit"
                colorScheme="primary"
                mr={1}
                minWidth="15%"
                my={'5px'}
                maxH={'50px'}
                onClick={handleSubmit}
                isDisabled={
                  intentsTypeArray.length < 2 ||
                  !intentsTypeArray.includes('flowing')
                }
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
    ProcessorModalComponent,
    onOpen,
    onClose,
  };
};
