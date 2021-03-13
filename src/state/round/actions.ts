export const API_ROUNDS_SHOW = 'API_ROUNDS_SHOW'

export const fetchRound = (roundId: number) => ({ type: API_ROUNDS_SHOW, roundId })
