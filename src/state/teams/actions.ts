export const API_TEAMS_INDEX = 'API_TEAMS_INDEX'
export const GET_NEW_SORT = 'GET_NEW_SORT'
export const UPDATE_TEAMS_QUERY = 'UPDATE_TEAMS_QUERY'

type Props = {
  sort: Object,
  method: string
}

export const fetchTeams = ({ sort, method }: Props) => ({ type: API_TEAMS_INDEX, sort, method })
export const updateQuery = (sort: Object) => ({ type: UPDATE_TEAMS_QUERY, sort })
