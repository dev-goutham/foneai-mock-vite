import {
  Spacer,
  Grid,
  Text,
  Divider,
  Flex,
  Button,
  Skeleton,
  Spinner,
  Box,
  Center,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { BotCard } from '../components/Card';
import { IoIosAddCircle } from 'react-icons/io';
import { getBots, getIntents } from '../api';
import { FormattedMessage } from 'react-intl';
import { useCreateBotModalHook } from '../hooks/useCreateBotModalHook';
import { usePagination } from '../hooks/usePagination';
import { Pagination } from '../components/Pagination';
import Header from '../components/AppLayout/Header';
import Body from '../components/AppLayout/Body';
import PaginationContainer from '../components/AppLayout/PaginationContainer';

export default function Bots() {
  const [bots, setBots] = React.useState([]);
  const [getBotsLoading, setGetBotsLoading] = useState(false);

  const { onOpen, CreateBotModalComponent } = useCreateBotModalHook();

  const { currentPage, handlePageChange, isDisabled, pages, pagesCount } =
    usePagination({
      total: bots.length,
      pageSize: 8,
      shouldNavigate: true,
    });

  useEffect(() => {
    setGetBotsLoading(true);
    getIntents('64b61202296ce1877b3827d5').then(res => {
      console.log(res);
    });
    getBots()
      .then(data => {
        setGetBotsLoading(false);
        setBots(data);
      })
      .catch(err => {
        setGetBotsLoading(false);
        alert(err);
      });
  }, []);

  return (
    <>
      <Header>
        <Center>
          <Text
            fontWeight="bold"
            fontSize="4xl"
            color="gray.700"
            textAlign="left"
          >
            {/* Bots */}
            <FormattedMessage id="bots" />
          </Text>
        </Center>
        <Spacer />
        {getBotsLoading ? (
          <Spinner
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.200"
            color="primary.500"
            size="lg"
          />
        ) : (
          bots?.length < 100 && (
            <Center>
              <Button
                leftIcon={<IoIosAddCircle />}
                verticalAlign="middle"
                colorScheme="primary"
                variant="solid"
                size="md"
                onClick={onOpen}
              >
                {/* Create Bot */}
                <FormattedMessage id="createBot" />
              </Button>
            </Center>
          )
        )}
      </Header>

      <Body>
        <Grid
          templateColumns="repeat(4, 4fr)"
          gap={8}
          overflow={'wrap'}
          justifyContent={'center'}
          mx={'auto'}
        >
          {getBotsLoading ? (
            <>
              <Skeleton
                minH={'200px'}
                maxH={'300px'}
                height={'25vh'}
                width={'16vw'}
                minW={'150px'}
                borderRadius={30}
              />
              <Skeleton
                minH={'200px'}
                maxH={'300px'}
                height={'25vh'}
                width={'16vw'}
                minW={'150px'}
                borderRadius={30}
              />
              <Skeleton
                minH={'200px'}
                maxH={'300px'}
                height={'25vh'}
                width={'16vw'}
                minW={'150px'}
                borderRadius={30}
              />
              <Skeleton
                minH={'200px'}
                maxH={'300px'}
                height={'25vh'}
                width={'16vw'}
                minW={'150px'}
                borderRadius={30}
              />
              <Skeleton
                minH={'200px'}
                maxH={'300px'}
                height={'25vh'}
                width={'16vw'}
                minW={'150px'}
                borderRadius={30}
              />
              <Skeleton
                minH={'200px'}
                maxH={'300px'}
                height={'25vh'}
                width={'16vw'}
                minW={'150px'}
                borderRadius={30}
              />
              <Skeleton
                minH={'200px'}
                maxH={'300px'}
                height={'25vh'}
                width={'16vw'}
                minW={'150px'}
                borderRadius={30}
              />
              <Skeleton
                minH={'200px'}
                maxH={'300px'}
                height={'25vh'}
                width={'16vw'}
                minW={'150px'}
                borderRadius={30}
              />
            </>
          ) : (
            Array.isArray(bots) &&
            [...bots].slice((currentPage - 1) * 8, currentPage * 8).map(bot => {
              return <BotCard key={bot._id} bot={bot} />;
            })
          )}
        </Grid>
      </Body>
      <PaginationContainer>
        <Pagination
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          isDisabled={isDisabled}
          pages={pages}
          pagesCount={pagesCount}
        />
      </PaginationContainer>
      <CreateBotModalComponent />
    </>
  );
}
