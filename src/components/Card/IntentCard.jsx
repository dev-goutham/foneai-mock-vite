import { Box, Stack, useBoolean, IconButton } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';

export function IntentCard({
  intent,
  updateIntent,
  Icon = <AiOutlineArrowRight color="white" />,
}) {
  const [hovered, setHovered] = useBoolean();
  let {
    _id,
    intentName: name,
    intentDescription: description,
    intentType: type,
  } = intent;
  return (
    <Stack
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
      onDoubleClick={() => {
        updateIntent(intent);
      }}
      _hover={{
        boxShadow: '2xl',
        transition: 'all 150ms ease-in',
      }}
    >
      <Stack direction="row" spacing={6} align="center" minBlockSize={12}>
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
            icon={Icon}
            colorScheme="blue"
            textAlign={'right'}
            // right={'-2'}
            variant="filled"
            backgroundColor={'blue.500'}
            color={'white'}
            fontSize={'md'}
            borderRadius={'15px'}
            onClick={() => {
              updateIntent(intent);
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
    </Stack>
  );
}
