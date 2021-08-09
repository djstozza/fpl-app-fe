import type { TeamBase, Team } from 'types'

export const TEAM_BASE: TeamBase = {
  id: '1',
  shortName: 'ARS'
}

export const TEAM: Team = {
  id: '1',
  shortName: 'ARS',
  name: 'Arsenal',
  position: 2,
  played: 20,
  wins: 10,
  losses: 6,
  draws: 4,
  cleanSheets: 5,
  goalsFor: 20,
  goalsAgainst: 12,
  goalDifference: 8,
  points: 24,
  currentForm: ['W', 'W', 'D', 'L', 'D'],
  players: [],
  fixtures: []
}

export const USER = {
  id: '1',
  email: 'user@example.com',
  username: 'User'
}

export const ROUNDS = [
  {
    current: true,
    dataChecked: false,
    deadlineTime: '2021-08-11 11:29:24 UTC',
    deadlineTimeEpoch: 1628875800,
    finished: false,
    id: '1',
    isCurrent: false,
    isNext: true,
    isPrevious: false,
    miniDraft: false,
    name: 'Gameweek 1'
  },
  {
    current: false,
    dataChecked: false,
    deadlineTime: '2021-08-21T10:00:00Z',
    deadlineTimeEpoch: 1629540000,
    finished: false,
    id: '2',
    isCurrent: false,
    isNext: false,
    isPrevious: false,
    miniDraft: false,
    name: 'Gameweek 2',
    waiverDeadline: '2021-08-20T10:00:00.000Z'
  },
  {
    current: false,
    dataChecked: false,
    deadlineTime: '2021-08-28T10:00:00Z',
    deadlineTimeEpoch: 1630144800,
    finished: false,
    id: '3',
    isCurrent: false,
    isNext: false,
    isPrevious: false,
    miniDraft: false,
    name: 'Gameweek 3',
    waiverDeadline: '2021-08-27T10:00:00.000Z'
  }
]

export const POSITION_FACETS = [
  { label: 'Filter 1', value: '1' },
  { label: 'Filter 2', value: '2' },
  { label: 'Filter 3', value: '3' },
  { label: 'Filter 4', value: '4' }
]

export const TEAM_FACETS = [
  { label: 'ARS', value: '1' },
  { label: 'AVL', value: '2' },
  { label: 'BHA', value: '4' },
  { label: 'BRE', value: '3' },
  { label: 'BUR', value: '5' },
  { label: 'CHE', value: '6' },
  { label: 'CRY', value: '7' },
  { label: 'EVE', value: '8' },
  { label: 'LEE', value: '10' },
  { label: 'LEI', value: '9' },
  { label: 'LIV', value: '11' },
  { label: 'MCI', value: '12' },
  { label: 'MUN', value: '13' },
  { label: 'NEW', value: '14' },
  { label: 'NOR', value: '15' },
  { label: 'SOU', value: '16' },
  { label: 'TOT', value: '17' },
  { label: 'WAT', value: '18' },
  { label: 'WHU', value: '19' },
  { label: 'WOL', value: '20' }
]

export const PLAYER_FACETS = {
  positions: POSITION_FACETS,
  teams: TEAM_FACETS
}

export const PLAYER_SUMMARIES = [
  {
    id: '357',
    assists: 14,
    bonus: 40,
    chanceOfPlayingNextRound: 100,
    chanceOfPlayingThisRound: 100,
    cleanSheets: 12,
    externalId: '357',
    firstName: 'Harry',
    goalsScored: 23,
    lastName: 'Kane',
    minutes: 3083,
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    position: { id: '4', singularNameShort: 'FWD' },
    redCards: 0,
    saves: 0,
    status: 'a',
    team: { id: '17', shortName: 'TOT' },
    totalPoints: 242,
    yellowCards: 1
  },
  {
    id: '233',
    assists: 6,
    bonus: 21,
    chanceOfPlayingNextRound: null,
    chanceOfPlayingThisRound: null,
    cleanSheets: 11,
    externalId: '233',
    firstName: 'Mohamed',
    goalsScored: 22,
    lastName: 'Salah',
    minutes: 3077,
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    position: { id: '3', singularNameShort: 'MID' },
    redCards: 0,
    saves: 0,
    status: 'a',
    team: { id: '11', shortName: 'LIV' },
    totalPoints: 231,
    yellowCards: 0
  },
  {
    id: '210',
    assists: 11,
    bonus: 26,
    chanceOfPlayingNextRound: 100,
    chanceOfPlayingThisRound: 100,
    cleanSheets: 10,
    externalId: '189',
    firstName: 'Patrick',
    goalsScored: 17,
    lastName: 'Bamford',
    minutes: 3052,
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    position: { id: '4', singularNameShort: 'FWD' },
    redCards: 0,
    saves: 0,
    status: 'a',
    team: { id: '10', shortName: 'LEE' },
    totalPoints: 194,
    yellowCards: 3
  },
  {
    id: '30',
    assists: 0,
    bonus: 27,
    chanceOfPlayingNextRound: 100,
    chanceOfPlayingThisRound: 100,
    cleanSheets: 15,
    externalId: '30',
    firstName: 'Emiliano',
    goalsScored: 0,
    lastName: 'Martínez',
    minutes: 3420,
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 1,
    position: { id: '1', singularNameShort: 'GKP' },
    redCards: 0,
    saves: 142,
    status: 'a',
    team: { id: '2', shortName: 'AVL' },
    totalPoints: 186,
    yellowCards: 1
  },
  {
    id: '411',
    assists: 11,
    bonus: 21,
    chanceOfPlayingNextRound: null,
    chanceOfPlayingThisRound: null,
    cleanSheets: 11,
    externalId: '411',
    firstName: 'Aaron',
    goalsScored: 0,
    lastName: 'Cresswell',
    minutes: 3170,
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    position: { id: '2', singularNameShort: 'DEF' },
    redCards: 0,
    saves: 0,
    status: 'a',
    team: { id: '19', shortName: 'WHU' },
    totalPoints: 153,
    yellowCards: 3
  }
]
