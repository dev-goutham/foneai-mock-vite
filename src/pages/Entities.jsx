import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useCheckbox,
  useDisclosure,
  chakra,
  Center,
  Grid,
  Stack,
  Skeleton,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { IntentCard } from '../components/Card';
import FloatingActionButton from '../components/FloatingActionButton';
import Header from '../components/AppLayout/Header';
import Body from '../components/AppLayout/Body';
import { getBuiltIn, getEntities, getGroups, getRoles } from '../api';
import { FormattedMessage } from 'react-intl';
import { usePagination } from '../hooks/usePagination';
import PaginationContainer from '../components/AppLayout/PaginationContainer';
import { Pagination } from '../components/Pagination';

const tabsArr = ['Entity', 'Roles', 'Group', 'Build-in'];

export function Entities() {
  const [selectedTab, setSelectedTab] = useState(0);
  const {
    isOpen: isEntitiesModalOpen,
    onOpen: onEntitiesModalOpen,
    onClose: onEntitiesModalClose,
  } = useDisclosure();

  return (
    <>
      <Tabs
        onChange={e => {
          setSelectedTab(e);
        }}
      >
        <Header>
          <TabList border={'none'}>
            <Tab
              _selected={{
                color: 'gray.100',
                bg: 'primary.500',
                fontWeight: 600,
              }}
              color="gray.500"
              textAlign="left"
              borderTopRadius={'8px'}
            >
              <Text fontWeight="bold" fontSize="30px">
                <FormattedMessage id="entities" />
              </Text>
            </Tab>
            <Tab
              _selected={{
                color: 'gray.100',
                bg: 'primary.500',
                fontWeight: 600,
              }}
              color="gray.500"
              textAlign="left"
              borderTopRadius={'8px'}
            >
              <Text fontWeight="bold" fontSize="30px">
                <FormattedMessage id="roles" />
              </Text>
            </Tab>
            <Tab
              _selected={{
                color: 'gray.100',
                bg: 'primary.500',
                fontWeight: 600,
              }}
              color="gray.500"
              textAlign="left"
              borderTopRadius={'8px'}
            >
              <Text fontWeight="bold" fontSize="30px">
                <FormattedMessage id="groups" />
              </Text>
            </Tab>
            <Tab
              _selected={{
                color: 'gray.100',
                bg: 'primary.500',
                fontWeight: 600,
              }}
              color="gray.500"
              textAlign="left"
              borderTopRadius={'8px'}
            >
              <Text fontWeight="bold" fontSize="30px">
                <FormattedMessage id="builtIn" />
              </Text>
            </Tab>
          </TabList>
          <Spacer />
          <Center>
            <Flex direction="row" gap={1}>
              {selectedTab !== 3 && (
                <Button
                  leftIcon={<IoIosAddCircle />}
                  colorScheme="primary"
                  variant="solid"
                  size="md"
                  minWidth={'170px'}
                  onClick={() => {
                    console.log(selectedTab);

                    onEntitiesModalOpen();
                  }}
                >
                  {tabsArr[selectedTab] === 'Entity' ? (
                    <FormattedMessage id="createEntity" />
                  ) : tabsArr[selectedTab] === 'Roles' ? (
                    <FormattedMessage id="createRoles" />
                  ) : (
                    <FormattedMessage id="createGroup" />
                  )}
                </Button>
              )}
            </Flex>
          </Center>
        </Header>

        <Body>
          <TabPanels>
            <TabPanel p={0}>
              <EntitiesTabPanel />
            </TabPanel>
            <TabPanel p={0}>
              <RolesTabPanel />
            </TabPanel>
            <TabPanel p={0}>
              <GroupsTabPanel />
            </TabPanel>
            <TabPanel p={0}>
              <BuiltInPanel key={selectedTab} />
              <FloatingActionButton>
                <Text px={4}>
                  <FormattedMessage id="save" />
                </Text>
              </FloatingActionButton>
            </TabPanel>
          </TabPanels>
        </Body>
      </Tabs>
      <EntitiesModal
        currentTab={selectedTab}
        isOpen={isEntitiesModalOpen}
        onClose={onEntitiesModalClose}
      />
    </>
  );
}

