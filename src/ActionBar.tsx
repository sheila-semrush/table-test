import { Flex, ScreenReaderOnly } from '@semcore/base-components';
import { Text } from '@semcore/typography';
import Button from '@semcore/button';
import Settings from '@semcore/icon/Settings/m';
import { columns as defaultColumns } from './data';
import DropdownMenu from '@semcore/dropdown-menu';

interface ActionBarProps {
  ariaMessage: string;
  selectedRowsDisplay: number;
  columns: typeof defaultColumns;
  setColumns: (columns: typeof defaultColumns) => void;
  handleDelete: () => void;
}

const ActionBar = ({ ariaMessage, selectedRowsDisplay, columns, setColumns, handleDelete }: ActionBarProps) => {
  const handleColumn = (value: string) => {
    console.log(value)
    const newColumns = columns.map(column => {
      if (column.name === value) {
        column.enabled = !column.enabled
      }
      return column;
    });
    setColumns(newColumns);
  }
  return (
    <Flex
      role='region'
      aria-label='Table action bar'
      alignItems='center'
      gap={6}
      px={4}
      py={2}
      position='sticky'
      top={0}
      zIndex={50}
      style={{
        backgroundColor: 'var(--intergalactic-bg-primary-neutral, #fff)',
        borderTopLeftRadius: 'var(--intergalactic-surface-rounded, 6px)',
        borderTopRightRadius: 'var(--intergalactic-surface-rounded, 6px)',
      }}
    >
      <ScreenReaderOnly role='status' aria-live='polite'>
        {ariaMessage}
      </ScreenReaderOnly>
      {selectedRowsDisplay !== 0 && (
        <>
          <Text size={200}>
            Selected rows:
            {' '}
            <Text bold>{selectedRowsDisplay}</Text>
          </Text>
          <Button use='tertiary' onClick={handleDelete}>
            Delete selected
          </Button>
        </>
      )}
      <DropdownMenu multiselect placement='bottom-end'>
        <DropdownMenu.Trigger
          ml='auto'
          tag={Button}
          use='tertiary'
          addonLeft={Settings}
          id='menu-trigger'
        >
          Manage columns
        </DropdownMenu.Trigger>
        <DropdownMenu.Menu>
          {columns.map(column => (
            <DropdownMenu.Item
              key={column.name}
              selected={column.enabled}
              onClick={() => handleColumn(column.name)}
              disabled={column.name === 'name'}
            >
              {column.children}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Menu>
      </DropdownMenu>
    </Flex>
  )
}

export default ActionBar;