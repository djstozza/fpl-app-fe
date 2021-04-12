import { MouseEvent, useEffect, useRef } from 'react'
import qs from 'qs'
import classnames from 'classnames'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Theme,
  makeStyles,
  createStyles
} from '@material-ui/core'
import HeaderCell from './headerCell'

import { GetElHeight } from 'utilities/helpers'

import type { PlayerSummary, TeamSummary, TeamPlayer, TeamFixture, Cell, Facets } from 'types'

type Props = {
  collection: PlayerSummary[] | TeamSummary[] | TeamPlayer[] | TeamFixture[],
  facets?: Facets,
  handleSortChange: Function,
  handleFilterChange?: Function
  sort: Object,
  cells: Cell[],
  tab?: string,
  fetchAction: Function,
  id?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: '100vw',
      overflow: 'scroll',
      maxHeight: ({ height }:{ height: number }) => height
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
    sort,
    facets,
    cells,
    tab,
    fetchAction,
    id
  } = props

  const componentRef = useRef(null)
  const { height } = GetElHeight(componentRef)

  const search = window.location.search.substring(1)
  const query = qs.parse(search) || {}
  const sortQuery = tab ? (query.sort || {})[tab] || sort[tab] : query.sort || sort
  const filterQuery = tab ? (query.filter || {})[tab] : query.filter

  useEffect(() => {
    if (!height) window.dispatchEvent(new Event('resize'))
  }, [height])

  const classes = useStyles({ height })

  useEffect(
    () => {
      fetchAction({ id, sort: sortQuery, tab, filter: filterQuery })
    }, [fetchAction, id, tab, search]
  )

  const handleSort = (name, direction) => (event: MouseEvent<unknown>) => {
    const newDirection = direction === 'asc' ? 'desc' : 'asc'
    const newSort = {
      [name]: newDirection
    }

    handleSortChange(newSort)
  }

  return (
    <div ref={componentRef} className={classes.container}>
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
                  sort={sortQuery}
                  facets={facets}
                  filterParam={filterParam}
                  handleSort={handleSort}
                  key={key}
                  filter={filterQuery}
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
  )
}

export default SortTable
