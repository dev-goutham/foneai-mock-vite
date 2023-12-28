import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  IconButton,
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
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FcBriefcase, FcBusinessman, FcOrganization } from 'react-icons/fc';
import { changePasswordFunction, getProfile } from '../api';
import { FormattedMessage } from 'react-intl';
import { useChangePasswordModalHook } from '../hooks/useChangePasswordModalHook';
import { IoMdClose } from 'react-icons/io';

export function ProfileModal({ isOpen, onClose }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [changeEmail, setChangeEmail] = useState(false);
  const [email, setEmail] = useState(undefined);
  const toast = useToast();

  const [newEmail, setNewEmail] = useState(undefined);

  useEffect(() => {
    setLoading(true);
    getProfile().then(res => {
      setUser(res);
      setEmail(res.email);
      setNewEmail(res.email);
      setLoading(false);
    });
  }, []);

  const {
    ChangePasswordModal,
    closeChangePassword,
    isChangePasswordOpen,
    openChangePassword,
  } = useChangePasswordModalHook();

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={'2xl'}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        scrollBehavior={'inside'}
      >
        <ModalOverlay />
        <ModalContent borderRadius="30px" mt={'15vh'}>
          <form>
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
            <ModalBody p={12}>
              {/* form of having 2 columns - firstname, lastname, email, username, mins , billing date and a language slect. Should have helper text as well */}
              <Stack spacing={4} dir="column">
                <Flex dir="row" gap={6}>
                  <FormControl id="first-name" isRequired>
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
                          defaultValue={user?.firstName || ''}
                          type="text"
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
                          defaultValue={user?.lastName || ''}
                          type="text"
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
                          defaultValue={user?.organization || ' '}
                          type="text"
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
                          defaultValue={user?.organizationRole || ''}
                        />
                      </InputGroup>
                    )}
                    <FormErrorMessage>
                      Enter the organization role of the user
                    </FormErrorMessage>
                  </FormControl>
                </Flex>

                <Grid gridTemplateColumns={'50% 50%'} gap={4}>
                  <GridItem>
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
                            isDisabled={!changeEmail}
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
                  </GridItem>
                  <GridItem alignSelf={'end'}>
                    <Flex gap={2}>
                      <FormControl id="changeEmail">
                        {loading ? (
                          <Skeleton h={'40px'} w={'full'} />
                        ) : (
                          <Button
                            onClick={() => {
                              if (!changeEmail) {
                                setChangeEmail(true);
                              } else {
                                toast({
                                  title: 'Email sent',
                                  description:
                                    "We've sent a verification email to your address.",
                                  status: 'success',
                                  duration: 9000,
                                  isClosable: true,
                                });
                              }
                            }}
                            colorScheme={changeEmail ? 'primary' : 'gray'}
                            height={'71.99px'}
                            maxW={'100%'}
                            isDisabled={
                              changeEmail ? email === newEmail : false
                            }
                          >
                            <Text
                              overflowWrap={'break-word'}
                              wordBreak={'break-word'}
                              h={'full'}
                              maxW={'100%'}
                              className="btn-text"
                            >
                              <FormattedMessage
                                id={changeEmail ? 'verify' : 'changeEmail'}
                              />
                            </Text>
                          </Button>
                        )}
                      </FormControl>
                      <FormControl id="changePassword">
                        {loading ? (
                          <Skeleton h={'40px'} w={'full'} />
                        ) : (
                          <Button
                            onClick={openChangePassword}
                            height={'71.99px'}
                            maxW={'100%'}
                          >
                            <Text
                              overflowWrap={'break-word'}
                              wordBreak={'break-word'}
                              h={'full'}
                              maxW={'100%'}
                              className="btn-text"
                            >
                              <FormattedMessage id="changePassword" />
                            </Text>
                          </Button>
                        )}
                      </FormControl>
                    </Flex>
                  </GridItem>
                </Grid>
              </Stack>
            </ModalBody>
            <Divider color={'gray.300'} />
            <ModalFooter>
              <Flex justifyContent={'end'} w={'full'}>
                <Button
                  type="submit"
                  colorScheme="primary"
                  mr={1}
                  minWidth="15%"
                  //   onClick={()=>handleAddNode('transfer')}
                  //   isDisabled={transferExtension?.trim() === ''}
                >
                  <FormattedMessage id="updateProfile" />
                </Button>
              </Flex>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <ChangePasswordModal />
    </>
  );
}
