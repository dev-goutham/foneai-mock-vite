import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
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
  Spacer,
  Stack,
  TabList,
  Tabs,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FcAddressBook,
  FcBriefcase,
  FcBusinessman,
  FcCalendar,
  FcClock,
  FcKey,
  FcOrganization,
} from 'react-icons/fc';
import { LiaIdCard } from 'react-icons/lia';
import { FormattedMessage } from 'react-intl';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUser } from '../../api';

const createUserSchema = yup.object().shape({
  firstName: yup.string().required('FIRST_NAME_EMPTY'),
  lastName: yup.string().required('LAST_NAME_EMPTY'),
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
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  language: yup
    .string()
    .required('Language is required')
    .oneOf(
      ['english', 'spanish'],
      'Language must be one of English or Spanish'
    ),
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
}) {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
  } = useForm({
    resolver: yupResolver(createUserSchema),
    defaultValues: {
      firstName,
      lastName,
      organization,
      username,
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
    const { data, errors } = await createUser({
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

    if (errors) {
      Object.keys(errors).forEach(er => {
        setError(er, { message: errors[er] });
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={'6xl'}
      closeOnOverlayClick={false}
      closeOnEsc={false}
      scrollBehavior={'inside'}
    >
      <ModalOverlay />
      <ModalContent borderRadius="30px" mt={'15vh'}>
        <form>
          <ModalHeader>
            {mode === 'create' ? (
              <FormattedMessage id="createUser" />
            ) : (
              <FormErrorMessage id="updateUser" />
            )}
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
          <ModalBody py={12}>
            {/* form of having 2 columns - firstname, lastname, email, username, mins , billing date and a language slect. Should have helper text as well */}

            <Stack spacing={4} dir="column">
              <Flex dir="row" gap={6}>
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
                <FormControl id="lastName" isInvalid={Boolean(errors.lastName)}>
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
              <Flex dir="row" gap={6}>
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
                  id="organization"
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
                      minLength={5}
                      maxLength={20}
                      {...register('username')}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    <FormattedMessage id={errors.username?.message} />
                  </FormErrorMessage>
                </FormControl>
                <Spacer />
                <FormControl
                  id="email"
                  isInvalid={Boolean(errors.email)}
                  isRequired
                >
                  <FormLabel>
                    <FormattedMessage id="email" />
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FcAddressBook color="gray.300" />
                    </InputLeftElement>
                    <Input type="email" {...register('email')} />
                  </InputGroup>
                  <FormErrorMessage>
                    <FormattedMessage id={errors.email?.message} />
                  </FormErrorMessage>
                </FormControl>
              </Flex>
              {/* password and confirm password */}
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
                    <Input type="password" {...register('password')} />
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
                    <Input type="password" {...register('confirmPassword')} />
                  </InputGroup>
                  <FormErrorMessage>
                    Enter the password of the user
                  </FormErrorMessage>
                </FormControl>
              </Flex>
              <Flex dir="row" gap={6}>
                <FormControl id="mins">
                  <FormLabel>
                    <FormattedMessage id="minutesEachBillingCycle" />
                  </FormLabel>
                  <InputGroup>
                    <NumberInput
                      defaultValue={1}
                      min={1}
                      max={1000}
                      keepWithinRange={true}
                      clampValueOnBlur={true}
                    >
                      <InputLeftElement pointerEvents="none">
                        <FcClock />
                      </InputLeftElement>
                      <NumberInputField pl={10} />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <InputRightAddon
                      children={<FormattedMessage id="minutes" />}
                    />
                  </InputGroup>

                  <FormErrorMessage>
                    Enter the minutes each billing cycle
                  </FormErrorMessage>
                </FormControl>
                <Spacer />
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

                  <FormErrorMessage>Enter the billing date</FormErrorMessage>
                </FormControl>
                <Spacer />
                <FormControl id="language">
                  <FormLabel>Default Profile Language</FormLabel>
                  <Select defaultValue={'english'} width="150px">
                    <option value="english">
                      <FormattedMessage id="english" />
                    </option>
                    <option value="spanish">
                      <FormattedMessage id="spanish" />
                    </option>
                  </Select>
                  <FormErrorMessage>Select the language</FormErrorMessage>
                </FormControl>
              </Flex>
            </Stack>
          </ModalBody>
          <Divider color={'gray.300'} />
          <ModalFooter>
            <Button
              type="submit"
              colorScheme="primary"
              mr={1}
              minWidth="15%"
              //   onClick={()=>handleAddNode('transfer')}
              //   isDisabled={transferExtension?.trim() === ''}
            >
              <FormattedMessage id="createUser" />
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
