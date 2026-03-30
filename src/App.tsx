import type { DataTableSort } from '@semcore/data-table';
import { DataTable } from '@semcore/data-table';
import Pagination from '@semcore/pagination';
import Card from '@semcore/card';
import ActionBar from './ActionBar';
import './App.css';
import '../node_modules/@semcore/core/lib/theme/themes/auto.css';
import { data as defaultData, columns as defaultColumns } from './data';
import React from 'react';
import { NoData } from '@semcore/widget-empty';

const App = () => {
  const [columns, setColumns] = React.useState(defaultColumns);
  const [data, setData] = React.useState(defaultData);

  type SortableColumn = keyof typeof data[0];
  const [sort, setSort] = React.useState<DataTableSort<SortableColumn>>(['name', 'asc']);
  const sortedData = React.useMemo(
    () =>
      [...data].sort((aRow, bRow) => {
        const [prop, sortDirection] = sort;
        const a = aRow[prop as SortableColumn];
        const b = bRow[prop as SortableColumn];
        if (a === b) return 0;
        if (sortDirection === 'asc') return a > b ? 1 : -1;
        else return a > b ? -1 : 1;
      }),
    [sort, data],
  );

  const handleSortChange: (sort: DataTableSort<SortableColumn>, e?: React.SyntheticEvent) => void = (
    newSort,
  ) => {
    setSort(newSort as DataTableSort<SortableColumn>);
  };
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [ariaMessage, setAriaMessage] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(0);

  const handleChangeSelectedRows = (value: string[]) => {
    setSelectedRows(value);
    if (!selectedRows.length) setAriaMessage('Actions are available before the table');
    console.log(selectedRows)
  };

  React.useEffect(() => {
    const timer = setTimeout(() => setAriaMessage(''), 300);
    return () => clearTimeout(timer);
  }, [ariaMessage]);

  const handleDelete = () => {
    const newData = data.filter(row => !selectedRows.includes(row.name))
    setData(newData);
    handleChangeSelectedRows([]);
    setAriaMessage('Rows deleted');
    tableRef.current?.focus();
  };

  const limit = 10;
  const tableData = sortedData.slice(currentPage * limit, currentPage * limit + limit);

  const tableRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <h1>Welcome to the Table testing page</h1>
      <Card wMax={800}>
        <Card.Body px={0} pt={0}>
          <ActionBar
            ariaMessage={ariaMessage}
            selectedRowsDisplay={selectedRows.length}
            columns={columns}
            setColumns={setColumns}
            handleDelete={handleDelete}
          />
          <DataTable
            data={tableData}
            sideIndents='wide'
            sort={sort}
            onSortChange={handleSortChange}
            defaultGridTemplateColumnWidth='1fr'
            aria-label='Fruits and vegetables'
            headerProps={{ sticky: true, top: 44 }}
            uniqueRowKey='name'
            ref={tableRef}
            selectedRows={selectedRows}
            onSelectedRowsChange={handleChangeSelectedRows}
            columns={columns.filter(column => column.enabled)}
            renderEmptyData={() => <NoData w='100%' my={10} description="There's no data to show!" />}
          />
          <Pagination
            mt={4}
            mx={4}
            totalPages={Math.ceil(data.length / limit)}
            currentPage={currentPage + 1}
            onCurrentPageChange={(page) => setCurrentPage(page - 1)}
            aria-label='Table pagination'
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default App;
