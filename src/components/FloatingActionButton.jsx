import { Button, Flex } from '@chakra-ui/react';

export default function FloatingActionButton({ ...props }) {
  return (
    <Flex position={'fixed'} bottom={'5%'} right={'5%'}>
      <Button
        {...props}
        colorScheme="primary"
        variant="solid"
        borderRadius={'full'}
        size="lg"
        boxShadow={'dark-lg'}
        height={'80px'}
        verticalAlign={'middle'}
      />
    </Flex>
  );
}
