import { IconButton, Stack, Text } from '@chakra-ui/react';
import { FaCodeBranch, FaFlagCheckered, FaRobot } from 'react-icons/fa';
import { Handle, Position, NodeToolbar } from 'reactflow';
import {
  MdAdd,
  MdAudiotrack,
  MdCallEnd,
  MdSave,
  MdVoicemail,
  MdWebhook,
} from 'react-icons/md';
import { VscCallOutgoing } from 'react-icons/vsc';
import { TbAbc } from 'react-icons/tb';
import { shallow } from 'zustand/shallow';
import useStore from '../store';

import { useSpeakModalHook } from '../hooks/useSpeakModalHook';
import { useTransferModalHook } from '../hooks/useTransferModalHook';
import { usePlayModalHook } from '../hooks/usePlayModalHook';
import { useProcessorModalHook } from '../hooks/useProcessorModalHook';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useWebhookModalHook } from '../hooks/useWebhookModalHook';

const selector = state => ({
  updatePlayNode: state.updatePlayNode,
  removePlayNode: state.removePlayNode,
  updateSpeakNode: state.updateSpeakNode,
  removeSpeakNode: state.removeSpeakNode,
  updateProcessorNode: state.updateProcessorNode,
  removeProcessorNode: state.removeProcessorNode,
  removeTerminateNode: state.removeTerminateNode,
  updateTransferNode: state.updateTransferNode,
  removeTransferNode: state.removeTransferNode,
  setMenuAnchorEl: state.setMenuAnchorEl,
  updateWebhookNode: state.updateWebhookNode,
  removeWebhookNode: state.removeWebhookNode,
});

export function NlpIcon({ data }) {
  const { updateProcessorNode, removeProcessorNode } = useStore(
    selector,
    shallow
  );
  const {
    onOpen: openProcessorModal,
    onClose: closeProcessorModal,
    ProcessorModalComponent,
  } = useProcessorModalHook(
    updateProcessorNode,
    <FormattedMessage id="updateNode" />,
    data,
    removeProcessorNode
  );
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <Stack
        direction="column"
        justify="center"
        align="flex-start"
        borderRadius="20px"
        spacing="10px"
        boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
        onDoubleClick={openProcessorModal}
      >
        <Stack
          padding="2px"
          direction="row"
          justify="center"
          borderRadius="10px"
          align="center"
          spacing="10px"
          overflow="hidden"
          minW="40px"
          minH="40px"
          background="teal.400"
        >
          <FaRobot color="white" />
        </Stack>
      </Stack>
      <Handle type="source" position={Position.Right} />
      <ProcessorModalComponent />
    </>
  );
}

export function BranchIcon() {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <Stack
        direction="column"
        justify="center"
        align="flex-start"
        borderRadius="20px"
        spacing="10px"
        boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      >
        <Stack
          padding="2px"
          direction="row"
          justify="center"
          borderRadius="10px"
          align="center"
          spacing="10px"
          overflow="hidden"
          minW="40px"
          minH="40px"
          background="teal.400"
        >
          <FaCodeBranch color="white" style={{ rotate: '90deg' }} />
        </Stack>
      </Stack>
      <Handle type="source" position={Position.Right} />
    </>
  );
}

export function TerminateIcon({ data }) {
  const { removeTerminateNode } = useStore(selector, shallow);
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <Stack
        onDoubleClick={() => removeTerminateNode(data)}
        direction="column"
        justify="center"
        align="flex-start"
        borderRadius="20px"
        spacing="10px"
        boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      >
        <Stack
          padding="2px"
          direction="row"
          justify="center"
          borderRadius="10px"
          align="center"
          spacing="10px"
          overflow="hidden"
          minW="40px"
          minH="40px"
          background="red.400"
        >
          <MdCallEnd color="white" />
        </Stack>
      </Stack>
    </>
  );
}

export function SaveIcon() {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <Stack
        direction="column"
        justify="center"
        align="flex-start"
        borderRadius="20px"
        spacing="10px"
        boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      >
        <Stack
          padding="2px"
          direction="row"
          justify="center"
          borderRadius="10px"
          align="center"
          spacing="10px"
          overflow="hidden"
          minW="40px"
          minH="40px"
          background="yellow.400"
        >
          <MdSave color="white" />
        </Stack>
      </Stack>
      <Handle type="source" position={Position.Right} />
    </>
  );
}

