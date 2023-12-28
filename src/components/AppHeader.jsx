import {
  Button,
  Icon,
  Text,
  Spacer,
  Tabs,
  TabList,
  Tab,
  Flex,
  Stack,
  Image,
  useRadioGroup,
  Avatar,
  HStack,
  useRadio,
  chakra,
  Spinner,
  useDisclosure,
  useToast,
  useColorMode,
  useColorModeValue,
  AccordionIcon,
  useMediaQuery,
  IconButton,
  Box,
} from '@chakra-ui/react';
import {
  MdCheck,
  MdLanguage,
  MdOutlineLanguage,
  MdOutlineLogout,
} from 'react-icons/md';
import React, { useContext } from 'react';
import { useNavigate, useLocation, NavLink, Form } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
} from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';
import { LangContext } from '../contexts/lang';
import Logo from './Logo';
import { FaUserCircle } from 'react-icons/fa';
import { BiHelpCircle, BiUser } from 'react-icons/bi';
import { BsGlobe, BsMoonStars, BsSun } from 'react-icons/bs';
import { AiOutlineMenu, AiOutlineUser } from 'react-icons/ai';
import { ProfileModal } from './ProfileModal2';
import MenuDrawer from './MenuDrawer';
import { set } from 'react-hook-form';
import { IoLanguage } from 'react-icons/io5';

export default function AppHeader() {
  // TODO: Slashes after the route are routing to the same page
  const location = useLocation();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const context = useContext(AuthContext);
  const { locale, setLanguage } = useContext(LangContext);
  const [enableLanguageChangeBtn, setEnableLanguageChangeBtn] =
    React.useState(true);
  const [settingConsoleLanguage, setSettingConsoleLanguage] =
    React.useState(false);

  function pathCleaner() {
    let path = location.pathname.split('/');
    path = path.filter(item => item !== '');
    return path.pop();
  }
  const { colorMode, toggleColorMode } = useColorMode();
  // const bg = useColorModeValue('tertiary.100', 'tertiary.800');

  // const [matches] = useMediaQuery('(min-width: 1024px)');

  return (
    <Flex
      h={'60px'}
      maxH={'60px'}
      minH={'60px'}
      minw={'100%'}
      // backgroundImage={'linear-gradient(90deg, rgba(19,69,101,1) 0%, rgba(119,169,191,1) 35%, rgba(0,212,255,1) 100%)'}
      // backgroundColor={bg}
      backgroundColor={'gray.100'}
      boxShadow={'0px 0px 8px 0px rgba(0,0,0,0.35)'}
      px={'30px'}
      alignContent={'left'}
      justifyContent={'space-between'}
      flexGrow={1}
      verticalAlign={'middle'}
      alignItems={'center'}
    >
      <Logo />
      <Spacer />

      <Tabs
        isFitted
        variant="unstyled"
        alignItems={'flex-end'}
        right={'0'}
        mr="auto"
        fontWeight={'bold'}
        // border={'2px solid red'}
        // display={matches ? 'flex' : 'none'}
      >
        <TabList gap={6}>
          <NavLink
            className={pathCleaner() === 'bots' && 'navLinkActive'}
            to={'/bots'}
          >
            <Tab
              borderRadius={'10px'}
              fontWeight={'bold'}
              fontSize={['sm', 'md']}
              _hover={{
                background: 'primary.100',
              }}
              _focus={{
                background: 'primary.100',
              }}
            >
              <FormattedMessage id="bots" />
            </Tab>
          </NavLink>
          <NavLink
            className={pathCleaner() === 'campaigns' && 'navLinkActive'}
            to={'/campaigns'}
          >
            <Tab
              borderRadius={'10px'}
              fontWeight={'bold'}
              fontSize={['sm', 'md']}
              _hover={{
                background: 'primary.100',
              }}
              _focus={{
                background: 'primary.100',
              }}
            >
              <FormattedMessage id="campaigns" />
            </Tab>
          </NavLink>
          <NavLink
            className={pathCleaner() === 'users' && 'navLinkActive'}
            to={'/users'}
          >
            <Tab
              borderRadius={'10px'}
              fontWeight={'bold'}
              fontSize={['sm', 'md']}
              _hover={{
                background: 'primary.100',
              }}
              _focus={{
                background: 'primary.100',
              }}
            >
              <FormattedMessage id="users" />
            </Tab>
          </NavLink>

          {/* <NavLink
            className={pathCleaner() === 'appearance' && 'navLinkActive'}
            to={'/appearance'}
          >
            <Tab
              borderRadius={'10px'}
              fontWeight={'bold'}
              fontSize={['sm', 'md']}
              _hover={{
                background: 'primary.100',
              }}
              _focus={{
                background: 'primary.100',
              }}
            >
              <FormattedMessage id="appearance" />
            </Tab>
          </NavLink> */}
          <NavLink
            className={pathCleaner() === 'setup' && 'navLinkActive'}
            to={'/setup'}
          >
            <Tab
              borderRadius={'10px'}
              fontWeight={'bold'}
              fontSize={['sm', 'md']}
              _hover={{
                background: 'primary.100',
              }}
              _focus={{
                background: 'primary.100',
              }}
            >
              <FormattedMessage id="setup" />
            </Tab>
          </NavLink>
        </TabList>
      </Tabs>
      <Spacer />

      <Flex pt={11} alignItems={'center'}>
        <UserAvatar />
      </Flex>
    </Flex>
  );
}

