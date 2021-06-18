export const API_LEAGUE_DRAFT_PICKS_INDEX = 'API_LEAGUE_DRAFT_PICKS_INDEX'
export const API_LEAGUE_DRAFT_PICKS_FACETS_INDEX = 'API_LEAGUE_DRAFT_PICKS_FACETS_INDEX'
export const API_LEAGUE_DRAFT_PICK_UPDATE = 'API_LEAGUE_DRAFT_PICK_UPDATE'
export const UPDATE_DRAFT_PICKS_FILTER = 'UPDATE_DRAFT_PICKS_FILTER'
export const UPDATE_DRAFT_PICKS_SORT = 'UPDATE_DRAFT_PICKS_SORT'
export const UPDATE_DRAFT_PICKS_PAGE = 'UPDATE_DRAFT_PICKS_PAGE'

type Props = {
  id: string,
  sort: Object,
  filter?: Object,
  page: Object
}

type UpdateDraftProps = {
  playerId?: string,
  miniDraft?: boolean,
  nextDraftPickId: string
}

export const fetchDraftPicks = ({ id, sort, filter, page }: Props) =>
  ({ type: API_LEAGUE_DRAFT_PICKS_INDEX, leagueId: id, sort, filter, page })

export const fetchDraftPickFacets = () => ({ type: API_LEAGUE_DRAFT_PICKS_FACETS_INDEX })

export const updateFilter = (filter: Object) => ({ type: UPDATE_DRAFT_PICKS_FILTER, filter })
export const updateSort = (sort: Object) => ({ type: UPDATE_DRAFT_PICKS_SORT, sort })
export const updatePage = (offset: string) => ({ type: UPDATE_DRAFT_PICKS_PAGE, offset })
export const updateDraftPick = ({ playerId, miniDraft, nextDraftPickId }: UpdateDraftProps) =>
  ({ type: API_LEAGUE_DRAFT_PICK_UPDATE, playerId, miniDraft, nextDraftPickId })
