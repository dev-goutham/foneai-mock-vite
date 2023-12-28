import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  useDisclosure,
  Divider,
  Stack,
  Button,
  Spinner,
  AccordionPanel,
  Table,
  Thead,
  Tr,
  Td,
  Tbody,
  IconButton,
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  Progress,
  Flex,
  Icon,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Select,
  Textarea,
  Switch,
  Grid,
  GridItem,
  InputGroup,
  FormErrorMessage,
} from '@chakra-ui/react';

import { MdAudiotrack, MdDelete, MdInfo, MdSkipPrevious } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import {
  getPhrases,
  createIntent,
  updateIntent,
  getFlowElements,
  deletePhrase,
} from '../api';
import { useParams } from 'react-router-dom';
import { usePlayModalHook } from './usePlayModalHook';
import { useSpeakModalHook } from './useSpeakModalHook';
import { FormattedMessage, useIntl } from 'react-intl';

import { usePagination } from './usePagination';
import { Pagination } from '../components/Pagination';
import CustomScrollbar from '../components/Scrollbar';

import { TextAnnotator } from 'react-text-annotate';
import { useDeleteAlert } from './useDeleteAlert';
import { LangContext } from '../contexts/lang';
import ReactSelect from 'react-select';
import { TbAbc, TbHandStop } from 'react-icons/tb';
import { FaStop } from 'react-icons/fa';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

const shiftOptions = [
  {
    value: 0,
    label: 'stayOnNode',
    icon: <TbHandStop size={20} />,
  },
  {
    value: 1,
    label: 'goToPrevNode',
    icon: <MdSkipPrevious size={20} />,
  },
];

const actionOptions = [
  {
    value: 'none',
    label: 'doNothing',
    icon: <FaStop size={20} />,
  },
  {
    value: 'play',
    label: 'playAudio',
    icon: <MdAudiotrack size={20} />,
  },
  {
    value: 'speak',
    label: 'speakText',
    icon: <TbAbc size={20} />,
  },
];

const intentSchema = yup.object().shape({
  intentName: yup.string().required('Intent name is required'),
  intentDescription: yup.string(),
  intentType: yup
    .string()
    .oneOf(['ebbing', 'flowing'])
    .required('Intent type is required'),
  // phrases: yup
  //   .array()
  //   .of(yup.string())
  //   .min(2, 'At least two training phrases are required')
  //   .test('unique', 'Phrases must be unique', value => {
  //     if (!value) return true;
  //     const uniqueValues = new Set(value);
  //     return uniqueValues.size === value.length;
  //   })
  //   .required('At least one training phrase is required'),
  ebbShift: yup.number().when('intentType', {
    is: 'ebbing',
    then: () => yup.number().oneOf([0, 1]).required('Ebb shift is required'),
  }),
  ebbAction: yup.string().when('intentType', {
    is: 'ebbing',
    then: () => yup.string().oneOf(['none', 'play', 'speak']),
  }),
  payload: yup.array().when('intentType', {
    is: 'ebbing',
    then: () =>
      yup
        .array()
        .of(yup.string())
        .min(1, 'At least one action is required')
        .required('At least one action is required'),
  }),
});

