import { Button, Center, Flex, Spacer, Spinner, Text } from '@chakra-ui/react';
import React from 'react';
import { FaUserPlus } from 'react-icons/fa';
import TableSearch from '../TableComponent/TableSearch';
import TableFilter from '../TableComponent/TableFilter';
import { FormattedMessage } from 'react-intl';

export function UsersTableHeader({ getUsersLoading, onCreateUserOpen }) {
  return (
    <>
      <Center>
        <Text
          fontWeight="bold"
          fontSize="4xl"
          color="gray.700"
          textAlign="left"
        >
          <FormattedMessage id="users" />
        </Text>
      </Center>
      <Spacer />
      <Center>
        <Flex gap={4} justifyContent={'end'} flex={1}>
          <TableFilter />
          <TableSearch />
          {getUsersLoading ? (
            <Spinner
              thickness="2px"
              speed="0.65s"
              emptyColor="gray.200"
              color="primary.500"
              size="lg"
            />
          ) : (
            <Button
              leftIcon={<FaUserPlus />}
              verticalAlign="middle"
              colorScheme="primary"
              variant="solid"
              size="md"
              onClick={onCreateUserOpen}
            >
              <FormattedMessage id="createUser" />
            </Button>
          )}
        </Flex>
      </Center>
    </>
  );
}
