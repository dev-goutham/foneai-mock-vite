import {
  Button,
  Icon,
  Text,
  Spacer,
  CloseButton,
  Tabs,
  TabList,
  Tab,
  Link,
  Flex,
  Stack,
  Image,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Spinner,
  Box,
  useMediaQuery,
  IconButton,
} from '@chakra-ui/react';
import { MdLogout } from 'react-icons/md'; // import the icon  from react-icons
import React, { useContext } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

import { useNavigate, useParams } from 'react-router-dom';

import { getBotName } from '../api';
import Logo from './Logo';
import BotTabs from './BotTabs';
import { LangContext } from '../contexts/lang';
import BotDrawer from './BotDrawer';

export default function BotHeader() {
  const { botId } = useParams();
  // TODO: Slashes after the route are routing to the same page

  const navigate = useNavigate();
  const { locale } = useContext(LangContext);
  const [botNameLoading, setBotNameLoading] = React.useState(false);
  // console.log(location.pathname); // result: '/secondpage'
  const [botName, setBotName] = React.useState('');
  const [matches] = useMediaQuery('(min-width: 1024px)');

  React.useEffect(() => {
    setBotNameLoading(true);
    console.log('botId', botId);
    if (botId) {
      console.log(botId);
      getBotName(botId).then(res => {
        setBotName(res);
        setBotNameLoading(false);
      });
    }
  }, [botId]);

  return (
    <Flex
      h={'60px'}
      maxH={'60px'}
      minH={'60px'}
      minw={'100%'}
      // backgroundImage={'linear-gradient(90deg, rgba(19,69,101,1) 0%, rgba(119,169,191,1) 35%, rgba(0,212,255,1) 100%)'}
      backgroundColor={'gray.100'}
      boxShadow={'0px 0px 8px 0px rgba(0,0,0,0.35)'}
      pt={'10px'}
      px={'30px'}
      alignContent={'left'}
      justifyContent={'space-between'}
      flexGrow={1}
      verticalAlign={'middle'}
    >
      <Logo />
      <Spacer />
      <IconButton
        rounded={'full'}
        fontSize={'2xl'}
        // bg={'red.600'}
        // color={'white'}
        colorScheme="red"
        onClick={() => {
          navigate('/bots');
        }}
      >
        <IoCloseOutline />
      </IconButton>
      {/* <CloseButton
        size="lg"
        color="red"
        onClick={() => {
          navigate('/bots');
        }}
      /> */}
      <Spacer />
      <Breadcrumb fontWeight="semibold" color={'gray'} fontSize={['xl', '2xl']}>
        <BreadcrumbItem>
          <BreadcrumbLink
            as={Link}
            to="/bots"
            fontSize={['xl', '2xl']}
            fontWeight={'bold'}
            onClick={() => {
              navigate('/bots');
            }}
          >
            Bots
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          {botNameLoading ? (
            <Spinner
              thickness="2px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blackAlpha.400"
              size="md"
            />
          ) : (
            <Text color={'black'} fontSize={['xl', '2xl']} fontWeight={'bold'}>
              {botName}
            </Text>
          )}
        </BreadcrumbItem>
      </Breadcrumb>
      <Spacer />
      <Box display={matches ? 'block' : 'none'}>
        <BotTabs botId={botId} />
      </Box>
      <Box display={matches ? 'none' : 'block'}>
        <BotDrawer botId={botId} />
      </Box>
    </Flex>
  );
}
