import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePagination } from '../../hooks/usePagination';
import {
  Box,
  Flex,
  IconButton,
  Skeleton,
  Tbody,
  Td,
  // Text,
  Th,
  Thead,
  Tr,
  Table,
  TableContainer,
  Text,
} from '@chakra-ui/react';
import { FaSort, FaSortAlphaDown, FaSortAlphaUpAlt } from 'react-icons/fa';
import { Pagination } from '../Pagination';
import { useTable } from './TableContext';
import PaginationContainer from '../AppLayout/PaginationContainer';
import { FormattedMessage } from 'react-intl';
import CustomScrollbar from '../Scrollbar';
import HorizontalScrollbar from '../HorizontalScrollbar';

export const TableComponent = () => {
  const {
    dataLoading,
    tableData,
    pageSize,
    TableRow,
    searchableField,
    sortableColumns,
    visibleColumns,
    searchTerm,
    rowActions,
    stickyColumns,
    RowSkeleton,
  } = useTable();

  const [data, setData] = useState(tableData || []);

  const [sort, setSort] = useState({
    sortKey: null,
    sortDirection: null,
  });
  // const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // setPage(+(searchParams.get('page') || 1));
    setSort({
      sortKey: searchParams.get('sortKey') || null,
      sortDirection: searchParams.get('sortDirection') || null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const { currentPage, handlePageChange, isDisabled, pages, pagesCount } =
    usePagination({
      total: data.length,
      pageSize: pageSize || 5,
      shouldNavigate: true,
    });

  useEffect(() => {
    const { sortDirection, sortKey } = sort;
    // console.log('running', sort);
    if (sortKey && sortDirection) {
      setData(prev => {
        const u = [...prev];
        if (sortDirection === 'desc') {
          if (typeof prev[0][sortKey] === 'string') {
            // u.reverse();
            u.sort((a, b) => b[sortKey].localeCompare(a[sortKey]));
          } else {
            u.sort((a, b) => {
              return a[sortKey] - b[sortKey];
            });
          }
        } else {
          if (typeof prev[0][sortKey] === 'string') {
            u.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
          } else {
            u.sort((a, b) => {
              return b[sortKey] - a[sortKey];
            });
          }
        }
        // console.log(u);
        return u;
      });
    }
  }, [sort]);

  const toggleSort = sk => {
    setSort(prev => {
      const { sortKey: psk, sortDirection: psd } = prev;

      let sortKey = null;
      let sortDirection = null;

      if (psk !== sk) {
        sortKey = sk;
        sortDirection = 'asc';
      } else if (psd === 'asc') {
        sortKey = sk;
        sortDirection = 'desc';
      } else {
        sortKey = sk;
        sortDirection = 'asc';
      }
      searchParams.set('sortKey', sortKey);
      searchParams.set('sortDirection', sortDirection);
      navigate(`?${searchParams.toString()}`);
      return {
        sortKey,
        sortDirection,
      };
    });
  };

  return (
    <Box
      zIndex={100}
      pos={'relative'}
      borderRadius={'18px'}
      w={'full'}
      boxShadow={'xl'}
    >
      <>
        <TableContainer
          borderRadius={'18px'}
          width={'100%'}
          className="horizontal-scrollbar"
        >
          <Table
            variant="simple"
            colorScheme="gray"
            size="sm"
            textAlign={'center'}
          >
            <Thead>
              <Tr bg={'primary.400'} color={'white'}>
                {visibleColumns.map((col, i) => (
                  <TableHeaderItem
                    sortKey={col}
                    sort={sort}
                    toggleSort={() => {
                      toggleSort(col);
                    }}
                    key={col}
                    textAlign="center"
                    sortableColumns={sortableColumns}
                    sticky={stickyColumns.includes(i)}
                    index={i}
                  >
                    <FormattedMessage id={col} />
                  </TableHeaderItem>
                ))}
              </Tr>
            </Thead>
            {dataLoading ? (
              new Array(8)
                .fill(null)
                .map((_, i) => (
                  <RowSkeleton visibleColumns={visibleColumns} key={i} />
                ))
            ) : (
              <Tbody key={JSON.stringify(sort)}>
                {[...data]
                  .slice(
                    (currentPage - 1) * (pageSize || 5),
                    currentPage * (pageSize || 5)
                  )
                  .filter(user => {
                    return searchTerm.length
                      ? user[searchableField]
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      : true;
                  })
                  .map(d => (
                    <TableRow
                      // key={d.username}
                      {...d}
                      visibleColumns={visibleColumns}
                      rowActions={rowActions}
                    />
                  ))}
              </Tbody>
            )}
          </Table>
        </TableContainer>
        <PaginationContainer>
          <Pagination
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            isDisabled={isDisabled}
            pages={pages}
            pagesCount={pagesCount}
          />
        </PaginationContainer>
      </>
    </Box>
  );
};

const SortButton = ({ sort, sortKey, toggleSort, ...props }) => {
  const Component =
    sort.sortKey !== sortKey
      ? FaSort
      : sort.sortDirection === 'asc'
      ? FaSortAlphaDown
      : FaSortAlphaUpAlt;

  return <Component onClick={toggleSort} {...props} />;
};
const TableHeaderItem = ({
  children,
  sortKey,
  sort,
  toggleSort,
  sortableColumns,
  sticky,
  index,
  ...props
}) => {
  return (
    <Th
      position={sticky ? 'sticky' : ''}
      zIndex={sticky ? 500 : 0}
      bg={'primary.400'}
      left={0}
      right={0}
      py={4}
      {...props}
    >
      <Flex color={'white'} maxW={'200px'} alignItems={'center'} gap={4}>
        <Text
          fontSize={'md'}
          style={{
            textWrap: 'wrap',
          }}
        >
          {children}
        </Text>
        {sortableColumns && sortableColumns.includes(sortKey) && (
          <IconButton
            sx={{
              svg: {
                color: sortKey === sort.sortKey ? 'gray.100' : 'gray.400',
              },
            }}
            _hover={{
              svg: {
                color: 'gray.100',
              },
            }}
            variant={'ghost'}
          >
            <SortButton sortKey={sortKey} toggleSort={toggleSort} sort={sort} />
          </IconButton>
        )}
      </Flex>
    </Th>
  );
};
