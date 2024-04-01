import { useState } from 'react'
import { makeStyles } from 'tss-react/mui';
import { TableCell, Tooltip, TableSortLabel } from '@mui/material';
import classNames from 'classnames';

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

const useStyles = makeStyles()(() =>
  ({
    noPaddingRight: {
      paddingRight: 0,
      '&:last-child': {
        paddingRight: 0
      }
    },

    mainHeaderCell: {
      zIndex: 3,
      position: 'sticky',
      left: 0,
      backgroundColor: colors.white
    },

    headerWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }));

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

  const { classes } = useStyles()
  const sortDirection = sort[sortParam]
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null)
  const applyFilter = (filterName, selection) => {
    const newFilter = {
      ...filter,
      [filterName]: selection
    }

    if (!selection.length) delete newFilter[filterName]
    handleFilterChange && handleFilterChange(newFilter)
    setFilterAnchorEl(null)
  }

  return (
    <TableCell
      align='center'
      className={classNames({ [classes.mainHeaderCell]: sticky, [classes.noPaddingRight]: sortParam })}
    >
      <Tooltip title={filterAnchorEl ? '' : toolTipLabel}>
        <div className={classes.headerWrapper}>
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
        </div>
      </Tooltip>
    </TableCell>
  );
}

export default HeaderCell
