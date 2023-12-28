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
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import React, { useState, useContext } from 'react';
import { Form, Link, useNavigate } from 'react-router-dom';
import { login } from '../api';
import { AuthContext } from '../contexts/auth';
import { LangContext } from '../contexts/lang';
import { FormattedMessage } from 'react-intl';
import { MdCheck } from 'react-icons/md';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const loginSchema = yup.object().shape({
  username: yup.string().required('USERNAME_EMPTY'),
  password: yup
    .string()
    .required('PASSWORD_EMPTY')
    .min(8, 'PASSWORD_WRONG_LENGTH')
    .max(20, 'PASSWORD_WRONG_LENGTH')
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,20}/, {
      message: 'PASSWORD_WRONG_FORMAT',
    }),
});

export function LoginPage() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [settingConsoleLanguage, setSettingConsoleLanguage] =
    React.useState(false);

  // const [errors, setErrors] = useState({});

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
  });

  const handleFormSubmit = async ({ username, password }) => {
    setLoading(true);

    let userData = await login(username, password);

    console.log(userData);

    if (userData.data && userData.data.token) {
      context.login(userData.data);
      setLoading(false);
      navigate('/');
    } else if (userData.errors) {
      setLoading(false);
      // setError(() => userData.errors);
      Object.keys(userData.errors).forEach(er => {
        setError(er, { message: errors[er] });
      });
    } else {
      setLoading(false);
      navigate('/login');
    }
  };

  const { locale, setLanguage } = useContext(LangContext);
  const [showPassword, setShowPassword] = useState(false);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const { value, getRadioProps, getRootProps } = useRadioGroup({
    defaultValue: locale,
  });

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
                  navigate(`/login?lang=${value}`);
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
      <form id="login-form" onSubmit={handleSubmit(handleFormSubmit)}>
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
                <FormattedMessage id="loginToYourAccount" />
              </Heading>
              <Text fontSize={'lg'} color={'gray.600'}>
                <FormattedMessage id="toBuildCoolVoiceBots" />
              </Text>
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
                <FormControl isInvalid={Boolean(errors.username)} id="username">
                  <FormLabel>
                    <FormattedMessage id="username" />
                  </FormLabel>
                  <Input
                    aria-label="User name"
                    type="text"
                    {...register('username')}
                  />
                  <FormErrorMessage>
                    <FormattedMessage id={errors.username?.message} />
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.password)} id="password">
                  <FormLabel>
                    <FormattedMessage id="password" />
                  </FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      aria-label="Password"
                      {...register('password')}
                    />
                    <InputRightElement>
                      <IconButton
                        onClick={() => {
                          setShowPassword(pre => !pre);
                        }}
                      >
                        {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                      </IconButton>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    <FormattedMessage id={errors.password?.message} />
                  </FormErrorMessage>
                  <Flex justifyContent={'end'}>
                    <Link to={`/forgot-password?lang=${locale}`}>
                      <Text
                        color={'primary.400'}
                        // textDecoration={'underline'}
                        textAlign={'right'}
                        fontSize={'xs'}
                        fontWeight={'semibold'}
                        mt={2}
                      >
                        <FormattedMessage id="forgotPassword" />
                      </Text>
                    </Link>
                  </Flex>
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
                    <FormattedMessage id="login" />
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </form>
    </Box>
  );
}
