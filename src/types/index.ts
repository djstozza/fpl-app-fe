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
  firstName?: string,
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
  awayTeamScore?: number | null,
  homeTeamScore?: number | null,
  kickoffTime: string,
  minutes: number,
  started: boolean
}

export type Fixture = {
  awayTeam: TeamBase,
  homeTeam: TeamBase,
  stats: StatsElement[]
} & FixtureBase

type RoundBase = {
  id: string,
  name: string
}

export type RoundSummary = {
  current: boolean,
  finsihed: boolean,
  isCurrent: boolean,
  isNext: boolean,
  isPrevious: boolean,
  finished: boolean,
  miniDraft: boolean,
  dataChecked: boolean,
  deadlineTime: string,
  waiverDeadline: string
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
  position: PositionSummary,
  chanceOfPlayingNextRound?: number,
  chanceOfPlayingThisRound?: number,
  status: string,
  news?: string,
  newsAdded?: string
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

export type CellHash = {
  [key: string]: Cell
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
  finished: boolean,
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

export type BaseFplTeam = {
  id: string,
  name: string
}

export type League = {
  id: string,
  name: string,
  code: string,
  status: string,
  canGenerateDraftPicks: boolean,
  canCreateDraft: boolean,
  canGoToDraft: boolean,
  canGoToMiniDraft: boolean,
  showDraftPickColumn: boolean,
  showLiveColumns: boolean,
  isOwner: boolean,
  owner: User,
  fplTeams: BaseFplTeam[]
}

export type FplTeam = {
  isOwner: boolean,
  owner: User,
  league: League,
  draftPickNumber?: number,
  miniDraftPickNumber?: number,
  rank?: number,
  totalScore?: number
} & BaseFplTeam

export type DraftPick = {
  id: string,
  pickNumber: number,
  miniDraft: boolean,
  fplTeam: BaseFplTeam,
  user: User,
  player?: Player,
  team?: TeamBase,
  position?: string
}

export type FplTeamList = {
  id: string,
  cumulativeRank?: number,
  roundRank?: number,
  totalScore?: number,
  round: RoundSummary
}

export type ListPositionBase = {
  id: string,
  player: TeamPlayer,
  roleStr: string,
  role: number,
  displayOrder: number,
  position: PositionSummary,
  team: TeamBase
} & History

export type ListPosition = {
  opponent: TeamBase,
  leg: string,
  fplTeam: BaseFplTeam
} & ListPositionBase

export type ListPositionChartDisplay = {
  opponents: TeamBase[],
  legs: string[]
} & ListPositionBase

export type WaiverPick = {
  id: string,
  pickNumber: string,
  outPlayer: PlayerBase,
  inPlayer: PlayerBase,
  outTeam: TeamBase,
  inTeam: TeamBase,
  position: string,
  status: string
}

export type Trade = {
  id: string,
  outPlayer: PlayerBase,
  inPlayer: PlayerBase,
  outTeam: TeamBase,
  inTeam: TeamBase,
  position: string
}

export type InterTeamTradeGroup = {
  id: string,
  outFplTeamListId: string,
  inFplTeamListId: string,
  outFplTeam: BaseFplTeam,
  inFplTeam: BaseFplTeam,
  trades: Trade[],
  canSubmit: boolean,
  canApprove: boolean,
  canCancel: boolean,
  status: string
}

export type InterTeamTradeGroups = {
  outTradeGroups: InterTeamTradeGroup[],
  inTradeGroups: InterTeamTradeGroup[]
}

export type MiniDraftPick = {
  pickNumber: string,
  season: string,
  fplTeam: BaseFplTeam,
  passed: boolean,
  user: User
} & Trade