const BuiltInPanel = () => {
  const [loading, setLoading] = useState(true);
  const [builtIn, setBuiltIn] = useState([]);

  useEffect(() => {
    setLoading(true);
    getBuiltIn().then(res => {
      setBuiltIn(res);
      setLoading(false);
    });
  }, []);

  return (
    <Grid
      templateColumns={'repeat(5, 1fr)'}
      gap={8}
      mb={8}
      overflow={'wrap'}
      // justifyContent={'stretch'}
      w="full"
    >
      {loading
        ? new Array(10)
            .fill(0)
            .map((_, i) => (
              <Skeleton
                w="100%"
                minH={'200px'}
                width={'12vw'}
                minW={'150px'}
                maxH={'200px'}
                height={'14vh'}
                borderRadius={30}
              />
            ))
        : builtIn.map(item => (
            <Box>
              <BuiltInCard text={item} />
            </Box>
          ))}
    </Grid>
  );
};

const EntitiesTabPanel = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCards([]);
    setLoading(true);
    getEntities().then(res => {
      setCards(res);
      setLoading(false);
    });
  }, []);

  const { currentPage, handlePageChange, isDisabled, pages, pagesCount } =
    usePagination({
      total: cards.length,
      pageSize: 10,
    });

  return (
    <>
      <Grid
        templateColumns={'repeat(5, 1fr)'}
        gap={8}
        mb={8}
        overflow={'wrap'}
        justifyContent={'stretch'}
        w="full"
        width={'full'}
      >
        {loading
          ? new Array(10)
              .fill(0)
              .map((_, i) => (
                <Skeleton
                  w="100%"
                  minH={'200px'}
                  width={'12vw'}
                  minW={'150px'}
                  maxH={'200px'}
                  height={'14vh'}
                  borderRadius={30}
                />
              ))
          : [...cards]
              .slice((currentPage - 1) * 8, currentPage * 10)
              .map((item, i) => (
                <Flex justifyContent={'center'} key={i}>
                  <IntentCard
                    intent={{ intentName: item }}
                    updateIntent={() => {}}
                    Icon={<MdDelete color="white" />}
                  />
                </Flex>
              ))}
      </Grid>
      <PaginationContainer>
        <Pagination
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          isDisabled={isDisabled}
          pages={pages}
          pagesCount={pagesCount}
        />
      </PaginationContainer>
    </>
  );
};

const RolesTabPanel = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCards([]);
    setLoading(true);
    getRoles().then(res => {
      setCards(res);
      setLoading(false);
    });
  }, []);

  const { currentPage, handlePageChange, isDisabled, pages, pagesCount } =
    usePagination({
      total: cards.length,
      pageSize: 10,
    });

  return (
    <>
      <Grid
        templateColumns={'repeat(5, 1fr)'}
        gap={8}
        mb={8}
        overflow={'wrap'}
        justifyContent={'stretch'}
        w="full"
        width={'full'}
      >
        {loading
          ? new Array(10)
              .fill(0)
              .map((_, i) => (
                <Skeleton
                  w="100%"
                  minH={'200px'}
                  width={'12vw'}
                  minW={'150px'}
                  maxH={'200px'}
                  height={'14vh'}
                  borderRadius={30}
                />
              ))
          : [...cards]
              .slice((currentPage - 1) * 10, currentPage * 10)
              .map((item, i) => (
                <Flex justifyContent={'center'} key={i}>
                  <IntentCard
                    intent={{ intentName: item }}
                    updateIntent={() => {}}
                    Icon={<MdDelete color="white" />}
                  />
                </Flex>
              ))}
      </Grid>
      <PaginationContainer>
        <Pagination
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          isDisabled={isDisabled}
          pages={pages}
          pagesCount={pagesCount}
        />
      </PaginationContainer>
    </>
  );
};

