import { MouseEvent, useState, useEffect, useRef } from 'react'
import classnames from 'classnames'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Theme,
  Tooltip,
  TableSortLabel,
  makeStyles,
  createStyles
} from '@material-ui/core'

import { GetElHeight } from 'utilities/helpers'

import type { PlayerSummary, TeamFixture, Cell } from 'types'

type Props = {
  collection: PlayerSummary[] | TeamFixture[],
  handleSortChange: Function,
  sort: Object,
  recordName: string,
  cells: Cell[],
  tab?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    noPaddingRight: {
      paddingRight: 0,
      '&:last-child': {
        paddingRight: 0
      }
    },
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
    mainHeaderCell: {
      zIndex: 3
    },
    mainCell: {
      position: 'sticky',
      left: 0,
      backgroundColor: '#ffffff',
      zIndex: 2
    }
  })
)

const SortTable = (props: Props) => {
  const { collection = [], handleSortChange, sort, recordName, cells, tab } = props
  const sortAttr = sort[recordName]

  const componentRef = useRef(null)
  const { height } = GetElHeight(componentRef)

  useEffect(() => {
    if (!height) window.dispatchEvent(new Event('resize'))
  }, [height])

  const classes = useStyles({ height })

  const handleSort = (sort, id, direction) => (event: MouseEvent<unknown>) => {
    console.log(sort, id, direction)

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
              cells.map(({ cellId, label, toolTipLabel, sort, sticky }, key) => (
                <TableCell
                  align={'center'}
                  key={key}
                  className={classnames({ [classes.mainHeaderCell]: sticky, [classes.noPaddingRight]: sort })}
                >
                  <Tooltip title={toolTipLabel}>
                    {
                      sort
                      ?  <TableSortLabel
                          hideSortIcon={!sort}
                          onClick={
                            handleSort(sort, cellId, sortAttr[cellId])
                          }
                          active={Boolean(sortAttr[cellId])}
                          direction={sortAttr[cellId]}
                        >
                          {label}
                        </TableSortLabel>
                      : <div>{label}</div>
                    }

                  </Tooltip>
                </TableCell>
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
