import {
  Box,
  Button,
  IconButton,
  Stack,
  useBoolean,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { MdEdit } from 'react-icons/md';
import { WebhookModal } from '../WebhookModal';
import { AiOutlineArrowRight } from 'react-icons/ai';

export function WebhookCard({ webhook }) {
  const [hovered, setHovered] = useBoolean();
  let {
    _id,
    webhookName: name,
    webhookDescription: description,
    // webhookType,
  } = webhook;
  const {
    isOpen: isUpdateWebhookOpen,
    onOpen: onUpdateWebhookOpen,
    onClose: onUpdateWebhookClose,
  } = useDisclosure();

  return (
    <>
      <Stack
        // w="100%"
        // minH={'210px'}
        // width={'16vw'}
        // minW={'210px'}
        // maxH={'300px'}
        // height={'25vh'}
        // bg={'whiteAlpha.900'}
        // borderRadius="30"
        // boxShadow="lg"
        // p="6"
        // align="left"
        // justify="start"
        // direction="column"
        // onMouseEnter={setHovered.toggle}
        // onMouseLeave={setHovered.toggle}
        w="100%"
        minH={'200px'}
        width={'12vw'}
        minW={'150px'}
        maxH={'200px'}
        height={'14vh'}
        bg={'whiteAlpha.900'}
        borderRadius="30"
        boxShadow="lg"
        p="6"
        align="left"
        justify="start"
        direction="column"
        onMouseEnter={setHovered.toggle}
        onMouseLeave={setHovered.toggle}
        _hover={{
          boxShadow: '2xl',
          transition: 'all 150ms ease-in',
        }}
        onDoubleClick={() => {
          onUpdateWebhookOpen();
        }}
      >
        <Stack
          direction="row"
          position={'relative'}
          spacing={6}
          align="center"
          minBlockSize={12}
        >
          <Box
            fontWeight="bold"
            as="h2"
            fontSize={'2xl'}
            lineHeight="tight"
            noOfLines={2}
            minWidth={'60%'}
          >
            {name}
          </Box>
          {hovered && (
            <IconButton
              icon={<AiOutlineArrowRight color="white" />}
              colorScheme="blue"
              textAlign={'right'}
              position={'absolute'}
              top={0}
              right={0}
              // right={'-2'}
              variant="filled"
              backgroundColor={'blue.500'}
              color={'white'}
              fontSize={'md'}
              borderRadius={'15px'}
              onClick={() => {
                onUpdateWebhookOpen();
              }}
            />
          )}
        </Stack>
        <Box
          pr={2}
          mt={4}
          textAlign="left"
          fontWeight="normal"
          fontSize={'md'}
          lineHeight="1.6"
          noOfLines={3}
          height={'50%'}
        >
          {description}
        </Box>
        {/* <Divider pt={3} color={'gray.400'} /> */}

        {/* <Stack direction="row" spacing={6} align="center" mb={'5px'}>
          <Stack
            direction="row"
            fontWeight="bold"
            as="h2"
            spacing={0}
            fontSize={'xl'}
            lineHeight="tight"
            ml={'auto'}
            mr={'1rem'}
          >
            <Tag size={'md'} variant="subtle" colorScheme="blue">
              <TagLeftIcon boxSize="12px" as={FaServer} />
              <TagLabel>{type?.toUpperCase()}</TagLabel>
            </Tag>
          </Stack>
        </Stack> */}
      </Stack>
      <WebhookModal
        webhook={webhook}
        isOpen={isUpdateWebhookOpen}
        onClose={onUpdateWebhookClose}
      />
    </>
  );
}
