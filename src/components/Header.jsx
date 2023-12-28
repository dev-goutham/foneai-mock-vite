import { Button,  Icon, Text, Spacer, CloseButton, Tabs, TabList, Tab, Link, Flex, Stack, Image, Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'
import { MdLogout } from 'react-icons/md';  // import the icon  from react-icons
import React, { useContext } from 'react';
import { useNavigate, useLocation, NavLink, useParams } from "react-router-dom";
import { AuthContext } from '../contexts/auth';
import { getBotName } from '../api';
import Logo from './Logo';

export default function Header() {
  const {botId} = useParams()
  // TODO: Slashes after the route are routing to the same page
  const location = useLocation();
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  // console.log(location.pathname); // result: '/secondpage'
  const [botName, setBotName] = React.useState('')

  React.useEffect(() => {
    console.log('botId', botId)
    if(botId) {
      console.log(botId)
      getBotName(botId)
        .then((res) => {
          setBotName(res)
        })
    }
  }, [botId])

  function pathCleaner() {
    let path = location.pathname.split('/')
    path = path.filter((item) => item !== '')
    // console.log(path)
    return path.pop()
  }

  return (
    <Flex 
      h={'60px'} 
      maxH={'60px'} 
      minH={'60px'}
      minw={'100%'} 
      // backgroundImage={'linear-gradient(90deg, rgba(19,69,101,1) 0%, rgba(119,169,191,1) 35%, rgba(0,212,255,1) 100%)'}
      backgroundColor={'gray.100'}
      // bg={
      //   (pathCleaner() === 'bots' || pathCleaner() === 'users') ?
      //   'gray.100' :
      //   'gray.100'} 
      pt={'10px'} px={'30px'}
      alignContent={'left'} 
      justifyContent={'space-between'}
      flexGrow={1}
      verticalAlign={'middle'} 

    >

        {
          (pathCleaner() === 'bots' || pathCleaner() === 'users') ?
          <>
            <Logo/>
    
            <Spacer />

            <Tabs isFitted variant='unstyled' alignItems={'flex-end'} right={'0'} mr='auto'>
              <TabList>
                <NavLink to='/bots'>
                <Tab
                  active={pathCleaner() === 'bots'}
                  _active={
                    {
                      color: 'white',
                      bg: 'blue.500',

                  }}

                  _selected={{
                    color: 'white',
                    bg: 'blue.500',
                  }}
                  _hover={{
                    color: 'white',
                    bg: 'blue.500',
                  }}
                  borderRadius='5'
                >
                  Bots
                </Tab>
                </NavLink>
                <Tab
                  active={pathCleaner() === 'users'}
                  onClick={() => {
                    navigate('/users');
                  }}
                  _active={
                    {
                      color: 'white',
                      bg: 'blue.500',

                  }}
                  _selected={{
                    color: 'white',
                    bg: 'blue.500',
                  }}
                  _hover={{
                    color: 'white',
                    bg: 'blue.500',
                  }}
                  borderRadius='5'
                >
                  Users
                </Tab>
              </TabList>
            </Tabs>
            <Spacer/>
            
            <Button 
              colorScheme="blue" 
              variant="outline" 
              backgroundColor={'white'} 
              maxH={'80%'} 
              borderRadius='25'
              onClick={() => context.logout()}
            >
              <Icon as={MdLogout}  w={6} h={'80%'} /> &nbsp;
                Logout
            </Button>
          </>   :
          <>
            <Logo />
            <Spacer/>
            <CloseButton size="lg" color="red"
              onClick={() => {
                navigate('/bots');
              }}
            />
            <Spacer />
            {
              // check if pathname is /bot/create
              location.pathname !== '/bots/create' ?
                <Breadcrumb fontWeight='semibold' color={'gray'} fontSize={['xl','2xl']}>
                  <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to='bots' fontSize={['xl','2xl']} fontWeight={'bold'}>Bots</BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbItem isCurrentPage>
                    <Text color={'black'} fontSize={['xl','2xl']} fontWeight={'bold'}>
                      {botId ? 
                        botName :
                        'Untitled'
                      }
                    </Text>
                  </BreadcrumbItem>
                </Breadcrumb> :
                <Text color={'black'} fontSize={['xl','2xl']} fontWeight={'bold'}>
                  Create Bot
                </Text>
            }
            <Spacer/>
            {botId && <Tabs isFitted variant='unstyled' alignItems={'flex-end'} right={'0'} mr='auto'>
              <TabList>
                
                <NavLink
                    className={
                      location.pathname === `/bots/${botId}/overview` ? 'navLinkActive' : ''
                    }
                    to={`/bots/${botId}/overview`}
                  >
                    <Tab>
                      Overview
                    </Tab>
                </NavLink>


                <NavLink
                    className={
                      location.pathname === `/bots/${botId}/intents` ? 'navLinkActive' : ''
                    }
                    to={`/bots/${botId}/intents`}
                  >
                    <Tab
                      isDisabled={botId === 'create' ? true : false}
                    >
                      Intents
                    </Tab>
                </NavLink>

                <NavLink
                    className={
                      location.pathname === `/bots/${botId}/webhooks` ? 'navLinkActive' : ''
                    }
                    to={`/bots/${botId}/webhooks`}
                  >
                    <Tab>
                      Webhooks
                    </Tab>
                </NavLink>

                <NavLink
                    className={
                      location.pathname === `/bots/${botId}/flow` ? 'navLinkActive' : ''
                    }
                    to={`/bots/${botId}/flow`}
                  >
                    <Tab>
                      Flow
                    </Tab>
                </NavLink>

              </TabList>   
            </Tabs>
            }
            <Spacer/>
          </>
        }
    </Flex>
  )
}
