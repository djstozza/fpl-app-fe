import { useState } from 'react'
import classnames from 'classnames'
import {
  TableCell,
  Theme,
  Tooltip,
  TableSortLabel,
  makeStyles,
  createStyles
} from '@material-ui/core'

import Filter from './filter'

import type { Facets } from 'types'

type Props = {
  cellId: string,
  label: string,
  filterParam?: string,
  facets?: Facets,
  sortParam?: string,
  sort: Object,
  filter: Object,
  sticky?: boolean,
  toolTipLabel: string,
  handleSort: Function,
  handleFilterChange?: Function
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    noPaddingRight: {
      paddingRight: 0,
      '&:last-child': {
        paddingRight: 0
      }
    },
    mainHeaderCell: {
      zIndex: 3
    },
    mainCell: {
      position: 'sticky',
      left: 0,
      backgroundColor: '#ffffff',
      zIndex: 2
    },
    headerWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
)

const HeaderCell = (props: Props) => {
  const {
    cellId,
    label,
    sticky = false,
    filterParam = '',
    facets = {},
    sortParam = '',
    sort,
    filter,
    toolTipLabel,
    handleSort,
    handleFilterChange
  } = props

  const classes = useStyles()
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
      className={classnames({ [classes.mainHeaderCell]: sticky, [classes.noPaddingRight]: Boolean(sortParam) })}
    >
      <Tooltip title={Boolean(filterAnchorEl) ? '' : toolTipLabel}>
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
              hideSortIcon={!Boolean(sortParam)}
              onClick={handleSort(sortParam, sortDirection)}
              active={Boolean(sortDirection)}
              direction={sortDirection}
            />
          }
        </div>
      </Tooltip>
    </TableCell>
  )
}

export default HeaderCell