export const useIntentModalHook = (
  submitFn,
  buttonLabel,
  intent,
  deleteIntent
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { botId } = useParams();
  const {
    isOpen: isConnectedWarningOpen,
    onOpen: onConnectedWarningOpen,
    onClose: onConnectedWarningClose,
  } = useDisclosure();

  const { DeleteAlert, onDeleteAlertOpen } = useDeleteAlert(
    'deleteIntent',
    () => {
      deleteIntent(intent._id);
      onClose();
    }
  );

  const IntentModalComponent = () => {
    const { locale } = useContext(LangContext);
    const { formatMessage } = useIntl();
    const [trainingPhrases, setTrainingPhrases] = useState([]);
    const [allPhrases, setAllPhrases] = useState([]);
    const [trainingInputValidation, setTrainingInputValidation] =
      useState(false);
    const [trainingPhrasesLoading, setTrainingPhrasesLoading] = useState(true);
    const [actionSelectKey, setActionSelectKey] = useState(0);

    const [loadingFlow, setLoadingFlow] = useState(false);

    const [invalid, setInvalid] = useState(false);

    const {
      register,
      formState: { errors },
      handleSubmit,
      setError,
      watch,
      control,
      reset,
      setValue,
      clearErrors,
    } = useForm({
      resolver: yupResolver(intentSchema),
      defaultValues: {
        intentName: intent.intentName,
        intentDescription: intent.intentDescription,
        intentType: intent.intentType,
        ebbShift: intent.ebbShift,
        ebbAction: intent.ebbAction,
        payload: intent.payload,
      },
      mode: 'onBlur',
    });

    const checkForConnections = async () => {
      setLoadingFlow(true);
      const flow = await getFlowElements(botId);
      const nlpNodes = await flow.nodes.filter(node => node.type === 'nlp');
      // console.log(nlpNodes);
      let used = nlpNodes.find(node => {
        return (
          node.data.intents.filter(i => i.intentName === intent.intentName)
            .length > 0
        );
      });
      console.log({ used });
      setLoadingFlow(false);
      if (used) {
        return true;
      } else {
        return false;
      }
    };

    const { currentPage, handlePageChange, isDisabled, pages, pagesCount } =
      usePagination({
        total: trainingPhrases.length,
        pageSize: 12,
        shouldNavigate: false,
      });

    const changePayload = (type, payload) => {
      console.log('change payload', payload);
      if (type === 'play') {
        setValue('ebbAction', 'play');
        setValue('payload', payload);
        clearErrors('ebbAction');
      } else if (type === 'speak') {
        setValue('ebbAction', 'speak');
        setValue('payload', [payload]);
        clearErrors('ebbAction');
      } else {
        console.log('change payload', type, payload);
      }
    };

    const { PlayModalComponent, onOpen: openPlayModal } = usePlayModalHook(
      changePayload,
      'Add Action',
      undefined,
      undefined,
      () => {
        setActionSelectKey(pre => pre + 1);
      }
    );
    const { SpeakModalComponent, onOpen: openSpeakModal } = useSpeakModalHook(
      changePayload,
      'Add Action',
      undefined,
      undefined,
      () => {
        setActionSelectKey(pre => pre + 1);
      }
    );

    useEffect(() => {
      if (intent.intentName !== '') {
        console.log('Intent', intent);
        setTrainingPhrasesLoading(true);
        getPhrases(intent._id, botId, 1)
          .then(res => {
            console.log(res);
            setTrainingPhrases(res);
            const phrases = res.map(phrase => ({
              ...phrase,
              status: 'existing',
            }));
            setAllPhrases(phrases);
          })
          .finally(() => {
            setTrainingPhrasesLoading(false);
          });
      } else {
        setTrainingPhrases([]);
      }
      return () => {
        setTrainingPhrases([]);
        console.log('clean up');
      };
    }, []);
    const [newIntent, setNewIntent] = useState(intent);

    async function trainingInputKeyDown(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const text = e.target.value?.trim();
        if (allPhrases.find(phrase => phrase.text === text)) {
          setInvalid(true);
          return;
        } else {
          setInvalid(false);
        }
        setTrainingInputValidation(true);
        let phraseId = uuidv4();
        setAllPhrases([
          {
            phraseId,
            text: e.target.value?.trim(),
            status: 'new',
          },
          ...allPhrases,
        ]);
        e.target.value = '';
        setTrainingInputValidation(false);
      }
    }

    const deletePhraseFn = async ({ status, phraseId, _id }) => {
      if (allPhrases.length <= 2) {
        return;
      }
      if (status === 'new') {
        setAllPhrases(prev =>
          prev.filter(phrase => phrase.phraseId !== phraseId)
        );
      } else {
        await deletePhrase(botId, intent._id, _id);
        setAllPhrases(prev =>
          prev.filter(phrase => phrase.phraseId !== phraseId)
        );
      }
    };

    // async function handleSubmit(e) {
    //   console.log('enetered submit');
    //   e.preventDefault();
    //   if (intent.intentName !== '') {
    //     console.log('update intent');
    //     let updatedIntent = {
    //       ...newIntent,
    //       phrases: allPhrases,
    //     };
    //     console.log('updated intent', updatedIntent);
    //     // API call
    //     updateIntent(botId, updatedIntent)
    //       .then(res => {
    //         console.log(res);
    //         submitFn(res.data, 'Update');
    //         // send the res to the parent component and set Intents & trained flag
    //         if (res.status === 200) {
    //         }
    //         onClose();
    //       })
    //       .catch(err => {
    //         alert(err.message);
    //       });
    //   } else {
    //     console.log('create intent');
    //     let addIntent = {
    //       ...newIntent,
    //       phrases: allPhrases,
    //     };
    //     console.log('new intent', addIntent);
    //     // API call
    //     createIntent(botId, addIntent)
    //       .then(res => {
    //         console.log(res);
    //         if (res.status === 201) {
    //           // send the res to the parent component and set Intents & trained flag
    //           submitFn(res.data, 'Create');
    //         }
    //         onClose();
    //       })
    //       .catch(err => {
    //         alert(err.message);
    //       });
    //   }
    //   onClose();
    // }

    const handleFormSubmit = async values => {
      console.log(values);
      if (allPhrases.length < 2) return;
      if (intent.intentName !== '') {
        console.log('update intent');
        let updatedIntent = {
          ...values,
          phrases: allPhrases,
        };
        updateIntent(botId, updatedIntent)
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              submitFn(res.data, 'Update');
              onClose();
            }
          })
          .catch(err => {
            alert(err.message);
          });
      } else {
        console.log(values);
        console.log('create intent');
        let addIntent = {
          ...values,
          phrases: allPhrases,
        };
        console.log('new intent', addIntent);
        createIntent(botId, addIntent)
          .then(res => {
            if (res.status === 201) {
              submitFn(res.data, 'Create');
              onClose();
            }
          })
          .catch(err => {
            alert(err.message);
          });
      }
    };

    return (
      <>
        <Modal
          // size={'3xl'}
          // minW={'1200px'}
          size={'6xl'}
          minW={'1200px'}
          closeOnOverlayClick={false}
          isOpen={isOpen}
          onClose={onClose}
          closeOnEsc={false}
        >
          <ModalOverlay />
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <ModalContent borderRadius="30px" minH={'85vh'}>
              <ModalHeader>
                {intent?.intentName !== '' ? (
                  <Text>{intent.intentName}</Text>
                ) : (
                  <FormControl isInvalid={Boolean(errors.intentName)}>
                    <InputGroup>
                      <Input
                        {...register('intentName')}
                        placeholder={formatMessage({ id: 'enterIntentName' })}
                        width={'75%'}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.intentName?.message}
                    </FormErrorMessage>
                  </FormControl>
                )}
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
              <ModalBody height={'60vh'} p={0}>
                <Stack direction={'row'} w={'100%'}>
                  <Stack
                    direction={'column'}
                    width={'35%'}
                    // minH={'72vh'}
                    p={6}
                    m={2}
                    spacing={6}
                    backgroundColor={'gray.50'}
                    borderRadius={'15px'}
                    shadow={'xl'}
                  >
                    <FormControl
                      id="intentDescription"
                      isInvalid={Boolean(errors.intentDescription)}
                    >
                      <FormLabel>
                        <FormattedMessage id="intentDescription" />
                      </FormLabel>
                      <Textarea
                        size="sm"
                        noOfLines={3}
                        resize="none"
                        maxLength={'300'}
                        {...register('intentDescription')}
                      />
                      <FormErrorMessage>
                        {errors.intentDescription?.message}
                      </FormErrorMessage>
                    </FormControl>
                    <>
                      <Flex
                        alignItems={'center'}
                        justifyContent={'space-between'}
                      >
                        <Text>
                          <FormattedMessage id="nonFlowingIntent" />
                        </Text>
                        <Controller
                          name="intentType"
                          control={control}
                          render={({ field: { name, onChange, value } }) => (
                            <Switch
                              defaultChecked={value === 'ebbing'}
                              name={name}
                              onChange={e => {
                                setValue(
                                  'intentType',
                                  e.target.checked ? 'ebbing' : 'flowing'
                                );
                                setValue('ebbShift', 0);
                                setValue('ebbAction', '');
                                setValue('payload', []);
                              }}
                              size={'lg'}
                              isDisabled={Boolean(intent.intentName)}
                            />
                          )}
                        />
                      </Flex>
                      {console.log('intent type', newIntent?.intentType)}
                      {watch('intentType') === 'ebbing' && (
                        <Stack
                          direction={'column'}
                          width={'100%'}
                          p={6}
                          m={2}
                          spacing={4}
                        >
                          <FormControl
                            id="ebbShift"
                            isInvalid={Boolean(errors.ebbShift)}
                            isRequired
                          >
                            <Flex
                              gap={2}
                              sx={{
                                svg: {
                                  color: 'gray.600',
                                },
                              }}
                              mb={1}
                              alignItems={'center'}
                            >
                              <FormLabel p={0} margin={0}>
                                <FormattedMessage id="ebbShift" />
                              </FormLabel>
                            </Flex>
                            <Controller
                              control={control}
                              name="ebbShift"
                              render={({
                                field: { name, onChange, value },
                              }) => (
                                <ReactSelect
                                  options={shiftOptions}
                                  value={shiftOptions.find(opt => {
                                    return value === opt.value;
                                  })}
                                  onChange={e => {
                                    setValue('ebbShift', e.value);
                                    setValue('ebbAction', '');
                                    setValue('payload', []);
                                    clearErrors('ebbAction');
                                  }}
                                  formatOptionLabel={el => (
                                    <Grid
                                      gridTemplateColumns={'20px 1fr'}
                                      gap={2}
                                      alignItems={'center'}
                                    >
                                      <GridItem>{el.icon}</GridItem>
                                      <GridItem>
                                        <Text
                                          borderLeft={'1px solid'}
                                          borderColor={'gray.200'}
                                          pl={2}
                                        >
                                          <FormattedMessage id={el.label} />
                                        </Text>
                                      </GridItem>
                                    </Grid>
                                  )}
                                />
                              )}
                            />
                            <FormErrorMessage>
                              {errors.ebbShift?.message}
                            </FormErrorMessage>
                          </FormControl>
                          <FormControl
                            id="ebbAction"
                            isInvalid={Boolean(errors.ebbAction)}
                            isRequired
                          >
                            <Flex
                              gap={2}
                              sx={{
                                svg: {
                                  color: 'gray.600',
                                },
                              }}
                              mb={1}
                              alignItems={'center'}
                            >
                              <FormLabel p={0} margin={0}>
                                <FormattedMessage id="ebbAction" />
                              </FormLabel>
                            </Flex>
                            <Controller
                              control={control}
                              name="ebbAction"
                              render={({
                                field: { name, onChange, value },
                              }) => (
                                <ReactSelect
                                  key={actionSelectKey}
                                  openMenuOnClick
                                  openMenuOnFocus
                                  closeMenuOnSelect
                                  options={actionOptions.filter(opt => {
                                    if (watch('ebbShift') === 0) {
                                      return opt.value !== 'none';
                                    } else {
                                      return true;
                                    }
                                  })}
                                  value={
                                    actionOptions.find(
                                      opt => value === opt.value
                                    ) || ''
                                  }
                                  onChange={e => {
                                    if (e.value === 'play') {
                                      openPlayModal();
                                    } else if (e.value === 'speak') {
                                      openSpeakModal();
                                    } else {
                                      setValue('ebbAction', 'none');
                                    }
                                  }}
                                  formatOptionLabel={el => (
                                    <Grid
                                      gridTemplateColumns={'20px 1fr'}
                                      alignItems={'center'}
                                      gap={2}
                                    >
                                      <GridItem>{el.icon}</GridItem>
                                      <GridItem>
                                        <Text
                                          borderLeft={'1px solid'}
                                          borderColor={'gray.200'}
                                          pl={2}
                                        >
                                          <FormattedMessage id={el.label} />
                                        </Text>
                                      </GridItem>
                                    </Grid>
                                  )}
                                />
                              )}
                            />
                            <FormErrorMessage>
                              {errors.ebbAction?.message}
                            </FormErrorMessage>
                          </FormControl>
                          <Text
                            pl={2}
                            w={'100%'}
                            fontSize={'md'}
                            textAlign={'left'}
                            fontWeight={'semibold'}
                            color={'teal.500'}
                            noOfLines="4"
                          >
                            {watch('payload').length > 0 &&
                              watch('payload')[0] +
                                (watch('payload')?.length > 1
                                  ? ` + ${watch('payload')?.length - 1} more `
                                  : '')}
                          </Text>
                        </Stack>
                      )}
                    </>
                  </Stack>
                  {intent.intentName !== '' && trainingPhrasesLoading ? (
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="primary.500"
                      size="xl"
                      position={'absolute'}
                      top={'50%'}
                      left={'60%'}
                    ></Spinner>
                  ) : (
                    <Stack
                      direction={'column'}
                      width={'100%'}
                      p={6}
                      m={2}
                      spacing={4}
                    >
                      <Box w={'100%'} h={'15%'} p={2}>
                        <FormControl
                          isInvalid={Boolean(errors.phrases)}
                          id="trainingPhraseInput"
                        >
                          <FormLabel>
                            <FormattedMessage id="trainingExamples" />
                          </FormLabel>
                          <Input
                            type="text"
                            // name="trainingPhraseInput"
                            // boxshadow on all sides of the input giving it  A highlighted border on all sides
                            boxShadow={'0 0 0 1px #3182ce'}
                            borderRadius={'15px'}
                            color={'gray.700'}
                            onKeyDown={trainingInputKeyDown}
                            errorBorderColor="red.400"
                          />
                          {!invalid ? (
                            <Text py={1} opacity={0}>
                              error placeholder
                            </Text>
                          ) : (
                            <Text
                              py={1}
                              fontSize={'xs'}
                              fontWeight={'bold'}
                              color="red.500"
                            >
                              Duplicate Training Phrase
                            </Text>
                          )}
                        </FormControl>
                      </Box>
                      {trainingInputValidation && (
                        <Progress size="xs" isIndeterminate />
                      )}
                      <Stack
                        className="no-scrollbar"
                        overflowY={'scroll'}
                        overflowX={'hidden'}
                        direction={'column'}
                        width={'100%'}
                        p={2}
                        height="50vh"
                        borderRadius={'15px'}
                      >
                        {allPhrases.length < 2 && (
                          <Stack
                            paddingX="20px"
                            paddingY="10px"
                            borderRadius="12px"
                            direction="row"
                            justify="center"
                            align="center"
                            spacing="8px"
                            height="50px"
                            background="primary.50"
                            mt={'1'}
                          >
                            <Icon
                              as={MdInfo}
                              color="primary.400"
                              fontSize={'16px'}
                            />
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
                              <FormattedMessage id="minTrainingExamplesWarning" />
                            </Text>
                          </Stack>
                        )}
                        <CustomScrollbar>
                          <Accordion allowMultiple>
                            {[...allPhrases]
                              .slice((currentPage - 1) * 12, currentPage * 12)
                              .map((phrase, index) => {
                                return (
                                  <PhraseAccordionPanel
                                    phrase={phrase}
                                    deletePhraseFn={() => {
                                      deletePhraseFn(phrase);
                                    }}
                                    key={phrase.phraseId}
                                    status={phrase.status}
                                    disableDelete={allPhrases.length <= 2}
                                  />
                                );
                              })}
                            {/* {trainingPhrases.map((phrase, index) => {
                            return (
                              <PhraseAccordionPanel
                                phrase={phrase}
                                deletePhrase={deletePhrase}
                                key={phrase.phraseId}
                                status="existing"
                              />
                            );
                          })} */}
                          </Accordion>
                        </CustomScrollbar>
                      </Stack>
                    </Stack>
                  )}
                </Stack>
              </ModalBody>

              <Divider color={'gray.300'} />

              <ModalFooter>
                <Flex
                  direction={'row'}
                  justifyContent={'space-between'}
                  width={'100%'}
                  alignItems={'center'}
                >
                  {/* <Spacer /> */}
                  {intent.intentName && (
                    <Button
                      disabled={loadingFlow}
                      onClick={async () => {
                        const connected = await checkForConnections();
                        if (connected) {
                          onConnectedWarningOpen();
                        } else {
                          onDeleteAlertOpen();
                        }
                      }}
                      variant={'outline'}
                      colorScheme="red"
                      // ml={16}
                      minWidth="15%"
                    >
                      <FormattedMessage id="deleteIntent" />
                    </Button>
                  )}
                  <Pagination
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                    isDisabled={isDisabled}
                    pages={pages}
                    pagesCount={pagesCount}
                  />

                  <Tooltip
                    label="Enter Intent Name & Add atleast 2 Training Phrases"
                    placement="top"
                  >
                    <Button
                      type="submit"
                      // onClick={handleSubmit}
                      isDisabled={allPhrases.length < 2}
                      colorScheme="primary"
                      // mr={16}
                      minWidth="15%"
                      ml={'auto'}
                    >
                      {buttonLabel}
                    </Button>
                  </Tooltip>
                </Flex>
              </ModalFooter>
              <PlayModalComponent />
              <SpeakModalComponent />
            </ModalContent>
          </form>
        </Modal>

        <DeleteAlert />
        <AlertDialog
          isOpen={isConnectedWarningOpen}
          // leastDestructiveRef={cancelRef}
          onClose={onConnectedWarningClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent borderRadius={'30px'}>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                <FormattedMessage id="notAllowed" />
              </AlertDialogHeader>
              <Divider />
              <AlertDialogBody>
                <FormattedMessage id="notAllowedMessage" />
              </AlertDialogBody>
              <Divider />
              <AlertDialogFooter>
                <Button onClick={onConnectedWarningClose}>
                  <FormattedMessage id="cancel" />
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    );
  };

  return {
    IntentModalComponent,
    onOpen,
    onClose,
  };
};