export function AddIcon({ data }) {
  const { setMenuAnchorEl } = useStore(selector, shallow);
  return (
    <React.Fragment>
      <Handle type="target" position={Position.Left} />
      <IconButton
        size={'80px'}
        border="2px"
        borderColor={'blue.600'}
        boxShadow="md"
        aria-label="Add"
        icon={<MdAdd />}
        borderRadius="full"
        variant="outline"
        onClick={e => {
          setMenuAnchorEl(e, data);
        }}
      />
    </React.Fragment>
  );
}

export function StartIcon() {
  return (
    <>
      <Stack
        direction="column"
        justify="center"
        align="flex-start"
        borderRadius="9999px"
        spacing="6px"
        boxShadow="0px 0px 2px 2px rgba(0, 0, 255, 0.15)"
      >
        <Stack
          padding="2px"
          direction="row"
          justify="center"
          borderRadius="9999px"
          align="center"
          spacing="10px"
          overflow="hidden"
          minW="40px"
          minH="40px"
          backgroundColor={'white'}
        >
          <FaFlagCheckered color="black" />
        </Stack>
      </Stack>
      <Handle type="source" position={Position.Right} />
    </>
  );
}

export function PlayIcon({ data }) {
  const { updatePlayNode, removePlayNode } = useStore(selector, shallow);
  const {
    onOpen: openPlayModal,
    onClose: closePlayModal,
    PlayModalComponent,
  } = usePlayModalHook(
    updatePlayNode,
    <FormattedMessage id="updateNode" />,
    data,
    removePlayNode
  );
  return (
    <>
      <Stack
        direction="column"
        justify="center"
        align="center"
        spacing="5px"
        marginBottom={'5px'}
        onDoubleClick={openPlayModal}
      >
        <Handle
          type="target"
          position={Position.Left}
          style={{ top: '25px', left: '15px' }}
        />
        <Stack
          padding="2px"
          direction="row"
          justify="center"
          borderRadius="10px"
          align="center"
          spacing="10px"
          overflow="hidden"
          minW="40px"
          minH="40px"
          background="blue.400"
          boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
        >
          <MdAudiotrack color="white" />
        </Stack>

        <Handle
          type="source"
          position={Position.Right}
          style={{ top: '20px', right: '14px' }}
        />
      </Stack>
      <Stack
        p={0.5}
        borderRadius="5"
        direction="row"
        justify="center"
        align="flex-start"
        spacing="10px"
        overflow="hidden"
        borderColor="blackAlpha.200"
        borderWidth={'1px'}
        width={'75px'}
      >
        <Text
          fontFamily="Inter"
          lineHeight="1.33"
          fontWeight="semibold"
          fontSize="7px"
          overflowX={'wrap'}
          overflowWrap={'wrap'}
          color="teal.800"
          textAlign="center"
          noOfLines={3}
        >
          {data?.label}
        </Text>
      </Stack>
      <PlayModalComponent />
    </>
  );
}

export function SpeakIcon({ data }) {
  const { updateSpeakNode, removeSpeakNode } = useStore(selector, shallow);
  const {
    onOpen: openSpeakModal,
    onClose: closeSpeakModal,
    SpeakModalComponent,
  } = useSpeakModalHook(
    updateSpeakNode,
    <FormattedMessage id="updateNode" />,
    data,
    removeSpeakNode
  );
  return (
    <>
      <Stack
        direction="column"
        justify="center"
        align="center"
        spacing="5px"
        marginBottom={'5px'}
        onDoubleClick={openSpeakModal}
      >
        <Handle
          type="target"
          position={Position.Left}
          style={{ top: '25px', left: '15px' }}
        />
        <Stack
          padding="2px"
          direction="row"
          justify="center"
          borderRadius="10px"
          align="center"
          spacing="10px"
          overflow="hidden"
          minW="40px"
          minH="40px"
          background="blue.400"
          boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
        >
          <TbAbc color="white" />
        </Stack>

        <Handle
          type="source"
          position={Position.Right}
          style={{ top: '20px', right: '14px' }}
        />
      </Stack>
      <Stack
        p={0.5}
        borderRadius="5"
        direction="row"
        justify="center"
        align="flex-start"
        spacing="10px"
        overflow="hidden"
        borderColor="blackAlpha.200"
        borderWidth={'1px'}
        width={'75px'}
      >
        <Text
          fontFamily="Inter"
          lineHeight="1.33"
          fontWeight="semibold"
          fontSize="7px"
          overflowX={'wrap'}
          overflowWrap={'wrap'}
          color="blue.800 "
          textAlign="center"
          noOfLines={3}
        >
          {data?.label}
        </Text>
      </Stack>
      <SpeakModalComponent />
    </>
  );
}

