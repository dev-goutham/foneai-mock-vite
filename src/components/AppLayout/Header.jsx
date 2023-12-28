import { Divider, Flex } from '@chakra-ui/react';

export default function Header({ children }) {
  return (
    <>
      <Flex
        width={'80vw'}
        borderColor={'gray.400'}
        px={12}
        alignItems={'stretch'}
        minH={'72px'}
        h={'72px'}
        mx={'auto'}
        className="header"
      >
        {children}
      </Flex>
      <Divider
        mx={'auto'}
        borderColor={'gray.400'}
        width={'80vw'}
        boxShadow={'dark-lg'}
      />
    </>
  );
}