export const PhraseAccordionPanel = ({
  phrase,
  deletePhraseFn,
  status,
  disableDelete,
}) => {
  const buttonRef = useRef();
  const [value, setValue] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const TEXT = phrase.text;

  const changeHandler = value => {
    let newValue = value
      .filter(item => {
        return !isNaN(item.start) && !isNaN(item.end);
      })
      .map(item => {
        console.log(item.start, item.end);
        let word = TEXT.substring(item.start, item.end);

        while (item.start > 0 && TEXT[item.start - 1] !== ' ') {
          item.start -= 1;
          word = TEXT.substring(item.start, item.end);
        }
        while (item.end < TEXT.length && TEXT[item.end] !== ' ') {
          item.end += 1;
          word = TEXT.substring(item.start, item.end);
        }

        return { ...item, value: word, start: item.start, end: item.end };
      });
    console.log(newValue);

    setValue(newValue);
    if (!expanded) {
      buttonRef.current.click();
    }
  };

  const options = [
    {
      label: 'Food',
      value: 'food',
    },
    {
      label: 'Clothing',
      value: 'clothing',
    },
    {
      label: 'Something',
      value: 'something',
    },
    {
      label: 'Else',
      value: 'else',
    },
    {
      label: 'Nothing',
      value: 'nothing',
    },
  ];

  return (
    <AccordionItem
      sx={{
        backgroundColor: status === 'new' ? 'gray.300' : 'gray.100',
        borderColor: 'gray.200',
        lineHeight: '2',
      }}
    >
      {({ isExpanded }) => {
        setExpanded(isExpanded);
        return (
          <>
            <Flex
              onDoubleClick={e => {
                buttonRef.current.click();
              }}
              justifyContent={'space-between'}
              alignItems={'center'}
              px={'20px'}
              py={2}
            >
              <TextAnnotator
                value={value}
                onChange={changeHandler}
                getSpan={span => ({
                  start: span.start,
                  end: span.end,
                })}
                content={TEXT}
              />
              {isExpanded && (
                <Tooltip
                  label={
                    disableDelete
                      ? 'Number of training examples cannot be less than 2'
                      : ''
                  }
                >
                  <Button
                    _disabled={{
                      opacity: 0.5,
                    }}
                    disabled={disableDelete}
                    isDisabled={disableDelete}
                    onClick={deletePhraseFn}
                    colorScheme="red"
                    leftIcon={<MdDelete />}
                    variant={'outline'}
                  >
                    Delete Example
                  </Button>
                </Tooltip>
              )}
            </Flex>

            <AccordionButton
              backgroundColor={'white'}
              display={'none'}
              _expanded={{
                backgroundColor: 'gray.100',
                height: '45px',
              }}
              ref={buttonRef}
            >
              <Box as="span" flex="1" textAlign="left">
                {phrase.text}
              </Box>
              {isExpanded ? (
                <Icon
                  as={MdDelete}
                  color="red.500"
                  fontSize={'20px'}
                  onClick={() => deletePhrase(phrase.phraseId)}
                />
              ) : null}
            </AccordionButton>
            <AccordionPanel userSelect={'none'}>
              {value.length > 0 && (
                <Table>
                  <Thead>
                    <Tr>
                      <Td align="left">Sl. no.</Td>
                      <Td align="center">Word</Td>
                      <Td align="center">Entities</Td>
                      <Td align="right">
                        <Flex justifyContent={'end'}>Actions</Flex>
                      </Td>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {value.map(({ value, start, end }, idx) => {
                      console.log({ value, start, end });
                      return (
                        <Tr key={idx}>
                          <Td align="left">{idx + 1}</Td>
                          <Td align="center">
                            <Text align={'center'} as="span" fontWeight="bold">
                              {value}
                            </Text>
                          </Td>
                          <Td align="center">
                            {/* <ReactSelect
                              options={options}
                              defaultValue={options[0]}
                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  width: '100%',
                                  zIndex: 400,
                                }),
                              }}
                              formatOptionLabel={option => (
                                <Text zIndex={400}>{option.label}</Text>
                              )}
                            /> */}
                            <Select defaultValue={'food'}>
                              {options.map((op, i) => (
                                <option key={i} value={op.value}>
                                  {op.label}
                                </option>
                              ))}
                            </Select>
                          </Td>
                          <Td align="right">
                            <Flex justifyContent={'end'}>
                              <IconButton
                                onClick={() => {
                                  setValue(prev =>
                                    prev.filter(
                                      p => !(p.start === start && p.end === end)
                                    )
                                  );
                                }}
                                color={'red.500'}
                              >
                                <MdDelete size={20} />
                              </IconButton>
                            </Flex>
                            {/* <Icon
                          as={MdDelete}
                          color="red.500"
                          fontSize={'20px'}
                          // onClick={() => deletePhrase(phrase.phraseId)}
                        /> */}
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              )}
            </AccordionPanel>
          </>
        );
      }}
    </AccordionItem>
  );
};
