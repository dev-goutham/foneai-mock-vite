import UserRow from '../UserRow';
import { usersTableColumns } from './contants';

import { TableComponent } from '../TableComponent';

const users = [
  {
    username: 'goutham',
    fullname: 'Goutham Ram',
    organization: 'org 1',
    usedUtilization: 300,
    allocatedUtilization: 1000,
    allocatedNextCycle: 1000,
    billingReviewsOn: 1,
  },
  {
    username: 'g-ram',
    fullname: 'G Ram',
    organization: 'org 1',
    usedUtilization: 79,
    allocatedUtilization: 100,
    allocatedNextCycle: 400,
    billingReviewsOn: 4,
  },
  {
    username: 'ashwin',
    fullname: 'Ashwin',
    organization: 'org 1',
    usedUtilization: 420,
    allocatedUtilization: 500,
    allocatedNextCycle: 500,
    billingReviewsOn: 3,
  },
  {
    username: 'john-doe',
    fullname: 'John Doe',
    organization: 'org 1',
    usedUtilization: 50,
    allocatedUtilization: 100,
    allocatedNextCycle: 100,
    billingReviewsOn: 7,
  },
  {
    username: 'a',
    fullname: 'a Ram',
    organization: 'org 1',
    usedUtilization: 350,
    allocatedUtilization: 500,
    allocatedNextCycle: 500,
    billingReviewsOn: 6,
  },
  {
    username: 'b-ram',
    fullname: 'b Ram',
    organization: 'org 1',
    usedUtilization: 790,
    allocatedUtilization: 1000,
    allocatedNextCycle: 500,
    billingReviewsOn: 4,
  },
  {
    username: 'c',
    fullname: 'c',
    organization: 'org 1',
    usedUtilization: 42,
    allocatedUtilization: 50,
    allocatedNextCycle: 50,
    billingReviewsOn: 2,
  },
  {
    username: 'd',
    fullname: 'd',
    organization: 'org 1',
    usedUtilization: 5200,
    allocatedUtilization: 15000,
    allocatedNextCycle: 15000,
    billingReviewsOn: 7,
  },
  {
    username: 'e',
    fullname: 'e Ram',
    organization: 'org 1',
    usedUtilization: 30,
    allocatedUtilization: 50,
    allocatedNextCycle: 50,
    billingReviewsOn: 6,
  },
  {
    username: 'f-ram',
    fullname: 'f Ram',
    organization: 'org 1',
    usedUtilization: 790,
    allocatedUtilization: 1000,
    allocatedNextCycle: 500,
    billingReviewsOn: 4,
  },
  {
    username: 'g',
    fullname: 'g',
    organization: 'org 1',
    usedUtilization: 42,
    allocatedUtilization: 50,
    allocatedNextCycle: 50,
    billingReviewsOn: 2,
  },
  {
    username: 'h',
    fullname: 'h',
    organization: 'org 1',
    usedUtilization: 520,
    allocatedUtilization: 1500,
    allocatedNextCycle: 1500,
    billingReviewsOn: 7,
  },
];

export function UsersTable({ getUsersLoading }) {
  return (
    <TableComponent
      TableRow={UserRow}
      columns={usersTableColumns}
      dataLoading={getUsersLoading}
      pageSize={5}
      tableData={users}
      searchableField={'username'}
      unfilterableColumns={['actions', 'username']}
    />
  );
}

// const SortButton = ({ sort, sortKey, toggleSort, ...props }) => {
//   const Component =
//     sort.sortKey !== sortKey
//       ? FaSort
//       : sort.sortDirection === 'asc'
//       ? FaSortAlphaDown
//       : FaSortAlphaUpAlt;

//   return <Component onClick={toggleSort} {...props} />;
// };
// const TableHeaderItem = ({ children, sortKey, sort, toggleSort, ...props }) => {
//   return (
//     <Th {...props}>
//       <Flex alignItems={'center'} gap={4}>
//         <>{children}</>
//         <IconButton
//           sx={{
//             svg: {
//               color: sortKey === sort.sortKey ? 'gray.900' : 'gray.300',
//             },
//           }}
//           _hover={{
//             svg: {
//               color: 'gray.900',
//             },
//           }}
//           variant={'ghost'}
//         >
//           <SortButton sortKey={sortKey} toggleSort={toggleSort} sort={sort} />
//         </IconButton>
//       </Flex>
//     </Th>
//   );
// };
