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
  Spacer,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  chakra,
  useRadio,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputRightAddon,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { AiFillDollarCircle } from 'react-icons/ai';
import 'react-datepicker/dist/react-datepicker.css';
import { FiRefreshCcw } from 'react-icons/fi';
import es from 'date-fns/locale/es';
import en from 'date-fns/locale/en-US';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUser } from '../../api';

import { CgProfile } from 'react-icons/cg';
import {
  FcAddressBook,
  FcBriefcase,
  FcBusinessman,
  FcClock,
  FcKey,
  FcOrganization,
} from 'react-icons/fc';
import { LiaIdCard } from 'react-icons/lia';
import { FormattedMessage } from 'react-intl';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';
import { IoEyeOffOutline, IoEyeOutline, IoRefresh } from 'react-icons/io5';
import ReactSelect from 'react-select';
import { LangContext } from '../../contexts/lang';
import { Controller, useForm } from 'react-hook-form';

registerLocale('es', es);
registerLocale('en', en);

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

const langOptions = [
  {
    value: 'en',
    label: <FormattedMessage id="english" />,
    icon: process.env.PUBLIC_URL + '/flags/gb-square.svg',
  },
  {
    value: 'es',
    label: <FormattedMessage id="spanish" />,
    icon: process.env.PUBLIC_URL + '/flags/es-square.svg',
  },
];

const tabs = [
  {
    icon: <CgProfile size={24} />,
    name: 'profile',
  },
  {
    icon: <AiFillDollarCircle size={24} />,
    name: 'billings',
  },
  {
    icon: <IoIosSettings size={24} />,
    name: 'preferences',
  },
];

const createUserSchema = yup.object().shape({
  firstName: yup.string().required('FIRST_NAME_EMPTY'),
  lastName: yup.string(),
  organization: yup.string(),
  organizationRole: yup.string(),
  username: yup
    .string()
    .required('USERNAME_EMPTY')
    .min(5, 'USERNAME_WRONG_LENGTH')
    .max(20, 'USERNAME_WRONG_LENGTH'),
  email: yup.string().email('EMAIL_WRONG_FORMAT').required('EMAIL_EMPTY'),
  password: yup
    .string()
    .required('PASSWORD_EMPTY')
    .min(8, 'PASSWORD_WRONG_LENGTH')
    .max(20, 'PASSWORD_WRONG_LENGTH')
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,20}/, {
      message: 'PASSWORD_WRONG_FORMAT',
    }),
  confirmPassword: yup
    .string()
    .required('PASSWORD_EMPTY')
    .min(8, 'PASSWORD_WRONG_LENGTH')
    .max(20, 'PASSWORD_WRONG_LENGTH')
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,20}/, {
      message: 'PASSWORD_WRONG_FORMAT',
    })
    .oneOf([yup.ref('password'), null], 'PASSWORD_MISSMATCH'),
  language: yup
    .string()
    .required('Language is required')
    .oneOf(['en', 'es'], 'LANGUAGE_INVALID'),
  billingType: yup
    .string()
    .required('BILLING_TYPE_EMPTY')
    .oneOf(['recurring', 'non-recurring'], 'BILLING_TYPE_INVALID'),
  minutesAllocated: yup.number().when('billingType', {
    is: 'recurring',
    then: () => yup.number().required('MINUTES_ALLOCATED_INVALID'),
    otherwise: () => yup.number(),
  }),
  minutesEachCycle: yup.number().when('billingType', {
    is: 'non-recurring',
    then: () =>
      yup.number().required('MINUTES_EACH_CYCLE_INVALID').min(1).max(1000),
    otherwise: () => yup.number(),
  }),
  validUntil: yup.string().when('billingType', {
    is: 'non-recurring',
    then: () => yup.string().required('VALID_UNTIL_INVALID'),
    otherwise: () => yup.string(),
  }),
  billingFrequency: yup.string().when('billingType', {
    is: 'recurring',
    then: () =>
      yup
        .string()
        .oneOf(['monthly', 'querterly', 'semi-annual', 'annual'])
        .required('BILLING_FREQUENCY_INVALID'),
    otherwise: () =>
      yup.string().oneOf(['monthly', 'querterly', 'semi-annual', 'annual']),
  }),
});