function UserAvatar() {
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

  const { locale, setLanguage } = useContext(LangContext);
  const { value, getRadioProps, getRootProps } = useRadioGroup({
    defaultValue: null,
  });

  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.100', 'gray.800');
  const color = useColorModeValue('gray.800', 'gray.100');
  const borderColor = useColorModeValue('gray.400', 'gray.300');
  const toast = useToast();
  const navigate = useNavigate();

  const [settingConsoleLanguage, setSettingConsoleLanguage] =
    React.useState(false);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const {
    onOpen: langOpen,
    onClose: langClose,
    isOpen: isLangOpen,
  } = useDisclosure();
  const [closePopover, setClosePopover] = React.useState(true);
  return (
    <>
      <Popover placement="bottom-end">
        {({ isOpen }) => {
          return (
            <>
              <PopoverTrigger as={'button'}>
                <Button
                  rounded={'20px'}
                  leftIcon={<AiOutlineUser size={20} />}
                  mt={-3}
                  _hover={{
                    bg: 'primary.100',
                    color: 'gray.800',
                  }}
                  bg={isOpen ? 'blue' : 'transparent'}
                  color={isOpen ? 'white' : 'gray.800'}
                >
                  John
                </Button>
              </PopoverTrigger>
              <PopoverContent
                maxW="200px"
                rounded={'20px'}
                color={color}
                borderColor={bg}
                bg={bg}
                zIndex={1000}
              >
                <PopoverHeader borderColor={borderColor} py={4}>
                  <Flex gap={2}>
                    <FaUserCircle size={24} color={color} />
                    <Text fontWeight={'semibold'}>John Smith</Text>
                  </Flex>
                </PopoverHeader>
                <PopoverBody>
                  <Stack spacing={3}>
                    {locale && (
                      <Popover
                        isOpen={isLangOpen}
                        onOpen={langOpen}
                        onClose={langClose}
                        placement="left"
                        closeOnBlur={true}
                      >
                        <PopoverTrigger>
                          <Flex
                            p={2}
                            cursor={'pointer'}
                            gap={2}
                            alignItems={'center'}
                            _hover={{
                              backgroundColor: 'primary.100',
                            }}
                            _focus={{
                              backgroundColor: 'primary.100',
                            }}
                          >
                            <>
                              <IoLanguage />

                              <Text
                                cursor={'pointer'}
                                onClick={() => {
                                  setClosePopover(false);
                                  langOpen();
                                }}
                                fontSize={'16px'}
                              >
                                <FormattedMessage id="language" />
                              </Text>
                            </>
                            <Spacer />
                            <Avatar
                              size="xs"
                              name="Language"
                              src={
                                locale === 'es'
                                  ? process.env.PUBLIC_URL +
                                    'flags/es-square.svg'
                                  : process.env.PUBLIC_URL +
                                    'flags/gb-square.svg'
                              }
                              borderRadius="4px"
                              backgroundColor={'white'}
                              maxH={'20px'}
                              width={'30px'}
                            />
                          </Flex>
                        </PopoverTrigger>
                        <PopoverContent
                          width={'180px'}
                          mr={2}
                          borderRadius={'15px'}
                        >
                          {/* <PopoverArrow /> */}
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
                                toast({
                                  title: (
                                    <FormattedMessage id="langChangeSuccess" />
                                  ),
                                  status: 'success',
                                  duration: 1000,
                                  isClosable: true,
                                  position: 'top-right',
                                });
                                setSettingConsoleLanguage(false);
                                onClose();
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
                    )}

                    <Flex
                      p={2}
                      gap={2}
                      cursor={'pointer'}
                      alignItems={'center'}
                      onClick={() => {
                        onOpen();
                      }}
                      _hover={{
                        backgroundColor: 'primary.100',
                      }}
                      _focus={{
                        backgroundColor: 'primary.100',
                      }}
                    >
                      <BiUser />

                      <Text cursor={'pointer'} fontSize={'16px'}>
                        <FormattedMessage id="profile" />
                      </Text>
                    </Flex>
                    {/* <Flex
                      p={2}
                      _hover={{
                        backgroundColor: 'primary.100',
                      }}
                      _focus={{
                        backgroundColor: 'primary.100',
                      }}
                      cursor={'pointer'}
                      gap={2}
                      alignItems={'center'}
                    >
                      <BiHelpCircle size={16} />
                      <Text fontSize={'16px'}>
                        <FormattedMessage id="helpAndSupport" />
                      </Text>
                    </Flex>
                    <Flex
                      cursor={'pointer'}
                      onClick={toggleColorMode}
                      p={2}
                      gap={2}
                      alignItems={'center'}
                      _hover={{
                        backgroundColor: 'primary.100',
                      }}
                      _focus={{
                        backgroundColor: 'primary.100',
                      }}
                    >
                      {colorMode === 'light' ? (
                        <BsMoonStars size={16} />
                      ) : (
                        <BsSun size={16} />
                      )}
                      <Text fontSize={'16px'}>
                        {colorMode === 'dark' ? (
                          <FormattedMessage id="lightmode" />
                        ) : (
                          <FormattedMessage id="darkmode" />
                        )}
                      </Text>
                    </Flex> */}
                  </Stack>
                </PopoverBody>
                <PopoverFooter borderColor={borderColor}>
                  <Button
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'start'}
                    width={'full'}
                    p={2}
                    gap={3}
                    variant={'unstyled'}
                    onClick={() => {
                      navigate(`/login?lang=${locale}`);
                    }}
                    _hover={{
                      backgroundColor: 'primary.100',
                    }}
                    _focus={{
                      backgroundColor: 'primary.100',
                    }}
                  >
                    <MdOutlineLogout />
                    <Text>
                      <FormattedMessage id="logout" />
                    </Text>
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </>
          );
        }}
      </Popover>

      <ProfileModal
        isOpen={isOpen}
        name="john"
        onClose={onClose}
        mode={'update'}
      />
    </>
  );
}
