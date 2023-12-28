import React from 'react';
import {
    Box,
    Flex,
    Button,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { BsPerson } from 'react-icons/bs';
import { FcCalendar, FcClock } from 'react-icons/fc';
import { GrMoney } from 'react-icons/gr';
  import { GoLocation } from 'react-icons/go';
import { MdDataUsage } from 'react-icons/md';
  
  function StatsCard(props) {
    const { title, stat, icon, width } = props;
    return (
      <Stat
        width={width}
        px={{ base: 2, md: 6 }}
        py={'5'}
        height={'100px'}
        shadow={'xl'}
        border={'1px solid'}
        borderColor={useColorModeValue('gray.800', 'gray.500')}
        rounded={'3xl'}>
        <Flex>
          <Box
            my={'auto'}
            color={useColorModeValue('gray.800', 'gray.200')}
            alignContent={'center'}>
            {icon}
          </Box>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={'light'} flexWrap={'wrap'} textAlign={'center'}>
              {title}
            </StatLabel>
            <StatNumber fontSize={'medium'} fontWeight={'semibold'} textAlign={'center'}>
              {stat}
            </StatNumber>
          </Box>
        </Flex>
      </Stat>
    );
  }

  function TopUpButton() {
    return (
        <Button
            leftIcon={<GrMoney color='blue'/>}
            verticalAlign={'middle'}
            fontSize={'xl'}
            width={'100%'}
            height={'100px'}
            colorScheme='blue'
            variant='outline'
            px={{ base: 2, md: 6 }}
            py={'5'}
            shadow={'xl'}
            border={'1px solid'}
            borderColor={useColorModeValue('gray.800', 'gray.500')}
            rounded={'3xl'}>
            Top Up
        </Button>
    )
    }

  
  export default function Stats() {
    const [topUpHover, setTopUpHover] = React.useState(false);
    return (
      <Box maxW="7xl" width='100%' mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <Box
            onMouseEnter={() => setTopUpHover(true)}
            onMouseLeave={() => setTopUpHover(false)}
          >
            {
                (topUpHover) ?
                <TopUpButton /> :
                <StatsCard
                    title={`Current Utlization (Used/Allocated)`}
                    stat={'5,000 / 10,000   '}
                    icon={<MdDataUsage
                        color='green'
                        colorScheme='green'
                        size={'3em'} />}
                />
            }
          </Box>
          <StatsCard
            title={'Allocated Monthly Minutes'}
            stat={'1,000'}
            icon={<FcClock size={'3em'} />}
          />
          <StatsCard
            title={'Billing renews on'} 
            stat={'7'}
            width={'280px'}
            icon={<FcCalendar size={'3em'} />}
          />
        </SimpleGrid>
      </Box>
    );
  }