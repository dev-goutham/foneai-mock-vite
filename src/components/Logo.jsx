import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Image, Link, Stack, Text } from '@chakra-ui/react';

export default function Logo() {
    return <Stack
        borderRadius="9999px"
        direction="row"
        justify="flex-start"
        align="center"
        spacing="15px"
        height="4vh"
        verticalAlign={'middle'}
      >
        <Image
          borderRadius='full'
          boxSize='50px'
          src={process.env.PUBLIC_URL + '/favicon.ico'}
          alt='Logo'
        />
        {/* <Stack
          direction="column"
          justify="left"
          spacing="1px"
          height="4vh"
        >
              <Text fontWeight={'light'} fontSize={'10px'}>
                <FormattedMessage id='poweredBy' />
              </Text>
              <Link
                href="https://fone.ai"
                target={'_blank'}
                fontFamily="Inter"
                fontWeight="bold"
                fontSize="16px"
                color="blue.400"
              >
                Fone.ai
              </Link>
        </Stack> */}
      </Stack>
}