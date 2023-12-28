import {
  CloseButton,
  HStack,
  Icon,
  StackDivider,
  Text,
  Box,
  useBoolean,
} from '@chakra-ui/react';
import { FaRecycle } from 'react-icons/fa';
import { TiFlowChildren } from 'react-icons/ti';
import { MdAudiotrack } from 'react-icons/md';

import useStore from '../store';
import { shallow } from 'zustand/shallow';

const selector = state => ({
  intents: state.intents,
});

export function SelectedIntentCard({ unCheckNlp, intentName }) {
  const [hovered, setHovered] = useBoolean(false);
  const { intents } = useStore(selector, shallow);
  console.log('intentName', intentName);
  // let intentType = 'flowing'
  console.log('intents', intents);
  const intentType =
    intentName === 'CUSTOM_FALLBACK'
      ? 'flowing'
      : intents.find(intent => intent.intentName === intentName)?.intentType;
  return (
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
      onMouseEnter={setHovered.on}
      onMouseLeave={setHovered.off}
    >
      <Icon
        as={intentType === 'flowing' ? TiFlowChildren : FaRecycle}
        color={intentType === 'flowing' ? 'green' : 'red'}
      />
      <Text
        w="85%"
        overflow={'hidden'}
        noOfLines={1}
        textOverflow={'ellipsis'}
        whiteSpace={'nowrap'}
      >
        {intentName}
      </Text>
      {hovered && (
        <Box w="10px" onClick={() => unCheckNlp(intentName)}>
          <CloseButton color="red" ml="-10px" />
        </Box>
      )}
    </HStack>
  );
}

export function SelectedWebhookCard({ unCheckWebhook, webhookName }) {
  const [hovered, setHovered] = useBoolean(false);
  // let intentType = 'flowing'
  return (
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
      onMouseEnter={setHovered.on}
      onMouseLeave={setHovered.off}
    >
      <Text
        w="85%"
        overflow={'hidden'}
        noOfLines={1}
        textOverflow={'ellipsis'}
        whiteSpace={'nowrap'}
      >
        {webhookName}
      </Text>
      {hovered && (
        <Box w="10px" onClick={() => unCheckWebhook(webhookName)}>
          <CloseButton color="red" ml="-10px" />
        </Box>
      )}
    </HStack>
  );
}

export function SelectedAudioFileCard({ audioFileName, unCheckPlay }) {
  const [hovered, setHovered] = useBoolean(false);
  return (
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
      onMouseEnter={setHovered.on}
      onMouseLeave={setHovered.off}
    >
      <Icon as={MdAudiotrack} color={'blue.500'} />
      <Text
        w="85%"
        overflow={'hidden'}
        noOfLines={1}
        textOverflow={'ellipsis'}
        whiteSpace={'nowrap'}
      >
        {audioFileName}
      </Text>
      {hovered && (
        <Box w="10px" onClick={() => unCheckPlay(audioFileName)}>
          <CloseButton color="red" ml="-10px" />
        </Box>
      )}
    </HStack>
  );
}
