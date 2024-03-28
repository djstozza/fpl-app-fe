import type { TeamBase, Team, Fixture } from 'types'

export const GOALKEEPER = {
  id: '1',
  singularNameShort: 'GKP',
  singularName: 'Goalkeeper'
}

export const DEFENDER = {
  id: '2',
  singularNameShort: 'DEF',
  singularName: 'Defender'
}

export const MIDFIELDER = {
  id: '3',
  singularNameShort: 'MID',
  singularName: 'Midfielder'
}

export const FORWARD = {
  id: '4',
  singularNameShort: 'FWD',
  singularName: 'Forward'
}

export const POSITIONS = [
  GOALKEEPER,
  DEFENDER,
  MIDFIELDER,
  FORWARD
]

export const TEAM_BASE: TeamBase = {
  id: '1',
  shortName: 'ARS'
}

export const ARSENAL_TEAM_BASE: TeamBase = {
  id: '1',
  shortName: 'ARS'
}

export const BRENTFORD_TEAM_BASE: TeamBase = {
  id: '3',
  shortName: 'BRE'
}

export const BRIGHTON_TEAM_BASE: TeamBase = {
  id: '4',
  shortName: 'BHA'
}

export const BURNLEY_TEAM_BASE: TeamBase = {
  id: '5',
  shortName: 'BUR'
}

export const CHELSEA_TEAM_BASE: TeamBase = {
  id: '6',
  shortName: 'CHE'
}

export const CRYSTAL_PALACE_TEAM_BASE: TeamBase = {
  id: '7',
  shortName: 'CRY'
}

export const LEEDS_TEAM_BASE: TeamBase = {
  id: '8',
  shortName: 'LEE'
}

export const LEICESTER_TEAM_BASE: TeamBase = {
  id: '9',
  shortName: 'LEI'
}

export const LIVERPOOL_TEAM_BASE: TeamBase = {
  id: '11',
  shortName: 'LIV'
}

export const MANCHESTER_CITY_TEAM_BASE: TeamBase = {
  id: '12',
  shortName: 'MCI'
}

export const MANCHESTER_UNITED_TEAM_BASE: TeamBase = {
  id: '13',
  shortName: 'MUN'
}

export const NEWCASTLE_TEAM_BASE: TeamBase = {
  id: '14',
  shortName: 'NEW'
}

export const NORWICH_TEAM_BASE: TeamBase = {
  id: '15',
  shortName: 'NOR'
}

export const SOUTHAMPTON_TEAM_BASE: TeamBase = {
  id: '16',
  shortName: 'SOU'
}

export const SPURS_TEAM_BASE: TeamBase = {
  id: '17',
  shortName: 'TOT'
}

export const WEST_HAM_TEAM_BASE: TeamBase = {
  id: '19',
  shortName: 'WHU'
}

export const WOLVES_TEAM_BASE: TeamBase = {
  id: '20',
  shortName: 'WOL'
}

export const ARSENAL: Team = {
  ...ARSENAL_TEAM_BASE,
  name: 'Arsenal',
  position: 8,
  played: 38,
  wins: 18,
  losses: 13,
  draws: 7,
  cleanSheets: 12,
  goalsFor: 55,
  goalsAgainst: 39,
  goalDifference: 16,
  points: 61,
  currentForm: ['W', 'W', 'W', 'W', 'W'],
  players: [],
  fixtures: []
}

export const MANCHESTER_CITY: Team = {
  ...MANCHESTER_CITY_TEAM_BASE,
  name: 'Man City',
  position: 1,
  played: 38,
  wins: 27,
  losses: 6,
  draws: 5,
  cleanSheets: 13,
  goalsFor: 83,
  goalsAgainst: 32,
  goalDifference: 51,
  points: 86,
  currentForm: ['W', 'L', 'W', 'L', 'W'],
  players: [],
  fixtures: []
}

export const MANCHESTER_UNITED: Team = {
  ...MANCHESTER_UNITED_TEAM_BASE,
  name: 'Man United',
  position: 2,
  played: 38,
  wins: 21,
  losses: 6,
  draws: 11,
  cleanSheets: 13,
  goalsFor: 73,
  goalsAgainst: 44,
  goalDifference: 29,
  points: 74,
  currentForm: ['W', 'D', 'L', 'L', 'W'],
  players: [],
  fixtures: []
}

export const LEEDS: Team = {
  ...LEEDS_TEAM_BASE,
  name: 'Leeds United',
  position: 9,
  played: 38,
  wins: 18,
  losses: 15,
  draws: 5,
  cleanSheets: 12,
  goalsFor: 62,
  goalsAgainst: 54,
  goalDifference: 8,
  points: 59,
  currentForm: ['W', 'W', 'W', 'W', 'L'],
  players: [],
  fixtures: []
}

export const SPURS: Team = {
  ...SPURS_TEAM_BASE,
  name: 'Spurs',
  position: 7,
  played: 38,
  wins: 18,
  losses: 8,
  draws: 12,
  cleanSheets: 12,
  goalsFor: 68,
  goalsAgainst: 45,
  goalDifference: 23,
  points: 62,
  currentForm: ['W', 'L', 'W', 'L', 'W'],
  players: [],
  fixtures: []
}

export const USER_1 = {
  id: '1',
  email: 'user1@example.com',
  username: 'User 1'
}

export const USER_2 = {
  id: '2',
  email: 'user2@example.com',
  username: 'User 2'
}

