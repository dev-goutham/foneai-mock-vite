import React, { useEffect, useState } from 'react';
import {
  Flex,
  Text,
  Spacer,
  Button,
  Divider,
  Grid,
  useDisclosure,
  Center,
  Skeleton,
} from '@chakra-ui/react';
import Header from '../components/AppLayout/Header';

import { useNavigate, useParams } from 'react-router-dom';

import { MdArrowForward } from 'react-icons/md';
import { IoIosAddCircle } from 'react-icons/io';

import { WebhookCard } from '../components/Card';
import { WebhookModal } from '../components/WebhookModal';
import Body from '../components/AppLayout/Body';
import { getWebhooks } from '../api';
import { FormattedMessage } from 'react-intl';

export default function Webhooks() {
  const { botId } = useParams();
  const navigate = useNavigate();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [sampleWebhooks, setSampleWebhooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getWebhooks().then(res => {
      setSampleWebhooks(res);
      setLoading(false);
    });
  }, []);

  return (
    <React.Fragment>
      <Header>
        <Center>
          <Text
            fontWeight="bold"
            fontSize="30px"
            color="gray.500"
            textAlign="left"
          >
            <FormattedMessage id="webhooks" />
          </Text>
        </Center>
        <Spacer />
        <Center>
          <Button
            leftIcon={<IoIosAddCircle />}
            colorScheme="blue"
            variant="solid"
            size="md"
            onClick={onOpen}
          >
            <FormattedMessage id="createWebhook" />
          </Button>
        </Center>
      </Header>

      <Body>
        <Grid
          templateColumns={'repeat(5, 1fr)'}
          gap={8}
          mb={8}
          overflow={'wrap'}
          justifyContent={'stretch'}
          w="full"
        >
          {loading
            ? new Array(10)
                .fill(0)
                .map((_, index) => (
                  <Skeleton
                    w="100%"
                    minH={'200px'}
                    width={'12vw'}
                    minW={'150px'}
                    maxH={'200px'}
                    height={'14vh'}
                    borderRadius={30}
                    key={index}
                  />
                ))
            : sampleWebhooks.map((webhook, index) => (
                <WebhookCard
                  key={index}
                  webhook={webhook}
                  // updateWebhook={updateWebHook}
                />
              ))}
        </Grid>
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
      <WebhookModal isOpen={isOpen} onClose={onClose} />
    </React.Fragment>
  );
}
