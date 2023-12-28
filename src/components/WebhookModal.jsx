import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  StackDivider,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useState, useRef } from 'react';
import { Editable, EditableInput, EditablePreview } from '@chakra-ui/react';
import { FormattedMessage, useIntl } from 'react-intl';
import { FaMinus, FaPlus } from 'react-icons/fa';
import CustomScrollbar from './Scrollbar';
import { MdDelete } from 'react-icons/md';
import * as yup from 'yup';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  webhookName: yup.string().required('Webhook name is required'),
  webhookUrl: yup.string().required('Webhook url is required'),
  webhookMethod: yup
    .string()
    .oneOf(['get', 'post', 'put', 'delete'])
    .required('Webhook method is required'),
  webhookDescription: yup.string(),
  webhookTimeout: yup.number().required('Webhook timeout is required'),
});

const REGEX = /(@[a-z]+)(?!\S)/gi;

export function WebhookModal({ isOpen, onClose, webhook }) {
  const [url, setUrl] = useState(webhook?.webhookUrl || '');
  const [headers, setHeaders] = useState([]);
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const { locale, formatMessage } = useIntl();
  const [headerError, setHeaderError] = useState('');

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    watch,
    control,
    reset,
    // setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      webhookName: webhook?.webhookName || '',
      webhookUrl: webhook?.webhookUrl || '',
      webhookMethod: webhook?.webhookMethod || 'get',
      webhookDescription: webhook?.webhookDescription || '',
      webhookTimeout: webhook?.webhookTimeout || 5,
    },
  });

  const keyRef = useRef(null);

  const close = () => {
    onClose();
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleHeaderSubmit();
    }
  };

  const handleHeaderSubmit = () => {
    if (!key || !value || key.length < 1 || value.length < 1) return;
    setHeaders(prev => [
      {
        key,
        value,
      },
      ...prev,
    ]);
    setKey('');
    setValue('');
    setHeaderError('');
    if (keyRef.current) {
      keyRef.current.focus();
    }
  };
  // console.clear();
  const handleFormSubmit = values => {
    if (headers.length < 1) {
      setHeaderError('Headers are required');
      return;
    }
    console.log(values);
  };

  return (
    <Modal
      scrollBehavior={'inside'}
      isOpen={isOpen}
      onClose={close}
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay />
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <ModalContent
          size={'4xl'}
          minW={'55vw'}
          // minH={'70vh'}
          borderRadius={'30px'}
          mt={'15vh'}
        >
          <ModalHeader>
            <Flex alignItems={'center'} gap={4}>
              {webhook?.webhookName ? (
                <>
                  {/* <Editable defaultValue={webhook.webhookName}>
                {props => (
                  <>
                    <Text
                      display={props.isEditing ? 'none' : 'block'}
                      as={'button'}
                      onClick={props.onEdit}
                      cursor={'pointer'}
                      fontSize={'1.2rem'}
                      fontWeight={600}
                    >
                      {`${webhook.webhookName} ✎`}
                    </Text>

                    <EditablePreview
                      fontSize={'1.2rem'}
                      fontWeight={600}
                      display={props.isEditing ? 'block' : 'none'}
                    />
                    <EditableInput />
                  </>
                )}
              </Editable> */}

                  <Text
                    as={'button'}
                    cursor={'pointer'}
                    fontSize={'1.2rem'}
                    fontWeight={600}
                  >
                    {webhook.webhookName}
                  </Text>
                </>
              ) : (
                <FormControl isInvalid={errors.webhookName}>
                  <Input
                    fontSize={'1.2rem'}
                    fontWeight={600}
                    placeholder={formatMessage({ id: 'enterWebhookName' })}
                    width={'75%'}
                    {...register('webhookName')}
                  />
                  <FormErrorMessage>
                    {errors.webhookName?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Flex>
            <ModalCloseButton
              onClick={close}
              backgroundColor={'red.400'}
              _hover={{ backgroundColor: 'red.600' }}
              borderRadius={'full'}
              mr={-4}
              mt={-4}
            />
          </ModalHeader>
          <Divider color={'gray.300'} />

          <ModalBody h={'45vh'} display={'flex'} alignItems={'stretch'}>
            <Grid
              gridTemplateRows={'auto 1fr'}
              maxH={'45vh'}
              h={'45vh'}
              minH={'45vh'}
              gap={7}
            >
              <GridItem width={'100%'}>
                <FormControl isInvalid={errors.webhookUrl}>
                  <InputGroup width={'100%'}>
                    <InputLeftElement width={'150px'}>
                      <Select
                        fontWeight={600}
                        fontFamily={'sans-serif'}
                        // defaultValue={webhook?.webhookMethod || 'get'}
                        variant={'filled'}
                        key={webhook?.webhookMethod}
                        {...register('webhookMethod')}
                      >
                        <option value={'get'}>GET</option>
                        <option value={'post'}>POST</option>
                        <option value={'put'}>PUT</option>
                        <option value={'delete'}>DELETE</option>
                      </Select>
                    </InputLeftElement>
                    <Input
                      width={'100%'}
                      type="text"
                      paddingLeft={'170px'}
                      {...register('webhookUrl')}
                      color={'transparent'}
                      fontSize="16px"
                      sx={{
                        caretColor: 'black',
                      }}
                      className="header-url-input"
                      // ref={inputRef}
                    />
                    <Text
                      position={'absolute'}
                      height={'100%'}
                      width={'100%'}
                      top={0}
                      paddingLeft={'170px'}
                      display={'flex'}
                      alignItems={'center'}
                      fontSize="16px"
                      color={'black'}
                      onClick={() => {
                        // inputRef.current.focus();
                        document
                          .getElementsByClassName('header-url-input')[0]
                          .focus();
                      }}
                    >
                      {(watch('webhookUrl') || '')
                        .split(REGEX)
                        .map((word, i) => {
                          if (word.match(REGEX) !== null) {
                            return (
                              <span key={i} className="header-variables">
                                {word}
                              </span>
                            );
                          } else {
                            return <span key={i}>{word}</span>;
                          }
                        })}
                    </Text>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.webhookUrl?.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem overflowY={'hidden'} h={'full'}>
                <Stack
                  // divider={<StackDivider borderColor={'gray.500'} />}
                  gap={6}
                  direction={'row'}
                  h={'full'}
                >
                  <Box
                    w={'40%'}
                    backgroundColor={'gray.50'}
                    borderRadius={'15px'}
                    shadow={'xl'}
                    className="width"
                    h={'full'}
                    maxW="40%"
                    py={2}
                    px={4}
                  >
                    <Stack gap={7} h={'full'}>
                      <Box flex={1}>
                        <Text
                          fontWeight={600}
                          fontFamily={'sans-serif'}
                          fontSize={'1.2rem'}
                        >
                          <FormattedMessage id="description" />
                        </Text>
                        <Textarea
                          mt={2}
                          placeholder={
                            locale === 'es' ? 'Descripción' : 'Description'
                          }
                          // defaultValue={webhook?.webhookDescription || ''}
                          h={'full'}
                          width={'319px'}
                          {...register('webhookDescription')}
                        />
                      </Box>
                      <Flex mt={7} alignItems={'center'} gap={7}>
                        <Box flex={1}>
                          <Text
                            fontWeight={600}
                            fontFamily={'sans-serif'}
                            fontSize={'1.2rem'}
                          >
                            <FormattedMessage id="timeout" />
                          </Text>
                        </Box>

                        <Flex alignItems={'center'} gap={2}>
                          <NumberInput
                            width={'75px'}
                            height={'100%'}
                            variant={'filled'}
                            min={5}
                            max={100}
                            defaultValue={webhook?.webhookTimeout || 5}
                            py={2}
                          >
                            <NumberInputField {...register('webhookTimeout')} />
                            <NumberInputStepper py={2}>
                              <NumberIncrementStepper>
                                <FaPlus />
                              </NumberIncrementStepper>
                              <NumberDecrementStepper>
                                <FaMinus />
                              </NumberDecrementStepper>
                            </NumberInputStepper>
                          </NumberInput>
                          <Text>
                            <FormattedMessage id="seconds" />
                          </Text>
                        </Flex>
                      </Flex>
                    </Stack>
                  </Box>
                  <>
                    <Stack width={'556px'}>
                      <Text
                        fontWeight={600}
                        fontFamily={'sans-serif'}
                        fontSize={'1.2rem'}
                      >
                        <FormattedMessage id="headers" />
                      </Text>
                      <CustomScrollbar>
                        <Box
                          pr={5}
                          className="no-scrollbar"
                          overflowY={'scroll'}
                        >
                          <TableContainer
                            border={'2px solid'}
                            borderColor={'gray.100'}
                            borderRadius={'18px'}
                            w={'full'}
                            mt={2}
                          >
                            <Table w={'full'} variant={'simple'}>
                              <Thead w={'full'}>
                                <Tr>
                                  <Th>
                                    <Text fontWeight={'semibold'}>
                                      <FormattedMessage id="key" />
                                    </Text>
                                  </Th>
                                  <Th>
                                    <Text fontWeight={'semibold'}>
                                      <FormattedMessage id="value" />
                                    </Text>
                                  </Th>
                                  <Th></Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                <>
                                  <Tr>
                                    <Td>
                                      <FormControl
                                        isInvalid={headerError}
                                        onKeyDown={handleKeyDown}
                                      >
                                        <Input
                                          borderColor={'gray.400'}
                                          placeContent={'key'}
                                          value={key}
                                          onChange={e => {
                                            setKey(e.target.value);
                                          }}
                                          name="key"
                                          id="key"
                                          ref={keyRef}
                                        />
                                        <FormErrorMessage>
                                          {headerError}
                                        </FormErrorMessage>
                                      </FormControl>
                                    </Td>
                                    <Td>
                                      <FormControl
                                        isInvalid={headerError}
                                        onKeyDown={handleKeyDown}
                                      >
                                        <Input
                                          borderColor={'gray.400'}
                                          placeContent={'value'}
                                          value={value}
                                          onChange={e => {
                                            setValue(e.target.value);
                                          }}
                                          name="value"
                                          id="value"
                                        />
                                        <FormErrorMessage>
                                          {headerError}
                                        </FormErrorMessage>
                                      </FormControl>
                                    </Td>
                                    <Td></Td>
                                  </Tr>
                                </>
                                {headers.map(({ key, value }, i) => (
                                  <Tr key={i}>
                                    <Td py={0}>
                                      <Text fontWeight={500}>{key}</Text>
                                    </Td>
                                    <Td py={0}>
                                      <Text fontWeight={500}>{value}</Text>
                                    </Td>
                                    <Td py={0} isNumeric w={'min'}>
                                      <Flex
                                        alignItems={'center'}
                                        justifyContent={'centers'}
                                      >
                                        <IconButton
                                          variant={'unstyled'}
                                          color={'red.400'}
                                          fontSize={'xl'}
                                          p={2}
                                          onClick={() => {
                                            setHeaders(prev => {
                                              const newHeaders = [...prev];
                                              newHeaders.splice(i, 1);
                                              return newHeaders;
                                            });
                                          }}
                                        >
                                          <MdDelete />
                                        </IconButton>
                                      </Flex>
                                    </Td>
                                  </Tr>
                                ))}
                              </Tbody>
                            </Table>
                          </TableContainer>
                        </Box>
                      </CustomScrollbar>
                    </Stack>
                  </>
                </Stack>
              </GridItem>
            </Grid>
          </ModalBody>
          <Divider color={'gray.300'} />

          <ModalFooter minH={'60px'}>
            <Flex
              width={'100%'}
              justifyContent={webhook?.webhookName ? 'space-between' : 'end'}
            >
              {webhook?.webhookName && (
                <Button
                  colorScheme="red"
                  mr={1}
                  minWidth="15%"
                  my={'5px'}
                  maxH={'50px'}
                  variant={'outline'}
                >
                  <FormattedMessage id="deleteWebhook" />
                </Button>
              )}
              <Button
                type="submit"
                colorScheme="blue"
                mr={1}
                minWidth="15%"
                my={'5px'}
                maxH={'50px'}
              >
                {webhook ? (
                  <FormattedMessage id="updateWebhook" />
                ) : (
                  <FormattedMessage id="createWebhook" />
                )}
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
