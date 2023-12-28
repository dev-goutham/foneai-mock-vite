import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
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
  Spacer,
  Stack,
} from '@chakra-ui/react';

export function TopupUserModal({ isTopUpUserOpen, onTopUpUserClose }) {
  return (
    <Modal
      isOpen={isTopUpUserOpen}
      onClose={onTopUpUserClose}
      size={'2xl'}
      closeOnOverlayClick={false}
      closeOnEsc={false}
      // onCloseComplete={() => setTransferExtension('')}
      scrollBehavior={'inside'}
    >
      <ModalOverlay />
      <ModalContent borderRadius="30px" mt={'25vh'}>
        <form>
          <ModalHeader>Top Up User</ModalHeader>
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
              {/* Information Bar to tell a warning */}
              <Flex dir="row" gap={6}>
                <Alert status="warning" borderRadius={'lg'} width={'100%'}>
                  <AlertIcon />
                  <AlertTitle mr={2}>Warning!</AlertTitle>
                  <Spacer />
                  <AlertDescription>
                    This will add minutes valid only till the next billing
                    cycle. Unutilized minutes will not be carried forward.
                  </AlertDescription>
                </Alert>
              </Flex>
              <FormControl id="mins">
                <FormLabel>Top-Up Minutes</FormLabel>
                <InputGroup>
                  <NumberInput
                    defaultValue={1}
                    min={1}
                    max={1000}
                    keepWithinRange={true}
                    clampValueOnBlur={true}
                  >
                    <NumberInputField />
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
            </Stack>
          </ModalBody>
          <Divider color={'gray.300'} />
          <ModalFooter>
            <Button
              type="submit"
              colorScheme="primary"
              mr={10}
              minWidth="15%"
              //   onClick={()=>handleAddNode('transfer')}
              //   isDisabled={transferExtension?.trim() === ''}
            >
              Top-Up User
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
