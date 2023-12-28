import React, { useEffect, useMemo, useState } from 'react';
import ReactFlow, { applyNodeChanges, applyEdgeChanges } from 'reactflow';
import {
  NlpIcon,
  SaveIcon,
  BranchIcon,
  TerminateIcon,
  AddIcon,
  StartIcon,
  PlayIcon,
  SpeakIcon,
  TransferIcon,
  WebhookIcon,
  VoicemailIcon,
} from '../components/FlowBlocks';
import {
  MdAdd,
  MdAudiotrack,
  MdCallEnd,
  MdOutlineRocketLaunch,
  MdWebhook,
} from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import { shallow } from 'zustand/shallow';
import 'reactflow/dist/style.css';

import useStore from '../store';
import {
  PopoverBody,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Button, Flex, useBoolean, Spinner } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { setFlowElements } from '../api';
import {
  Popover,
  PopoverContent,
  List,
  ListItem,
  ListIcon,
  PopoverTrigger,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
} from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';
import { TbAbc } from 'react-icons/tb';
import { FaRobot } from 'react-icons/fa';
import { VscCallOutgoing } from 'react-icons/vsc';
import { usePlayModalHook } from '../hooks/usePlayModalHook';
import { useSpeakModalHook } from '../hooks/useSpeakModalHook';
import { useProcessorModalHook } from '../hooks/useProcessorModalHook';
import { useTransferModalHook } from '../hooks/useTransferModalHook';
import { FormattedMessage } from 'react-intl';
import { TiArrowBack } from 'react-icons/ti';
import { GoBackModal } from '../components/GoBackModal';
import { useWebhookModalHook } from '../hooks/useWebhookModalHook';

const selector = state => ({
  nodes: state.nodes,
  edges: state.edges,
  setBotId: state.setBotId,
  menuAnchorEl: state.menuAnchorEl,
  addPlayNode: state.addPlayNode,
  addSpeakNode: state.addSpeakNode,
  addNlpNode: state.addNlpNode,
  addTransferNode: state.addTransferNode,
  addTerminateNode: state.addTerminateNode,
  intents: state.intents,
  data: state.data,
  addWebhookNode: state.addWebhookNode,
});

