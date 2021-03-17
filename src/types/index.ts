export type Error = {
  status: string
}

export type Action = {
  type: string,
  errors?: Error[],
  data?: any
}

export type PlayerSummary = {
  name: string,
  id: string
}

export type PlayerStatElement = {
  value: number,
  player: PlayerSummary
}

export type StatsElement = {
  identifier: string,
  displayOrder: number,
  home: PlayerStatElement[],
  away: PlayerStatElement[]
}

export type TeamFixtureSummary = {
  shortName: string,
  id: string
}

export type Fixture = {
  awayTeam: TeamFixtureSummary,
  awayTeamScore?: number,
  finished: boolean,
  homeTeam: TeamFixtureSummary,
  homeTeamScore?: number,
  kickoffTime: string,
  minutes: number,
  started: boolean,
  stats: StatsElement[]
}

export type RoundSummary = {
  id: string,
  name: string,
  finsihed: boolean,
  isCurrent: boolean,
  isNext: boolean,
  isPrevious: boolean,
  finished: boolean,
  dataChecked: boolean,
  deadlineTime: string
}

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
} & TeamFixtureSummary
