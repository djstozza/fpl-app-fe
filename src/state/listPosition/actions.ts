export const API_LIST_POSITION_SHOW = 'API_LIST_POSITION_SHOW'
export const CLEAR_VALID_SUBSTITUTIONS = 'CLEAR_VALID_SUBSTITUTIONS'

export const fetchValidSubstitutions = (listPositionId: string) => ({ type: API_LIST_POSITION_SHOW, listPositionId })
export const clearValidSubstitutions = () => ({ type: CLEAR_VALID_SUBSTITUTIONS })
