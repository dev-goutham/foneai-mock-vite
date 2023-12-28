
// modalhook without react-modal-hook
import { useDisclosure } from '@chakra-ui/react';
import { Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
} from '@chakra-ui/react';
import {
    Stack,
    chakra,
    Box,
    useCheckboxGroup,
    useCheckbox,
    Flex,
    Text
} from '@chakra-ui/react';

// expoort a hook to use the modal
export const useTestHook = (fn) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
  
    // Modal html component
    const ModalComponent = () => {
        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>

                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack>
                            <Box>
                                {/* write the fn as a array */}
                                {fn.map((item) => (
                                    <Flex key={item}>
                                        <Text>{item}</Text>
                                    </Flex>
                                ))}
                            </Box>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3}>
                            Close
                        </Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>
        )
    }

    return {
        ModalComponent,
        onOpen
    }
}