export const USER_3 = {
  id: '3',
  email: 'use3@example.com',
  username: 'User 3'
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
    name: 'Gameweek 1',
    waiverDeadline: '2021-08-10 11:29:24 UTC'
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

export const TEAMS = [
  ARSENAL,
  LEEDS,
  MANCHESTER_CITY,
  MANCHESTER_UNITED,
  SPURS
]

export const POSITION_FACETS = [
  { label: 'Goalkeeper', value: '1' },
  { label: 'Defender', value: '2' },
  { label: 'Midfielder', value: '3' },
  { label: 'Forward', value: '4' }
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

export type PlayerBase = {
  firstName?: string,
  lastName: string,
  id: string
}

export const PLAYER_BASES = [
  {
    id: '357',
    firstName: 'Harry',
    lastName: 'Kane'
  },
  {
    id: '580',
    firstName: 'Cristiano Ronaldo',
    lastName: 'dos Santos Aveiro'
  },
  {
    id: '219',
    firstName: 'Jamie',
    lastName: 'Vardy'
  },
  {
    id: '233',
    firstName: 'Mohamed',
    lastName: 'Salah'
  },
  {
    id: '320',
    firstName: 'Bruno Miguel',
    lastName: 'Borges Fernandes'
  },
  {
    id: '424',
    firstName: 'Heung-Min',
    lastName: 'Son'
  },
  {
    id: '495',
    firstName: 'Saïd',
    lastName: 'Benrahma'
  },
  {
    id: '295',
    firstName: 'Riyad',
    lastName: 'Mahrez'
  },
  {
    id: '141',
    firstName: 'Marcos',
    lastName: 'Alonso'
  },
  {
    id: '411',
    firstName: 'Aaron',
    lastName: 'Cresswell'
  },
  {
    id: '435',
    firstName: 'Sergio',
    lastName: 'Reguilón'
  },
  {
    id: '62',
    firstName: 'Pontus',
    lastName: 'Jansson'
  },
  {
    id: '276',
    firstName: 'Trent',
    lastName: 'Alexander-Arnold'
  },
  {
    id: '418',
    firstName: 'Hugo',
    lastName: 'Lloris'
  },
  {
    id: '313',
    firstName: 'David',
    lastName: 'de Gea'
  }
]

export const PLAYER_SUMMARIES = [
    {
      assists: 14,
      bonus: 40,
      chanceOfPlayingNextRound: 100,
      chanceOfPlayingThisRound: 100,
      cleanSheets: 12,
      externalId: '357',
      goalsScored: 23,
      minutes: 3083,
      ownGoals: 0,
      penaltiesMissed: 0,
      penaltiesSaved: 0,
      position: FORWARD,
      redCards: 0,
      saves: 0,
      status: 'a',
      team: SPURS_TEAM_BASE,
      totalPoints: 242,
      yellowCards: 1,
      ...PLAYER_BASES[0]
    },
  {
    assists: 0,
    bonus: 3,
    chanceOfPlayingNextRound: 0,
    chanceOfPlayingThisRound: 0,
    cleanSheets: 0,
    externalId: '579',
    goalsScored: 3,
    minutes: 303,
    news: '',
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    position: FORWARD,
    positionId: 4,
    redCards: 0,
    saves: 0,
    status: 'a',
    team: MANCHESTER_UNITED_TEAM_BASE,
    totalPoints: 22,
    yellowCards: 0,
    ...PLAYER_BASES[1],
  },
  {
    assists: 1,
    bonus: 3,
    chanceOfPlayingNextRound: 0,
    chanceOfPlayingThisRound: 0,
    cleanSheets: 1,
    externalId: '205',
    goalsScored: 2,
    minutes: 260,
    news: '',
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    position: FORWARD,
    positionId: 4,
    redCards: 0,
    saves: 0,
    status: 'a',
    team: LEICESTER_TEAM_BASE,
    totalPoints: 19,
    yellowCards: 1,
    ...PLAYER_BASES[2]
  },
  {
    assists: 6,
    bonus: 21,
    chanceOfPlayingNextRound: 0,
    chanceOfPlayingThisRound: 0,
    cleanSheets: 11,
    externalId: '233',
    goalsScored: 22,
    minutes: 3077,
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    position: MIDFIELDER,
    redCards: 0,
    saves: 0,
    status: 'a',
    team: LIVERPOOL_TEAM_BASE,
    totalPoints: 231,
    yellowCards: 0,
    ...PLAYER_BASES[3]
  },
  {
    assists: 0,
    bonus: 3,
    chanceOfPlayingNextRound: 0,
    chanceOfPlayingThisRound: 0,
    cleanSheets: 1,
    externalId: '277',
    goalsScored: 3,
    minutes: 270,
    news: '',
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    position: MIDFIELDER,
    redCards: 0,
    saves: 0,
    status: 'a',
    team: MANCHESTER_UNITED_TEAM_BASE,
    totalPoints: 23,
    yellowCards: 2,
    ...PLAYER_BASES[4]
  },
  {
    assists: 0,
    bonus: 4,
    chanceOfPlayingNextRound: 75,
    chanceOfPlayingThisRound: 0,
    cleanSheets: 3,
    externalId: '359',
    goalsScored: 2,
    minutes: 248,
    news: 'Calf injury - 75% chance of playing',
    newsAdded: '2021-09-07T10:30:11.021Z',
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    position: MIDFIELDER,
    redCards: 0,
    saves: 0,
    status: 'd',
    team: SPURS_TEAM_BASE,
    totalPoints: 23,
    yellowCards: 0,
    ...PLAYER_BASES[5]
  },
  {
    assists: 2,
    bonus: 4,
    chanceOfPlayingNextRound: 0,
    chanceOfPlayingThisRound: 0,
    cleanSheets: 0,
    externalId: '419',
    goalsScored: 2,
    minutes: 264,
    news: '',
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    position: MIDFIELDER,
    redCards: 0,
    saves: 0,
    status: 'a',
    team: WEST_HAM_TEAM_BASE,
    totalPoints: 26,
    yellowCards: 0,
    ...PLAYER_BASES[6]
  },
  {
    assists: 1,
    bonus: 0,
    chanceOfPlayingNextRound: 0,
    chanceOfPlayingThisRound: 0,
    cleanSheets: 0,
    externalId: '254',
    goalsScored: 1,
    minutes: 122,
    news: '',
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    position: MIDFIELDER,
    redCards: 0,
    saves: 0,
    status: 'a',
    team: MANCHESTER_CITY_TEAM_BASE,
    totalPoints: 12,
    yellowCards: 0,
    ...PLAYER_BASES[7]
  },
  {
    assists: 0,
    bonus: 3,
    chanceOfPlayingNextRound: 0,
    chanceOfPlayingThisRound: 0,
    cleanSheets: 2,
    externalId: '122',
    goalsScored: 1,
    minutes: 265,
    news: '',
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    position: DEFENDER,
    redCards: 0,
    saves: 0,
    status: 'a',
    team: CHELSEA_TEAM_BASE,
    totalPoints: 23,
    yellowCards: 0,
    ...PLAYER_BASES[8]
  },
  {
    assists: 1,
    bonus: 3,
    chanceOfPlayingNextRound: 0,
    chanceOfPlayingThisRound: 0,
    cleanSheets: 1,
    externalId: '411',
    goalsScored: 1,
    minutes: 630,
    news: '',
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    position: DEFENDER,
    positionId: 2,
    redCards: 0,
    saves: 0,
    status: 'a',
    team: WEST_HAM_TEAM_BASE,
    totalPoints: 26,
    yellowCards: 0,
    ...PLAYER_BASES[9]
  },
  {
    assists: 0,
    bonus: 4,
    chanceOfPlayingNextRound: 0,
    chanceOfPlayingThisRound: 0,
    cleanSheets: 3,
    externalId: '370',
    goalsScored: 0,
    minutes: 270,
    news: '',
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    position: DEFENDER,
    redCards: 0,
    saves: 0,
    status: 'a',
    team: SPURS_TEAM_BASE,
    totalPoints: 22,
    yellowCards: 0,
    ...PLAYER_BASES[10]
  },
  {
    assists: 1,
    bonus: 5,
    chanceOfPlayingNextRound: 0,
    chanceOfPlayingThisRound: 0,
    cleanSheets: 2,
    externalId: '76',
    goalsScored: 0,
    minutes: 270,
    news: '',
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    position: DEFENDER,
    redCards: 0,
    saves: 0,
    status: 'a',
    team: BRENTFORD_TEAM_BASE,
    totalPoints: 22,
    yellowCards: 0,
    ...PLAYER_BASES[11]
  },
  {
    assists: 1,
    bonus: 5,
    chanceOfPlayingNextRound: 0,
    chanceOfPlayingThisRound: 0,
    cleanSheets: 2,
    externalId: '237',
    goalsScored: 0,
    minutes: 270,
    news: '',
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    position: DEFENDER,
    redCards: 0,
    saves: 0,
    status: 'a',
    team: LIVERPOOL_TEAM_BASE,
    totalPoints: 22,
    yellowCards: 0,
    ...PLAYER_BASES[12]
  },
  {
    assists: 0,
    bonus: 6,
    chanceOfPlayingNextRound: 0,
    chanceOfPlayingThisRound: 0,
    cleanSheets: 3,
    externalId: '353',
    goalsScored: 0,
    minutes: 270,
    news: '',
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    position: GOALKEEPER,
    redCards: 0,
    saves: 12,
    status: 'a',
    team: SPURS_TEAM_BASE,
    totalPoints: 27,
    yellowCards: 0,
    ...PLAYER_BASES[13]
  },
  {
    assists: 0,
    bonus: 0,
    chanceOfPlayingNextRound: 0,
    chanceOfPlayingThisRound: 0,
    cleanSheets: 1,
    externalId: '270',
    goalsScored: 0,
    minutes: 270,
    news: '',
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    position: GOALKEEPER,
    positionId: 1,
    redCards: 0,
    saves: 10,
    status: 'a',
    team: MANCHESTER_UNITED_TEAM_BASE,
    teamId: 13,
    totalPoints: 12,
    yellowCards: 0,
    ...PLAYER_BASES[14]
  }
]

export const PLAYER_HISTORY = [
  {
    assists: 2,
    awayTeamScore: 3,
    bonus: 3,
    cleanSheets: 1,
    goalsScored: 1,
    homeTeamScore: 0,
    kickoffTime: '2021-08-14T16:30:00Z',
    leg: 'A',
    minutes: 90,
    opponent: NORWICH_TEAM_BASE,
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    redCards: 0,
    result: 'W',
    round: { id: '1', name: 'Gameweek 1' },
    saves: 0,
    started: true,
    totalPoints: 17,
    yellowCards: 0,
    goalsConceded: 1,
    finished: true
  },
  {
    assists: 0,
    awayTeamScore: 0,
    bonus: 0,
    cleanSheets: 1,
    goalsScored: 0,
    homeTeamScore: 2,
    kickoffTime: '2021-08-21T11:30:00Z',
    leg: 'H',
    minutes: 90,
    opponent: BURNLEY_TEAM_BASE,
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    redCards: 0,
    result: 'W',
    round: { id: '2', name: 'Gameweek 2' },
    saves: 0,
    started: true,
    totalPoints: 3,
    yellowCards: 0,
    goalsConceded: 0,
    finished: true
  },
  {
    assists: 0,
    awayTeamScore: 1,
    bonus: 3,
    cleanSheets: 0,
    goalsScored: 1,
    homeTeamScore: 1,
    kickoffTime: '2021-08-28T16:30:00Z',
    leg: 'H',
    minutes: 90,
    opponent: CHELSEA_TEAM_BASE,
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    redCards: 0,
    result: 'D',
    round: { id: '3', name: 'Gameweek 3' },
    saves: 0,
    started: true,
    totalPoints: 10,
    yellowCards: 0,
    goalsConceded: 5,
    finished: false
  },
  {
    assists: 2,
    awayTeamScore: 4,
    bonus: 3,
    cleanSheets: 0,
    goalsScored: 1,
    homeTeamScore: 2,
    kickoffTime: '2021-08-15T13:00:00Z',
    leg: 'A',
    minutes: 90,
    opponent: NEWCASTLE_TEAM_BASE,
    ownGoals: 0,
    penaltiesMissed: 1,
    penaltiesSaved: 0,
    redCards: 0,
    result: 'W',
    round: { id: '1', name: 'Gameweek 1' },
    saves: 0,
    started: true,
    totalPoints: 13,
    yellowCards: 0,
    goalsConceded: 1,
    finished: true
  },
  {
    assists: 1,
    awayTeamScore: 1,
    bonus: 3,
    cleanSheets: 0,
    goalsScored: 2,
    homeTeamScore: 4,
    kickoffTime: '2021-08-23T19:00:00Z',
    leg: 'H',
    minutes: 88,
    opponent: LEICESTER_TEAM_BASE,
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    redCards: 0,
    result: 'W',
    round: { id: '2', name: 'Gameweek 2' },
    saves: 0,
    started: true,
    totalPoints: 16,
    yellowCards: 0,
    goalsConceded: 0,
    finished: true
  },
  {
    assists: 1,
    awayTeamScore: 2,
    bonus: 2,
    cleanSheets: 0,
    goalsScored: 1,
    homeTeamScore: 2,
    kickoffTime: '2021-08-28T14:00:00Z',
    leg: 'H',
    minutes: 90,
    opponent: CRYSTAL_PALACE_TEAM_BASE,
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    redCards: 0,
    result: 'D',
    round: { id: '3', name: 'Gameweek 3' },
    saves: 0,
    started: true,
    totalPoints: 11,
    yellowCards: 0,
    goalsConceded: 2,
    finished: false
  },
  {
    assists: 0,
    awayTeamScore: 0,
    bonus: 0,
    cleanSheets: 1,
    goalsScored: 0,
    homeTeamScore: 0,
    kickoffTime: '2021-09-11T14:00:00Z',
    leg: 'A',
    minutes: 90,
    opponent: SOUTHAMPTON_TEAM_BASE,
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    redCards: 1,
    result: 'D',
    round: { id: '4', name: 'Gameweek 4' },
    saves: 0,
    started: true,
    totalPoints: -1,
    yellowCards: 0,
    goalsConceded: 3,
    finished: true
  },
  {
    assists: 0,
    awayTeamScore: 2,
    bonus: 3,
    cleanSheets: 0,
    goalsScored: 1,
    homeTeamScore: 1,
    kickoffTime: '2021-09-25T14:00:00Z',
    leg: 'A',
    minutes: 90,
    opponent: LEEDS_TEAM_BASE,
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    redCards: 0,
    result: 'W',
    round: { id: '6', name: 'Gameweek 6' },
    saves: 0,
    started: true,
    totalPoints: 8,
    yellowCards: 1,
    goalsConceded: 1,
    finished: true
  },
  {
    assists: 0,
    awayTeamScore: 2,
    bonus: 0,
    cleanSheets: 0,
    goalsScored: 0,
    homeTeamScore: 1,
    kickoffTime: '2021-10-03T13:00:00Z',
    leg: 'H',
    minutes: 90,
    opponent: BRENTFORD_TEAM_BASE,
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    redCards: 0,
    result: 'L',
    round: { id: '7', name: 'Gameweek 7' },
    saves: 0,
    started: true,
    totalPoints: 2,
    yellowCards: 0,
    goalsConceded: 2,
    finished: false
  },
  {
    assists: 0,
    awayTeamScore: 0,
    bonus: 0,
    cleanSheets: 1,
    goalsScored: 1,
    homeTeamScore: 1,
    kickoffTime: '2021-08-14T14:00:00Z',
    leg: 'H',
    minutes: 90,
    opponent: WOLVES_TEAM_BASE,
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    redCards: 0,
    result: 'W',
    round: { id: '1', name: 'Gameweek 1' },
    saves: 0,
    started: true,
    totalPoints: 5,
    yellowCards: 1,
    goalsConceded: 1,
    finished: true
  },
  {
    assists: 0,
    awayTeamScore: 1,
    bonus: 0,
    cleanSheets: 0,
    goalsScored: 0,
    homeTeamScore: 4,
    kickoffTime: '2021-08-23T19:00:00Z',
    leg: 'A',
    minutes: 80,
    opponent: WEST_HAM_TEAM_BASE,
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    redCards: 0,
    result: 'L',
    round: { id: '2', name: 'Gameweek 2' },
    saves: 0,
    started: true,
    totalPoints: 2,
    yellowCards: 0,
    goalsConceded: 2,
    finished: false
  },
  {
    assists: 1,
    awayTeamScore: 2,
    bonus: 3,
    cleanSheets: 0,
    goalsScored: 1,
    homeTeamScore: 1,
    kickoffTime: '2021-08-28T14:00:00Z',
    leg: 'A',
    minutes: 90,
    opponent: NORWICH_TEAM_BASE,
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    redCards: 0,
    result: 'W',
    round: { id: '3', name: 'Gameweek 3' },
    saves: 0,
    started: true,
    totalPoints: 12,
    yellowCards: 0,
    goalsConceded: 1,
    finished: true
  },
  {
    assists: 0,
    awayTeamScore: 1,
    bonus: 0,
    cleanSheets: 0,
    goalsScored: 0,
    homeTeamScore: 0,
    kickoffTime: '2021-09-11T14:00:00Z',
    leg: 'H',
    minutes: 90,
    opponent: MANCHESTER_CITY_TEAM_BASE,
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    redCards: 0,
    result: 'L',
    round: { id: '4', name: 'Gameweek 4' },
    saves: 0,
    started: true,
    totalPoints: 2,
    yellowCards: 0,
    goalsConceded: 2,
    finished: true
  },
  {
    assists: 0,
    awayTeamScore: 1,
    bonus: 2,
    cleanSheets: 0,
    goalsScored: 1,
    homeTeamScore: 2,
    kickoffTime: '2021-09-19T13:00:00Z',
    leg: 'A',
    minutes: 90,
    opponent: BRIGHTON_TEAM_BASE,
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    redCards: 0,
    result: 'L',
    round: { id: '5', name: 'Gameweek 5' },
    saves: 0,
    started: true,
    totalPoints: 8,
    yellowCards: 0,
    goalsConceded: 1,
    finished: false
  },
  {
    assists: 0,
    awayTeamScore: 0,
    bonus: 0,
    cleanSheets: 1,
    goalsScored: 0,
    homeTeamScore: 0,
    kickoffTime: '2021-09-11T14:00:00Z',
    leg: 'A',
    minutes: 62,
    opponent: SOUTHAMPTON_TEAM_BASE,
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    redCards: 0,
    result: 'D',
    round: { id: '4', name: 'Gameweek 4' },
    saves: 0,
    started: true,
    totalPoints: 3,
    yellowCards: 0,
    goalsConceded: 3,
    finished: true
  }
]

export const PLAYER_HISTORY_PAST = [
  {
    assists: 6,
    bonus: 21,
    cleanSheets: 11,
    goalsConceded: 41,
    goalsScored: 22,
    minutes: 3077,
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    redCards: 0,
    saves: 0,
    seasonName: '2020/21',
    totalPoints: 231,
    yellowCards: 0
  },
  {
    assists: 10,
    bonus: 26,
    cleanSheets: 16,
    goalsConceded: 26,
    goalsScored: 19,
    minutes: 2879,
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    redCards: 0,
    saves: 0,
    seasonName: '2019/20',
    totalPoints: 233,
    yellowCards: 1
  },
  {
    assists: 12,
    bonus: 18,
    cleanSheets: 21,
    goalsConceded: 20,
    goalsScored: 22,
    minutes: 3254,
    ownGoals: 0,
    penaltiesMissed: 0,
    penaltiesSaved: 0,
    redCards: 0,
    saves: 0,
    seasonName: '2018/19',
    totalPoints: 259,
    yellowCards: 1
  }
]

const FINISHED_FIXTURE_BASE = {
  finished: true,
  started: true,
  awayTeamScore: 0,
  homeTeamScore: 2,
  kickoffTime: '2021-08-13T19:00:00Z',
  minutes: 90
}

export const FINISHED_FIXTURE: Fixture = {
  awayTeam: ARSENAL_TEAM_BASE,
  homeTeam: BRENTFORD_TEAM_BASE,
  stats: [
    {
      displayOrder: 2,
      identifier: 'assists',
      away: [],
      home: [
        {
          value: 1,
          player: { id: '68', lastName: 'Pinnock' }
        }
      ]
    },
    {
      displayOrder: 9,
      identifier: 'bonus',
      away: [],
      home: [
        {
          value: 3,
          player: { id: '58', lastName: 'Canós' }
        },
        {
          value: 2,
          player: { id: '68', lastName: 'Pinnock' }
        },
        {
          value: 1,
          player: { id: '57', lastName: 'Raya Martin' }
        }
      ]
    },
    {
      displayOrder: 1,
      identifier: 'goals_scored',
      away: [],
      home: [
        {
          value: 1,
          player: { id: '54', lastName: 'Nørgaard' }
        },
        {
          value: 1,
          player: { id: '58', lastName: 'Canós' }
        }
      ]
    },
    {
      displayOrder: 6,
      identifier: 'own_goals',
      away: [],
      home: []
    },
    {
      displayOrder: 8,
      identifier: 'penalties_missed',
      away: [],
      home: []
    },
    {
      displayOrder: 7,
      identifier: 'penalties_saved',
      away: [],
      home: []
    },
    {
      displayOrder: 5,
      identifier: 'red_cards',
      away: [],
      home: []
    },
    {
      displayOrder: 3,
      identifier: 'saves',
      away: [
        {
          value: 3,
          player: { id: '1', lastName: 'Leno' }
        }
      ],
      home: [
        {
          value: 4,
          player: { id: '57', lastName: 'Raya Martin' }
        }
      ]
    },
    {
      displayOrder: 3,
      identifier: 'yellow_cards',
      away: [],
      home: []
    },
  ],
  ...FINISHED_FIXTURE_BASE
}

const IN_PROGRESS_FIXTURE_BASE = {
  finished: false,
  awayTeamScore: 1,
  homeTeamScore: 5,
  kickoffTime: '2021-08-14T11:30:00Z',
  minutes: 89,
  started: true
}

export const IN_PROGRESS_FIXTURE: Fixture = {
  awayTeam: LEEDS_TEAM_BASE,
  homeTeam: MANCHESTER_UNITED_TEAM_BASE,
  stats: [
    {
      displayOrder: 2,
      identifier: 'assists',
      away: [
        {
          value: 1,
          player: { id: '209', lastName: 'Dallas' }
        }
      ],
      home: [
        {
          value: 1,
          player: { id: '284', lastName: 'Lindelöf' }
        },
        {
          value: 4,
          player: { id: '272', lastName: 'Pogba' }
        }
      ]
    },
    {
      displayOrder: 9,
      identifier: 'bonus',
      away: [],
      home: [
        {
          value: 1,
          player: { id: '289', lastName: 'Greenwood' }
        },
        {
          value: 2,
          player: { id: '272', lastName: 'Pogba' }
        },
        {
          value: 3,
          player: { id: '277', lastName: 'Borges Fernandes' }
        }
      ]
    },
    {
      displayOrder: 1,
      identifier: 'goals_scored',
      away: [
        {
          value: 1,
          player: { id: '206', lastName: 'Ayling' }
        }
      ],
      home: [
        {
          value: 1,
          player: { id: '274', lastName: 'Rodrigues de Paula Santos' }
        },
        {
          value: 1,
          player: { id: '289', lastName: 'Greenwood' }
        },
        {
          value: 3,
          player: { id: '277', lastName: 'Borges Fernandes' }
        }
      ]
    },
    {
      displayOrder: 6,
      identifier: 'own_goals',
      away: [],
      home: []
    },
    {
      displayOrder: 8,
      identifier: 'penalties_missed',
      away: [],
      home: []
    },
    {
      displayOrder: 7,
      identifier: 'penalties_saved',
      away: [],
      home: []
    },
    {
      displayOrder: 5,
      identifier: 'red_cards',
      away: [],
      home: []
    },
    {
      displayOrder: 3,
      identifier: 'saves',
      away: [
        {
          value: 3,
          player: { id: '220', lastName: 'Meslier' }
        }
      ],
      home: [
        {
          value: 2,
          player: { id: '270', lastName: 'de Gea' }
        }
      ]
    },
    {
      displayOrder: 3,
      identifier: 'yellow_cards',
      away: [
        {
          value: 1,
          player: { id: '205', lastName: 'Cooper' }
        },
        {
          value: 1,
          player: { id: '217', lastName: 'Dias Belloli' }
        }
      ],
      home: [
        {
          value: 1,
          player: { id: '275', lastName: 'Shaw' }
        }
      ]
    },
  ],
  ...IN_PROGRESS_FIXTURE_BASE
}

const UPCOMING_FIXTURE_BASE = {
  awayTeamScore: null,
  finished: false,
  homeTeam: SPURS_TEAM_BASE,
  homeTeamScore: null,
  kickoffTime: '2021-08-15T15:30:00Z',
  minutes: 0,
  started: false
}

export const UPCOMING_FIXTURE: Fixture = {
  awayTeam: MANCHESTER_CITY_TEAM_BASE,
  stats: [],
  ...UPCOMING_FIXTURE_BASE
}

export const ROUND_1_BASE = {
  id: '1',
  name: 'Gameweek 1'
}

export const ROUND_1 = {
  current: true,
  dataChecked: false,
  deadlineTime: '2021-08-13T17:30:00Z',
  deadlineTimeEpoch: 1628875800,
  finished: false,
  isCurrent: true,
  isNext: false,
  isPrevious: false,
  miniDraft: false,
  waiverDeadline: '2021-08-12T17:30:00.000Z',
  fixtures: [
    FINISHED_FIXTURE,
    IN_PROGRESS_FIXTURE,
    UPCOMING_FIXTURE
  ],
  ...ROUND_1_BASE
}

export const ROUND_2_BASE = {
  id: '2',
  name: 'Gameweek 2'
}

export const ROUND_2 = {
  current: false,
  dataChecked: false,
  deadlineTime: '2021-08-21T10:00:00Z',
  deadlineTimeEpoch: 1629540000,
  finished: false,
  isCurrent: false,
  isNext: true,
  isPrevious: false,
  miniDraft: false,
  waiverDeadline: '2021-08-20T10:00:00.000Z',
  ...ROUND_2_BASE
}

export const ROUND_3_BASE = {
  id: '3',
  name: 'Gameweek 3'
}
export const ROUND_3 = {
  current: false,
  dataChecked: false,
  deadlineTime: '2021-08-28T10:00:00Z',
  deadlineTimeEpoch: 1630144800,
  finished: false,
  isCurrent: false,
  isNext: false,
  isPrevious: false,
  miniDraft: false,
  waiverDeadline: '2021-08-27T10:00:00.000Z',
  ...ROUND_3_BASE
}

export const FINISHED_TEAM_FIXTURE = {
  round: ROUND_1_BASE,
  opponent: ARSENAL_TEAM_BASE,
  leg: 'H',
  result: 'W',
  strength: 2,
  ...FINISHED_FIXTURE_BASE
}

export const IN_PROGRESS_TEAM_FIXTURE = {
  round: ROUND_2_BASE,
  opponent: MANCHESTER_CITY_TEAM_BASE,
  leg: 'A',
  result: '',
  strength: -1,
  ...IN_PROGRESS_FIXTURE_BASE
}

export const UPCOMING_TEAM_FIXTURE = {
  round: ROUND_3_BASE,
  opponent: SPURS_TEAM_BASE,
  leg: 'H',
  result: '',
  strength: 1,
  ...UPCOMING_FIXTURE_BASE
}

export const TEAM_FIXTURES = [
  FINISHED_TEAM_FIXTURE,
  IN_PROGRESS_TEAM_FIXTURE,
  UPCOMING_TEAM_FIXTURE
]

export const LIVE_LEAGUE = {
  id: '1',
  name: 'League 1',
  code: '1234',
  status: 'live',
  canGenerateDraftPicks: true,
  canCreateDraft: true,
  canGoToDraft: true,
  canGoToMiniDraft: true,
  showDraftPickColumn: true,
  showLiveColumns: true,
  isOwner: true,
  owner: USER_1,
  fplTeams: []
}

export const INITIALIZED_LEAGUE = {
  id: '2',
  name: 'League 2',
  code: 'abcd',
  status: 'initialized',
  canGenerateDraftPicks: false,
  canCreateDraft: false,
  canGoToDraft: false,
  canGoToMiniDraft: false,
  showDraftPickColumn: false,
  showLiveColumns: false,
  isOwner: true,
  owner: USER_1,
  fplTeams: []
}

export const LEAGUES = [
  LIVE_LEAGUE,
  INITIALIZED_LEAGUE
]

export const FPL_TEAM_1_BASE = {
  id: '1',
  name: 'Fpl Team 1'
}

export const FPL_TEAM_1 = {
  isOwner: true,
  owner: USER_1,
  league: LIVE_LEAGUE,
  rank: 3,
  totalScore: 300,
  draftPickNumber: 2,
  miniDraftPickNumber: 1,
  ...FPL_TEAM_1_BASE
}

export const FPL_TEAM_2_BASE = {
  id: '2',
  name: 'Fpl Team 2'
}

export const FPL_TEAM_2 = {
  isOwner: false,
  owner: USER_2,
  league: LIVE_LEAGUE,
  rank: 1,
  totalScore: 351,
  draftPickNumber: 3,
  miniDraftPickNumber: 2,
  ...FPL_TEAM_2_BASE
}

export const FPL_TEAM_3_BASE = {
  id: '3',
  name: 'Fpl Team 3'
}


export const FPL_TEAM_3 = {
  isOwner: false,
  owner: USER_3,
  league: LIVE_LEAGUE,
  rank: 2,
  totalScore: 337,
  draftPickNumber: 1,
  miniDraftPickNumber: 3,
  ...FPL_TEAM_3_BASE
}

export const FPL_TEAMS = [
  FPL_TEAM_1,
  FPL_TEAM_2,
  FPL_TEAM_3
]

export const FPL_TEAM_LIST_1 = {
  id: '1',
  cumulativeRank: 1,
  roundRank: 1,
  totalScore: 50,
  round: ROUND_1
}

export const FPL_TEAM_LIST_2 = {
  id: '2',
  cumulativeRank: 1,
  roundRank: 1,
  totalScore: 45,
  round: ROUND_2
}

export const FPL_TEAM_LIST_3 = {
  id: '3',
  cumulativeRank: undefined,
  roundRank: undefined,
  totalScore: undefined,
  round: ROUND_3
}

export const FPL_TEAM_LISTS = [
  FPL_TEAM_LIST_1,
  FPL_TEAM_LIST_2,
  FPL_TEAM_LIST_3
]

export const LIST_POSITION_BASE_1 = {
  id: '1',
  player: PLAYER_SUMMARIES[0],
  team: MANCHESTER_UNITED_TEAM_BASE,
  position: FORWARD,
  displayOrder: 1,
  roleStr: 'Starting',
  role: 0,
  ...PLAYER_HISTORY[0]
}

export const LIST_POSITION_BASE_2 = {
  id: '2',
  player: PLAYER_SUMMARIES[1],
  team: ARSENAL_TEAM_BASE,
  position: MIDFIELDER,
  displayOrder: 2,
  roleStr: 'S1',
  role: 1,
  ...PLAYER_HISTORY[1]
}

export const LIST_POSITION_BASE_3 = {
  id: '3',
  player: PLAYER_SUMMARIES[2],
  team: SPURS_TEAM_BASE,
  position: GOALKEEPER,
  displayOrder: 4,
  roleStr: 'SGKP',
  role: 4,
  ...PLAYER_HISTORY[2]
}

export const LIST_POSITION_1 = {
  ...LIST_POSITION_BASE_1,
  opponent: MANCHESTER_CITY_TEAM_BASE,
  fplTeam: FPL_TEAM_1
}

export const LIST_POSITION_2 = {
  ...LIST_POSITION_BASE_2,
  opponent: BRENTFORD_TEAM_BASE,
  fplTeam: FPL_TEAM_1
}

export const LIST_POSITION_3 = {
  ...LIST_POSITION_BASE_3,
  opponent: LEEDS_TEAM_BASE,
  fplTeam: FPL_TEAM_1
}

export const LIST_POSITIONS = [
  {
    id: '1',
    player: PLAYER_SUMMARIES[0],
    team: PLAYER_SUMMARIES[0].team,
    position: PLAYER_SUMMARIES[0].position,
    displayOrder: 0,
    roleStr: 'Starting',
    role: 0,
    ...PLAYER_HISTORY[0],
    fplTeam: FPL_TEAM_1
  },
  {
    id: '2',
    player: PLAYER_SUMMARIES[1],
    team: PLAYER_SUMMARIES[1].team,
    position: PLAYER_SUMMARIES[1].position,
    displayOrder: 0,
    roleStr: 'Starting',
    role: 0,
    ...PLAYER_HISTORY[1],
    fplTeam: FPL_TEAM_1
  },
  {
    id: '3',
    player: PLAYER_SUMMARIES[2],
    team: PLAYER_SUMMARIES[2].team,
    position: PLAYER_SUMMARIES[2].position,
    displayOrder: 0,
    roleStr: 'Starting',
    role: 0,
    ...PLAYER_HISTORY[2],
    fplTeam: FPL_TEAM_1
  },
  {
    id: '4',
    player: PLAYER_SUMMARIES[3],
    team: PLAYER_SUMMARIES[3].team,
    position: PLAYER_SUMMARIES[3].position,
    displayOrder: 1,
    roleStr: 'Starting',
    role: 0,
    ...PLAYER_HISTORY[3],
    fplTeam: FPL_TEAM_1
  },
  {
    id: '5',
    player: PLAYER_SUMMARIES[4],
    team: PLAYER_SUMMARIES[4].team,
    position: PLAYER_SUMMARIES[4].position,
    displayOrder: 1,
    roleStr: 'Starting',
    role: 0,
    ...PLAYER_HISTORY[4],
    fplTeam: FPL_TEAM_1
  },
  {
    id: '6',
    player: PLAYER_SUMMARIES[5],
    team: PLAYER_SUMMARIES[5].team,
    position: PLAYER_SUMMARIES[5].position,
    displayOrder: 1,
    roleStr: 'Starting',
    role: 0,
    ...PLAYER_HISTORY[5],
    fplTeam: FPL_TEAM_1
  },
  {
    id: '7',
    player: PLAYER_SUMMARIES[6],
    team: PLAYER_SUMMARIES[6].team,
    position: PLAYER_SUMMARIES[6].position,
    displayOrder: 1,
    roleStr: 'Starting',
    role: 0,
    ...PLAYER_HISTORY[6],
    fplTeam: FPL_TEAM_1
  },
  {
    id: '8',
    player: PLAYER_SUMMARIES[8],
    team: PLAYER_SUMMARIES[8].team,
    position: PLAYER_SUMMARIES[8].position,
    displayOrder: 2,
    roleStr: 'Starting',
    role: 0,
    ...PLAYER_HISTORY[8],
    fplTeam: FPL_TEAM_1
  },
  {
    id: '9',
    player: PLAYER_SUMMARIES[9],
    team: PLAYER_SUMMARIES[9].team,
    position: PLAYER_SUMMARIES[9].position,
    displayOrder: 2,
    roleStr: 'Starting',
    role: 0,
    ...PLAYER_HISTORY[9],
    fplTeam: FPL_TEAM_1
  },
  {
    id: '10',
    player: PLAYER_SUMMARIES[10],
    team: PLAYER_SUMMARIES[10].team,
    position: PLAYER_SUMMARIES[10].position,
    displayOrder: 2,
    roleStr: 'Starting',
    role: 0,
    ...PLAYER_HISTORY[10],
    fplTeam: FPL_TEAM_1
  },
  {
    id: '11',
    player: PLAYER_SUMMARIES[13],
    team: PLAYER_SUMMARIES[13].team,
    position: PLAYER_SUMMARIES[13].position,
    displayOrder: 3,
    roleStr: 'Starting',
    role: 0,
    ...PLAYER_HISTORY[13],
    fplTeam: FPL_TEAM_1
  },
  {
    id: '12',
    player: PLAYER_SUMMARIES[7],
    team: PLAYER_SUMMARIES[7].team,
    position: PLAYER_SUMMARIES[7].position,
    displayOrder: 1,
    roleStr: 'S1',
    role: 1,
    ...PLAYER_HISTORY[7],
    fplTeam: FPL_TEAM_1
  },
  {
    id: '13',
    player: PLAYER_SUMMARIES[11],
    team: PLAYER_SUMMARIES[11].team,
    position: PLAYER_SUMMARIES[11].position,
    displayOrder: 1,
    roleStr: 'S2',
    role: 1,
    ...PLAYER_HISTORY[7],
    fplTeam: FPL_TEAM_1
  },
  {
    id: '14',
    player: PLAYER_SUMMARIES[12],
    team: PLAYER_SUMMARIES[12].team,
    position: PLAYER_SUMMARIES[12].position,
    displayOrder: 1,
    roleStr: 'S2',
    role: 2,
    ...PLAYER_HISTORY[11],
    fplTeam: FPL_TEAM_1
  },
  {
    id: '15',
    player: PLAYER_SUMMARIES[14],
    team: PLAYER_SUMMARIES[14].team,
    position: PLAYER_SUMMARIES[14].position,
    displayOrder: 1,
    roleStr: 'SGKP',
    role: 3,
    ...PLAYER_HISTORY[14],
    fplTeam: FPL_TEAM_1
  }
]

export const FPL_TEAM_FACETS = [
  { label: 'FplTeam 1', value: '1' },
  { label: 'FplTeam 2', value: '2' },
  { label: 'FplTeam 3', value: '3' },
  { label: 'FplTeam 4', value: '4' }
]

export const LIST_POSITION_FACETS = {
  fplTeams: FPL_TEAM_FACETS,
  teams: TEAM_FACETS
}

export const DRAFT_PICK_1 = {
  id: '1',
  pickNumber: 1,
  miniDraft: false,
  fplTeam: FPL_TEAM_1_BASE,
  user: USER_1,
  player: PLAYER_SUMMARIES[0],
  team: SPURS_TEAM_BASE,
  position: FORWARD.singularNameShort
}

export const DRAFT_PICK_2 = {
  id: '2',
  pickNumber: 2,
  miniDraft: false,
  fplTeam: FPL_TEAM_2_BASE,
  user: USER_2,
  player: PLAYER_SUMMARIES[1],
  team: LIVERPOOL_TEAM_BASE,
  position: MIDFIELDER.singularNameShort
}

export const DRAFT_PICK_3 = {
  id: '3',
  pickNumber: 3,
  miniDraft: true,
  user: USER_3,
  fplTeam: FPL_TEAM_3
}

export const DRAFT_PICK_4 = {
  id: '4',
  pickNumber: 4,
  user: USER_3,
  fplTeam: FPL_TEAM_3
}

export const DRAFT_PICKS = [
  DRAFT_PICK_1,
  DRAFT_PICK_2,
  DRAFT_PICK_3,
  DRAFT_PICK_4
]

export const DRAFT_PICK_FACETS = {
  teams: TEAM_FACETS,
  positions: POSITION_FACETS,
  fplTeams: FPL_TEAM_FACETS,
  miniDraftFacets: [
    { label: 'Yes', value: true },
    { label: 'No', value: false }
  ]
}

export const INTER_TEAM_TRADE_GROUP_1 = {
  id: '1',
  outFplTeamListId: '1',
  inFplTeamListId: '2',
  outFplTeam: FPL_TEAM_1,
  inFplTeam: FPL_TEAM_2,
  trades: [
    {
      id: '1',
      outPlayer: PLAYER_BASES[0],
      outTeam: SPURS_TEAM_BASE,
      inPlayer: PLAYER_BASES[3],
      inTeam: MANCHESTER_CITY_TEAM_BASE,
      position: FORWARD.singularNameShort
    },
    {
      id: '2',
      outPlayer: PLAYER_BASES[1],
      outTeam: LIVERPOOL_TEAM_BASE,
      inPlayer: PLAYER_BASES[4],
      inTeam: LEEDS_TEAM_BASE,
      position: FORWARD.singularNameShort
    },
  ],
  status: 'Submitted',
  canApprove: false,
  canSubmit: false,
  canCancel: true
}

export const INTER_TEAM_TRADE_GROUP_2 = {
  id: '2',
  outFplTeamListId: '1',
  inFplTeamListId: '3',
  outFplTeam: FPL_TEAM_1,
  inFplTeam: FPL_TEAM_3,
  trades: [
    {
      id: '3',
      outPlayer: PLAYER_BASES[8],
      outTeam: ARSENAL_TEAM_BASE,
      inPlayer: PLAYER_BASES[10],
      inTeam: BRENTFORD_TEAM_BASE,
      position: DEFENDER.singularNameShort
    }
  ],
  status: 'Pending',
  canApprove: false,
  canSubmit: true,
  canCancel: true
}

export const INTER_TEAM_TRADE_GROUP_3 = {
  id: '3',
  outFplTeamListId: '1',
  inFplTeamListId: '2',
  outFplTeam: FPL_TEAM_1,
  inFplTeam: FPL_TEAM_2,
  trades: [
    {
      id: '4',
      outPlayer: PLAYER_BASES[8],
      outTeam: ARSENAL_TEAM_BASE,
      inPlayer: PLAYER_BASES[10],
      inTeam: BRENTFORD_TEAM_BASE,
      position: MIDFIELDER.singularNameShort
    }
  ],
  status: 'Approved',
  canApprove: false,
  canSubmit: false,
  canCancel: false
}

export const INTER_TEAM_TRADE_GROUP_4 = {
  id: '4',
  outFplTeamListId: '2',
  inFplTeamListId: '1',
  outFplTeam: FPL_TEAM_2,
  inFplTeam: FPL_TEAM_1,
  trades: [
    {
      id: '5',
      outPlayer: PLAYER_BASES[11],
      outTeam: WOLVES_TEAM_BASE,
      inPlayer: PLAYER_BASES[4],
      inTeam: MANCHESTER_UNITED_TEAM_BASE,
      position: DEFENDER.singularNameShort
    }
  ],
  status: 'Submitted',
  canApprove: true,
  canSubmit: false,
  canCancel: false
}

export const INTER_TEAM_TRADE_GROUP_5 = {
  id: '5',
  outFplTeamListId: '3',
  inFplTeamListId: '1',
  outFplTeam: FPL_TEAM_3,
  inFplTeam: FPL_TEAM_1,
  trades: [
    {
      id: '6',
      outPlayer: PLAYER_BASES[11],
      outTeam: WOLVES_TEAM_BASE,
      inPlayer: PLAYER_BASES[4],
      inTeam: MANCHESTER_UNITED_TEAM_BASE,
      position: GOALKEEPER.singularNameShort
    }
  ],
  status: 'Declined',
  canApprove: false,
  canSubmit: false,
  canCancel: false
}

export const INTER_TEAM_TRADE_GROUPS = {
  outTradeGroups: [INTER_TEAM_TRADE_GROUP_1, INTER_TEAM_TRADE_GROUP_2, INTER_TEAM_TRADE_GROUP_3],
  inTradeGroups: [INTER_TEAM_TRADE_GROUP_4, INTER_TEAM_TRADE_GROUP_5]
}

export const TRADES = [
  {
    id: '1',
    outPlayer: PLAYER_BASES[1],
    inPlayer: PLAYER_BASES[4],
    outTeam: MANCHESTER_CITY_TEAM_BASE,
    inTeam: SPURS_TEAM_BASE
  },
  {
    id: '2',
    outPlayer: PLAYER_BASES[0],
    inPlayer: PLAYER_BASES[3],
    outTeam: LEEDS_TEAM_BASE,
    inTeam: MANCHESTER_UNITED_TEAM_BASE
  }
]

export const MINI_DRAFT_PICK_1 = {
  ...TRADES[0],
  fplTeam: FPL_TEAM_1,
  user: USER_1,
  passed: false,
  pickNumber: 1,
  season: 'winter'
}

export const MINI_DRAFT_PICK_2 = {
  ...TRADES[1],
  fplTeam: FPL_TEAM_2,
  user: USER_2,
  passed: false,
  pickNumber: 2,
  season: 'winter'
}

export const MINI_DRAFT_PICKS = [
  MINI_DRAFT_PICK_1,
  MINI_DRAFT_PICK_2,
  {
    id: '3',
    fplTeam: FPL_TEAM_3,
    user: USER_3,
    passed: true,
    season: 'winter'
  }
]

export const MINI_DRAFT_PICK_FACETS = {
  teams: TEAM_FACETS,
  positions: POSITION_FACETS,
  fplTeams: FPL_TEAM_FACETS,
  passed: [
    { label: 'Yes', value: true },
    { label: 'No', value: false }
  ]
}

export const WAIVER_PICKS = [
  {
    id: '1',
    pickNumber: 1,
    outPlayer: PLAYER_BASES[4],
    inPlayer: PLAYER_BASES[0],
    inTeam: MANCHESTER_CITY_TEAM_BASE,
    outTeam: LEEDS_TEAM_BASE,
    position: DEFENDER,
    status: 'Declined'
  },
  {
    id: '2',
    pickNumber: 2,
    outPlayer: PLAYER_BASES[2],
    inPlayer: PLAYER_BASES[1],
    inTeam: WOLVES_TEAM_BASE,
    outTeam: SPURS_TEAM_BASE,
    position: GOALKEEPER,
    status: 'Approved'
  }
]

export const DRAFT_PICK_STATUS = {
  canMakeMiniDraftPick: true,
  canMakePlayerPick: true,
  draftFinished: false,
  nextDraftPickId: '4',
  userCanPick: true
}

export const MINI_DRAFT_PICK_STATUS = {
  canMakeMiniDraftPick: true
}
