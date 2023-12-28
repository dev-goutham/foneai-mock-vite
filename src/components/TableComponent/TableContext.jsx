import { createContext, useContext, useState } from 'react';

const TableContext = createContext();

export function TableProvider({
  children,
  dataLoading,
  tableData,
  pageSize,
  columns,
  TableRow,
  searchableField,
  unfilterableColumns,
  sortableColumns,
  stickyColumns = [],
  rowActions = {},
  RowSkeleton,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleColumns, setVisibleColumns] = useState(Object.keys(columns));

  return (
    <TableContext.Provider
      value={{
        dataLoading,
        tableData,
        pageSize,
        columns,
        TableRow,
        searchableField,
        unfilterableColumns,
        searchTerm,
        setSearchTerm,
        sortableColumns,
        visibleColumns,
        setVisibleColumns,
        rowActions,
        stickyColumns,
        RowSkeleton,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}

export const useTable = () => {
  return useContext(TableContext);
};
