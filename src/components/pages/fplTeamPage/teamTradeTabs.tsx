import { Fragment, useEffect, useState } from 'react'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Theme,
  makeStyles,
  createStyles
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import SendIcon from '@material-ui/icons/Send'
import CheckIcon from '@material-ui/icons/Check'

import {
  FPL_TEAMS_URL,
  PLAYERS_URL,
} from 'utilities/constants'
import Tabs from 'components/common/tabs'
import TabPanel from 'components/common/tabPanel'
import ExpandableTableRow from 'components/common/expandableTableRow'
import TeamCrestLink from 'components/common/teamCrestLink'
import Link from 'components/common/link'
import { colors } from 'utilities/colors'

import type { FplTeamList, InterTeamTradeGroup } from 'types'
import type { FplTeamListsState } from 'state/fplTeamLists'
import type { InterTeamTradeGroupsState } from 'state/interTeamTradeGroups'

type Props = {
  isOwner: boolean,
  interTeamTradeGroups: InterTeamTradeGroupsState,
  fetchInterTeamTradeGroups: Function,
  fplTeamLists: FplTeamListsState,
  deadline?: Date,
  selectedFplTeamListId?: string,
  fplTeamId: string,
  action: string,
  addToInterTeamTradeGroup: Function
  cancelInterTeamTradeGroup: Function
  submitInterTeamTradeGroup: Function
  approveInterTeamTradeGroup: Function
  declineInterTeamTradeGroup: Function
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: '100vw',
      overflow: 'scroll'
    },
    noPadding: {
      padding: 0
    },
    cancel: {
      color: colors.red
    },
    add: {
      color: colors.green500
    },
    send: {
      color: colors.blue700
    }
  })
)

const TABS = {
  out: {
    label: 'Out',
    value: 'out',

    display: true
  },
  in: {
    label: 'In',
    value: 'in',

    display: true
  }
}

