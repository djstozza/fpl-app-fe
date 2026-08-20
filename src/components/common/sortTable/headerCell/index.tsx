import { useState } from 'react'
import { TableCell, Tooltip, TableSortLabel, Box } from '@mui/material';

import Filter from '../filter'
import { colors } from 'utilities/colors'

import type { Facets } from 'types'

type Props = {
  cellId: string,
  label: string,
  filterParam?: string,
  facets?: Facets,
  sortParam?: string,
  sort: Object,
  filter?: Object,
  sticky?: boolean,
  toolTipLabel: string,
  handleSort: Function,
  handleFilterChange?: Function
}

const noPaddingRightSx = {
  paddingRight: 0,
  '&:last-child': {
    paddingRight: 0
  }
}

const mainHeaderCellSx = {
  zIndex: 3,
  position: 'sticky',
  left: 0,
  backgroundColor: colors.white
}

const HeaderCell = (props: Props) => {
  const {
    cellId,
    label,
    sticky = false,
    filterParam = '',
    facets = {},
    sortParam = '',
    sort,
    filter = {},
    toolTipLabel,
    handleSort,
    handleFilterChange
  } = props

  const sortDirection = sort[sortParam]
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null)
  const applyFilter = (filterName, selection) => {
    const newFilter = {
      ...filter,
      [filterName]: selection
    }

    if (!selection.length) delete newFilter[filterName]
    handleFilterChange?.(newFilter)
    setFilterAnchorEl(null)
  }

  return (
    <TableCell
      align='center'
      sx={[sticky && mainHeaderCellSx, Boolean(sortParam) && noPaddingRightSx]}
    >
      <Tooltip title={filterAnchorEl ? '' : toolTipLabel}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {label}
          {
            filterParam &&
            <Filter
              anchorEl={filterAnchorEl}
              setAnchorEl={setFilterAnchorEl}
              facetValues={facets[cellId] || []}
              filterParam={filterParam}
              applyFilter={applyFilter}
              filterSelection={filter[filterParam]}
            />
          }
          {
            sortParam &&
            <TableSortLabel
              hideSortIcon={!sortParam}
              onClick={handleSort(sortParam, sortDirection)}
              active={Boolean(sortDirection)}
              direction={sortDirection}
            />
          }
        </Box>
      </Tooltip>
    </TableCell>
  );
}

export default HeaderCell
