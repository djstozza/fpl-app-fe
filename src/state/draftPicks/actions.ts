export const API_LEAGUE_DRAFT_PICKS_INDEX = 'API_LEAGUE_DRAFT_PICKS_INDEX'
export const API_LEAGUE_DRAFT_PICKS_FACETS_INDEX = 'API_LEAGUE_DRAFT_PICKS_FACETS_INDEX'
export const API_LEAGUE_DRAFT_PICK_UPDATE = 'API_LEAGUE_DRAFT_PICK_UPDATE'
export const API_LEAGUE_DRAFT_PICKS_STATUS_INDEX = 'API_LEAGUE_DRAFT_PICKS_STATUS_INDEX'
export const UPDATE_DRAFT_PICKS_FILTER = 'UPDATE_DRAFT_PICKS_FILTER'
export const UPDATE_DRAFT_PICKS_SORT = 'UPDATE_DRAFT_PICKS_SORT'

type Props = {
  sort: Object,
  filter?: Object
}

type UpdateDraftProps = {
  playerId?: string,
  miniDraft?: boolean,
  nextDraftPickId: string
}

export const fetchDraftPicks = ({ sort, filter }: Props) =>
  ({ type: API_LEAGUE_DRAFT_PICKS_INDEX, sort, filter })

export const fetchDraftPicksStatus = (leagueId: string) => ({ type: API_LEAGUE_DRAFT_PICKS_STATUS_INDEX, leagueId })
export const fetchDraftPickFacets = () => ({ type: API_LEAGUE_DRAFT_PICKS_FACETS_INDEX })

export const updateFilter = (filter: Object) => ({ type: UPDATE_DRAFT_PICKS_FILTER, filter })
export const updateSort = (sort: Object) => ({ type: UPDATE_DRAFT_PICKS_SORT, sort })
export const updateDraftPick = ({ playerId, miniDraft, nextDraftPickId }: UpdateDraftProps) =>
  ({ type: API_LEAGUE_DRAFT_PICK_UPDATE, playerId, miniDraft, nextDraftPickId })