export function TransferIcon({ data }) {
  const { updateTransferNode, removeTransferNode } = useStore(
    selector,
    shallow
  );
  // console.clear();
  console.log({ data });
  const {
    onOpen: openTransferModal,
    onClose: closeTransferModal,
    TransferModalComponent,
  } = useTransferModalHook(
    updateTransferNode,
    <FormattedMessage id="updateNode" />,
    data,
    removeTransferNode
  );

  return (
    <>
      <Stack
        direction="column"
        justify="center"
        align="center"
        spacing="5px"
        marginBottom={'5px'}
        onDoubleClick={openTransferModal}
      >
        <Handle
          type="target"
          position={Position.Left}
          style={{ top: '25px', left: '15px' }}
        />
        <Stack
          padding="2px"
          direction="row"
          justify="center"
          borderRadius="10px"
          align="center"
          spacing="10px"
          overflow="hidden"
          minW="40px"
          minH="40px"
          background="green"
          boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
        >
          <VscCallOutgoing color="white" />
        </Stack>
      </Stack>
      <Stack
        p={0.5}
        borderRadius="5"
        direction="row"
        justify="center"
        align="flex-start"
        spacing="10px"
        overflow="hidden"
        borderColor="blackAlpha.200"
        borderWidth={'1px'}
        width={'75px'}
      >
        <Text
          fontFamily="Inter"
          lineHeight="1.33"
          fontWeight="semibold"
          fontSize="7px"
          overflowX={'wrap'}
          overflowWrap={'wrap'}
          color="green.800"
          textAlign="center"
          noOfLines={3}
        >
          {data?.label}
        </Text>
      </Stack>
      <TransferModalComponent />
    </>
  );
}

export function WebhookIcon({ data }) {
  const { updateWebhookNode, removeWebhookNode } = useStore(selector, shallow);

  const { onOpen, WebhookModalComponent } = useWebhookModalHook(
    newWebhook => {
      updateWebhookNode(data, newWebhook);
    },
    data.webhook,
    () => {
      removeWebhookNode(data);
    }
  );

  return (
    <>
      <Stack
        direction="column"
        justify="center"
        align="center"
        spacing="5px"
        marginBottom={'5px'}
        onDoubleClick={() => {
          onOpen();
        }}
      >
        <Handle
          type="target"
          position={Position.Left}
          style={{ top: '25px', left: '15px' }}
        />
        <Stack
          padding="2px"
          direction="row"
          justify="center"
          borderRadius="10px"
          align="center"
          spacing="10px"
          overflow="hidden"
          minW="40px"
          minH="40px"
          background="purple.400"
          boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
        >
          <MdWebhook color="white" />
        </Stack>

        <Handle
          type="source"
          position={Position.Right}
          style={{ top: '20px', right: '14px' }}
        />
      </Stack>
      <Stack
        p={0.5}
        borderRadius="5"
        direction="row"
        justify="center"
        align="flex-start"
        spacing="10px"
        overflow="hidden"
        borderColor="blackAlpha.200"
        borderWidth={'1px'}
        width={'75px'}
      >
        <Text
          fontFamily="Inter"
          lineHeight="1.33"
          fontWeight="semibold"
          fontSize="7px"
          overflowX={'wrap'}
          overflowWrap={'wrap'}
          color="blue.800 "
          textAlign="center"
          noOfLines={3}
        >
          {data.webhook}
        </Text>
      </Stack>
      <WebhookModalComponent />
    </>
  );
}

export function VoicemailIcon() {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <Stack
        direction="column"
        justify="center"
        align="flex-start"
        borderRadius="20px"
        spacing="10px"
        boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      >
        <Stack
          padding="2px"
          direction="row"
          justify="center"
          borderRadius="10px"
          align="center"
          spacing="10px"
          overflow="hidden"
          minW="40px"
          minH="40px"
          background="purple.400"
        >
          <MdVoicemail color="white" />
        </Stack>
      </Stack>
      <Handle type="source" position={Position.Right} />
    </>
  );
}
