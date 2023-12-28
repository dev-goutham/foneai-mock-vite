import { Flex, background, useRadioGroup } from '@chakra-ui/react'
import { Box, Image, useToast } from '@chakra-ui/react'
import React from 'react'
import { useRadio } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/react'
import { Stack, Text, HStack } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

function Test() {
return (
  // tabs vertical
  // make the below element at the middle of the page
  <Tabs variant="enclosed" colorScheme="blue" orientation='vertical'
  size={'lg'}
  isFitted

  >
    <TabList
    border={'1px solid green'}
    _selected={{
      background: 'green',
      fontWeight: 'bold',
      color: 'white'
    }}
    
    >
      <Tab
      border={'1px solid green'}
      borderRadius={'full'}
      _selected={{
        background: 'green',
        fontWeight: 'bold',
        color: 'white'
      }}
      >One</Tab>
      <Tab 
      border={'1px solid green'}
      _selected={{
        background: 'green',
        fontWeight: 'bold',
        color: 'white'
      }}
      >Two</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <p>one!</p>
      </TabPanel>
      <TabPanel>
        <p>two!</p>
      </TabPanel>
    </TabPanels>
  </Tabs>)
  }

export default Test