export default function Flow() {
  const { botId } = useParams();
  const [disbaleBtn, setDisableBtn] = React.useState(true);
  const [isLoading, setIsLoading] = useBoolean(true);
  const toast = useToast();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const {
    isOpen: isGoBackOpen,
    onOpen: onGoBackOpen,
    onClose: onGoBackClose,
  } = useDisclosure();

  useEffect(() => {
    if (anchorEl) {
      console.log({ anchorEl });
      onOpen();
    }
  }, [anchorEl]);

  const {
    nodes,
    edges,
    data,
    setBotId,
    menuAnchorEl,
    addPlayNode,
    addSpeakNode,
    addNlpNode,
    addTransferNode,
    addTerminateNode,
    addWebhookNode,
  } = useStore(selector, shallow);

  const nodeTypes = useMemo(
    () => ({
      start: StartIcon,
      add: AddIcon,
      voicemail: VoicemailIcon,
      play: PlayIcon,
      speak: SpeakIcon,
      // nlp: SpeakIcon,
      nlp: NlpIcon,
      branch: BranchIcon,
      save: SaveIcon,
      webhook: WebhookIcon,
      transfer: TransferIcon,
      terminate: TerminateIcon,
    }),
    []
  );

  useEffect(() => {
    if (menuAnchorEl) {
      console.log({ menuAnchorEl });
      onOpen();
    }
  }, [menuAnchorEl]);

  const proOptions = { hideAttribution: true };
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    onOpen: openPlayModal,
    onClose: closePlayModal,
    PlayModalComponent,
  } = usePlayModalHook(handleAddNode, <FormattedMessage id="addNode" />);
  const {
    onOpen: openSpeakModal,
    onClose: closeSpeakModal,
    SpeakModalComponent,
  } = useSpeakModalHook(handleAddNode, <FormattedMessage id="addNode" />);
  const {
    onOpen: openProcessorModal,
    onClose: closeProcessorModal,
    ProcessorModalComponent,
  } = useProcessorModalHook(handleAddNode, <FormattedMessage id="addNode" />);
  const {
    onOpen: openTransferModal,
    onClose: closeTransferModal,
    TransferModalComponent,
  } = useTransferModalHook(handleAddNode, <FormattedMessage id="addNode" />);
  const {
    onOpen: openWebhookModal,
    onClose: closeWebhookModal,
    WebhookModalComponent,
  } = useWebhookModalHook(handleAddNode);
  // useEffect(() => {
  //   onClose();
  //   return () => {
  //     onClose();
  //   };
  // }, []);

  useEffect(() => {
    setIsLoading.on();
    setBotId(botId)
      .then(() => {
        setIsLoading.off();
      })
      .catch(err => {
        setIsLoading.off();
        console.log(err);
        toast({
          title: 'Error',
          description: err.message,
          position: 'bottom',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  }, [botId]);

  useEffect(() => {
    if (nodes.filter(node => node.type === 'add').length === 0) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
    onClose();
  }, [nodes]);

  async function handleAddNode(type, payload) {
    console.log({ type, payload });
    switch (type) {
      case 'play':
        addPlayNode(data, payload);
        closePlayModal();
        break;

      case 'speak':
        addSpeakNode(data, [payload]);
        closeSpeakModal();
        break;

      case 'process':
        // console.clear();
        console.log(payload);
        addNlpNode(data, payload);
        closeProcessorModal();
        break;

      case 'transfer':
        addTransferNode(data, payload);
        closeTransferModal();
        break;

      case 'webhook':
        addWebhookNode(data, payload);
        closeWebhookModal();
        break;

      case 'terminate':
        addTerminateNode(data);
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    // console.clear();
    console.log(data);
  }, [isOpen]);

  return (
    <div style={{ height: '92vh', width: '100%' }}>
      {isLoading ? (
        <Flex
          position={'fixed'}
          top={'50%'}
          left={'50%'}
          transform={'translate(-50%, -50%)'}
          zIndex={'100'}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="primary.500"
            size="xl"
          />
        </Flex>
      ) : (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          // onNodesChange={onNodesChange}
          // onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          fitView
        ></ReactFlow>
      )}
      {/* floating action button right bottom corner */}
      <Flex position={'fixed'} bottom={'5%'} right={'5%'}>
        <Tooltip
          label={
            disbaleBtn ? '"Add" node shoould not be present in the flow' : ''
          }
          hasArrow
          placement="top"
        >
          <Button
            leftIcon={<MdOutlineRocketLaunch size={'40px'} />}
            colorScheme="primary"
            variant="solid"
            borderRadius={'full'}
            size="lg"
            boxShadow={'dark-lg'}
            height={'80px'}
            isDisabled={disbaleBtn || isLoading}
            verticalAlign={'middle'}
            onClick={() => {
              console.log('deploy bot');
              setIsLoading.on();
              let response = setFlowElements(botId, { nodes, edges });
              console.log(nodes);
              if (!response) {
                toast({
                  title: 'Error',
                  description: 'Something went wrong',
                  position: 'bottom-right',
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                });
                setIsLoading.off();
              } else {
                toast({
                  title: 'Success',
                  description: 'Bot deployed successfully',
                  position: 'bottom-right',
                  status: 'success',
                  duration: 1000,
                  isClosable: true,
                });
                setIsLoading.off();
                // setTimeout(() => {
                //   navigate(`/bots`);
                // }, 1000);
              }
            }}
          >
            <FormattedMessage id="publishBot" />
          </Button>
        </Tooltip>
      </Flex>

      <Popover
        isOpen={isOpen}
        onClose={onClose}
        closeOnBlur={true}
        closeOnEsc={true}
      >
        <PopoverContent
          position="absolute"
          left={menuAnchorEl?.x}
          top={menuAnchorEl?.y}
          width="250px"
          height="auto"
          bg="gray.100"
          border="1px"
          borderColor="gray.200"
          borderRadius="3xl"
          boxShadow="md"
          _focus={{ outline: 'none' }}
        >
          <PopoverBody>
            <List
              spacing={2}
              borderRadius="xl"
              fontFamily={'arial'}
              fontWeight="medium"
            >
              <ListItem
                verticalAlign={'middle'}
                textAlign={'center'}
                p={2}
                borderRadius={'lg'}
                _hover={{ bg: 'gray.200' }}
                onClick={openPlayModal}
              >
                <Flex direction="row" verticalAlign={'middle'} gap={2}>
                  <ListIcon
                    as={MdAudiotrack}
                    color="primary.500"
                    fontSize={25}
                  />
                  <FormattedMessage id="playAudio" />
                </Flex>
              </ListItem>
              <ListItem
                verticalAlign={'middle'}
                textAlign={'center'}
                p={2}
                borderRadius={'lg'}
                _hover={{ bg: 'gray.200' }}
                onClick={openSpeakModal}
              >
                <Flex direction="row" verticalAlign={'middle'} gap={2}>
                  <ListIcon as={TbAbc} color="primary.500" fontSize={25} />
                  <FormattedMessage id="speakText" />
                </Flex>
              </ListItem>

              <ListItem
                verticalAlign={'middle'}
                textAlign={'center'}
                p={2}
                borderRadius={'lg'}
                _hover={{ bg: 'gray.200' }}
                onClick={openProcessorModal}
                _disabled={{
                  pointerEvents: 'none',
                  opacity: 0.4,
                }}
                disabled={
                  (
                    nodes.find(n => n.id === data.parentNodeId) || {
                      type: 'valid',
                    }
                  ).type === 'nlp'
                }
              >
                <Flex direction="row" verticalAlign={'middle'} gap={2}>
                  <ListIcon as={FaRobot} color="primary.500" fontSize={25} />
                  <FormattedMessage id="processSpeech" />
                </Flex>
              </ListItem>
              <ListItem
                verticalAlign={'middle'}
                textAlign={'center'}
                p={2}
                borderRadius={'lg'}
                _hover={{ bg: 'gray.200' }}
                onClick={() => {
                  openWebhookModal();
                }}
              >
                <Flex direction="row" verticalAlign={'middle'} gap={2}>
                  <ListIcon as={MdWebhook} color="primary.500" fontSize={25} />
                  <FormattedMessage id="Webhook" />
                </Flex>
              </ListItem>
              {/* <ListItem
                verticalAlign={'middle'}
                textAlign={'center'}
                p={2}
                borderRadius={'lg'}
                _hover={{ bg: 'gray.200' }}
                onClick={() => {
                  onGoBackOpen();
                }}
              >
                <Flex direction="row" verticalAlign={'middle'} gap={2}>
                  <ListIcon
                    as={TiArrowBack}
                    color="primary.500"
                    fontSize={25}
                  />
                  <FormattedMessage id="Go Back" />
                </Flex>
              </ListItem> */}

              <ListItem
                verticalAlign={'middle'}
                textAlign={'center'}
                p={2}
                borderRadius={'lg'}
                _hover={{ bg: 'gray.200' }}
                onClick={openTransferModal}
              >
                <Flex direction="row" verticalAlign={'middle'} gap={2}>
                  <ListIcon
                    as={VscCallOutgoing}
                    color="primary.500"
                    fontSize={25}
                  />
                  <FormattedMessage id="transferCall" />
                </Flex>
              </ListItem>
              <ListItem
                verticalAlign={'middle'}
                textAlign={'center'}
                p={2}
                borderRadius={'lg'}
                _hover={{ bg: 'gray.200' }}
                onClick={() => {
                  handleAddNode('terminate');
                  onClose();
                }}
              >
                <Flex direction="row" verticalAlign={'middle'} gap={2}>
                  <ListIcon as={MdCallEnd} color="primary.500" fontSize={25} />
                  <FormattedMessage id="hangupCall" />
                </Flex>
              </ListItem>
            </List>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <PlayModalComponent />
      <SpeakModalComponent />
      <ProcessorModalComponent />
      <TransferModalComponent />
      <WebhookModalComponent />
      <GoBackModal
        onClose={onGoBackClose}
        isOpen={isGoBackOpen}
        data={data}
        nodes={nodes}
      />
    </div>
  );
}
