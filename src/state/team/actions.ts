export const API_TEAMS_SHOW = 'API_TEAMS_SHOW'
export const FETCH_TEAM_PLAYERS = 'FETCH_TEAM_PLAYERS'
export const API_TEAMS_FIXTURES_INDEX = 'API_TEAMS_FIXTURES_INDEX'
export const API_TEAM_PLAYERS_INDEX = 'API_TEAMS_PLAYERS_INDEX'
export const UPDATE_TEAM_PLAYERS_SORT = 'UPDATE_TEAM_PLAYERS_SORT'
export const UPDATE_TEAM_FIXTURES_SORT = 'UPDATE_TEAM_FIXTURES_SORT'

type Props = {
  id: string,
  tab: string,
  sort: {
    [key: string]:  {
      [key: string]: string
    }
  }
}

type FetchTeamPlayersProps = {
  id: string,
  sort: {
    [key: string]:  {
      [key: string]: string
    }
  }
}

type UpdateProps = {
  tab: string,
  sort: {

      [key: string]: string

  }
}

export const fetchTeam = (teamId: string, tab: string, sort: Object) =>
  ({ type: API_TEAMS_SHOW, teamId, tab, sort })

export const fetchTeamFixtures = ({ id: teamId, tab, sort }: Props) =>
  ({ type: API_TEAMS_FIXTURES_INDEX, teamId, tab, sort })

export const fetchTeamPlayers = ({ id: teamId, sort }: FetchTeamPlayersProps) =>
  ({ type: FETCH_TEAM_PLAYERS, teamId, sort })

export const updateTeamPlayersSort = ({ tab, sort }: UpdateProps) =>
    ({ type: UPDATE_TEAM_PLAYERS_SORT, tab, sort })

export const updateTeamFixturesSort = ({ tab, sort }: UpdateProps) =>
    ({ type: UPDATE_TEAM_FIXTURES_SORT, tab, sort })
