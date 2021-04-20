export const API_TEAMS_INDEX = 'API_TEAMS_INDEX'
export const GET_NEW_SORT = 'GET_NEW_SORT'
export const UPDATE_TEAMS_SORT = 'UPDATE_TEAMS_SORT'

export const fetchTeams = ({ sort }:{ sort: Object }) => ({ type: API_TEAMS_INDEX, sort })
export const updateSort = (sort: Object) => ({ type: UPDATE_TEAMS_SORT, sort })
