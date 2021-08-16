import type { TeamBase, Team, Fixture } from 'types'

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

export const LEEDS_TEAM_BASE: TeamBase = {
  id: '10',
  shortName: 'LEE'
}

export const MANCHESTER_CITY_TEAM_BASE: TeamBase = {
  id: '12',
  shortName: 'MCI'
}

export const MANCHESTER_UNITED_TEAM_BASE: TeamBase = {
  id: '13',
  shortName: 'MUN'
}

export const SPURS_TEAM_BASE: TeamBase = {
  id: '17',
  shortName: 'TOT'
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

export const FINISHED_FIXTURE: Fixture = {
  awayTeam: ARSENAL_TEAM_BASE,
  homeTeam: BRENTFORD_TEAM_BASE,
  finished: true,
  started: true,
  awayTeamScore: 0,
  homeTeamScore: 2,
  kickoffTime: '2021-08-13T19:00:00Z',
  minutes: 90,
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
  ]
}

export const IN_PROGRESS_FIXTURE: Fixture = {
  awayTeam: LEEDS_TEAM_BASE,
  homeTeam: MANCHESTER_UNITED_TEAM_BASE,
  finished: false,
  started: true,
  awayTeamScore: 1,
  homeTeamScore: 5,
  kickoffTime: '2021-08-14T11:30:00Z',
  minutes: 89,
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
  ]
}

export const UPCOMING_FIXTURE: Fixture = {
  awayTeam: MANCHESTER_CITY_TEAM_BASE,
  awayTeamScore: null,
  finished: false,
  homeTeam: SPURS_TEAM_BASE,
  homeTeamScore: null,
  kickoffTime: '2021-08-15T15:30:00Z',
  minutes: 0,
  started: false,
  stats: []
}

export const ROUND_1 = {
  current: true,
  dataChecked: false,
  deadlineTime: '2021-08-13T17:30:00Z',
  deadlineTimeEpoch: 1628875800,
  finished: false,
  id: '1',
  isCurrent: true,
  isNext: false,
  isPrevious: false,
  miniDraft: false,
  name: 'Gameweek 1',
  waiverDeadline: '2021-08-12T17:30:00.000Z',
  fixtures: [
    FINISHED_FIXTURE,
    IN_PROGRESS_FIXTURE,
    UPCOMING_FIXTURE
  ]
}

export const ROUND_2 = {
  current: false,
  dataChecked: false,
  deadlineTime: '2021-08-21T10:00:00Z',
  deadlineTimeEpoch: 1629540000,
  finished: false,
  id: '2',
  isCurrent: false,
  isNext: true,
  isPrevious: false,
  miniDraft: false,
  name: 'Gameweek 2',
  waiverDeadline: '2021-08-20T10:00:00.000Z'
}

export const ROUND_3 = {
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
