import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  Spinner,
  Popover,
  PopoverTrigger,
  Avatar,
  useDisclosure,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  HStack,
  Image,
  chakra,
  useRadio,
  useRadioGroup,
  PopoverFooter,
  Icon,
  FormErrorMessage,
} from '@chakra-ui/react';
import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { Form, Link, useNavigate } from 'react-router-dom';
import { login } from '../api';
import { AuthContext } from '../contexts/auth';
import { LangContext } from '../contexts/lang';
import { FormattedMessage } from 'react-intl';
import { MdCheck } from 'react-icons/md';

export function ForgotPassword() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [settingConsoleLanguage, setSettingConsoleLanguage] =
    React.useState(false);

  const [errors, setErrors] = useState({});

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);

    let username = formData.get('username');
    setLoading(false);
  };

  const { locale, setLanguage } = useContext(LangContext);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const { value, getRadioProps, getRootProps } = useRadioGroup({
    defaultValue: locale,
  });

  useLayoutEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang');
    if (!lang) {
      setLanguage('en');
    } else {
      setLanguage(lang);
    }
  }, []);

  const languages = [
    {
      name: <FormattedMessage id="english" />,
      value: 'en',
      image: process.env.PUBLIC_URL + '/flags/gb-square.svg',
    },
    {
      name: <FormattedMessage id="spanish" />,
      value: 'es',
      image: process.env.PUBLIC_URL + '/flags/es-square.svg',
    },
  ];

  function LangRadio(props) {
    const { langname, image, ...radioProps } = props;
    const { state, getInputProps, getRadioProps, htmlProps, getLabelProps } =
      useRadio(radioProps);

    return (
      <chakra.label {...htmlProps} cursor="pointer">
        <input {...getInputProps({})} hidden />
        <Flex direction="column" justify="space-between">
          <Flex
            direction="column"
            justify="flex-start"
            align="center"
            size={'40px'}
            {...getRadioProps()}
            bg={state.isChecked ? 'blue.500' : 'transparent'}
            color={state.isChecked ? 'white' : 'black'}
            w={'70px'}
            borderRadius={'8px'}
            p={'8px'}
          >
            <Image
              boxSize="30px"
              // borderRadius={'8px'}
              src={image}
              alt={langname}
              {...getLabelProps()}
            />
            <Text ml={2} mr={2} fontSize={'sm'}>
              {langname}
            </Text>
          </Flex>
        </Flex>
      </chakra.label>
    );
  }

  return (
    <Box position={'relative'}>
      <Box position={'fixed'} top={'50px'} right={'75px'}>
        <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
          <PopoverTrigger>
            <Flex
              direction="row"
              verticalAlign={'middle'}
              justify="center"
              align="center"
              p={1}
              mt={-3}
            >
              <Avatar
                size="sm"
                name="Language"
                src={
                  locale === 'es'
                    ? process.env.PUBLIC_URL + 'flags/es-square.svg'
                    : process.env.PUBLIC_URL + 'flags/gb-square.svg'
                }
                borderRadius="4px"
                backgroundColor={'white'}
                maxH={'20px'}
                width={'30px'}
              />
              <Text ml={2} mr={2} fontSize={'sm'}>
                {locale === 'es' ? 'ES' : 'EN'}
              </Text>
            </Flex>
          </PopoverTrigger>
          <PopoverContent width={'180px'}>
            <PopoverArrow />
            <PopoverHeader fontWeight="light" fontSize={'sm'}>
              <FormattedMessage id="chooseLanguage" /> :
            </PopoverHeader>
            <PopoverBody {...getRootProps()}>
              <HStack direction="row" spacing={4}>
                {languages.map(language => (
                  <LangRadio
                    key={language.value}
                    langname={language.name}
                    image={language.image}
                    {...getRadioProps({ value: language.value })}
                  />
                ))}
              </HStack>
            </PopoverBody>
            <PopoverFooter
              height={'40px'}
              alignContent={'center'}
              alignItems={'center'}
              justifyContent={'center'}
              verticalAlign={'middle'}
              px={10}
              display={'inline-block'}
              pb={2}
              pt={1}
            >
              <Button
                colorScheme="blue"
                variant="outline"
                backgroundColor={'white'}
                height={'30px'}
                borderRadius="25"
                onClick={() => {
                  setSettingConsoleLanguage(true);
                  setLanguage(value);
                  navigate(`/forgot-password?lang=${value}`);
                  onClose();

                  // setConsoleLanguage(value).then(() => {
                  //   setLanguage(value);
                  //   toast({
                  //     title: <FormattedMessage id="langChangeSuccess" />,
                  //     status: 'success',
                  //     duration: 1000,
                  //     isClosable: true,
                  //     position: 'top-right',
                  //   });
                  //   onClose();
                  // });
                  setSettingConsoleLanguage(false);
                }}
              >
                {settingConsoleLanguage ? (
                  <Spinner size={'xs'} colorScheme="blue" />
                ) : (
                  <Icon as={MdCheck} w={6} h={'80%'} />
                )}
                &nbsp;
                <FormattedMessage id="ok" />
              </Button>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </Box>
      <Form method="post" id="login-form" onSubmit={handleSubmit}>
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          // bg={'gray.50'}
          backgroundImage={`url(${process.env.PUBLIC_URL}/bg.png)`}
        >
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>
                <FormattedMessage id="forgotPassword" />
              </Heading>
            </Stack>
            <Box
              rounded={'lg'}
              borderRadius="30px"
              bg={'white'}
              boxShadow={'dark-lg'}
              p={8}
              w={'406px'}
              maxW={'406px'}
            >
              <Stack spacing={4}>
                <FormControl isInvalid={Boolean(errors.user)} id="username">
                  <FormLabel>
                    <FormattedMessage id="username" />
                  </FormLabel>
                  <Input aria-label="User name" type="text" name="username" />
                  <FormErrorMessage>{errors.user}</FormErrorMessage>
                </FormControl>

                <Stack spacing={10}>
                  <Button
                    leftIcon={loading && <Spinner />}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    type="submit"
                  >
                    <FormattedMessage id="sendResetLink" />
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </Form>
    </Box>
  );
}
