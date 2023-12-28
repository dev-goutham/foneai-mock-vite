import React, { useState, useEffect, useRef } from 'react';
import {
  Spinner,
  useDisclosure,
  useCheckboxGroup,
  Flex,
  Text,
  Spacer,
  Divider,
  Stack,
  StackDivider,
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
import { SimpleGrid, Center, VStack, Button } from '@chakra-ui/react';

import { getAudioFiles } from '../api';
import UploadPopover from '../components/UploadPopover';
import { PlayCheckboxCard } from '../components/CheckboxCard';
import { SelectedAudioFileCard } from '../components/SelectedCardModal';
import { PlayStatus } from '../components/ModalStatus';

import useStore from '../store';
import { shallow } from 'zustand/shallow';
import { FormattedMessage } from 'react-intl';

const selector = state => ({
  audioFiles: state.audioFiles,
  setAudioFiles: state.setAudioFiles,
});

export const usePlayModalHook = (
  submitFn,
  buttonLabel,
  data,
  deleteFn,
  closeCb,
  showDeleteBtn = true
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const count = useRef(0);
  const close = () => {
    if (closeCb) {
      closeCb();
    }
    onClose();
  };

  const PlayModalComponent = () => {
    const { audioFiles, setAudioFiles } = useStore(selector, shallow);
    const [audioFilesLoading, setAudioFilesLoading] = useState(false);
    console.log('line 51', data);
    let defaultAudioFiles = [];
    const maxAudioFilesCount = 5;

    if (data?.audioFiles.length > 0) {
      defaultAudioFiles = data?.audioFiles;
    }

    const {
      value: selectedAudioFiles,
      setValue: setSelectedAudioFiles,
      getCheckboxProps: getPlayCheckboxProps,
    } = useCheckboxGroup({
      defaultValue: defaultAudioFiles,
    });

    useEffect(() => {
      if (selectedAudioFiles.length >= maxAudioFilesCount) {
        setSelectedAudioFiles(selectedAudioFiles.slice(0, maxAudioFilesCount));
      }
    }, [selectedAudioFiles[selectedAudioFiles.length - 1]]);

    function unCheckPlay(audiofileName) {
      setSelectedAudioFiles(
        selectedAudioFiles.filter(val => val !== audiofileName)
      );
    }

    const updateNode = () => {
      console.log(data);
      if (data)
        submitFn(data, {
          audioFilesArray: selectedAudioFiles,
        });
      else submitFn('play', selectedAudioFiles);
      close();
    };

    const deleteNode = () => {
      deleteFn(data);
      close();
    };

    useEffect(() => {
      if (count.current === 0)
        if (audioFiles.length === 0) {
          setAudioFilesLoading(true);
          console.log('fetching audio files');
          getAudioFiles()
            .then(res => {
              setAudioFiles(res);
              setAudioFilesLoading(false);
            })
            .catch(err => {
              console.log(err);
              setAudioFilesLoading(false);
            });
        }
      count.current += 1;
    }, []);

    const uploadSucess = fileName => {
      setAudioFiles([...audioFiles, { Key: fileName }]);
    };

    return (
      <Modal
        isOpen={isOpen}
        onClose={close}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        onCloseComplete={() => setSelectedAudioFiles([])}
        scrollBehavior={'outside'}
      >
        <ModalOverlay />
        <ModalContent borderRadius="30px" minW={'1100px'} minH={'660px'}>
          <ModalHeader>
            <Flex
              direction={'row'}
              justify={'space-between'}
              align={'flex-start'}
              pr={16}
            >
              <Text fontSize={'2xl'} fontWeight={'semibold'}>
                <FormattedMessage id="playAudio" />
              </Text>
              <Spacer />
              <UploadPopover uploadSucess={uploadSucess} />
            </Flex>
            <ModalCloseButton
              backgroundColor={'red.400'}
              _hover={{ backgroundColor: 'red.600' }}
              borderRadius={'full'}
              mr={-4}
              mt={-4}
            />
          </ModalHeader>

          <Divider color={'gray.300'} />

          <ModalBody className="no-scrollbar" height={'64vh'} minH={'480px'}>
            <Stack direction={'row'} spacing={'2%'} align={'center'}>
              <Flex
                p={'2%'}
                minChildWidth="200px"
                top={'0px'}
                position={'relative'}
                minHeight={'480px'}
                // h={'60vh'}
                spacing="15px"
                gap={'20px'}
                width={'850px'}
                overflowY={'scroll'}
                backgroundColor={'gray.100'}
                borderRadius={'20px'}
                flexWrap={'wrap'}
                className="no-scrollbar"
              >
                {audioFilesLoading ? (
                  <Center height={'480px'}>
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="primary.500"
                      size="xl"
                    />
                  </Center>
                ) : (
                  audioFiles.map(audioFileName => {
                    return (
                      <PlayCheckboxCard
                        key={audioFileName.Key}
                        audioFileName={audioFileName.Key}
                        {...getPlayCheckboxProps({
                          value: audioFileName.Key,
                        })}
                        disabled={
                          selectedAudioFiles.includes(audioFileName.Key)
                            ? false
                            : selectedAudioFiles.length >= maxAudioFilesCount
                        }
                      />
                    );
                  })
                )}
              </Flex>
              <Center height={'480px'}>
                <Divider
                  orientation={'vertical'}
                  color={'primary.500'}
                  width="10px"
                />
              </Center>

              <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={4}
                mt={'10px'}
                align="top"
                width={'25%'}
                // make the whole stack inside the modal content
                // scrollable
                minH={'480px'}
                maxW={'235px'}
              >
                <Text
                  fontSize={'md'}
                  fontWeight={'semibold'}
                  color={'primary.500'}
                  maxLength={200}
                >
                  {' '}
                  <FormattedMessage id="selectedAudioFiles" /> :{' '}
                </Text>

                <Stack
                  direction={'column'}
                  gap={'20px'}
                  minH={'330px'}
                  h={'330px'}
                  pr="15px"
                >
                  {selectedAudioFiles.map(audioFileName => {
                    return (
                      <SelectedAudioFileCard
                        w={'235px'}
                        maxW="235px"
                        key={audioFileName}
                        audioFileName={audioFileName}
                        unCheckPlay={unCheckPlay}
                      />
                    );
                  })}
                </Stack>

                <PlayStatus audioFilesArray={selectedAudioFiles} />
              </VStack>
            </Stack>
          </ModalBody>

          <Divider color={'gray.300'} />

          <ModalFooter minH={'60px'}>
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
                type="submit"
                colorScheme="primary"
                mr={1}
                minWidth="15%"
                onClick={updateNode}
                isDisabled={selectedAudioFiles.length === 0}
              >
                {buttonLabel}
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return {
    PlayModalComponent,
    onOpen,
    onClose,
  };
};
