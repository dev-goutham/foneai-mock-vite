import {
  Box,
  Button,
  Center,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Skeleton,
  Spacer,
  Spinner,
  Stack,
  Tbody,
  Td,
  Text,
  Tr,
  useBoolean,
  useClipboard,
  useDisclosure,
} from '@chakra-ui/react';
import { TableComponent } from '../TableComponent';
import { campaignColumns } from './constants';
import { useEffect, useState } from 'react';
import { getBots, getCampaigns } from '../../api';
import { TableProvider } from '../TableComponent/TableContext';
import TableSearch from '../TableComponent/TableSearch';
import { FaUserPlus } from 'react-icons/fa';

import { MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';

import { useDeleteAlert } from '../../hooks/useDeleteAlert';
import ReactSelect from 'react-select';
import Header from '../AppLayout/Header';
import Body from '../AppLayout/Body';
import { FormattedMessage } from 'react-intl';

export function CampaignsPage() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [campaignsData, setCampaignsData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  const deleteCampaign = id => {
    setCampaignsData(prev => prev.filter(campaign => campaign.id !== id));
  };

  useEffect(() => {
    getCampaigns().then(data => {
      setCampaignsData(data);
      setDataLoading(false);
    });
  }, []);

  return (
    <TableProvider
      TableRow={CampaignRow}
      columns={campaignColumns}
      dataLoading={dataLoading}
      pageSize={8}
      searchableField={'campaignId'}
      tableData={campaignsData}
      unfilterableColumns={'actions'}
      disableFilter
      showControls={false}
      sortableColumns={['campaignId', 'campaignName']}
      rowActions={{
        deleteCampaign,
      }}
      key={JSON.stringify(campaignsData)}
      RowSkeleton={CampaignRowSkeleton}
    >
      <Header>
        <>
          <Center>
            <Text
              fontWeight="bold"
              fontSize="4xl"
              color="gray.700"
              textAlign="left"
            >
              <FormattedMessage id="campaigns" />
            </Text>
          </Center>
          <Spacer />
          <Center>
            <Flex gap={4} justifyContent={'end'} flex={1}>
              <TableSearch />

              <Button
                leftIcon={<FaUserPlus />}
                verticalAlign="middle"
                colorScheme="primary"
                variant="solid"
                size="md"
                onClick={onOpen}
              >
                <FormattedMessage id="createCampaign" />
              </Button>
            </Flex>
          </Center>
        </>
      </Header>

      <Body width="stretch">
        <TableComponent />
      </Body>
      <CampaignModalComponent isOpen={isOpen} onClose={onClose} />
    </TableProvider>
  );
}

const CampaignRow = ({ visibleColumns, rowActions, ...props }) => {
  const { onCopy, hasCopied } = useClipboard(props.campaignId);
  const [bots, setBots] = useState([]);
  const [botOptions, setBotOptions] = useState([]);
  const [botsLoading, setBotsLoading] = useState(false);
  const [hovered, setHovered] = useBoolean();
  const [selectedBot, setSelectedBot] = useState(props['bots']);
  const { DeleteAlert, onDeleteAlertOpen } = useDeleteAlert(
    'deleteCampaign',
    () => {
      rowActions.deleteCampaign(props.id);
    }
  );

  const [nameHovered, setNameHovered] = useState(false);

  useEffect(() => {
    setBotsLoading(true);
    getBots().then(data => {
      setBots(data);
      setBotOptions(data.map(bot => ({ value: bot.id, label: bot.name })));
      setBotsLoading(false);
    });
  }, []);
  const handleDelete = () => {
    rowActions.deleteCampaign(props.id);
  };

  console.log(props['campaignName'], hovered);
  // if (props['campaignId'] === 'abcde12345fghi67hijklmno89pqrs01') {
  // }

  return (
    <>
      <Tr
        border={'2px solid'}
        borderColor={'gray.200'}
        sx={{
          td: {
            border: '2px solid',
            borderColor: 'gray.200',
          },
        }}
        onMouseEnter={setHovered.on}
        onMouseLeave={setHovered.off}
        bg={hovered ? 'primary.100' : 'gray.50'}
        pos={'relative'}
      >
        {visibleColumns.map(col => {
          if (col === 'campaignName') {
            return (
              <Td
                onMouseEnter={() => {
                  setNameHovered(true);
                }}
                onMouseLeave={() => {
                  setNameHovered(false);
                }}
                key={col}
                width={'30%'}
              >
                <Editable defaultValue={props[col]}>
                  {editProps => (
                    <>
                      <Box
                        display={editProps.isEditing ? 'none' : 'flex'}
                        as={'button'}
                        onClick={editProps.onEdit}
                        cursor={'pointer'}
                        width={'100%'}
                        textAlign={'left'}
                        alignItems={'center'}
                        gap={2}
                      >
                        <Text as={'p'}>{props['campaignName']}</Text>
                        {nameHovered && (
                          <IconButton variant={'unstyled'}>
                            <MdEdit />
                          </IconButton>
                        )}
                      </Box>

                      <EditablePreview
                        fontSize={'1.2rem'}
                        fontWeight={600}
                        display={props.isEditing ? 'block' : 'none'}
                        background="green"
                        sx={{
                          input: {
                            backgroundColor: 'red',
                            background: 'green !important',
                          },
                        }}
                      />
                      <EditableInput />
                    </>
                  )}
                </Editable>
              </Td>
            );
          } else if (col === 'campaignId') {
            return (
              <Td width={'30%'} key={col}>
                <Box
                  sx={{
                    _hover: {
                      button: {
                        display: 'flex',
                      },
                    },
                  }}
                  py={3}
                  position={'relative'}
                >
                  <Stack
                    top={0}
                    right={0}
                    position={'absolute'}
                    h={'full'}
                    alignItems={'end'}
                    justifyContent={'center'}
                    display={hovered ? 'flex' : 'none'}
                    width={'100%'}
                  >
                    <Button
                      bg="gray.100"
                      alignItems={'center'}
                      justifyContent={'center'}
                      display={'flex'}
                      onClick={onCopy}
                      fontSize={'sm'}
                      size={'sm'}
                    >
                      <FormattedMessage id={hasCopied ? 'copied' : 'copy'} />
                    </Button>
                  </Stack>
                  <Text>{props[col]}</Text>
                </Box>
              </Td>
            );
          } else if (col === 'bots') {
            return (
              <Td width={'30%'} key={col}>
                {/* <Select
                  value={selectedBot}
                  onChange={e => {
                    setSelectedBot(e.target.value);
                  }}
                >
                  {botsLoading ? (
                    <option>
                      <Spinner />
                    </option>
                  ) : (
                    bots.map(bot => (
                      <option key={bot.name} value={bot.id}>
                        {bot.name}
                      </option>
                    ))
                  )}
                </Select> */}
                <ReactSelect
                  options={botOptions}
                  defaultValue={botOptions[0]}
                  key={JSON.stringify(botOptions)}
                  menuPortalTarget={document.querySelector('body')}
                  styles={{
                    menuPortal: baseStyles => ({
                      ...baseStyles,
                      zIndex: 99999,
                    }),
                    // menu: bs => ({
                    //   ...bs,
                    //   zIndex: 99999,
                    //   position: 'relative',
                    // }),
                    // menuList: bs => ({
                    //   ...bs,
                    //   zIndex: 99999,
                    // }),
                  }}
                />
              </Td>
            );
          } else {
            return (
              <Td width={'10%'} minW={'150px'} align="right" key={col}>
                <Flex justifyContent={'end'}>
                  <Button
                    display={'flex'}
                    gap={3}
                    alignItems={'center'}
                    colorScheme="blue"
                    width={'100%'}
                    onClick={onDeleteAlertOpen}
                    leftIcon={<MdDelete />}
                  >
                    {/* <BsGraphUp />
                  <Text>Reports</Text> */}
                    <FormattedMessage id="delete" />
                  </Button>
                </Flex>
              </Td>
            );
          }
        })}
      </Tr>
      <DeleteAlert />
    </>
  );
};

const CampaignModalComponent = ({ isOpen, onClose }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getBots().then(data => {
      const d = data.map(bot => ({
        value: bot.id,
        label: bot.name,
      }));
      setOptions(d);
    });
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent borderRadius="30px" mt={'25vh'}>
        <ModalHeader>
          <FormattedMessage id="createCampaign" />
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
          <FormControl mb={'30px'}>
            <FormLabel fontWeight={'semibold'}>
              <FormattedMessage id="campaignName" />
              <Input mt={'20px'} type="text" width={'100%'} />
            </FormLabel>
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={'semibold'}>
              <FormattedMessage id="botToBeLinked" />
            </FormLabel>
            <ReactSelect
              options={options}
              defaultValue={options[0]}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  width: '340px',
                  marginTop: '20px',
                }),
              }}
            />
          </FormControl>
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

const CampaignRowSkeleton = () => {
  return (
    <Tbody>
      <Td w={'30%'}>
        <Skeleton height={'40px'} width={'full'} />
      </Td>
      <Td w={'30%'}>
        <Skeleton height={'40px'} width={'full'} />
      </Td>
      <Td w={'30%'}>
        <Skeleton height={'40px'} width={'full'} />
      </Td>
      <Td w={'10%'} minW={'150px'}>
        <Skeleton height={'40px'} width={'full'} />
      </Td>
    </Tbody>
  );
};
