import {
  Flex,
  Spacer,
  Button,
  Grid,
  Stack,
  Divider,
  useDisclosure,
  useToast,
  InputGroup,
} from '@chakra-ui/react';
import { Box, Icon, Text, Spinner, HStack, Center } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { IntentCard } from '../components/Card';
import { MdArrowForward, MdInfo } from 'react-icons/md';
import { IoIosAddCircle } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  AlertDialog,
  AlertDialogBody,
  Alert,
  AlertIcon,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { Skeleton } from '@chakra-ui/react';
import { useIntentModalHook } from '../hooks/useIntentModalHook';
import { useFallbackModalHook } from '../hooks/useFallbackModalHook';

import {
  getBot,
  getIntents,
  createIntent,
  trainBot,
  deleteIntent,
} from '../api';

import { BsFillCircleFill } from 'react-icons/bs';
import { FaGraduationCap } from 'react-icons/fa';
import { GiFallingStar } from 'react-icons/gi';
import { FormattedMessage } from 'react-intl';
import { usePagination } from '../hooks/usePagination';
import { Pagination } from '../components/Pagination';
import Header from '../components/AppLayout/Header';
import Body from '../components/AppLayout/Body';
import PaginationContainer from '../components/AppLayout/PaginationContainer';
import { useTrainingStatus } from '../contexts/trainginStatus';

