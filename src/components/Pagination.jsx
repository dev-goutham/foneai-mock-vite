import {
  Pagination as AjnaPagination,
  // usePagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
  PaginationSeparator,
} from '@ajna/pagination';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

export function Pagination({
  pagesCount,
  currentPage,
  isDisabled,
  handlePageChange,
  pages,
}) {
  if (pagesCount <= 1) return null;

  return (
    <AjnaPagination
      pagesCount={pagesCount}
      currentPage={currentPage}
      isDisabled={isDisabled}
      onPageChange={handlePageChange}
    >
      <PaginationContainer
        align="center"
        justify="center"
        px={4}
        w="full"
        gap={6}
      >
        <PaginationPrevious
          _hover={{
            bg: 'primary.400',
          }}
          bg="primary.300"
          onClick={() =>
            console.log(
              'Im executing my own function along with Previous component functionality'
            )
          }
        >
          <BsChevronLeft />
        </PaginationPrevious>
        <PaginationPageGroup
          isInline
          align="center"
          separator={
            <PaginationSeparator
              onClick={() =>
                console.log(
                  'Im executing my own function along with Separator component functionality'
                )
              }
              bg="primary.300"
              fontSize="sm"
              w={7}
              jumpSize={11}
            />
          }
        >
          {pages.map(_page => (
            <PaginationPage
              // w={7}

              h={'fit-content'}
              bg={currentPage === _page ? 'primary.700' : 'primary.300'}
              key={`pagination_page_${_page}`}
              rounded={'full'}
              px={4}
              py={3}
              page={_page}
              onClick={() =>
                console.log(
                  'Im executing my own function along with Page component functionality'
                )
              }
              fontSize="sm"
              _hover={{
                bg: 'primary.600',
                textColor: 'white',
              }}
              _current={{
                bg: 'primary.600',
                textColor: 'white',
                fontSize: 'sm',
                // w: 7,
              }}
            />
          ))}
        </PaginationPageGroup>
        <PaginationNext
          _hover={{
            bg: 'primary.400',
          }}
          bg="primary.300"
          onClick={() => {
            handlePageChange(currentPage + 1);
          }}
        >
          <BsChevronRight />
        </PaginationNext>
      </PaginationContainer>
    </AjnaPagination>
  );
}
