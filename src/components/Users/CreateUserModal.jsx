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
} from '@chakra-ui/react';
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

export function CreateUserModal({ isCreateUserOpen, onCreateUserClose }) {
  return (
    <Modal
      isOpen={isCreateUserOpen}
      onClose={onCreateUserClose}
      size={'6xl'}
      closeOnOverlayClick={false}
      closeOnEsc={false}
      // onCloseComplete={() => setTransferExtension('')}
      scrollBehavior={'inside'}
    >
      <ModalOverlay />
      <ModalContent borderRadius="30px" mt={'15vh'}>
        <form>
          <ModalHeader>Create User</ModalHeader>
          <ModalCloseButton
            type="reset"
            backgroundColor={'red.400'}
            _hover={{ backgroundColor: 'red.600' }}
            borderRadius={'full'}
            mr={-4}
            mt={-4}
          />
          <Divider color={'gray.300'} />
          <ModalBody p={12}>
            {/* form of having 2 columns - firstname, lastname, email, username, mins , billing date and a language slect. Should have helper text as well */}
            <Stack spacing={4} dir="column">
              <Flex dir="row" gap={6}>
                <FormControl id="first-name" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FcBusinessman color="gray.300" />
                    </InputLeftElement>
                    <Input type="text" />
                  </InputGroup>
                  <FormErrorMessage>
                    Enter the first name of the user
                  </FormErrorMessage>
                </FormControl>
                <Spacer />
                <FormControl id="last-name">
                  <FormLabel>Last Name</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FcBusinessman color="gray.300" />
                    </InputLeftElement>
                    <Input type="text" />
                  </InputGroup>
                  <FormErrorMessage>
                    Enter the last name of the user
                  </FormErrorMessage>
                </FormControl>
              </Flex>
              <Flex dir="row" gap={6}>
                <FormControl id="organization-name">
                  <FormLabel>Organization Name</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FcOrganization color="gray.300" />
                    </InputLeftElement>
                    <Input type="text" />
                  </InputGroup>
                  <FormErrorMessage>
                    Enter the organization name of the user
                  </FormErrorMessage>
                </FormControl>
                <Spacer />
                <FormControl id="organization-role">
                  <FormLabel>Organization Role</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FcBriefcase color="gray.300" />
                    </InputLeftElement>
                    <Input type="text" />
                  </InputGroup>
                  <FormErrorMessage>
                    Enter the organization role of the user
                  </FormErrorMessage>
                </FormControl>
              </Flex>

              <Flex dir="row" gap={6}>
                <FormControl id="username" isRequired>
                  <FormLabel>Username</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <LiaIdCard color="gray.300" />
                    </InputLeftElement>
                    <Input type="text" minLength={5} maxLength={20} />
                  </InputGroup>
                  <FormErrorMessage>
                    Enter the username of the user
                  </FormErrorMessage>
                </FormControl>
                <Spacer />
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FcAddressBook color="gray.300" />
                    </InputLeftElement>
                    <Input type="email" />
                  </InputGroup>
                  <FormErrorMessage>
                    Enter the email of the user
                  </FormErrorMessage>
                </FormControl>
              </Flex>
              {/* password and confirm password */}
              <Flex direction="row" gap={6}>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FcKey color="gray.300" />
                    </InputLeftElement>
                    <Input type="password" />
                  </InputGroup>
                  <FormErrorMessage>
                    Enter the password of the user
                  </FormErrorMessage>
                </FormControl>
                <Spacer />
                <FormControl id="confirm-password" isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FcKey color="gray.300" />
                    </InputLeftElement>
                    <Input type="password" />
                  </InputGroup>
                  <FormErrorMessage>
                    Enter the password of the user
                  </FormErrorMessage>
                </FormControl>
              </Flex>
              <Flex dir="row" gap={6}>
                <FormControl id="mins">
                  <FormLabel>Minutes each billing cycle</FormLabel>
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
                    <InputRightAddon children="minutes" />
                  </InputGroup>

                  <FormErrorMessage>
                    Enter the minutes each billing cycle
                  </FormErrorMessage>
                </FormControl>
                <Spacer />
                <FormControl id="billing-date">
                  <FormLabel>Billing Renews on</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FcCalendar color="gray.300" />
                    </InputLeftElement>
                    <NumberInput
                      defaultValue={1}
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
                    <InputRightAddon children="of every month" />
                  </InputGroup>

                  <FormErrorMessage>Enter the billing date</FormErrorMessage>
                </FormControl>
                <Spacer />
                <FormControl id="language">
                  <FormLabel>Default Profile Language</FormLabel>
                  <Select defaultValue={'english'} width="150px">
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
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
              Create User
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
