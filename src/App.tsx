import type { DataTableSort } from '@semcore/data-table';
import { DataTable } from '@semcore/data-table';
import { Flex } from '@semcore/base-components';
import { Text } from '@semcore/typography';
import Pagination from '@semcore/pagination';
import React from 'react';

type SortableColumn = Exclude<keyof typeof data[0], 'name' | 'category' | 'season'>;

const App = () => {
  const [sort, setSort] = React.useState<DataTableSort<keyof typeof data[0]>>(['temp', 'desc']);
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
    [sort],
  );
  const numberFormat = React.useMemo(() => new Intl.NumberFormat('en-US'), []);

  const handleSortChange: (sort: DataTableSort<string>, e?: React.SyntheticEvent) => void = (
    newSort,
  ) => {
    setSort(newSort as DataTableSort<SortableColumn>);
  };
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [selectedRowsDisplay, setSelectedRowsDisplay] = React.useState(0);
  const [ariaMessage, setAriaMessage] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(0);
  // const tableRef = React.useRef<HTMLDivElement>(null);

  const handleChangeSelectedRows = (value: string[]) => {
    setSelectedRows(value);
    if (!selectedRows.length) setAriaMessage('Action bar appeared before the table');
    if (value.length) setSelectedRowsDisplay(value.length);
  };

  // const handleDeselectAll = () => {
  //   setSelectedRows([]);
  //   tableRef.current?.focus();
  // };

  React.useEffect(() => {
    const timer = setTimeout(() => setAriaMessage(''), 300);
    return () => clearTimeout(timer);
  }, [ariaMessage]);

  const limit = 10;
  const tableData = sortedData.slice(currentPage * limit, currentPage * limit + limit);

  return (
    <>
      <Flex
        role='region'
        aria-label='Table action bar'
        alignItems='center'
        gap={6}
        py={2}
        px={3}
        style={{
          backgroundColor: 'var(--intergalactic-bg-primary-neutral, #ffffff)',
        }}
      >
        <Text size={200}>
          Selected rows:
          {' '}
          <Text bold>{selectedRowsDisplay}</Text>
        </Text>
        {/* <Button use='tertiary' onClick={handleDeselectAll}>
          Deselect all
        </Button> */}
      </Flex>
      <DataTable
        data={tableData}
        sort={sort}
        onSortChange={handleSortChange}
        aria-label='Sorting'
        wMax={800}
        selectedRows={selectedRows}
        onSelectedRowsChange={handleChangeSelectedRows}
        columns={columns}
        renderCell={(props) => {
          if (['name', 'category', 'season'].includes(props.columnName.toString())) {
            return props.defaultRender();
          }

          const rawValue = props.row[props.columnName as SortableColumn];

          return typeof rawValue === 'number' && rawValue !== -1
            ? numberFormat.format(rawValue)
            : 'n/a';
        }}
      />
      <Pagination
        mt={4}
        totalPages={Math.ceil(data.length / limit)}
        currentPage={currentPage + 1}
        onCurrentPageChange={(page) => setCurrentPage(page - 1)}
        aria-label='Table with selectable rows pagination'
      />
    </>
  );
};

export default App;

const data = [
  { name: 'Apple', category: 'Fruit', season: 'Fall', weight: 182, temp: 2 },
  { name: 'Apricot', category: 'Fruit', season: 'Summer', weight: 35, temp: 0 },
  { name: 'Artichoke', category: 'Vegetable', season: 'Spring', weight: 340, temp: 1 },
  { name: 'Asparagus', category: 'Vegetable', season: 'Spring', weight: 20, temp: 2 },
  { name: 'Banana', category: 'Fruit', season: 'Year - round', weight: 120, temp: 13 },
  { name: 'Beetroot', category: 'Vegetable', season: 'Winter', weight: 150, temp: 0 },
  { name: 'Blueberry', category: 'Fruit', season: 'Summer', weight: 1, temp: 1 },
  { name: 'Broccoli', category: 'Vegetable', season: 'Fall', weight: 225, temp: 0 },
  { name: 'Cabbage', category: 'Vegetable', season: 'Winter', weight: 900, temp: 1 },
  { name: 'Carrot', category: 'Vegetable', season: 'Year - round', weight: 60, temp: 0 },
  { name: 'Cauliflower', category: 'Vegetable', season: 'Fall', weight: 575, temp: 0 },
  { name: 'Cherry', category: 'Fruit', season: 'Summer', weight: 8, temp: 0 },
  { name: 'Cucumber', category: 'Vegetable', season: 'Summer', weight: 300, temp: 10 },
  { name: 'Eggplant', category: 'Vegetable', season: 'Summer', weight: 450, temp: 12 },
  { name: 'Fig', category: 'Fruit', season: 'Fall', weight: 50, temp: 0 },
  { name: 'Garlic', category: 'Vegetable', season: 'Summer', weight: 50, temp: 15 },
  { name: 'Grape', category: 'Fruit', season: 'Fall', weight: 5, temp: 1 },
  { name: 'Kale', category: 'Vegetable', season: 'Winter', weight: 60, temp: 0 },
  { name: 'Kiwi', category: 'Fruit', season: 'Winter', weight: 70, temp: 0 },
  { name: 'Lemon', category: 'Fruit', season: 'Winter', weight: 100, temp: 10 },
  { name: 'Lettuce', category: 'Vegetable', season: 'Spring', weight: 500, temp: 1 },
  { name: 'Mango', category: 'Fruit', season: 'Summer', weight: 330, temp: 12 },
  { name: 'Onion', category: 'Vegetable', season: 'Fall', weight: 110, temp: 15 },
  { name: 'Orange', category: 'Fruit', season: 'Winter', weight: 130, temp: 4 },
  { name: 'Peach', category: 'Fruit', season: 'Summer', weight: 150, temp: 0 },
  { name: 'Pear', category: 'Fruit', season: 'Fall', weight: 180, temp: 0 },
  { name: 'Radish', category: 'Vegetable', season: 'Spring', weight: 20, temp: 1 },
  { name: 'Spinach', category: 'Vegetable', season: 'Spring', weight: 30, temp: 0 },
  { name: 'Strawberry', category: 'Fruit', season: 'Spring', weight: 12, temp: 2 },
  { name: 'Zucchini', category: 'Vegetable', season: 'Summer', weight: 200, temp: 7 },
];

const columns = [
  { name: 'name', children: 'Name', justifyContent: 'left', sortable: true },
  {
    name: 'category',
    children: 'Category',
    // sortable: true,
  },
  {
    name: 'season',
    children: 'Season',
    // sortable: 'asc'
  },
  {
    name: 'weight',
    children: 'Weight (g)',
    gtcWidth: 'max-content',
    justifyContent: 'right',
    sortable: true,
  },
  {
    name: 'temp',
    children: 'Storage temp. (℃)',
    gtcWidth: 'max-content',
    justifyContent: 'right',
    sortable: true,
  },
]
