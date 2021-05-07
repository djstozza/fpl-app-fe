export type Error = {
  status: string,
  code: string,
  title: string,
  detail: string,
  source: string
}

export type Action = {
  type: string,
  errors?: Error[],
  data?: any,
  sort?: Object,
  filter?: Object,
  meta: {
    total?: number
  },
  page?: {
    limit: number,
    offset: number
  },
  searchQuery?: Object
}

export type PlayerBase = {
  lastName: string,
  id: string
}

export type PlayerStatElement = {
  value: number,
  player: PlayerBase
}

export type PositionSummary = {
  id: string,
  singularNameShort: string,
  singularName: string
}

export type StatsElement = {
  identifier: string,
  displayOrder: number,
  home: PlayerStatElement[],
  away: PlayerStatElement[]
}

export type TeamBase = {
  shortName: string,
  id: string
}

type FixtureBase = {
  finished: boolean,
  awayTeamScore?: number,
  homeTeamScore?: number,
  kickoffTime: string,
  minutes: number,
  started: boolean
}

export type Fixture = {
  awayTeam: TeamBase,
  homeTeam: TeamBase,
  homeTeamScore?: number,
  stats: StatsElement[]
} & FixtureBase

type RoundBase = {
  id: string,
  name: string
}

export type RoundSummary = {
  finsihed: boolean,
  isCurrent: boolean,
  isNext: boolean,
  isPrevious: boolean,
  finished: boolean,
  dataChecked: boolean,
  deadlineTime: string
} & RoundBase

export type Round = { fixtures: Fixture[] } & RoundSummary

export type TeamSummary = {
  name: string,
  position: number,
  points: number,
  wins: number,
  losses: number,
  draws: number,
  goalsFor: number,
  goalsAgainst: number,
  goalDifference: number,
  currentForm: string[],
  cleanSheets: number,
  played: number
} & TeamBase

export type TeamFixture = {
  round: RoundBase,
  opponent: TeamBase,
  leg: string,
  result: string,
  strength: number
} & FixtureBase

export type TeamPlayer = {
  firstName: string,
  goalsScored: number,
  assists: number,
  cleanSheets: number,
  saves: number,
  yellowCards: number,
  redCards: number,
  totalPoints: number,
  penaltiesSaved: number,
  penaltiesMissed: number,
  ownGoals: number,
  position: PositionSummary
} & PlayerBase

export type Team = {
  fixtures: TeamFixture[]
  players: TeamPlayer[]
} & TeamSummary

export type PlayerSummary = {
  team: TeamBase
} & TeamPlayer

export type Cell = {
  cellId: string,
  label: string,
  toolTipLabel: string,
  sticky?: boolean,
  sortParam?: string,
  customRender?: Function,
  filterParam?: string
}

export type Facet = {
  label: string,
  value: string | number | boolean
}

export type Facets = {
  [key: string]: Facet[]
}

export type HistoryPast = {
  seasonName: string,
  minutes: number,
  goalsScored: number,
  assists: number,
  cleanSheets: number,
  saves: number,
  yellowCards: number,
  redCards: number,
  totalPoints: number,
  penaltiesSaved: number,
  penaltiesMissed: number,
  ownGoals: number,
}

export type Player = {
  code: number,
  photo: string,
  historyPast: HistoryPast[],
  hasHistory: boolean,
  hasHistoryPast: boolean
} & PlayerSummary

export type History = {
  started: boolean,
  kickoffTime: number,
  minutes: number,
  round: RoundBase,
  opponent: TeamBase,
  goalsScored: number,
  assists: number,
  cleanSheets: number,
  saves: number,
  yellowCards: number,
  redCards: number,
  totalPoints: number,
  penaltiesSaved: number,
  penaltiesMissed: number,
  ownGoals: number,
  goalsConceded: number
}

export type Sort = {
  [key: string]: string
}

export type User = {
  id: string,
  email: string,
  username: string
}
