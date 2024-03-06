import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams, Outlet } from 'react-router-dom'
import { capitalize } from 'lodash'
import { makeStyles } from 'tss-react/mui'
import { Typography, Theme } from '@mui/material'

import { leagueActions } from 'state/league'
import Tabs from 'components/common/tabs'
import { LEAGUES_URL } from 'utilities/constants'

import type { League, FplTeam, Error } from 'types'

type Props = {
  league: League,
  fplTeams: FplTeam[],
  errors: Error[],
  submitting: boolean,
  fetchLeague: Function,
  fetchFplTeams: Function,
  updateFplTeamsSort: Function,
  updateLeague: Function,
  generateDraftPicks: (string) => void,
  createDraft: Function,
  initializeForm: () => void,
  sort: Object,
  fetching: boolean
}

type LeagueParams = {
  leagueId: string
}

type Tab = 'details' | 'fplTeams'

export type LeagueContext = {
  leagueId: string,
  setTab: (string: Tab) => void,
  setAction: (string?: string) => void
} & Props

const useStyles = makeStyles()((theme: Theme) => ({
  title: {
    padding: theme.spacing(1)
  }
}))

const TABS = {
  details: { label: 'Details', value: 'details', display: true },
  fplTeams: { label: 'Fpl Teams', value: 'fplTeams', display: true }
}

export const LeaguePage = (props: Props) => {
  const {
    league,
    fetchLeague
  } = props
  const { classes } = useStyles()
  const { leagueId } = useParams<LeagueParams>()
  const [tab, setTab] = useState<Tab>('details')
  const [action, setAction] = useState<string>()

  useEffect(
    () => {
      fetchLeague(leagueId)
    }, [fetchLeague, leagueId]
  )

  if (!leagueId) return null
  if (!league) return null

  const { name } = league

  TABS.details['extraTitleInfo'] = capitalize(action)

  const value: LeagueContext = {
    ...props,
    leagueId,
    setTab,
    setAction
  }

  return (
    <div data-testid='LeaguePage'>
      <Typography variant='h4' className={classes.title}>
        {name}
      </Typography>
      <Tabs
        currentTab={tab}
        tabs={Object.values(TABS)}
        url={LEAGUES_URL}
        id={leagueId}
        titleSubstr={name}
      />
      <Outlet context={value} />
    </div>
  )
}

const mapStateToProps = (state) => {
  const {
    league: {
      data: league,
      fplTeams,
      errors,
      submitting,
      sort,
      fetching
    }
  } = state

  return {
    league,
    fplTeams,
    errors,
    submitting,
    sort,
    fetching
  }
}

const matchDispatchToProps = {
  initializeForm: leagueActions.initializeForm,
  fetchLeague: leagueActions.fetchLeague,
  updateLeague: leagueActions.updateLeague,
  fetchFplTeams: leagueActions.fetchFplTeams,
  updateFplTeamsSort: leagueActions.updateFplTeamsSort,
  generateDraftPicks: leagueActions.generateDraftPicks,
  createDraft: leagueActions.createDraft
}

export default connect(mapStateToProps, matchDispatchToProps)(LeaguePage)
