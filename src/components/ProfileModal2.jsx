import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Spacer,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
  chakra,
  useRadio,
  useRadioGroup,
  TabIndicator,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import {
  changePasswordFunction,
  getProfile,
  updateEmailFunction,
  updateProfileFunction,
} from '../api';
import { CgProfile } from 'react-icons/cg';
import {
  MdOutlineEmail,
  MdOutlineLanguage,
  MdOutlinePassword,
} from 'react-icons/md';
import { FormattedMessage } from 'react-intl';
import {
  FcBriefcase,
  FcBusinessman,
  FcOrganization,
  FcKey,
} from 'react-icons/fc';
import { IoLanguage } from 'react-icons/io5';
import { FaRegEnvelope } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { LangContext } from '../contexts/lang';
import { useNavigate } from 'react-router-dom';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  organization: yup.string().required('Organization is required'),
  organizationRole: yup.string().required('Organization role is required'),
});

const footerMessages = [
  'updateProfile',
  'verify',
  'changePassword',
  // 'changeLanguage',
];

export function ProfileModal({ isOpen, onClose }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [changeEmail, setChangeEmail] = useState(false);
  const [changeUser, setChangeUser] = useState(false);
  const [email, setEmail] = useState(undefined);
  const toast = useToast();
  const [currentTab, setCurrentTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const [newEmail, setNewEmail] = useState(undefined);

  const [newUser, setNewUser] = useState(undefined);

  const [errors, setErrors] = useState({});

  const { register, handleSubmit, setError, watch, control, reset, setValue } =
    useForm({
      resolver: yupResolver(schema),
      mode: 'onBlur',
    });

  const [newPassword, setNewPassword] = useState(undefined);
  const [confirmPassword, setConfirmPassword] = useState(undefined);

  const navigate = useNavigate();

  const { value, getRadioProps, getRootProps } = useRadioGroup({
    defaultValue: null,
  });

  const { locale, setLanguage } = useContext(LangContext);

  const handlePasswordSubmit = async () => {
    if (!newPassword) {
      setErrors(prev => ({
        ...prev,
        newPassword: 'Enter a valid password',
      }));
      return;
    }

    if (!confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmNewPassword: 'Please enter confirm password',
      }));
      return;
    }

    if (confirmPassword !== newPassword) {
      setErrors(prev => ({
        ...prev,
        confirmNewPassword: 'Passwords do not match',
      }));
      return;
    }
    setLoading(true);
    await changePasswordFunction(newPassword);
    toast({
      title: 'Password Reset Successful',
      description: 'Password has been succssfully reset. Logging you out now.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
    close();
    navigate(`/login?lang=${locale}`);
    setLoading(false);
  };

  const handleProfileSubmit = async () => {
    setLoading(true);
    await updateProfileFunction();
    close();
    setLoading(false);
  };

  const handleEmailSubmit = async () => {
    setLoading(true);
    await updateEmailFunction();
    toast({
      title: 'Email sent',
      description: "We've sent a verification email to your address.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
    close();
    setLoading(false);
  };

  const handleLanguageSubmit = async () => {
    setLoading(true);
    setLanguage(value);
    toast({
      title: <FormattedMessage id="langChangeSuccess" />,
      status: 'success',
      duration: 1000,
      isClosable: true,
      position: 'top-right',
    });
    setLoading(false);
    close();
  };
  console.log('netlify');
  useEffect(() => {
    setLoading(true);
    getProfile().then(res => {
      setUser(res);
      setNewUser(res);
      setEmail(res.email);
      setNewEmail(res.email);
      setShowPassword(false);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log(newEmail === email);
    setChangeEmail(newEmail !== email);
  }, [newEmail, email]);

  useEffect(() => {
    if (!user || !newUser) {
      setChangeUser(false);
      return;
    }
    const changed = Object.keys(user).map(u => user[u] === newUser[u]);
    console.log(changed);
    setChangeUser(changed.includes(false));
  }, [user, newUser]);

  const close = () => {
    // TODO: DO NOT USE THIS MANY SET STATEMENTS, TRY ENCAPSULATING THEM INTO A SINGLE OBJECT AND SET THEM LIKE A JSON OBJECT
    setNewUser(user);
    setCurrentTab(0);
    setChangeEmail(false);
    setChangeUser(false);
    setNewEmail(email);
    setNewPassword(undefined);
    setConfirmPassword(undefined);
    setErrors({});
    onClose();
  };

  const tabOptions = [
    {
      icon: <FcBusinessman size={24} />,
      text: 'profile',
    },
    {
      icon: <FaRegEnvelope size={24} />,
      text: 'email',
    },
    {
      icon: <FcKey size={24} />,
      text: 'password',
    },
    // {
    //   icon: <IoLanguage size={24} />,
    //   text: 'Language',
    // },
  ];
  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      size={'2xl'}
      closeOnOverlayClick={false}
      closeOnEsc={false}
      scrollBehavior={'inside'}
    >
      <ModalOverlay />
      <ModalContent borderRadius="30px" h={'500px'} mt={'15vh'}>
        <ModalHeader>
          <FormattedMessage id="profile" />
        </ModalHeader>
        <ModalCloseButton
          type="reset"
          backgroundColor={'red.400'}
          _hover={{ backgroundColor: 'red.600' }}
          borderRadius={'full'}
          mr={-4}
          mt={-4}
        />
        <Divider color={'gray.300'} />
        <ModalBody p={0}>
          <Tabs
            onChange={i => {
              setCurrentTab(i);
            }}
            orientation="vertical"
            pl={'1px'}
            h={'100%'}
          >
            <TabList gap={3} bg={'gray.100'}>
              {tabOptions.map(tabOption => {
                return (
                  <Tab
                    display={'flex'}
                    gridTemplateColumns={'24px auto'}
                    gap={4}
                    alignItems={'center'}
                    justifyContent={'start'}
                    _selected={{
                      bg: 'white',
                      borderLeft: '4px',
                      borderColor: 'primary.500',
                    }}
                  >
                    {tabOption.icon}
                    <Text fontSize={'xl'}>
                      <FormattedMessage id={tabOption.text} />
                    </Text>
                  </Tab>
                );
              })}
            </TabList>
            <TabPanels px={4}>
              <TabPanel>
                <Flex dir="row" mb={6} gap={6}>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>
                      <FormattedMessage id="firstname" />
                    </FormLabel>
                    {loading ? (
                      <Skeleton h={'40px'} w={'full'} />
                    ) : (
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <FcBusinessman color="gray.300" />
                        </InputLeftElement>
                        <Input
                          value={newUser?.firstName || ''}
                          type="text"
                          onChange={e => {
                            setNewUser(prev => ({
                              ...prev,
                              firstName: e.target.value,
                            }));
                          }}
                        />
                      </InputGroup>
                    )}
                    <FormErrorMessage>
                      Enter the first name of the user
                    </FormErrorMessage>
                  </FormControl>
                  <Spacer />
                  <FormControl id="last-name">
                    <FormLabel>
                      <FormattedMessage id="lastname" />
                    </FormLabel>
                    {loading ? (
                      <Skeleton h={'40px'} w={'full'} />
                    ) : (
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <FcBusinessman color="gray.300" />
                        </InputLeftElement>
                        <Input
                          defaultValue={newUser?.lastName || ''}
                          type="text"
                          onChange={e => {
                            setNewUser(prev => ({
                              ...prev,
                              lastName: e.target.value,
                            }));
                          }}
                        />
                      </InputGroup>
                    )}
                    <FormErrorMessage>
                      Enter the last name of the user
                    </FormErrorMessage>
                  </FormControl>
                </Flex>
                <Flex dir="row" gap={6}>
                  <FormControl id="organization-name">
                    <FormLabel>
                      <FormattedMessage id="organization" />
                    </FormLabel>
                    {loading ? (
                      <Skeleton h={'40px'} w={'full'} />
                    ) : (
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <FcOrganization color="gray.300" />
                        </InputLeftElement>
                        <Input
                          value={newUser?.organization || ' '}
                          type="text"
                          onChange={e => {
                            setNewUser(prev => ({
                              ...prev,
                              organization: e.target.value,
                            }));
                          }}
                        />
                      </InputGroup>
                    )}
                    <FormErrorMessage>
                      Enter the organization name of the user
                    </FormErrorMessage>
                  </FormControl>
                  <Spacer />
                  <FormControl id="organization-role">
                    <FormLabel>
                      <FormattedMessage id="organizationRole" />
                    </FormLabel>
                    {loading ? (
                      <Skeleton h={'40px'} w={'full'} />
                    ) : (
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <FcBriefcase color="gray.300" />
                        </InputLeftElement>
                        <Input
                          type="text"
                          value={newUser?.organizationRole || ''}
                          onChange={e => {
                            setNewUser(prev => ({
                              ...prev,
                              organizationRole: e.target.value,
                            }));
                          }}
                        />
                      </InputGroup>
                    )}
                    <FormErrorMessage>
                      Enter the organization role of the user
                    </FormErrorMessage>
                  </FormControl>
                </Flex>
              </TabPanel>
              <TabPanel>
                <FormControl id="email" isRequired>
                  <FormLabel>
                    <FormattedMessage id="email" />
                  </FormLabel>
                  {loading ? (
                    <Skeleton h={'40px'} w={'full'} />
                  ) : (
                    <InputGroup pos={'relative'}>
                      <Input
                        type="email"
                        value={changeEmail ? newEmail : email}
                        onChange={e => {
                          setNewEmail(e.target.value);
                        }}
                      />
                      {changeEmail && (
                        <InputRightElement>
                          <IconButton
                            onClick={() => {
                              setChangeEmail(false);
                            }}
                          >
                            <IoMdClose />
                          </IconButton>
                        </InputRightElement>
                      )}
                    </InputGroup>
                  )}
                </FormControl>
              </TabPanel>
              <TabPanel>
                <>
                  <Stack mx={'auto'} spacing={4}>
                    <FormControl
                      isInvalid={Boolean(errors.newPassword)}
                      id="newPassword"
                    >
                      <FormLabel>
                        <FormattedMessage id="newPassword" />
                      </FormLabel>
                      <InputGroup>
                        <Input
                          aria-label="New Password"
                          type={showPassword ? 'text' : 'password'}
                          name="newPassword"
                          value={newPassword}
                          onChange={e => {
                            setNewPassword(e.target.value);
                          }}
                        />
                        <InputRightElement>
                          {showPassword ? (
                            <IconButton
                              onClick={() => {
                                setShowPassword(false);
                              }}
                            >
                              <IoEyeOffOutline />
                            </IconButton>
                          ) : (
                            <IconButton
                              onClick={() => {
                                setShowPassword(true);
                              }}
                            >
                              <IoEyeOutline />
                            </IconButton>
                          )}
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={Boolean(errors.confirmNewPassword)}
                      id="confirmNewPassword"
                    >
                      <FormLabel>
                        <FormattedMessage id="confirmNewPassword" />
                      </FormLabel>
                      <Input
                        type="text"
                        aria-label="Confirm New Password"
                        name="confirmNewPassword"
                        value={confirmPassword}
                        onChange={e => {
                          setConfirmPassword(e.target.value);
                        }}
                      />

                      <FormErrorMessage>
                        {errors.confirmNewPassword}
                      </FormErrorMessage>
                    </FormControl>
                  </Stack>
                </>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <Divider color={'gray.300'} />
        <ModalFooter>
          <Flex justifyContent={'end'} w={'full'}>
            <Button
              type="submit"
              colorScheme="primary"
              mr={1}
              minWidth="15%"
              isDisabled={
                currentTab === 0
                  ? !changeUser
                  : currentTab === 1
                  ? !changeEmail
                  : currentTab === 2
                  ? !newPassword
                  : false
              }
              onClick={() => {
                if (currentTab === 0) {
                  handleProfileSubmit();
                } else if (currentTab === 1) {
                  handleEmailSubmit();
                } else if (currentTab === 2) {
                  handlePasswordSubmit();
                } else if (currentTab === 3) {
                  handleLanguageSubmit();
                }
              }}
              //   isDisabled={transferExtension?.trim() === ''}
            >
              {loading ? (
                <Spinner />
              ) : (
                <FormattedMessage id={footerMessages[currentTab]} />
              )}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

const PasswordTab = ({ changePasswordFn }) => {
  const [errors, setErrors] = useState({});

  const handleSubmit = async event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmNewPassword');

    if (!newPassword) {
      setErrors(prev => ({
        ...prev,
        newPassword: 'Enter a valid password',
      }));
      return;
    }

    if (!confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmNewPassword: 'Please enter confirm password',
      }));
      return;
    }

    if (confirmPassword !== newPassword) {
      setErrors(prev => ({
        ...prev,
        confirmNewPassword: 'Passwords do not match',
      }));
      return;
    }

    changePasswordFn(newPassword);
  };

  return (
    <form method="post" id="login-form" onSubmit={handleSubmit}>
      <Stack mx={'auto'} spacing={4}>
        <FormControl isInvalid={Boolean(errors.newPassword)} id="newPassword">
          <FormLabel>
            <FormattedMessage id="newPassword" />
          </FormLabel>
          <Input aria-label="New Password" type="password" name="newPassword" />
          <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={Boolean(errors.confirmNewPassword)}
          id="confirmNewPassword"
        >
          <FormLabel>
            <FormattedMessage id="confirmNewPassword" />
          </FormLabel>
          <Input
            type="password"
            aria-label="Confirm New Password"
            name="confirmNewPassword"
          />

          <FormErrorMessage>{errors.confirmNewPassword}</FormErrorMessage>
        </FormControl>
      </Stack>
    </form>
  );
};
