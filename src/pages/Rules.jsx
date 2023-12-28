import {
  Flex,
  Spacer,
  Button,
  Grid,
  Divider,
  useBoolean,
  Stack,
  IconButton,
} from '@chakra-ui/react';
import { Box, Text, Center } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { Skeleton } from '@chakra-ui/react';

import { FormattedMessage } from 'react-intl';
import { useRulesModal } from '../components/useRulesModal';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Header from '../components/AppLayout/Header';
import Body from '../components/AppLayout/Body';
import { MdArrowForward } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';

export default function Rules() {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const { RulesModal, onRulesModalOpen } = useRulesModal();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { botId } = useParams();

  useEffect(() => {
    const to = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(to);
  }, []);

  return (
    <>
      <Header>
        <Center>
          <Text
            fontWeight="bold"
            fontSize="30px"
            color="gray.500"
            textAlign="left"
          >
            <FormattedMessage id="rules" />
          </Text>
        </Center>
        <Spacer />
        <Center>
          <Flex direction="row" gap={1}>
            <Button
              leftIcon={<IoIosAddCircle />}
              colorScheme="primary"
              variant="solid"
              size="md"
              minWidth={'170px'}
              onClick={onRulesModalOpen}
            >
              <FormattedMessage id="createRule" />
            </Button>
          </Flex>
        </Center>
      </Header>

      <Body>
        <>
          <Grid
            templateColumns={'repeat(5, 1fr)'}
            gap={8}
            mb={8}
            overflow={'wrap'}
            justifyContent={'stretch'}
            w="full"
          >
            {loading ? (
              <>
                {new Array(10).fill(0).map((_, i) => (
                  <Skeleton
                    w="100%"
                    minH={'200px'}
                    width={'12vw'}
                    minW={'150px'}
                    maxH={'200px'}
                    height={'14vh'}
                    borderRadius={30}
                    key={i}
                  />
                ))}
              </>
            ) : (
              <>
                {['rule 1', 'rule 2', 'rule 3', 'rule 4', 'rule 5'].map(
                  item => (
                    <Box>
                      <RuleCard name={item} />
                    </Box>
                  )
                )}
              </>
            )}
          </Grid>
        </>
      </Body>
      <Flex position={'fixed'} bottom={'5%'} right={'5%'}>
        <Button
          rightIcon={<MdArrowForward size={'30px'} />}
          colorScheme="blue"
          variant="solid"
          borderRadius={'full'}
          size="lg"
          boxShadow={'dark-lg'}
          height={'80px'}
          verticalAlign={'middle'}
          onClick={() => navigate(`/bots/${botId}/flow`)}
        >
          <FormattedMessage id="next" />
        </Button>
      </Flex>
      <RulesModal />
    </>
  );
}

const RuleCard = ({ name }) => {
  const [hovered, setHovered] = useBoolean();
  const { onRulesModalOpen, RulesModal } = useRulesModal({
    ruleName: name,
  });

  return (
    <>
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
          onRulesModalOpen();
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
              icon={<AiOutlineArrowRight color="white" />}
              colorScheme="blue"
              textAlign={'right'}
              // right={'-2'}
              variant="filled"
              backgroundColor={'blue.500'}
              color={'white'}
              fontSize={'md'}
              borderRadius={'15px'}
              onClick={() => {
                onRulesModalOpen();
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
          {/* {name} */}
        </Box>
      </Stack>
      <RulesModal />
    </>
  );
};
