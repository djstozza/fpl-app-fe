import { MouseEvent, Fragment, useEffect, useRef, useContext } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TablePagination,
  Typography,
  Box,
} from '@mui/material';
import HeaderCell from './headerCell'

import { SearchContext } from 'components/common/searchListener'
import { colors } from 'utilities/colors'

import { SetElHeight, GetElHeight } from 'utilities/helpers'

import type {
  DraftPick,
  FplTeam,
  PlayerSummary,
  TeamSummary,
  TeamPlayer,
  TeamFixture,
  History,
  HistoryPast,
  League,
  WaiverPick,
  MiniDraftPick,
  Trade,
  Cell,
  Facets
} from 'types'

type Props = {
  collection: (
    PlayerSummary[] |
      TeamSummary[] |
      TeamPlayer[] |
      TeamFixture[] |
      History[] |
      HistoryPast[] |
      League[] |
      FplTeam[] |
      DraftPick[] |
      WaiverPick[] |
      Trade[] |
      MiniDraftPick[]
  ),
  facets?: Facets,
  handleSortChange?: Function,
  handleFilterChange?: Function,
  handleChangePage?: Function,
  cells: Cell[],
  tab?: string,
  total?: number,
  page?: {
    limit: number,
    offset: number
  },
  noOffset?: boolean,
  fetching: boolean,
  name: string
}

export const noWrapSx = {
  whiteSpace: 'nowrap'
}

export const crestSx = (theme) => ({
  maxHeight: theme.spacing(3),
  marginRight: theme.spacing(1)
})

const mainCellSx = {
  position: 'sticky',
  left: 0,
  backgroundColor: colors.white,
  zIndex: 2
}

const SortTable = (props: Props) => {
  const {
    collection,
    handleSortChange,
    handleFilterChange,
    handleChangePage,
    facets,
    cells,
    tab,
    total,
    noOffset,
    fetching,
    name
  } = props
  const {
    search: {
      sort = {},
      filter = {},
      page: { offset = 0, limit = 50 } = {}
    } = {}
  } = useContext(SearchContext)

  const paginationRef = useRef<HTMLDivElement | null>(null)
  const tableRef = useRef<HTMLDivElement | null>(null)

  const { height: paginationHeight } = GetElHeight(paginationRef)
  const { height: tableHeight } = SetElHeight(tableRef)

  useEffect(() => {
    if (!tableHeight || paginationHeight) {
      window.dispatchEvent(new Event('resize'))
    }
  }, [tableHeight, paginationHeight])

  const handleSort = (name, direction) => (event: MouseEvent<unknown>) => {
    event.preventDefault()
    const newDirection = direction === 'asc' ? 'desc' : 'asc'
    const newSort = {
      [name]: newDirection
    }

    handleSortChange?.(newSort)
  }

  const changePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    event?.preventDefault()
    handleChangePage?.(newPage * limit)
  }

  return (
    <Fragment>
      <Box
        ref={tableRef}
        sx={{
          maxWidth: '100vw',
          overflow: 'scroll',
          maxHeight: tableHeight - paginationHeight
        }}
      >
        <Table
          data-testid='SortTable'
          size='small'
          stickyHeader
        >
          <TableHead>
            <TableRow>
              {
                cells.map(({ cellId, label, toolTipLabel, sortParam, sticky, filterParam }, key) => (
                  <HeaderCell
                    cellId={cellId}
                    label={label}
                    toolTipLabel={toolTipLabel}
                    sortParam={sortParam}
                    sticky={sticky}
                    sort={tab ? sort[tab] : sort}
                    facets={facets}
                    filterParam={filterParam}
                    handleSort={handleSort}
                    key={key}
                    filter={filter}
                    handleFilterChange={handleFilterChange}
                  />
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              collection && !collection.length
                ? (
                  <TableRow>
                    <TableCell colSpan={100}>
                      <Typography align='center'>
                      {
                        fetching ? `Loading ${name}...` : 'No results found'
                      }

                      </Typography>
                    </TableCell>
                  </TableRow>
                )
                : (
                  collection.map((record, rowKey) => (
                    <TableRow key={rowKey}>
                      {
                        cells.map(({ cellId, sticky, customRender }, cellKey) => (
                          <TableCell
                            align='center'
                            key={cellKey}
                            sx={sticky ? mainCellSx : undefined}
                          >
                            {customRender ? customRender(record, tab) : record[cellId]}
                          </TableCell>
                        ))
                      }
                    </TableRow>
                  ))
                )
            }
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        data-testid='SortTablePagination'
        ref={paginationRef}
        component='div'
        count={total || collection.length}
        rowsPerPage={parseInt(noOffset ? collection.length : limit)}
        rowsPerPageOptions={[parseInt(limit)]}
        page={offset / limit}
        onPageChange={changePage}
      />
    </Fragment>
  );
}

export default SortTable