const TeamTradeTabs = (props: Props) => {
  const {
    isOwner,
    interTeamTradeGroups: { data: { outTradeGroups = [], inTradeGroups = [] } },
    fetchInterTeamTradeGroups,
    fplTeamLists,
    deadline,
    selectedFplTeamListId,
    fplTeamId,
    action = 'out'
  } = props

  const classes = useStyles()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [interTeamTradeGroup, setInterTeamTradeGroup] = useState<undefined | InterTeamTradeGroup>()
  const [actionStr, setActionStr] = useState('')

  const { id: interTeamTradeGroupId = '', trades = [] } = interTeamTradeGroup || {}

  const handleOpenDialog = (interTeamTradeGroup, actionStr) => {
    setInterTeamTradeGroup(interTeamTradeGroup)
    setActionStr(actionStr)
    setDialogOpen(true)
  }

  const handleConfirm = () => {
    setDialogOpen(false)
    props[`${actionStr.toLowerCase()}InterTeamTradeGroup`](interTeamTradeGroupId)
    setActionStr('')
    setInterTeamTradeGroup(undefined)

  }

  useEffect(
    () => {
      if (!selectedFplTeamListId) return

      fetchInterTeamTradeGroups(selectedFplTeamListId)
    }, [fetchInterTeamTradeGroups, selectedFplTeamListId]
  )

  const labelRenderer = ({ round: { name } }: FplTeamList) => name
  const tabUrl = selectedFplTeamListId
    ? `${FPL_TEAMS_URL}/${fplTeamId}/teamLists/${selectedFplTeamListId}/teamTrades`
    : `${FPL_TEAMS_URL}/${fplTeamId}/teamLists/teamTrades`

  const tradeGroups = action === 'out' ? outTradeGroups : inTradeGroups
  const permitted = isOwner && deadline


  if (!selectedFplTeamListId) return null

  return (
    <Fragment>
      <TabPanel
        collection={fplTeamLists.data}
        collectionId={selectedFplTeamListId}
        labelRenderer={labelRenderer}
        tab='teamTrades'
        url={`${FPL_TEAMS_URL}/${fplTeamId}/teamLists`}
      />
      <Tabs
        currentTab={action}
        tabs={Object.values(TABS)}
        url={tabUrl}
      />
      <div className={classes.container}>
        <Table
          size='small'
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align='center'>
                <Tooltip title={`${action === 'out' ? 'In' : 'Out'} Fpl Team`}>
                  <div>
                    FT
                  </div>
                </Tooltip>
              </TableCell>
              <TableCell align='center'>
                <Tooltip title='Status'>
                  <div>
                    S
                  </div>
                </Tooltip>
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {
              tradeGroups.map((interTeamTradeGroup, i) => {
                const { outFplTeam, inFplTeam, status, trades, canApprove, canSubmit, canCancel } = interTeamTradeGroup
                const fplTeam = action === 'out' ? inFplTeam : outFplTeam

                const expandComponent = (
                  <TableCell colSpan={4} className={classes.noPadding}>
                    <Table
                      size='small'
                      stickyHeader
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell />
                          <TableCell align='center'>
                            <Tooltip title='Out Player'>
                              <div>
                                OP
                              </div>
                            </Tooltip>
                          </TableCell>
                          <TableCell align='center'>
                            <Tooltip title='Out Team'>
                              <div>
                                OT
                              </div>
                            </Tooltip>
                          </TableCell>
                          <TableCell align='center'>
                            <Tooltip title='In Player'>
                              <div>
                                IP
                              </div>
                            </Tooltip>
                          </TableCell>
                          <TableCell align='center'>
                            <Tooltip title='In Team'>
                              <div>
                                IT
                              </div>
                            </Tooltip>
                          </TableCell>
                          <TableCell align='center'>
                            <Tooltip title='Position'>
                              <div>
                                P
                              </div>
                            </Tooltip>
                          </TableCell>
                          {
                            permitted && <TableCell />
                          }
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          trades.map((trade, j) => {
                            const {
                              outPlayer: { id: outPlayerId, firstName: outFirstName, lastName: outLastName },
                              outTeam,
                              inPlayer: { id: inPlayerId, firstName: inFirstName, lastName: inLastName },
                              inTeam,
                              position
                            } = trade
                            return (
                              <TableRow key={j}>
                                <TableCell />
                                <TableCell align='center'>
                                  <Link to={`${PLAYERS_URL}/${action === 'out' ? outPlayerId : inPlayerId}`}>
                                    {
                                      action === 'out'
                                        ? `${outFirstName} ${outLastName}`
                                        : `${inFirstName} ${inLastName}`
                                    }
                                  </Link>
                                </TableCell>
                                <TableCell align='center'>
                                  <TeamCrestLink team={action === 'out' ? outTeam : inTeam} />
                                </TableCell>
                                <TableCell align='center'>
                                  <Link to={`${PLAYERS_URL}/${action === 'out' ? inPlayerId : outPlayerId}`}>
                                    {
                                      action === 'out'
                                        ? `${inFirstName} ${inLastName}`
                                        : `${outFirstName} ${outLastName}`
                                    }
                                  </Link>
                                </TableCell>
                                <TableCell align='center'>
                                  <TeamCrestLink team={inTeam} />
                                </TableCell>
                                <TableCell align='center'>
                                  {position}
                                </TableCell>
                                {
                                  permitted && canCancel &&
                                  <TableCell align='center'>
                                    <Tooltip title='Remove player'>
                                      <IconButton size='small'>
                                        <CloseIcon className={classes.cancel} />
                                      </IconButton>
                                    </Tooltip>
                                  </TableCell>
                                }

                              </TableRow>
                            )
                          })
                        }
                      </TableBody>
                    </Table>
                  </TableCell>
                )
                return (
                  <ExpandableTableRow
                    key={i}
                    expandComponent={expandComponent}
                  >
                    <TableCell align='center'>
                      {fplTeam.name}
                    </TableCell>
                    <TableCell align='center'>
                      {status}
                    </TableCell>
                    {
                      permitted &&
                      <TableCell align='center'>
                        {
                          canCancel &&
                          <Tooltip title='Cancel'>
                            <IconButton
                              size='small'
                              onClick={() => handleOpenDialog(interTeamTradeGroup, 'Cancel')}
                            >
                              <CloseIcon className={classes.cancel} />
                            </IconButton>
                          </Tooltip>
                        }
                        {
                          canSubmit &&
                          <Tooltip title='Add player'>
                            <IconButton
                              size='small'
                            >
                              <AddIcon className={classes.add} />
                            </IconButton>
                          </Tooltip>
                        }
                        {
                          canSubmit &&
                          <Tooltip title='Submit'>
                            <IconButton
                              size='small'
                              onClick={() => handleOpenDialog(interTeamTradeGroup, 'Submit')}
                            >
                              <SendIcon className={classes.send} />
                            </IconButton>
                          </Tooltip>
                        }
                        {
                          canApprove &&
                          <Fragment>
                            <Tooltip title='Approve'>
                              <IconButton size='small'>
                                <CheckIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title='Decline'>
                              <IconButton size='small'>
                                <CloseIcon className={classes.cancel} />
                              </IconButton>
                            </Tooltip>
                          </Fragment>
                        }
                      </TableCell>
                    }
                  </ExpandableTableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogTitle>
          Confirm {actionStr}
        </DialogTitle>
        <DialogContent>
          <div>
            Out: {
              trades.map(trade => {
                const { firstName, lastName } = trade[`${action === 'out' ? 'out' : 'in'}Player`]

                return `${firstName} ${lastName}`
              }).join(', ')
            }
          </div>
          <div>
            In: {
              trades.map(trade => {
                const { firstName, lastName } = trade[`${action === 'out' ? 'in' : 'out'}Player`]

                return `${firstName} ${lastName}`
              }).join(', ')
            }
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            color='default'
            onClick={() => setDialogOpen(false)}

          >
            Cancel
          </Button>
          <Button
            onClick={() => handleConfirm()}
            variant='contained'
            color='secondary'

          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}


export default TeamTradeTabs
