import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Select,
  IconButton,
  useDisclosure,
  Editable,
  Text,
  EditablePreview,
  EditableInput,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { TiCancel } from 'react-icons/ti';
import { AiFillDelete, AiOutlinePlus } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

const RulesStep = ({ stepState, changeStepState, deleteStep }) => {
  const {
    type = 'entity',
    item = 'food',
    comparator = 'equal-to',
    input = '',
  } = stepState;

  return (
    <Stack position={'relative'} spacing={0}>
      <Flex justifyContent={'center'} w="150px" h="75px">
        <Divider
          borderColor={'gray.900'}
          // borderWidth={'2px'}
          orientation="vertical"
          borderStyle={'dotted'}
        />
      </Flex>
      <Box>
        <Flex
          position={'absolute'}
          alignItems={'center'}
          transform={'translate(75px, 0)'}
          bottom={'-19px'}
        >
          <Box width={'40px'}>
            <Divider borderColor={'gray.900'} borderStyle={'dotted'} />
          </Box>
          <Box>
            <Select
              onChange={e => {
                changeStepState({
                  key: 'type',
                  value: e.target.value,
                });
              }}
              defaultValue={type}
            >
              <option value={'entity'}>Entity</option>
              <option value={'rule'}>Rule</option>
              <option value={'built-in'}>Built In</option>
            </Select>
          </Box>
          <Box width={'40px'}>
            <Divider borderColor={'gray.900'} borderStyle={'dotted'} />
          </Box>
          <Box>
            <Select
              onChange={e => {
                changeStepState({
                  key: 'item',
                  value: e.target.value,
                });
              }}
              defaultValue={item}
            >
              <option value={'food'}>Food</option>
              <option value={'drink'}>Drink</option>
              <option value={'something'}>Something</option>
            </Select>
          </Box>
          <Box width={'40px'}>
            <Divider borderColor={'gray.900'} borderStyle={'dotted'} />
          </Box>
          <Box>
            <Select
              onChange={e => {
                changeStepState({
                  key: 'comparator',
                  value: e.target.value,
                });
              }}
              defaultValue={comparator}
            >
              <option value={'is-equal-to'}>Is Equal To</option>
              <option value={'not-euqal-to'}>Not Equal To</option>
              <option value={'greater-than'}>Greater Than</option>
              <option value={'lesser-than'}>Lesser Than</option>
            </Select>
          </Box>
          <Box width={'40px'}>
            <Divider borderColor={'gray.900'} borderStyle={'dotted'} />
          </Box>
          <Input
            onChange={e => {
              changeStepState({
                key: 'input',
                value: e.target.value,
              });
            }}
            value={input}
            width={'250px'}
            placeholder="Placeholder"
          />
          <IconButton color={'gray.500'} variant={'unstyled'} ml="20px">
            <RiDeleteBin6Line onClick={deleteStep} size={24} />
          </IconButton>
        </Flex>
      </Box>
    </Stack>
  );
};

export const useRulesModal = rule => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const RulesModal = () => {
    const [steps, setSteps] = useState([]);

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          borderRadius={'30px'}
          minH="80vh"
          maxH="80vh"
          minW={'60vw'}
        >
          <ModalHeader>
            {rule?.ruleName ? (
              <Text>{rule.ruleName}</Text>
            ) : (
              <Input
                fontSize={'1.2rem'}
                fontWeight={600}
                placeholder="Enter Rule name"
                width={'75%'}
              />
            )}
          </ModalHeader>
          <ModalCloseButton
            backgroundColor={'red.400'}
            _hover={{ backgroundColor: 'red.600' }}
            borderRadius={'full'}
            mr={-4}
            mt={-4}
            type="reset"
          />
          <Divider borderColor={'gray.400'} />
          <ModalBody className="no-scrollbar" overflow={'scroll'}>
            <Select defaultValue={'any'} width={'150px'}>
              <option value={'any'}>ANY</option>
              <option value={'some'}>SOME</option>
            </Select>
            {/* <RulesStep /> */}
            {steps.map((step, i) => (
              <RulesStep
                stepState={{ ...step }}
                changeStepState={({ key, value }) => {
                  setSteps(prev => {
                    const p = [...prev];
                    p[i][key] = value;
                    return p;
                  });
                }}
                deleteStep={() => {
                  setSteps(prev => {
                    const p = [...prev];
                    p.splice(i, 1);
                    return p;
                  });
                }}
                key={i}
              />
            ))}
            <Flex justifyContent={'center'} w="150px" h="75px">
              <Divider
                borderColor={'gray.900'}
                // borderWidth={'2px'}
                orientation="vertical"
                borderStyle={'dotted'}
              />
            </Flex>
            <Flex justifyContent={'center'} w={'150px'}>
              <IconButton
                onClick={() => {
                  setSteps(prev => [
                    ...prev,
                    {
                      type: 'entity',
                      item: 'food',
                      comparator: 'equal-to',
                      input: '',
                    },
                  ]);
                }}
                colorScheme="primary"
                borderRadius={'6px'}
              >
                <AiOutlinePlus />
              </IconButton>
            </Flex>
          </ModalBody>
          <Divider borderColor={'gray.400'} />

          <ModalFooter>
            <Flex
              w={'full'}
              justifyContent={rule?.ruleName ? 'space-between' : 'end'}
            >
              {rule?.ruleName && (
                <Button colorScheme="red" onClick={onClose}>
                  <FormattedMessage id="deleteRule" />
                </Button>
              )}
              <Button colorScheme="blue" onClick={onClose}>
                {rule?.ruleName ? (
                  <FormattedMessage id="updateRule" />
                ) : (
                  <FormattedMessage id="createRule" />
                )}
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return {
    onRulesModalOpen: onOpen,
    RulesModal,
    onRulesModalClose: onClose,
  };
};
