import { Flex } from '@chakra-ui/react';

export default function Body({ children, width = 'default' }) {
  return (
    <Flex
      w={width === 'stretch' ? '80vw' : '76vw'}
      position={'relative'}
      mx={'auto'}
      my={16}
    >
      {children}
    </Flex>
  );
}
