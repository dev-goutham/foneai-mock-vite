import { Box } from '@chakra-ui/react';

export default function PaginationContainer({ children }) {
  return (
    <Box position={'fixed'} bottom={'5%'} width={'100%'} left={0}>
      {children}
    </Box>
  );
}
