import {
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackDivider,
  Text,
  useRadio,
  chakra,
  useRadioGroup,
} from '@chakra-ui/react';
import { FaFlagCheckered, FaRobot } from 'react-icons/fa';
import { MdAudiotrack } from 'react-icons/md';
import { TbAbc } from 'react-icons/tb';
import CustomScrollbar from './Scrollbar';

export function GoBackModal({ onClose, isOpen, data, nodes }) {
  let current = data;
  const parents = [];
  while (current.parentNodeId) {
    const parentNode = nodes.find(
      // eslint-disable-next-line no-loop-func
      node => node.data.nodeId === current.parentNodeId
    );
    if (!parentNode) break;
    parents.push({
      id: parentNode.data.nodeId,
      type: parentNode.type,
    });
    current = parentNode.data;
  }

  const { value, getRadioProps, getRootProps } = useRadioGroup({
    defaultValue: null,
    onChange: () => {},
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mt={'25vh'} borderRadius={'30px'}>
        <ModalHeader>
          Go Back
          <ModalCloseButton
            backgroundColor={'red.400'}
            _hover={{ backgroundColor: 'red.600' }}
            borderRadius={'full'}
            mr={-4}
            mt={-4}
            type="reset"
          />
        </ModalHeader>
        <Divider borderColor={'gray.400'} />
        <CustomScrollbar CustomScrollbar>
          <ModalBody className="no-scrollbar">
            <Box
              // justifyContent={'center'}
              // alignItems={'center'}
              h={'300px'}
              // w="300px"
            >
              <Text fontSize={'xl'} mb={4}>
                Select target node:
              </Text>
              <Stack {...getRootProps()} spacing={3}>
                {parents.map(p => (
                  <SelectNodeCard
                    type={p.type}
                    id={p.id}
                    key={p.id}
                    {...getRadioProps({ value: p.id })}
                  />
                ))}
              </Stack>
            </Box>
          </ModalBody>
        </CustomScrollbar>
        <Divider borderColor={'gray.400'} />

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

const SelectNodeCard = ({ type, id, ...props }) => {
  const { state, getInputProps, getRadioProps, htmlProps, getLabelProps } =
    useRadio(props);

  const icon =
    type === 'play'
      ? MdAudiotrack
      : type === 'speak'
      ? TbAbc
      : type === 'nlp'
      ? FaRobot
      : type === 'start'
      ? FaFlagCheckered
      : null;

  return (
    <chakra.label {...htmlProps} cursor={'pointer'}>
      <input {...getInputProps({})} hidden />
      <HStack
        divider={
          <StackDivider
            borderColor="gray.200"
            my={'20%'}
            verticalAlign={'middle'}
            width="3px"
          />
        }
        minH="50px"
        borderWidth={'2px'}
        borderColor={'gray.200'}
        borderRadius={'10px'}
        px={'10px'}
        spacing={'10px'}
        {...getRadioProps()}
        bg={state.isChecked ? 'primary.100' : 'transparent'}
      >
        <Icon as={icon} color={'primary.500'} />
        <Text
          w="85%"
          overflow={'hidden'}
          noOfLines={1}
          textOverflow={'ellipsis'}
          whiteSpace={'nowrap'}
          {...getLabelProps()}
        >
          {id}
        </Text>
      </HStack>
    </chakra.label>
  );
};