export function UsersModal({
  isOpen,
  onClose,
  mode,
  firstName,
  lastName,
  organization,
  billingReviewsOn,
  username,
  organizationRole,
  minutesAllocated,
  email,
}) {
  const [currentTab, setCurrentTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [showPassword, setShowPassword] = useState(false);
  const { locale } = useContext(LangContext);
  const [formReady, setFormReady] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    watch,
    control,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(createUserSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName,
      lastName,
      organization,
      username,
      language: locale,
      organizationRole,
      minutesAllocated,
      minutesEachCycle: minutesAllocated,
      email,
    },
  });

  const handleFormSubmit = async ({
    firstName,
    lastName,
    organization,
    username,
    email,
    password,
    confirmPassword,
    language,
  }) => {
    console.log({ currentTab });
    if (currentTab !== 2) return;
    console.log('form submit');
    setLoading(true);
    const { data, errors: createUserErrors } = await createUser({
      firstName,
      lastName,
      organization,
      username,
      email,
      password,
      confirmPassword,
      language,
      role: 'USER',
    });

    if (createUserErrors) {
      Object.keys(createUserErrors).forEach(er => {
        setError(er, { message: errors[er] });
      });
    }
    setLoading(false);
    close();
  };

  useEffect(() => {
    console.log({ errors });
  }, [errors]);

  const options = [
    {
      value: 'non-recurring',
      label: 'nonRecurring',
      icon: <IoRefresh />,
    },
    {
      value: 'recurring',
      label: 'recurring',
      icon: <FiRefreshCcw />,
    },
  ];

  const frequncyOptions = [
    {
      value: 'montly',
      label: 'Monthly',
    },
    {
      value: 'quarterly',
      label: 'Quarterly',
    },
    {
      value: 'semi-annual',
      label: 'Semi Annual',
    },
    {
      value: 'annual',
      label: 'Annual',
    },
  ];

  const close = () => {
    setCurrentTab(0);
    reset();
    onClose();
  };

  const checkValidity = () => {
    const firstName = watch('firstName');
    const username = watch('username');
    const password = watch('password');
    const confirmPassword = watch('confirmPassword');
    const email = watch('email');
    const billingType = watch('billingType');
    const minutesAllocated = watch('minutesAllocated');
    const minutesEachCycle = watch('minutesEachCycle');
    const validUntil = watch('validUntil');
    const billingFrequency = watch('billingFrequency');

    const firstTabValidity =
      !firstName ||
      !username ||
      !password ||
      !confirmPassword ||
      !email ||
      Object.keys(errors) > 0;

    const secondTabValidity =
      billingType === 'non-recurring'
        ? !minutesAllocated || !validUntil || Object.keys(errors) > 0
        : !minutesEachCycle ||
          !billingFrequency ||
          Object.keys(errors).length > 0;

    if (currentTab === 0) {
      return firstTabValidity;
    } else if (currentTab === 1) {
      return secondTabValidity;
    } else {
      return firstTabValidity && secondTabValidity;
    }
  };

  const billingType = watch('billingType');

  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      size={'4xl'}
      closeOnOverlayClick={false}
      closeOnEsc={false}
      scrollBehavior={'inside'}
    >
      <ModalOverlay />
      <ModalContent zIndex={50} borderRadius="30px" mt={'15vh'}>
        <form
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <ModalHeader>
            <Flex gap={1}>
              <FormattedMessage id={firstName ? 'updateUser' : 'createUser'} />
              <Text>({currentTab + 1}/3)</Text>
            </Flex>
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
          <ModalBody zIndex={99999} minH={'492.29px'} p={0}>
            <Tabs
              onChange={i => {
                setCurrentTab(i);
              }}
              orientation="vertical"
              index={currentTab}
              minH={'492.29px'}
              // maxH={'407.94'}
              // overflow={'hidden'}
            >
              <TabList gap={3} bg={'gray.100'}>
                {tabs.map(tab => (
                  <Tab
                    display={'flex'}
                    gridTemplateColumns={'24px auto'}
                    gap={2}
                    alignItems={'center'}
                    justifyContent={'start'}
                    _selected={{
                      bg: 'white',
                      borderLeft: '2px',
                      borderColor: 'primary.500',
                    }}
                    key={tab.name}
                  >
                    {tab.icon}
                    <Text fontSize={'xl'}>
                      <FormattedMessage id={tab.name} />
                    </Text>
                  </Tab>
                ))}
              </TabList>
              <TabPanels px={4}>
                <TabPanel display={'flex'} flexDir={'column'} gap={6}>
                  <Flex dir="row" gap={4}>
                    <FormControl
                      id="firstName"
                      isInvalid={Boolean(errors.firstName)}
                      isRequired
                    >
                      <FormLabel>
                        <FormattedMessage id="firstname" />
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <FcBusinessman color="gray.300" />
                        </InputLeftElement>
                        <Input {...register('firstName')} type="text" />
                      </InputGroup>
                      <FormErrorMessage>
                        <FormattedMessage id={errors.firstName?.message} />
                      </FormErrorMessage>
                    </FormControl>
                    <Spacer />
                    <FormControl
                      id="lastName"
                      isInvalid={Boolean(errors.lastName)}
                    >
                      <FormLabel>
                        <FormattedMessage id="lastname" />
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <FcBusinessman color="gray.300" />
                        </InputLeftElement>
                        <Input {...register('lastName')} type="text" />
                      </InputGroup>
                      <FormErrorMessage>
                        <FormattedMessage id={errors.lastName?.message} />
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>
                  <Flex dir="row" gap={4}>
                    <FormControl
                      id="organization"
                      isInvalid={Boolean(errors.organization)}
                    >
                      <FormLabel>
                        <FormattedMessage id="organization" />
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <FcOrganization color="gray.300" />
                        </InputLeftElement>
                        <Input {...register('organization')} type="text" />
                      </InputGroup>
                      <FormErrorMessage>
                        <FormattedMessage id={errors.organization?.message} />
                      </FormErrorMessage>
                    </FormControl>
                    <Spacer />
                    <FormControl
                      id="organizationRole"
                      isInvalid={Boolean(errors.organizationRole?.message)}
                    >
                      <FormLabel>
                        <FormattedMessage id="organizationRole" />
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <FcBriefcase color="gray.300" />
                        </InputLeftElement>
                        <Input {...register('organizationRole')} type="text" />
                      </InputGroup>
                      <FormErrorMessage>
                        <FormattedMessage id={errors.organizationRole} />
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>
                  <Flex dir="row" gap={6}>
                    <FormControl
                      id="username"
                      isInvalid={Boolean(errors.username)}
                      isRequired
                    >
                      <FormLabel>
                        <FormattedMessage id="username" />
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <LiaIdCard color="gray.300" />
                        </InputLeftElement>
                        <Input
                          type="text"
                          {...register('username')}
                          minLength={5}
                          maxLength={20}
                          isDisabled={Boolean(username)}
                        />
                      </InputGroup>
                      <FormErrorMessage>
                        <FormattedMessage id={errors.username?.message} />
                      </FormErrorMessage>
                    </FormControl>
                    <Spacer />
                    <FormControl
                      id="email"
                      isRequired
                      isInvalid={Boolean(errors.email)}
                    >
                      <FormLabel>
                        <FormattedMessage id="email" />
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <FcAddressBook color="gray.300" />
                        </InputLeftElement>
                        <Input
                          type="email"
                          {...register('email')}
                          isDisabled={Boolean(email)}
                        />
                      </InputGroup>
                      <FormErrorMessage>
                        <FormattedMessage id={errors.email?.message} />
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>
                  {/* password and confirm password */}
                  {!username && (
                    <Flex direction="row" gap={6}>
                      <FormControl
                        id="password"
                        isInvalid={Boolean(errors.password)}
                        isRequired
                      >
                        <FormLabel>
                          <FormattedMessage id="passoword" />
                        </FormLabel>
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            <FcKey color="gray.300" />
                          </InputLeftElement>
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            {...register('password')}
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
                        <FormErrorMessage>
                          <FormattedMessage id={errors.password?.message} />
                        </FormErrorMessage>
                      </FormControl>
                      <Spacer />
                      <FormControl
                        id="confirm-password"
                        isInvalid={errors.confirmPassword}
                        isRequired
                      >
                        <FormLabel>
                          <FormattedMessage id="confirmPassword" />
                        </FormLabel>
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            <FcKey color="gray.300" />
                          </InputLeftElement>
                          <Input type="text" {...register('confirmPassword')} />
                        </InputGroup>
                        <FormErrorMessage>
                          <FormattedMessage
                            id={errors.confirmPassword?.message}
                          />
                        </FormErrorMessage>
                      </FormControl>
                    </Flex>
                  )}
                </TabPanel>
                <TabPanel>
                  <Flex
                    // alignItems={'center'}
                    // justifyContent={'center'}
                    direction={'column'}
                    gap={6}
                  >
                    <FormControl
                      width={'200px'}
                      isInvalid={Boolean(errors.billingType)}
                      id="billing-type"
                      isRequired
                    >
                      <FormLabel>
                        <FormattedMessage id="billingType" />
                      </FormLabel>
                      <Controller
                        control={control}
                        name="billingType"
                        defaultValue="non-recurring"
                        render={({ field: { name, onChange, ref, value } }) => (
                          <ReactSelect
                            onChange={e => {
                              setValue('minutesAllocated', '');
                              setValue('minutesEachCycle', '');
                              onChange(e.value);
                            }}
                            value={options.find(opt => opt.value === value)}
                            width="150px"
                            options={options}
                            formatOptionLabel={el => (
                              <Flex gap={3} alignItems={'center'}>
                                {el.icon}
                                <Text>
                                  <FormattedMessage id={el.label} />
                                </Text>
                              </Flex>
                            )}
                          />
                        )}
                      />

                      <FormErrorMessage>
                        <FormattedMessage id={errors.billingType?.message} />
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={
                        billingType === 'non-recurring'
                          ? Boolean(errors.minutesAllocated)
                          : Boolean(errors.minutesEachCycle)
                      }
                      id="mins"
                    >
                      <FormLabel>
                        <FormattedMessage
                          id={
                            billingType === 'non-recurring'
                              ? 'minutesAllocated'
                              : 'minutesEachBillingCycle'
                          }
                        />
                      </FormLabel>
                      <InputGroup>
                        <Controller
                          control={control}
                          name={
                            billingType === 'non-recurring'
                              ? 'minutesAllocated'
                              : 'minutesEachCycle'
                          }
                          render={({ field: { ref, ...rest } }) => (
                            <NumberInput
                              // defaultValue={1}
                              min={1}
                              max={1000}
                              keepWithinRange={true}
                              clampValueOnBlur={true}
                              {...rest}
                            >
                              <InputLeftElement pointerEvents="none">
                                <FcClock />
                              </InputLeftElement>
                              <NumberInputField ref={ref} pl={10} />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                          )}
                        />
                        <InputRightAddon
                          children={<FormattedMessage id="minutes" />}
                        />
                      </InputGroup>

                      <FormErrorMessage>
                        Enter the minutes each billing cycle
                      </FormErrorMessage>
                    </FormControl>
                    {billingType === 'recurring' && (
                      <FormControl width="200px" id="frequency">
                        <FormLabel>
                          <FormattedMessage id="frequency" />
                        </FormLabel>
                        <Controller
                          control={control}
                          name="billingFrequency"
                          defaultValue="monthly"
                          render={({
                            field: { name, onChange, ref, value },
                          }) => (
                            <ReactSelect
                              defaultValue={frequncyOptions[0]}
                              options={frequncyOptions}
                              className="custom-dropdown"
                              menuShouldScrollIntoView
                              // menuIsOpen
                              // onMenuClose={e => {
                              //   console.log(e);
                              // }}
                              menuPortalTarget={document.querySelector('body')}
                              styles={{
                                menuPortal: baseStyles => ({
                                  ...baseStyles,
                                  zIndex: 99999,
                                }),
                                menu: bs => ({
                                  ...bs,
                                  zIndex: 99999,
                                  position: 'relative',
                                }),
                                menuList: bs => ({
                                  ...bs,
                                  zIndex: 99999,
                                }),
                              }}
                            ></ReactSelect>
                          )}
                        />
                      </FormControl>
                    )}
                    {/* {selected === 'recurring' && (
                      <FormControl id="billing-date">
                        <FormLabel>
                          <FormattedMessage id="billingRenewsOn" />
                        </FormLabel>
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            <FcCalendar color="gray.300" />
                          </InputLeftElement>
                          <NumberInput
                            defaultValue={billingReviewsOn || 1}
                            min={1}
                            max={31}
                            keepWithinRange={true}
                            clampValueOnBlur={true}
                          >
                            <NumberInputField pl={10} width="100px" />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                          <InputRightAddon
                            children={<FormattedMessage id="ofEveryMonth" />}
                          />
                        </InputGroup>

                        <FormErrorMessage>
                          Enter the billing date
                        </FormErrorMessage>
                      </FormControl>
                    )} */}
                    {billingType === 'non-recurring' && (
                      <FormControl id="expiry-date">
                        <FormLabel>
                          <FormattedMessage id="expiryDate" />
                        </FormLabel>
                        <Controller
                          control={control}
                          name="validUntil"
                          render={({
                            field: { onChange, value, name, ref },
                          }) => (
                            <ReactDatePicker
                              className="date-picker"
                              popperClassName="calendar"
                              popperPlacement="right"
                              selected={value}
                              onChange={date => onChange(date)}
                              locale={locale}
                            />
                          )}
                        />

                        <FormErrorMessage>
                          Enter the billing date
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <FormControl width={'200px'} id="language">
                    <FormLabel>Default Profile Language</FormLabel>

                    <Controller
                      control={control}
                      defaultValue={locale}
                      name="language"
                      render={({ field: { onChange, value, name, ref } }) => (
                        <ReactSelect
                          inputRef={ref}
                          options={langOptions}
                          value={langOptions.find(val => {
                            console.log({ value, val });
                            return val.value === value;
                          })}
                          // defaultValue={langOptions.find(
                          //   opt => opt.value === value
                          // )}
                          onChange={val => {
                            onChange(val.value);
                          }}
                          formatOptionLabel={el => (
                            <Flex gap={3} alignItems={'center'}>
                              <Image
                                src={el.icon}
                                width={'30px'}
                                height={'30px'}
                                mr={'1rem'}
                                borderRadius={'full'}
                              />
                              {el.label}
                            </Flex>
                          )}
                        />
                      )}
                    />

                    <FormErrorMessage>Select the language</FormErrorMessage>
                  </FormControl>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <Divider color={'gray.300'} />
          <ModalFooter zIndex={50}>
            <Flex
              justifyContent={currentTab === 0 ? 'end' : 'space-between'}
              w={'full'}
            >
              {currentTab !== 0 && (
                <Button
                  onClick={() => {
                    setCurrentTab(pre => pre - 1);
                  }}
                  colorScheme="primary"
                  minWidth="15%"
                  variant={'outline'}
                  display={'flex'}
                  alignItems={'center'}
                  gap={3}
                >
                  <FaArrowLeft />
                  <Text>
                    <FormattedMessage id="back" />
                  </Text>
                </Button>
              )}
              <Button
                type={formReady ? 'submit' : 'button'}
                colorScheme="primary"
                mr={1}
                isDisabled={checkValidity()}
                minWidth="15%"
                onClick={() => {
                  if (currentTab !== 2) {
                    setCurrentTab(pre => pre + 1);
                  } else {
                    setFormReady(true);
                  }
                }}
                display={'flex'}
                gap={3}
                alignItems={'center'}
              >
                {loading ? (
                  <Spinner />
                ) : (
                  <>
                    <FormattedMessage
                      id={
                        currentTab !== 2
                          ? 'next'
                          : Boolean(firstName)
                          ? 'updateUser'
                          : 'createUser'
                      }
                    />
                    {currentTab !== 2 && <FaArrowRight />}
                  </>
                )}
              </Button>
            </Flex>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
