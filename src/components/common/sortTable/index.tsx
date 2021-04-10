import { MouseEvent, useEffect, useRef } from 'react'
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
  filter?: Object,
  cells: Cell[],
  tab?: string
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
    filter = {},
    facets,
    cells,
    tab
  } = props

  const componentRef = useRef(null)
  const { height } = GetElHeight(componentRef)

  useEffect(() => {
    if (!height) window.dispatchEvent(new Event('resize'))
  }, [height])

  const classes = useStyles({ height })

  const handleSort = (id, direction) => (event: MouseEvent<unknown>) => {
    const newDirection = direction === 'asc' ? 'desc' : 'asc'
    const newSort = {
      [id]: newDirection
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
  )
}

export default SortTable
