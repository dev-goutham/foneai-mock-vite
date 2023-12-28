import { Card, HStack, StackDivider, Text, Icon, Flex } from '@chakra-ui/react';
import { MdInfo, MdWarning } from 'react-icons/md';
import { FormattedMessage } from 'react-intl';

export function IntentStatus({ intentsTypeArray }) {
  function countsArray() {
    return intentsTypeArray.reduce(function (acc, curr) {
      if (acc[curr]) {
        acc[curr] = ++acc[curr];
      } else {
        acc[curr] = 1;
      }
      return acc;
    }, {});
  }
  if (intentsTypeArray?.length <= 1) {
    return (
      <Card background="orange.200" borderRadius="10px" alignItems="center">
        <Icon as={MdWarning} color="orange.800" fontSize="40px" />
        <Text
          fontSize={'md'}
          fontWeight={'normal'}
          color={'orange.800'}
          textAlign={'center'}
        >
          <FormattedMessage id="minIntents" />
        </Text>
      </Card>
    );
  } else if (!intentsTypeArray.includes('flowing')) {
    return (
      <Card background="orange.200" borderRadius="10px" alignItems="center">
        <Icon as={MdWarning} color="orange.800" fontSize="40px" />
        <Text
          fontSize={'md'}
          fontWeight={'normal'}
          color={'orange.800'}
          textAlign={'center'}
        >
          <FormattedMessage id="atleastOneFlowingIntent" />
        </Text>
      </Card>
    );
  } else {
    let { flowing, ebbing } = countsArray();
    return (
      <HStack
        divider={<StackDivider borderColor="gray.400" />}
        pl="20px"
        spacing={'10px'}
        align={'center'}
      >
        <Text
          fontSize={'md'}
          fontWeight={'normal'}
          color={'blue.500'}
          textAlign={'center'}
          maxLength={200}
        >
          <FormattedMessage id="flowingIntents" />
          <br /> <b>{flowing}</b>
        </Text>
        <Text
          fontSize={'md'}
          fontWeight={'normal'}
          color={'blue.500'}
          textAlign={'center'}
          maxLength={200}
        >
          <FormattedMessage id="ebbingIntents" />
          <br /> <b>{ebbing || 0}</b>
        </Text>
      </HStack>
    );
  }
}

export function PlayStatus({ audioFilesArray }) {
  return audioFilesArray?.length < 1 ? (
    <Card
      background="orange.200"
      p={'10px'}
      borderRadius="10px"
      alignItems="center"
    >
      <Flex alignItems={'center'}>
        <Icon as={MdWarning} color="orange.800" fontSize="40px" />
        <Text
          fontSize={'md'}
          fontWeight={'normal'}
          color={'orange.800'}
          textAlign={'center'}
        >
          <FormattedMessage id="minAudioFiles" />
        </Text>
      </Flex>
    </Card>
  ) : (
    <Card
      background="blue.200"
      borderRadius="10px"
      alignItems="center"
      p={'10px'}
    >
      <Flex alignItems={'center'}>
        <Icon as={MdInfo} color="blue.800" fontSize="40px" />
        <Text
          fontSize={'md'}
          fontWeight={'normal'}
          color={'blue.800'}
          textAlign={'center'}
        >
          <FormattedMessage id="maxAudioFiles" />
        </Text>
      </Flex>
    </Card>
  );
}
