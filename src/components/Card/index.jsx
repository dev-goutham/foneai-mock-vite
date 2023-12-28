import {
  Box,
  Divider,
  Image,
  Stack,
  useBoolean,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import React from 'react';
import { MdFemale, MdMale, MdArrowForward } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export function BotCard({ bot }) {
  const [hovered, setHovered] = useBoolean();
  let { _id, name, description, language, accent, gender, trained, deployed } =
    bot;
  let navigate = useNavigate();

  const expand = lang => {
    switch (lang) {
      case 'en':
        return 'English';
      case 'es':
        return 'Spanish';
      default:
        return 'English';
    }
  };

  return (
    <Stack
      w="100%"
      minH={'200px'}
      maxH={'300px'}
      height={'25vh'}
      width={'16vw'}
      minW={'200px'}
      bg={deployed && trained ? 'whiteAlpha.900' : 'red.100'}
      borderRadius="30"
      boxShadow="lg"
      p="6"
      onDoubleClick={() => {
        console.log(_id);
        navigate(`/bots/${_id}`);
      }}
      align="left"
      justify="start"
      direction="column"
      onMouseEnter={setHovered.toggle}
      onMouseLeave={setHovered.toggle}
      _hover={{
        boxShadow: '2xl',
        transform: 'translateY(-5px)',
        transition: 'all 150ms ease-in',
      }}
    >
      <Flex
        direction="row"
        spacing={6}
        align="flex-start"
        justify="space-between"
        minBlockSize={12}
      >
        <Box
          fontWeight="bold"
          as="h2"
          fontSize={'2xl'}
          lineHeight="1"
          noOfLines={2}
          minWidth={'60%'}
          py={2}
        >
          {name}
        </Box>
        {hovered && (
          <IconButton
            icon={<MdArrowForward color="white" />}
            colorScheme="blue"
            textAlign={'right'}
            right={'0'}
            variant="filled"
            backgroundColor={'blue.500'}
            color={'white'}
            fontSize={'md'}
            borderRadius="15px"
            onClick={() => {
              console.log(_id);
              navigate(`/bots/${_id}`);
            }}
          />
        )}
      </Flex>
      <Box
        pr={2}
        textAlign="left"
        fontWeight="normal"
        fontSize={'md'}
        lineHeight="tight"
        noOfLines={3}
        height={'50%'}
      >
        {description}
      </Box>
      <Divider pt={3} color={'gray.400'} />

      <Stack direction="row" spacing={6} align="center" mb={'5px'}>
        <Box
          fontWeight="bold"
          as="h2"
          lineHeight="tight"
          ml={'1rem'}
          mr={'auto'}
        >
          {gender === 'm' ? (
            <MdMale fontSize={'35px'} color="blue" />
          ) : (
            <MdFemale fontSize={'35px'} color="#E75480" />
          )}
        </Box>
        <Flex
          direction="row"
          as="p"
          spacing={2}
          gap={1}
          lineHeight="tight"
          ml={'auto'}
          mr={'1rem'}
          verticalAlign={'middle'}
          backgroundColor={'blue.100'}
          padding={1}
          minW={'60px'}
          borderRadius={'full'}
        >
          <Image
            boxSize="1.5rem"
            borderRadius="full"
            src={`${process.env.PUBLIC_URL}/${accent?.toLowerCase()}.svg`}
            alt={accent}
          />
          {language?.toUpperCase()}
        </Flex>
      </Stack>
    </Stack>
  );
}

export * from './WebhookCard';
export * from './IntentCard';
