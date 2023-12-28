import { Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import AppHeader from '../components/AppHeader';

export function NotFound() {
  return (
    <>
      <AppHeader />
      <Stack
        h={'100vh'}
        w="100vw"
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Text fontWeight={700} fontSize={'4xl'}>
          404 - Page not found
        </Text>

        <Link to={'/'}>
          <Text fontSize={'2xl'} color={'blue.500'}>
            Go back to home
          </Text>
        </Link>
      </Stack>
    </>
  );
}