export default function Intents() {
  const { botId } = useParams();
  const [intents, setIntents] = useState([]);
  const [trained, setTrained] = useState(false);
  const [deletingIntent, setDeletingIntent] = useState(false);
  const [training, setTraining] = useState(false);
  const { loading, startTraining } = useTrainingStatus();

  const deleteIntentFn = async intentId => {
    setDeletingIntent(true);
    await deleteIntent(botId, intentId);
    setDeletingIntent(false);
    setIntentsLoading(true);
    getIntents(botId).then(res => {
      setIntents(res);
      setIntentsLoading(false);
    });
    setTrained(false);
  };

  const { currentPage, handlePageChange, isDisabled, pages, pagesCount } =
    usePagination({
      total: intents.length,
      pageSize: 8,
      shouldNavigate: true,
    });

  const [targetIntent, setTargetIntent] = useState({
    intentName: '',
    intentDescription: '',
    intentType: 'flowing',
    ebbShift: 0,
    ebbAction: 'none',
    payload: [],
  });
  const [fallbackExists, setFallbackExists] = useState(true);
  const [fallbackValue, setFallbackValue] = useState({});

  const {
    onOpen: openCreateIntentModal,
    onClose: closeCreateIntentModal,
    IntentModalComponent: CreateIntentModalComponent,
  } = useIntentModalHook(
    changeIntents,
    <FormattedMessage id="createIntent" />,
    targetIntent
  );
  const {
    onOpen: openUpdateIntentModal,
    onClose: closeUpdateIntentModal,
    IntentModalComponent: UpdateIntentModalComponent,
  } = useIntentModalHook(
    changeIntents,
    <FormattedMessage id="updateIntent" />,
    targetIntent,
    deleteIntentFn
  );
  const [newIntent, setNewIntent] = useState({
    intentName: '',
    intentDescription: '',
    intentType: 'flowing',
  });

  const [intentsLoading, setIntentsLoading] = useState(false);

  useEffect(() => {
    setIntentsLoading(true);

    getBot(botId).then(res => {
      setTrained(res.trained);
      console.log(res);
      if (res.fallback && Object.keys(res.fallback).length > 0) {
        console.log('fallback exists');
        console.log(res.fallback);
        setFallbackValue(res.fallback);
        setFallbackExists(true);
      } else {
        console.log('fallback does not exist');
        setFallbackValue({});
        setFallbackExists(false);
      }
    });

    getIntents(botId)
      .then(res => {
        console.log(res);
        setIntents(res);
        setIntentsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIntentsLoading(false);
      });
  }, [botId]);

  const {
    onOpen: openFallbackModal,
    onClose: closeFallbackModal,
    FallbackModalComponent,
  } = useFallbackModalHook(
    setFallbackExists,
    botId,
    fallbackValue,
    setFallbackValue
  );
  const {
    isOpen: isTrainingAlertOpen,
    onOpen: onTrainingAlertOpen,
    onClose: onTrainingAlertClose,
  } = useDisclosure();

  const cancelRef = React.useRef();
  const navigate = useNavigate();
  const toast = useToast();

  const [trainingInputValidation, setTrainingInputValidation] = useState(false);
  const [trainingPhrases, setTrainingPhrases] = useState([]);

  async function trainingInputKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      setTrainingInputValidation(true);
      let phraseId = uuidv4();
      setTrainingPhrases([
        {
          phraseId,
          text: e.target.value?.trim(),
        },
        ...trainingPhrases,
      ]);
      e.target.value = '';
      setTrainingInputValidation(false);
    }
  }

  function changeIntents(newIntent, type) {
    if (type === 'Create') {
      setIntents([newIntent, ...intents]);
    } else if (type === 'Update') {
      setIntents(
        intents.map(intent =>
          intent._id === newIntent._id ? newIntent : intent
        )
      );
    } else if (type === 'Delete') {
      setIntents(intents.filter(intent => intent._id !== newIntent._id));
    }
    setTrained(false);
  }

  // TODO: unnesseccary horizontal scroll
  const onCreateIntentSubmit = e => {
    console.log('create intent');
    e.preventDefault();
    let intent = {
      ...newIntent,
      phrases: trainingPhrases,
    };
    createIntent(botId, intent).then(res => {
      console.log(res);
      if (res.status === 201) {
        setIntents([res.data, ...intents]);
        setTrained(false);
        // onAddIntentClose()
      }
    });
    // onAddIntentClose()
  };

  const onUpdateIntentSubmit = e => {
    // console.log('update intent')
    // e.preventDefault()
    // let updatedIntent ={
    //   ...intent,
    //   phrases: trainingPhrases,
    // }
    // console.log(updatedIntent)
    // updateIntent(botId, updatedIntent)
    //   .then((res) => {
    //     console.log(res)
    //     if(res.status === 200) {
    //       setIntents(intents.map((intent) => intent._id === res.data._id ? res.data : intent))
    //       setTrained(false)
    //       onUpdateIntentClose()
    //     }
    //   })
  };

  // const trainNLU = () => {
  //   console.log('train nlu');
  //   onTrainingAlertOpen();
  //   trainBot(botId)
  //     .then(res => {
  //       console.log(res);
  //       if (res) {
  //         setTrained(true);
  //         onTrainingAlertClose();
  //         toast({
  //           title: 'Training Successful',
  //           description: 'Your bot is successfully trained',
  //           status: 'success',
  //           duration: 5000,
  //           isClosable: true,
  //         });
  //         navigate(`/bots/${botId}/flow`);
  //       } else {
  //         throw new Error('Training Failed');
  //       }
  //     })
  //     .catch(err => {
  //       onTrainingAlertClose();
  //       toast({
  //         title: 'Training Failed',
  //         description: 'Something went wrong while training your bot',
  //         status: 'error',
  //         duration: 5000,
  //         isClosable: true,
  //       });
  //       console.log(err);
  //     });
  // };

  const addIntent = () => {
    setTargetIntent({
      intentName: '',
      intentDescription: '',
      intentType: 'flowing',
      ebbShift: 0,
      ebbAction: '',
      payload: [],
    });
    openCreateIntentModal();
  };
  const updateIntentFn = intent => {
    setTargetIntent(intent);
    openUpdateIntentModal();
  };
  console.log({ trained });
  return (
    <>
      <Header>
        <Center>
          <Text
            fontWeight="bold"
            fontSize="30px"
            color="gray.500"
            textAlign="left"
          >
            <FormattedMessage id="intents" />
          </Text>
        </Center>
        <Spacer />
        <Center>
          {intentsLoading ? (
            <Spinner
              thickness="1px"
              speed="0.65s"
              emptyColor="gray.200"
              color="primary.500"
              right={8}
              size="xl"
            />
          ) : (
            <Flex direction="row" gap={1}>
              {/* <InputGroup>
                <Button
                  leftIcon={<GiFallingStar />}
                  colorScheme="primary"
                  variant="outline"
                  size="md"
                  onClick={openFallbackModal}
                >
                  <FormattedMessage id="configureFallback" />
                </Button>
                {!fallbackExists && (
                  <BsFillCircleFill
                    fill="red"
                    style={{
                      // marginLeft: '-8px',
                      // marginTop: '-5px',
                      zIndex: '10',
                    }}
                  />
                )}
              </InputGroup> */}
              <Spacer />
              <Button
                leftIcon={<IoIosAddCircle />}
                colorScheme="primary"
                variant="solid"
                size="md"
                minWidth={'170px'}
                onClick={addIntent}
              >
                <FormattedMessage id="createIntent" />
              </Button>
            </Flex>
          )}
        </Center>
      </Header>

      {!intentsLoading && intents.length === 0 && (
        <Flex w={'60vw'} mx={'auto'} my={16} justifyContent={'center'}>
          <Stack
            padding="10px"
            borderRadius="12px"
            direction="row"
            justify="center"
            align="center"
            spacing="8px"
            height="50px"
            background="primary.50"
            width={'100%'}
            mt={'1'}
          >
            <Icon as={MdInfo} color="primary.400" fontSize={'24px'} />
            <Text
              lineHeight="2"
              fontWeight="semibold"
              fontSize="16px"
              width="100%"
              height="38px"
              maxWidth="100%"
              textAlign="center"
              color="primary.600"
            >
              <FormattedMessage id="minTrainingBotsWarning" />
            </Text>
          </Stack>
        </Flex>
      )}
      <Body>
        <Grid
          templateColumns={'repeat(5, 1fr)'}
          gap={8}
          mb={8}
          overflow={'wrap'}
          justifyContent={'stretch'}
          w="full"
        >
          {intentsLoading ? (
            <>
              {new Array(10).fill(0).map((_, i) => (
                <Skeleton
                  w="100%"
                  minH={'200px'}
                  width={'12vw'}
                  minW={'150px'}
                  maxH={'200px'}
                  height={'14vh'}
                  borderRadius={30}
                  key={i}
                />
              ))}
            </>
          ) : intents.length > 0 ? (
            intents.map(intent => {
              return (
                <Flex justifyContent={'center'} key={intent._id}>
                  <IntentCard intent={intent} updateIntent={updateIntentFn} />
                </Flex>
              );
            })
          ) : null}
        </Grid>
        <Flex position={'fixed'} bottom={'5%'} right={'5%'}>
          {trained ? (
            <Button
              // rightIcon={<MdArrowForward size={'30px'} />}
              colorScheme="primary"
              variant="solid"
              borderRadius={'full'}
              size="lg"
              boxShadow={'dark-lg'}
              height={'80px'}
              isDisabled={false}
              verticalAlign={'middle'}
              onClick={() => navigate(`/bots/${botId}/webhooks`)}
              display={'flex'}
              alignItems={'center'}
              gap={2}
            >
              <FormattedMessage id="next" />
              <MdArrowForward size={'30px'} />
            </Button>
          ) : (
            <Button
              // leftIcon={}
              colorScheme="primary"
              variant="solid"
              borderRadius={'full'}
              size="lg"
              boxShadow={'dark-lg'}
              height={'80px'}
              onClick={async () => {
                await startTraining(botId);
                // setTrained(true);
                navigate(`/bots/${botId}/webhooks`);
              }}
              isDisabled={intents.length < 2}
              verticalAlign={'middle'}
              display={'flex'}
              alignItems={'center'}
              gap={2}
            >
              {loading ? (
                <Spinner size={'xl'} />
              ) : (
                <FaGraduationCap size={'50px'} />
              )}

              <FormattedMessage id={loading ? 'training' : 'trainBot'} />
            </Button>
          )}
        </Flex>
        <PaginationContainer>
          <Pagination
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            isDisabled={isDisabled}
            pages={pages}
            pagesCount={pagesCount}
          />
        </PaginationContainer>
      </Body>

      {/* Training Modal */}
      <AlertDialog
        closeOnOverlayClick={false}
        motionPreset="scale"
        leastDestructiveRef={cancelRef}
        onClose={onTrainingAlertClose}
        isOpen={isTrainingAlertOpen}
        isCentered
        closeOnEsc={false}
      >
        <AlertDialogOverlay />

        <AlertDialogContent borderRadius={'20px'} p={2}>
          <AlertDialogHeader>
            <HStack>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="primary.500"
                size="lg"
              />
              <Text
                pl={2}
                fontSize={'2xl'}
                fontWeight={'bold'}
                color={'primary.500'}
              >
                <FormattedMessage id="botTrainingInProgress" />
              </Text>
            </HStack>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Alert status="error" borderRadius={'2xl'}>
              <AlertIcon fontSize={'lg'} />
              <FormattedMessage id="botTrainingAlertWarning1" />
              <br />
              <FormattedMessage id="botTrainingAlertWarning2" />
            </Alert>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>

      <CreateIntentModalComponent />
      <UpdateIntentModalComponent />
      <FallbackModalComponent />
    </>
  );
}
