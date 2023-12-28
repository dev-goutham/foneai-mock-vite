import React from 'react';
import { testApi } from '../api';
import {
  Flex,
  Divider,
  useDisclosure,
  Center,
  Tbody,
  Td,
  Skeleton,
} from '@chakra-ui/react';
import Header from '../components/AppLayout/Header';
import Body from '../components/AppLayout/Body';

import { UsersTableHeader } from '../components/Users/UsersTableHeader';
// import { UsersTableSkeleton } from '../components/Users/UsersTableSkeleton';
// import { CreateUserModal } from '../components/Users/CreateUserModal';
// import { UpdateUserModal } from '../components/Users/UpdateUserModal';
import { TopupUserModal } from '../components/Users/TopupUserModal';
import { UsersModal } from '../components/Users/UserModal2';
import { TableComponent } from '../components/TableComponent';
import UserRow from '../components/UserRow';
import { users, usersTableColumns } from '../components/Users/contants';
import { TableProvider } from '../components/TableComponent/TableContext';

export default function Users() {
  const {
    isOpen: isCreateUserOpen,
    onOpen: onCreateUserOpen,
    onClose: onCreateUserClose,
  } = useDisclosure();
  //   const {
  //     isOpen: isUpdateUserOpen,
  //     onOpen: onUpdateUserOpen,
  //     onClose: onUpdateUserClose,
  //   } = useDisclosure();
  const {
    isOpen: isTopUpUserOpen,
    // onOpen: onTopUpUserOpen,
    onClose: onTopUpUserClose,
  } = useDisclosure();

  const [getUsersLoading, setGetUsersLoading] = React.useState(false);

  React.useEffect(() => {
    setGetUsersLoading(true);
    testApi(4)
      .then(res => {
        console.log(res);
        setGetUsersLoading(false);
      })
      .catch(err => {
        console.log(err);
        setGetUsersLoading(false);
      });
  }, []);

  return (
    <TableProvider
      TableRow={UserRow}
      columns={usersTableColumns}
      dataLoading={getUsersLoading}
      pageSize={8}
      tableData={users}
      searchableField={'username'}
      unfilterableColumns={['actions', 'username']}
      sortableColumns={[
        'username',
        'fullname',
        'usedUtilization',
        'allocatedUtilization',
        'allocatedNextCycle',
        'billingReviewsOn',
      ]}
      showControls={false}
      stickyColumns={[0, 9]}
      RowSkeleton={UserRowSkeleton}
    >
      <Header>
        <UsersTableHeader
          onCreateUserOpen={onCreateUserOpen}
          getUsersLoading={getUsersLoading}
        />

        {/* <UsersTable getUsersLoading={getUsersLoading} /> */}
      </Header>
      <Body width="stretch">
        <TableComponent />
      </Body>
      {/* Create User Modal */}
      <UsersModal
        mode="create"
        isOpen={isCreateUserOpen}
        onClose={onCreateUserClose}
      />

      <TopupUserModal
        isTopUpUserOpen={isTopUpUserOpen}
        onTopUpUserClose={onTopUpUserClose}
      />
    </TableProvider>
  );
}

const UserRowSkeleton = ({ visibleColumns }) => {
  return (
    <Tbody>
      {visibleColumns.map(col => (
        <Td key={col}>
          <Skeleton height={'40px'} width={'full'} />
        </Td>
      ))}
    </Tbody>
  );
};
