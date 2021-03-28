export type Error = {
  status: string
}

export type Action = {
  type: string,
  errors?: Error[],
  data?: any
}

export type PlayerBase = {
  lastName: string,
  id: string
}

export type PlayerStatElement = {
  value: number,
  player: PlayerBase
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

export type PlayerSummary = {
  fistName: string,
  position: string,
  goalsScored: number,
  assists: number,
  cleanSheets: number,
  saves: number,
  yellowCards: number,
  redCards: number,
  totalPoints: number,
  penaltiesSaved: number,
  penaltiesMissed: number,
  ownGoals: number
} & PlayerBase

export type Team = {
  fixtures: TeamFixture[]
  players: PlayerSummary[]
} & TeamSummary