const GroupsTabPanel = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCards([]);
    setLoading(true);
    getGroups().then(res => {
      setCards(res);
      setLoading(false);
    });
  }, []);

  const { currentPage, handlePageChange, isDisabled, pages, pagesCount } =
    usePagination({
      total: cards.length,
      pageSize: 10,
    });

  return (
    <>
      <Grid
        templateColumns={'repeat(5, 1fr)'}
        gap={8}
        mb={8}
        overflow={'wrap'}
        justifyContent={'stretch'}
        w="full"
        width={'full'}
      >
        {loading
          ? new Array(10)
              .fill(0)
              .map((_, i) => (
                <Skeleton
                  w="100%"
                  minH={'200px'}
                  width={'12vw'}
                  minW={'150px'}
                  maxH={'200px'}
                  height={'14vh'}
                  borderRadius={30}
                />
              ))
          : [...cards]
              .slice((currentPage - 1) * 10, currentPage * 10)
              .map((item, i) => (
                <Flex justifyContent={'center'} key={i}>
                  <IntentCard
                    intent={{ intentName: item }}
                    updateIntent={() => {}}
                    Icon={<MdDelete color="white" />}
                  />
                </Flex>
              ))}
      </Grid>
      <PaginationContainer>
        <Pagination
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          isDisabled={isDisabled}
          pages={pages}
          pagesCount={pagesCount}
        />
      </PaginationContainer>
    </>
  );
};
const BuiltInCard = ({ text }) => {
  const { state, getCheckboxProps, getInputProps, htmlProps } = useCheckbox();
  return (
    <>
      <chakra.label
        display="flex"
        flexDirection="row"
        alignItems="center"
        gridColumnGap={2}
        rounded="lg"
        px={3}
        py={1}
        cursor="pointer"
        {...htmlProps}
      >
        <input {...getInputProps()} hidden />
        <Stack
          w="100%"
          minH={'200px'}
          width={'12vw'}
          minW={'150px'}
          maxH={'200px'}
          // height={'14vh'}
          bg={'whiteAlpha.900'}
          borderRadius="30"
          boxShadow="lg"
          p="6"
          {...getCheckboxProps()}
        >
          <Flex justifyContent={'space-between'} alignItems={'center'}>
            <Text
              fontWeight="bold"
              as="h2"
              fontSize={'2xl'}
              lineHeight="tight"
              noOfLines={2}
              minWidth={'60%'}
            >
              {text}
            </Text>

            <Box
              w={'24px'}
              h={'20px'}
              border="2px solid"
              borderColor={'primary.500'}
              bg={state.isChecked ? 'primary.500' : 'transparent'}
            />
          </Flex>
        </Stack>
      </chakra.label>
    </>
  );
};

const EntitiesModal = ({ isOpen, onClose, currentTab }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="30px" mt={'25vh'}>
        <ModalHeader>
          {tabsArr[currentTab] === 'Entity' ? (
            <FormattedMessage id="createEntity" />
          ) : tabsArr[currentTab] === 'Roles' ? (
            <FormattedMessage id="createRoles" />
          ) : (
            <FormattedMessage id="createGroup" />
          )}
        </ModalHeader>
        <ModalCloseButton
          type="reset"
          backgroundColor={'red.400'}
          _hover={{ backgroundColor: 'red.600' }}
          borderRadius={'full'}
          mr={-4}
          mt={-4}
        />
        <Divider borderColor={'gray.400'} />
        <ModalBody p={12}>
          <Text mb={4} as={'label'}>
            {tabsArr[currentTab] === 'Entity' ? (
              <FormattedMessage id="entityName" />
            ) : tabsArr[currentTab] === 'Roles' ? (
              <FormattedMessage id="roleName" />
            ) : (
              <FormattedMessage id="groupName" />
            )}
          </Text>
          <Input
            display={'block'}
            mt={4}
            maxW={'60%'}
            placeholder="Placeholder"
          />
        </ModalBody>
        <Divider borderColor={'gray.400'} />

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            <FormattedMessage id="create" />
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
