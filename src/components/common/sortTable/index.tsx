import { MouseEvent, Fragment, useEffect, useRef } from 'react'
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

import { SetElHeight, GetElHeight } from 'utilities/helpers'

import type { PlayerSummary, TeamSummary, TeamPlayer, TeamFixture, Cell, Facets } from 'types'

type Props = {
  collection: PlayerSummary[] | TeamSummary[] | TeamPlayer[] | TeamFixture[],
  facets?: Facets,
  handleSortChange: Function,
  handleFilterChange?: Function,
  handleChangePage?: Function,
  sort: Object,
  filter?: Object,
  cells: Cell[],
  tab?: string,
  total?: number,
  page?: {
    limit: number,
    offset: number
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: '100vw',
      overflow: 'scroll',
      maxHeight: ({ tableHeight, paginationHeight }:{ tableHeight: number, paginationHeight: number }) => tableHeight - paginationHeight
    },
    table: {
      margin: '0 auto'
    },
    imageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    link: {
      textDecoration: 'none',
      color: '#0645AD'
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
      backgroundColor: '#ffffff',
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
    sort,
    filter,
    facets,
    cells,
    tab,
    total,
    page: { offset = 0, limit = 50 } = {}
  } = props

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

    handleSortChange(newSort)
  }

  const changePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
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
                    sort={sort}
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
      <TablePagination ref={paginationRef}
        component="div"
        count={total || collection.length}
        rowsPerPage={limit}
        rowsPerPageOptions={[limit]}
        page={offset / limit}
        onChangePage={changePage}
      />
    </Fragment>
  )
}

export default SortTable
