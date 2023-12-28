import React, { useEffect, useState } from 'react';
import {
  useDisclosure,
  Divider,
  Stack,
  Button,
  Textarea,
  Flex,
  Spacer,
  Box,
  Text,
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import HighlightWithinTextarea from 'react-highlight-within-textarea';
import useFocus from './useFocus';
import { FormattedMessage } from 'react-intl';

const MAX_CHARACTERS = 100;

const REGEX1 = /(@[a-z]+)(?!\S)/gi;
const REGEX2 = /(\$[a-z]+)(?!\S)/gi;

export const useSpeakModalHook = (
  submitFn,
  buttonLabel,
  data,
  deleteFn,
  closeCb,
  showDeleteBtn = true
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const close = () => {
    if (closeCb) {
      closeCb();
    }
    onClose();
  };

  console.log(data);

  const SpeakModalComponent = () => {
    let defaultText = '';
    if (data?.texts[0]) {
      defaultText = data?.texts[0];
    }
    const [value, setValue] = useState(defaultText);

    const deleteNode = () => {
      deleteFn(data);
      close();
    };

    const highlight = [
      {
        highlight: /(@[a-z]+)(?!\S)/gi,
        className: 'header-variables',
      },
      {
        highlight: /(\$[a-z]+)(?!\S)/gi,
        className: 'context-variables',
      },
    ];

    const onChange = val => {
      if (val.length > MAX_CHARACTERS) {
        console.log(vol.length);
      } else {
        val = val.replace(/(\r\n|\n|\r)/gm, ' ');

        setValue(val);
      }
    };

    const [inputRef, setInputFocus] = useFocus();

    useEffect(() => {
      if (isOpen) {
        setInputFocus();
      }
    }, [isOpen]);

    const [characterCount, setCharacterCount] = useState(0);

    useEffect(() => {
      let nonHighlited = value.replace(/(@[a-z]+)(?!\S)/gi, '');
      nonHighlited = value.replace(/(\$[a-z]+)(?!\S)/gi, '');
      const matches1 = value.match(/(@[a-z]+)(?!\S)/gi);
      const matches2 = value.match(/(\$[a-z]+)(?!\S)/gi);
      setCharacterCount(
        nonHighlited.length +
          (matches1?.length || 0 + matches2?.length || 0) * 10
      );
    }, [value]);

    return (
      <Modal
        isOpen={isOpen}
        size={'sm'}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        onCloseComplete={() => setValue(null)}
        scrollBehavior={'inside'}
        onClose={close}
      >
        <ModalOverlay />
        <form
          onSubmit={async e => {
            e.preventDefault();
            if (data) await submitFn(data, [value]);
            else await submitFn('speak', value);
            close();
          }}
        >
          <ModalContent borderRadius="30px" mt={'25vh'}>
            <ModalHeader>
              <FormattedMessage id="speakText" />
            </ModalHeader>

            <ModalCloseButton
              backgroundColor={'red.400'}
              _hover={{ backgroundColor: 'red.600' }}
              borderRadius={'full'}
              mr={-4}
              mt={-4}
              type="reset"
            />

            <Divider color={'gray.300'} />

            <ModalBody>
              <Stack spacing={2} pt={4}>
                {/* <Box position={'relative'}>
                  <Textarea
                    padding={4}
                    position={'relative'}
                    zIndex={10}
                    minH={'180px'}
                    background={'transparent'}
                    value={value}
                    onChange={e => {
                      // if (characterCount > MAX_CHARACTERS) return;
                      onChange(e.target.value);
                    }}
                    color={'transparent'}
                    fontSize={'lg'}
                    sx={{
                      caretColor: 'black',
                    }}
                  />
                  <Box
                    position={'absolute'}
                    top={0}
                    left={0}
                    h={'full'}
                    w="full"
                    zIndex={9}
                    padding={4}
                  >
                    <Text fontSize={'lg'} color="black">
                      {renderHighlightText({ value })}
                    </Text>
                  </Box>
                </Box> */}
                <Box
                  borderWidth="1px"
                  borderRadius="xl"
                  backgroundColor={'white'}
                  padding={4}
                  minH={'180px'}
                  overflowWrap={'ellipsis'}
                  onClick={setInputFocus}
                >
                  <HighlightWithinTextarea
                    ref={inputRef}
                    placeholder=""
                    value={value}
                    onChange={onChange}
                    highlight={highlight}
                    readOnly={characterCount > MAX_CHARACTERS}
                  />
                </Box>
                <Flex justifyContent={'end'}>
                  <Text fontSize={'sm'}>
                    <FormattedMessage id="characterCount" />:{' '}
                    <Text as={'span'} fontWeight={'bold'}>
                      {characterCount} / {MAX_CHARACTERS}
                    </Text>
                  </Text>
                </Flex>
              </Stack>
            </ModalBody>

            <Divider color={'gray.300'} />

            <ModalFooter>
              <Flex w={'100%'} justifyContent={'space-between'}>
                {data && showDeleteBtn && (
                  <Button
                    type="reset"
                    colorScheme="red"
                    variant={'outline'}
                    ml={3}
                    minWidth="15%"
                    onClick={deleteNode}
                  >
                    <FormattedMessage id="deleteNode" />
                  </Button>
                )}
                <Spacer />
                <Button
                  colorScheme="primary"
                  mr={3}
                  type="submit"
                  isDisabled={
                    value?.trim() === '' || characterCount > MAX_CHARACTERS
                  }
                >
                  {buttonLabel}
                </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    );
  };

  return {
    SpeakModalComponent,
    onOpen,
    onClose,
  };
};

const renderHighlightText = ({ value }) => {
  const returnVal = [];
  value.split(REGEX1).forEach((word, i) => {
    if (word.match(REGEX1)) {
      returnVal.push(<span className="header-variables">{word}</span>);
    } else {
      word.split(REGEX2).forEach(word2 => {
        if (word2.match(REGEX2)) {
          returnVal.push(<span className="context-variables">{word2}</span>);
        } else {
          returnVal.push(word2);
        }
      });
    }
  });
  console.log({ value });
  console.log(returnVal);
  return returnVal;
};
// console.clear();
// console.log(
//   JSON.stringify(renderHighlightText({ value: 'hello @name $name' }), null, 2)
// );
