import { MouseEvent, Fragment, useEffect, useRef, useContext } from 'react'
import classnames from 'classnames'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TablePagination,
  Theme,
  makeStyles,
  createStyles
} from '@material-ui/core'
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
      Trade[]
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
  noOffset?: boolean
}

type HeightProps = {
  tableHeight: number,
  paginationHeight: number
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: '100vw',
      overflow: 'scroll',
      maxHeight: ({ tableHeight, paginationHeight }: HeightProps) => tableHeight - paginationHeight
    },
    table: {
      margin: '0 auto'
    },
    noWrap: {
      whiteSpace: 'nowrap'
    },
    crest: {
      maxHeight: theme.spacing(3),
      marginRight: theme.spacing(1)
    },
    mainCell: {
      position: 'sticky',
      left: 0,
      backgroundColor: colors.white,
      zIndex: 2
    },
  })
)

const SortTable = (props: Props) => {
  const {
    collection = [],
    handleSortChange,
    handleFilterChange,
    handleChangePage,
    facets,
    cells,
    tab,
    total,
    noOffset
  } = props
  const {
    search: {
      sort = {},
      filter = {},
      page: { offset = 0, limit = 50 } = {}
    } = {}
  } = useContext(SearchContext)

  const paginationRef = useRef(null)
  const tableRef = useRef(null)

  const { height: paginationHeight } = GetElHeight(paginationRef)
  const { height: tableHeight } = SetElHeight(tableRef)

  useEffect(() => {
    if (!tableHeight || paginationHeight) {
      window.dispatchEvent(new Event('resize'))
    }
  }, [tableHeight, paginationHeight])

  const classes = useStyles({ tableHeight, paginationHeight })

  const handleSort = (name, direction) => (event: MouseEvent<unknown>) => {
    const newDirection = direction === 'asc' ? 'desc' : 'asc'
    const newSort = {
      [name]: newDirection
    }

    handleSortChange && handleSortChange(newSort)
  }

  const changePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    handleChangePage && handleChangePage(newPage * limit)
  }

  return (
    <Fragment>
      <div ref={tableRef} className={classes.container}>
        <Table
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
              collection.map((record, rowKey) => (
                <TableRow key={rowKey}>
                  {
                    cells.map(({ cellId, sticky, customRender }, cellKey) => (
                      <TableCell
                        align='center'
                        key={cellKey}
                        className={classnames({ [classes.mainCell]: sticky })}
                      >
                        {customRender ? customRender(record, classes, tab) : record[cellId]}
                      </TableCell>
                    ))
                  }
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
      <TablePagination
        ref={paginationRef}
        component='div'
        count={total || collection.length}
        rowsPerPage={noOffset ? total || limit : limit}
        rowsPerPageOptions={[limit]}
        page={offset / limit}
        onChangePage={changePage}
      />
    </Fragment>
  )
}

export default SortTable
