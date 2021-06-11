export const API_LEAGUES_SHOW = 'API_LEAGUES_SHOW'
export const API_LEAGUES_UPDATE = 'API_LEAGUES_UPDATE'
export const API_LEAGUE_FPL_TEAMS_INDEX = 'API_LEAGUE_FPL_TEAMS_INDEX'
export const API_LEAGUE_GENERATE_DRAFT_PICKS = 'API_LEAGUE_GENERATE_DRAFT_PICKS'
export const API_LEAGUE_CREATE_DRAFT = 'API_LEAGUE_CREATE_DRAFT'
export const UPDATE_LEAGUE_FPL_TEAMS_SORT = 'UPDATE_LEAGUE_FPL_TEAMS_SORT'

type Props = {
  league: {
    name: string,
    code: string
  }
}

export const fetchLeague = (leagueId: string) => ({ type: API_LEAGUES_SHOW, leagueId })
export const updateLeague = ({ league }: Props) => ({ type: API_LEAGUES_UPDATE, league })
export const fetchFplTeams = ({ sort }) => ({ type: API_LEAGUE_FPL_TEAMS_INDEX, sort })
export const generateDraftPicks = (leagueId: string) => ({ type: API_LEAGUE_GENERATE_DRAFT_PICKS, leagueId })
export const updateFplTeamsSort = ({ sort }:{ sort: Object }) => ({ type: UPDATE_LEAGUE_FPL_TEAMS_SORT, sort })
export const createDraft = (leagueId: string) => ({ type: API_LEAGUE_CREATE_DRAFT, leagueId })
