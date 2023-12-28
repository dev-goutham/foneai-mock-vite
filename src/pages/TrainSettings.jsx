import {
  Box,
  Flex,
  Grid,
  GridItem,
  Stack,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Input,
  HStack,
  StackDivider,
  IconButton,
  Divider,
  RadioGroup,
  Radio,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Switch,
  Icon,
  useRadio,
  chakra,
  useCheckbox,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { BiSolidPencil } from 'react-icons/bi';
import { usePlayModalHook } from '../hooks/usePlayModalHook';
import { FormattedMessage } from 'react-intl';
import { useSpeakModalHook } from '../hooks/useSpeakModalHook';
import { useTransferModalHook } from '../hooks/useTransferModalHook';
import CustomScrollbar from '../components/Scrollbar';
import { MdAudiotrack } from 'react-icons/md';
import { FaMinus, FaPlus } from 'react-icons/fa';
import FloatingActionButton from '../components/FloatingActionButton';

export default function TrainSettings() {
  const [boostWords, setBoostWords] = useState([]);
  const [fallbackValue, setFallbackValue] = useState('speak-text');
  const [count, setCount] = useState(0);
  const [actionType, setActiontype] = useState('hangup');
  const [speakValue, setSpeakValue] = useState(
    'Sorry I missed what you said. Could you please repeat?'
  );
  const [audioFiles, setAudioFiles] = useState([
    'greeting.wav',
    'ambient_music.wav',
  ]);
  const [context, setContext] = useState('');
  const [extension, setExtension] = useState('');

  const { TransferModalComponent, onOpen } = useTransferModalHook(
    (_, value) => {
      setContext(value.context);
      setExtension(value.extension);
      console.log('setting to transfer');
      setActiontype('transfer');
    },
    <FormattedMessage id="submit" />,
    context || extension ? { context, extension } : undefined,
    () => {},
    false
  );

  const handleFallbackChange = value => {
    if (value === 'speak-text') {
      setSpeakValue(undefined);
      openSpeakModal();
    } else {
      setAudioFiles([]);
      openPlayModal();
    }
  };

  const handleActionTypeChange = value => {
    // setActiontype(value);
    // console.clear();
    console.log(value);
    if (value === 'transfer') {
      onOpen();
    } else {
      setContext('');
      setExtension('');
      setActiontype('hangup');
    }
  };

  const [boostWordsInput, setBoostWordsInput] = useState('');

  const handleBoostWordSubmit = e => {
    e.preventDefault();
    if (!boostWordsInput) return;
    setBoostWords([...boostWords, boostWordsInput]);
    setBoostWordsInput('');
  };

  const { onOpen: openPlayModal, PlayModalComponent } = usePlayModalHook(
    (_, { audioFilesArray }) => {
      if (audioFilesArray.length > 0) {
        setAudioFiles(audioFilesArray);
        setFallbackValue('play-audio');
      }
    },
    <FormattedMessage
      id={
        audioFiles?.length > 0 ? 'updateFallbackMessage' : 'addFallbackMessage'
      }
    />,
    {
      audioFiles,
    },
    () => {},
    undefined,
    false
  );

  const { onOpen: openSpeakModal, SpeakModalComponent } = useSpeakModalHook(
    (_, value) => {
      if (typeof value === 'string') {
        setSpeakValue(value);
      } else if (Array.isArray(value)) {
        setSpeakValue(value[0]);
      }
      setFallbackValue('speak-text');
    },
    <FormattedMessage
      id={speakValue ? 'updateFallbackMessage' : 'addFallbackMessage'}
    />,
    {
      label: speakValue,
      nodeId: 'f791ebfd-c3cc-4282-8c83-0b1f11495e8f',
      parentNodeId: '10ca6539-bf10-42da-87ff-2829c4234b3f',
      childNodeId: '2c506109-81ac-4666-a834-964f24aea7d6',
      texts: [speakValue],
    },
    () => {},
    undefined,
    false
  );
  const [boostWordsOpen, setBoostwordsOpen] = useState(false);
  const [boostValue, setBoostValue] = useState(1);

  const handleSubmit = e => {
    e.preventDefault();
    setBoostWords(prev => [
      ...prev,
      { word: boostWordsInput, value: boostValue },
    ]);
    setBoostValue(1);
    setBoostWordsInput('');
  };

  return (
    <Box>
      <Grid
        w={'80vw'}
        pt={'11vh'}
        mx={'auto'}
        templateColumns={'1fr 1fr'}
        gap={'60px'}
        // minH={'60vh'}
        height={'650px'}
        minH={'650px'}
      >
        <GridItem bg={'#F2F2F2'} boxShadow={'xl'} p={12} rounded={'20px'}>
          <Stack height={'full'}>
            <Text
              fontSize={'xl'}
              borderBottom={'2px solid black'}
              mb={5}
              fontWeight={'bold'}
            >
              <FormattedMessage id="speechRecognitionSettings" />
            </Text>
            <Flex
              alignItems={'center'}
              w={'full'}
              justifyContent={'space-between'}
              mb={10}
              p={4}
              bg={'white'}
              rounded={'20px'}
              gap={'20px'}
            >
              <Text fontWeight={100} maxW={'300px'}>
                <FormattedMessage id="recognitionDelay" />
              </Text>
              <Flex gap={1} alignItems={'center'}>
                <NumberInput
                  width={'75px'}
                  height={'100%'}
                  variant={'filled'}
                  min={1}
                  max={5000}
                  defaultValue={10}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Text fontSize={'sm'}>
                  <FormattedMessage id="milliseconds" />
                </Text>
              </Flex>
            </Flex>
            <Flex
              alignItems={'center'}
              w={'full'}
              justifyContent={'space-between'}
              mb={10}
              p={4}
              bg={'white'}
              rounded={'20px'}
              gap={'20px'}
            >
              <Text fontWeight={100} maxW={'300px'}>
                <FormattedMessage id="interruptableRecognition" />
              </Text>
              <Switch size={'lg'} />
            </Flex>

            <Grid
              bg={'white'}
              rounded={'20px'}
              px={4}
              pb={4}
              pt={6}
              w={'full'}
              h={'265px'}
              templateRows={'auto 1fr'}
              gap={6}
              pos={'relative'}
            >
              <GridItem>
                {boostWordsOpen ? (
                  <form onSubmit={handleSubmit}>
                    <Grid
                      templateColumns={'1fr 1fr auto'}
                      alignItems={'center'}
                      gap={4}
                    >
                      <GridItem>
                        <Input
                          value={boostWordsInput}
                          onChange={e => {
                            setBoostWordsInput(e.target.value);
                          }}
                        />
                      </GridItem>
                      <GridItem>
                        <Stack alignItems={'center'}>
                          {/* <RangeSlider
                            aria-label={['min', 'value']}
                            value={boostValue}
                            onChange={value => {
                              if (value.includes(0)) return;
                              if (value[0] > 0 || value[1] < 0) return;
                              setBoostValue(value);
                            }}
                            min={-10}
                            max={10}
                          >
                            <RangeSliderTrack>
                              <RangeSliderFilledTrack />
                            </RangeSliderTrack>
                            <RangeSliderThumb index={0} />
                            <RangeSliderThumb index={1} />
                          </RangeSlider> */}
                          <Slider
                            aria-label="slider-ex-1"
                            min={-10}
                            max={10}
                            // defaultValue={1}
                            value={boostValue}
                            onChange={e => {
                              if (e === 0) return;
                              setBoostValue(e);
                            }}
                          >
                            <SliderMark
                              value={boostValue}
                              textAlign="center"
                              bg="blue.500"
                              color="white"
                              mt="-10"
                              ml="-5"
                              w="12"
                              borderRadius={'md'}
                              fontWeight={600}
                            >
                              {boostValue}
                            </SliderMark>
                            <SliderTrack>
                              <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                          </Slider>
                        </Stack>
                      </GridItem>
                      <GridItem>
                        <IconButton
                          onClick={() => {
                            setBoostwordsOpen(false);
                          }}
                        >
                          <AiOutlineClose size={20} />
                        </IconButton>
                      </GridItem>
                    </Grid>
                  </form>
                ) : (
                  <Flex justifyContent={'space-between'} alignItems={'center'}>
                    <Text>
                      <FormattedMessage id="boostWords" />
                    </Text>
                    <Button
                      onClick={() => {
                        setBoostwordsOpen(true);
                      }}
                    >
                      <FormattedMessage id="addWords" />
                    </Button>
                  </Flex>
                )}
                <Divider my={2} />
              </GridItem>
              <CustomScrollbar>
                <GridItem>
                  <Flex
                    flex={1}
                    overflow={'scroll'}
                    className="no-scrollbar"
                    gap={6}
                    h="full"
                    maxH={'full'}
                    flexWrap={'wrap'}
                    p={6}
                  >
                    {boostWords.map(({ word, value }, i) => (
                      <HStack
                        border={'2px solid'}
                        borderColor={'gray.600'}
                        rounded={'10px'}
                        px={2}
                        key={i}
                        py={2}
                        minW={'150px'}
                        alignItems={'center'}
                        pos={'relative'}
                      >
                        <Text fontSize={'20px'} flex={1} fontWeight={'bold'}>
                          {word}
                        </Text>
                        <Text
                          borderLeft={'1px solid'}
                          borderColor={'gray.600'}
                          fontSize={'20px'}
                          px={2}
                        >
                          {value}
                        </Text>
                        <IconButton
                          size={'xs'}
                          pos={'absolute'}
                          top={'-15px'}
                          right={'-15px'}
                          rounded={'full'}
                          onClick={() => {
                            setBoostWords(prev => {
                              const n = [...prev];
                              n.splice(i, 1);
                              return n;
                            });
                          }}
                        >
                          <AiOutlineClose />
                        </IconButton>
                      </HStack>
                    ))}
                  </Flex>
                </GridItem>
              </CustomScrollbar>
            </Grid>
          </Stack>
        </GridItem>
        <GridItem bg={'#F2F2F2'} p={12} boxShadow={'xl'} rounded={'20px'}>
          <Flex height={'full'}>
            <Stack w={'full'} h={'full'}>
              <Text
                fontSize={'xl'}
                borderBottom={'2px solid black'}
                mb={10}
                fontWeight={'bold'}
              >
                <FormattedMessage id="configureFallback" />
              </Text>
              <Stack
                // h={'full'}
                // pb={24}
                flex={1}
                gap={4}
                alignItems={'space-between'}
                justifyContent={'space-between'}
              >
                <Flex w={'full'} justifyContent={'space-between'}>
                  <RadioGroup
                    onChange={handleFallbackChange}
                    value={fallbackValue}
                  >
                    <Stack>
                      <Radio value="speak-text">
                        <FormattedMessage id="speakText" />
                      </Radio>
                      <Radio value="play-audio">
                        <FormattedMessage id="playAudio" />
                      </Radio>
                    </Stack>
                  </RadioGroup>
                  <Box>
                    {fallbackValue === 'speak-text' ? (
                      <Box
                        width={'300px'}
                        height={'250px'}
                        border={'2px solid'}
                        borderColor={'gray.500'}
                        py={3}
                        px={5}
                        rounded={'10px'}
                        position={'relative'}
                        bg={'white'}
                      >
                        <CustomScrollbar>
                          <Box
                            width={'full'}
                            height={'full'}
                            overflowY={'scroll'}
                            className="no-scrollbar"
                          >
                            <Text>{speakValue}</Text>
                          </Box>
                          <IconButton
                            rounded={'full'}
                            position={'absolute'}
                            mr={-4}
                            mt={-4}
                            top={0}
                            right={0}
                            // zIndex={10000}
                            onClick={openSpeakModal}
                          >
                            <BiSolidPencil size={20} />
                          </IconButton>
                        </CustomScrollbar>
                      </Box>
                    ) : (
                      <Box position={'relative'}>
                        <Stack
                          divider={<StackDivider borderColor={'gray.500'} />}
                          border={'2px solid'}
                          borderColor={'gray.500'}
                          w={'300px'}
                          rounded={'10px'}
                          p={2}
                          bg={'white'}
                        >
                          {audioFiles.map(file => (
                            <SelectNodeCard name={file} key={file} />
                          ))}
                        </Stack>
                        <IconButton
                          rounded={'full'}
                          position={'absolute'}
                          mr={-4}
                          mt={-4}
                          top={0}
                          right={0}
                          // zIndex={10000}
                          onClick={openPlayModal}
                        >
                          <BiSolidPencil size={20} />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                </Flex>
                <Flex w={'full'} gap={'50px'}>
                  <Stack spacing={3}>
                    <Text>
                      <FormattedMessage id="fallbackLimit" />
                    </Text>

                    <NumberInput
                      width={'75px'}
                      height={'100%'}
                      variant={'filled'}
                      min={1}
                      max={4}
                      defaultValue={2}
                      py={2}
                    >
                      <NumberInputField bgColor={'white'} />
                      <NumberInputStepper py={2}>
                        <NumberIncrementStepper>
                          <FaPlus />
                        </NumberIncrementStepper>
                        <NumberDecrementStepper>
                          <FaMinus />
                        </NumberDecrementStepper>
                      </NumberInputStepper>
                    </NumberInput>
                  </Stack>
                  <Flex gap={6}>
                    <Stack spacing={3}>
                      <Text>
                        <FormattedMessage id="actionType" />
                      </Text>
                      <RadioGroup
                        onChange={handleActionTypeChange}
                        value={actionType}
                      >
                        <Stack>
                          <Radio value="hangup">
                            <FormattedMessage id="hangupCall" />
                          </Radio>
                          <Radio value="transfer">
                            <FormattedMessage id="transferCall" />
                          </Radio>
                        </Stack>
                      </RadioGroup>
                    </Stack>
                    {actionType === 'transfer' && (
                      <>
                        {extension && (
                          <Stack
                            p={2}
                            pos={'relative'}
                            border={'2px solid black'}
                            rounded={'10px'}
                            bg={'white'}
                          >
                            <IconButton
                              rounded={'full'}
                              position={'absolute'}
                              mr={-4}
                              mt={-4}
                              top={0}
                              right={0}
                              // zIndex={10000}
                              onClick={onOpen}
                            >
                              <BiSolidPencil size={20} />
                            </IconButton>
                            <Flex gap={3} alignItems={'center'}>
                              <Text fontSize={'md'}>
                                <FormattedMessage id="transferContext" />
                              </Text>
                              <Text>{context}</Text>
                            </Flex>
                            <Divider />
                            <Flex gap={3} alignItems={'center'}>
                              <Text fontSize={'md'}>
                                <FormattedMessage id="transferExtension" />
                              </Text>
                              <Text>{extension}</Text>
                            </Flex>
                          </Stack>
                        )}
                      </>
                    )}
                  </Flex>
                </Flex>
              </Stack>
            </Stack>
          </Flex>
        </GridItem>
      </Grid>
      <PlayModalComponent />
      <SpeakModalComponent />
      <TransferModalComponent />
      <FloatingActionButton>
        <Text px={4}>
          <FormattedMessage id="save" />
        </Text>
      </FloatingActionButton>
    </Box>
  );
}

const SelectNodeCard = ({ name, ...props }) => {
  const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } =
    useCheckbox(props);

  return (
    <chakra.label {...htmlProps} cursor={'pointer'}>
      <input {...getInputProps({})} hidden />
      <HStack
        divider={
          <StackDivider
            borderColor="gray.200"
            my={'20%'}
            verticalAlign={'middle'}
            width="3px"
          />
        }
        minH="50px"
        borderWidth={'2px'}
        borderColor={'gray.200'}
        borderRadius={'10px'}
        px={'10px'}
        spacing={'10px'}
        {...getCheckboxProps()}
        bg={state.isChecked ? 'primary.100' : 'transparent'}
      >
        <Icon as={MdAudiotrack} color={'primary.500'} />
        <Text
          w="85%"
          overflow={'hidden'}
          noOfLines={1}
          textOverflow={'ellipsis'}
          whiteSpace={'nowrap'}
          {...getLabelProps()}
        >
          {name}
        </Text>
      </HStack>
    </chakra.label>
  );
};
