import { Box, Stack, StackDivider, Text } from '@chakra-ui/react';
import React from 'react';
import { PiBrain } from 'react-icons/pi';
import { MdSettings } from 'react-icons/md';
import { FormattedMessage } from 'react-intl';
import { Link, useLocation, useNavigation } from 'react-router-dom';

export function TrainNavigation() {
  const { pathname } = useLocation();

  return (
    <Box
      height={'100vh'}
      display={'flex'}
      alignItems={'center'}
      position={'fixed'}
      left={0}
    >
      <Stack
        bg={'primary.200'}
        height={'max-content'}
        borderRightRadius={'12px'}
        divider={<StackDivider margin={'0px'} />}
        spacing={0}
      >
        <Link to={'../intents'}>
          <Box p={2}>
            <Stack
              p={6}
              rounded="12px"
              bg={
                pathname.includes('/train/intents')
                  ? 'primary.400'
                  : 'transparent'
              }
              fontWeight={
                pathname.includes('/train/intents') ? 'bold' : 'normal'
              }
              color={
                pathname.includes('/train/intents') ? 'gray.100' : 'gray.600'
              }
              alignItems={'center'}
            >
              <PiBrain size={32} />
              <Text fontSize="sm">
                <FormattedMessage id="intents" />
              </Text>
            </Stack>
          </Box>
        </Link>
        {/* <Link to={'../entities'}>
          <Box p={2}>
            <Stack
              p={6}
              rounded="12px"
              bg={
                pathname.includes('/train/entities')
                  ? 'primary.600'
                  : 'transparent'
              }
              color={
                pathname.includes('/train/entities') ? 'gray.100' : 'gray.600'
              }
              alignItems={'center'}
            >
              <BsFillStarFill size={24} />
              <Text fontSize="sm">
                <FormattedMessage id="entities" />
              </Text>
            </Stack>
          </Box>
        </Link> */}
        <Link to={'../settings'}>
          <Box p={2}>
            <Stack
              p={6}
              rounded="12px"
              bg={
                pathname.includes('/train/settings')
                  ? 'primary.400'
                  : 'transparent'
              }
              color={
                pathname.includes('/train/settings') ? 'gray.100' : 'gray.600'
              }
              fontWeight={
                pathname.includes('/train/settings') ? 'bold' : 'normal'
              }
              size ={
                pathname.includes('/train/settings') ? 'lg' : 'md'
              }
              alignItems={'center'}
            >
              <MdSettings size={32} />
              <Text fontSize="sm">
                <FormattedMessage id="settings" />
              </Text>
            </Stack>
          </Box>
        </Link>
      </Stack>
    </Box>
  );
}
