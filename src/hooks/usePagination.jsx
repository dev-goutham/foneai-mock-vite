import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePagination as useAjnaPagination } from '@ajna/pagination';

export const usePagination = ({ total, pageSize, shouldNavigate }) => {
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { pages, pagesCount, currentPage, setCurrentPage, isDisabled } =
    useAjnaPagination({
      total,
      initialState: {
        pageSize,
        isDisabled: false,
        currentPage: page,
      },
    });

  useEffect(() => {
    setPage(+(searchParams.get('page') || 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handlePageChange = page => {
    if (shouldNavigate) {
      searchParams.set('page', page);
      const url = `?` + searchParams.toString();
      navigate(url);
    }
    setPage(page);
    setCurrentPage(page);
  };

  return {
    pages,
    currentPage,
    pagesCount,
    isDisabled,
    handlePageChange,
  };
};
