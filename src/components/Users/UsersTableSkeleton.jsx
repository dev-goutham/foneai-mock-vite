import { Center, Skeleton } from '@chakra-ui/react';

export function UsersTableSkeleton() {
  return (
    <Center
      width={'76%'}
      py={4}
      px={12}
      style={{
        marginLeft: '10%',
        marginRight: '10%',
      }}
    >
      <Skeleton height="50px" width="100%" />
      <Skeleton height="50px" width="100%" />
      <Skeleton height="50px" width="100%" />
      <Skeleton height="50px" width="100%" />
    </Center>
  );
}
