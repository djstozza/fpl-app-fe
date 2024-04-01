import App from './App';
import { MockedStore } from 'test/helpers'
import { MemoryRouter } from "react-router-dom"
import { render, screen } from '@testing-library/react'

import {
  USER_1,
  ROUNDS,
  ARSENAL,
  PLAYER_SUMMARIES,
  PLAYER_HISTORY,
  PLAYER_HISTORY_PAST,
  LIVE_LEAGUE,
  FPL_TEAM_1,
  DRAFT_PICKS,
  DRAFT_PICK_FACETS,
  MINI_DRAFT_PICKS,
  MINI_DRAFT_PICK_FACETS,
  LIST_POSITIONS,
  FPL_TEAM_LISTS,
  WAIVER_PICKS
} from 'test/fixtures'

import {
  ROUNDS_URL,
  PLAYERS_URL,
  TEAMS_URL,
  SIGN_UP_URL,
  LOGIN_URL,
  PROFILE_URL,
  LEAGUES_URL,
  FPL_TEAMS_URL
} from 'utilities/constants'

const defaultState = {
  rounds: { data: [] },
  teams: { data: [] },
  team: { data: undefined },
  players: { data: [], meta: { total: 0 } },
  player: { data: undefined },
  league: { data: undefined },
  draftPicks: { data: [], errors: [] },
  miniDraftPicks: { data: [], errors: [] },
  fplTeamList: { outListPosition: undefined },
  fplTeam: { data: undefined },
  fplTeamLists: { data: [] },
  interTeamTradeGroup: { data: undefined },
  auth: {}
}

describe('App', () => {
  const customRender = (initialEntries: string[] = [], state = {}) => render(
    <MemoryRouter initialEntries={initialEntries}>
      <MockedStore defaultState={{ ...defaultState, ...state }}>
        <App />
      </MockedStore>
    </MemoryRouter>
  )

  describe('RoundsPage', () => {
    const state = { rounds: { data:  ROUNDS } }
    it("renders the rounds page for /", () => {
      customRender(["/"], state)
      expect(screen.getByTestId('RoundsPage')).toBeInTheDocument()
    })
   
    it(`renders the rounds page for ${ROUNDS_URL}`, () => {
      customRender([ROUNDS_URL], state)
      expect(screen.getByTestId('RoundsPage')).toBeInTheDocument()
    })

    it(`renders the rounds page for ${ROUNDS_URL}/:id`, () => {
      customRender([`${ROUNDS_URL}/1`], state)
      expect(screen.getByTestId('RoundsPage')).toBeInTheDocument()
    })
  })

  test('TeamsPage', () => {
    customRender([TEAMS_URL])
    expect(screen.getByTestId('TeamsPage')).toBeInTheDocument()
  })

  describe('TeamPage', () => {
    const state = { 
      team: { data: ARSENAL, fixtures: [] },
      teams: { data: [] },
      players: { data: [] }
    }

    it(`renders TeamDetails when the route is ${TEAMS_URL}/:id`, () => {
      customRender([`${TEAMS_URL}/1`], state)
      expect(screen.getByTestId('TeamDetails')).toBeInTheDocument()
    })

    it(`renders TeamDetails when the route is ${TEAMS_URL}/:id/details`, () => {
      customRender([`${TEAMS_URL}/1/details`], state)
      expect(screen.getByTestId('TeamDetails')).toBeInTheDocument()
    })

    it(`renders FixturesTable when the route is ${TEAMS_URL}/:id/fixtures`, () => {
      customRender([`${TEAMS_URL}/1/fixtures`], state)
      expect(screen.getByTestId('FixturesTable')).toBeInTheDocument()
    })

    it(`renders PlayersTable when the route is ${TEAMS_URL}/:id/players`, () => {
      customRender([`${TEAMS_URL}/1/players`], state)
      expect(screen.getByTestId('PlayersTable')).toBeInTheDocument()
    })
  })

  test('PlayersPage', () => {
    customRender([PLAYERS_URL])
    expect(screen.getByTestId('PlayersPage')).toBeInTheDocument()
  })

  describe('PlayerPage', () => {
    const player = {
      ...PLAYER_SUMMARIES[1],
      hasHistory: true,
      history: PLAYER_HISTORY,
      hasHistoryPast: true,
      historyPast: PLAYER_HISTORY_PAST
    }
    const state = { player: { data: player } }
    
    it(`renders PlayerDetails when the route is ${PLAYERS_URL}/:id`, () => {
      customRender([`${PLAYERS_URL}/1`], state)
      expect(screen.getByTestId('PlayerDetails')).toBeInTheDocument()
    })
    
    it(`renders PlayerDetails when the route is ${PLAYERS_URL}/:id/details`, () => {
      customRender([`${PLAYERS_URL}/1/details`], state)
      expect(screen.getByTestId('PlayerDetails')).toBeInTheDocument()
    })

    it(`renders HistoryTable when the route is ${PLAYERS_URL}/:id/history`, () => {
      customRender([`${PLAYERS_URL}/1/history`], state)
      expect(screen.getByTestId('HistoryTable')).toBeInTheDocument()
    })

    it(`renders HistoryPastTable when the route is ${PLAYERS_URL}/:id/historyPast`, () => {
      customRender([`${PLAYERS_URL}/1/historyPast`], state)
      expect(screen.getByTestId('HistoryPastTable')).toBeInTheDocument()
    })
  })

  test('SignUpPage', () => {
    customRender([SIGN_UP_URL])
    expect(screen.getByTestId('SignUpPage')).toBeInTheDocument()
  })

  test('LoginPage', () => {
    customRender([LOGIN_URL])
    expect(screen.getByTestId('LoginPage')).toBeInTheDocument()
  })

  describe('ChangePasswordForm', () => {
    it(`renders ChangePasswordForm when the route is ${PROFILE_URL}/change-password`, () => {
      customRender([`${PROFILE_URL}/change-password`], { auth: { user: USER_1 } })
      expect(screen.getByTestId('ChangePasswordForm')).toBeInTheDocument()
    })

    it('renders the login page if there is no user', () => {
      customRender([PROFILE_URL])
      expect(screen.getByTestId('LoginPage')).toBeInTheDocument()
    })
  })

  describe('FplTeamsTable', () => {
    it(`renders FplTeamsTable when the route is ${PROFILE_URL}/fplTeams`, () => {
      customRender([`${PROFILE_URL}/fplTeams`], { auth: { user: USER_1 } })
      expect(screen.getByTestId('FplTeamsTable')).toBeInTheDocument()
    })

    it('renders the login page if there is no user', () => {
      customRender([PROFILE_URL])
      expect(screen.getByTestId('LoginPage')).toBeInTheDocument()
    })
  })

  describe('ProfilePage', () => {
    it('renders the profile page', () => {
      customRender([PROFILE_URL], { auth: { user: USER_1 } })
      expect(screen.getByTestId('ProfilePage')).toBeInTheDocument()
    })

    it('renders the login page if there is no user', () => {
      customRender([PROFILE_URL])
      expect(screen.getByTestId('LoginPage')).toBeInTheDocument()
    })
  })

  describe('UserEditForm', () => {
    it('renders the UserEditForm', () => {
      customRender([`${PROFILE_URL}/details/edit`], { auth: { user: USER_1 } })
      expect(screen.getByTestId('UserEditForm')).toBeInTheDocument()
    })
  })

  describe('DraftPage', () => {
    const baseState = { 
      league: { data: LIVE_LEAGUE },
      draftPicks: {
        data: DRAFT_PICKS,
        facets: DRAFT_PICK_FACETS,
        meta: { total: DRAFT_PICKS.length },
        fetching: false,
        errors: []
      }
    }

    const state = {
      ...baseState,
      auth: { user: USER_1 }
    }
    
    it(`renders DraftPicksTable if the route is ${LEAGUES_URL}/:id/draft`, () => {
      customRender([`${LEAGUES_URL}/1/draft`], state)
      expect(screen.getByTestId('DraftPicksTable')).toBeInTheDocument()
    })

    it(`renders DraftPicksTable if the route is ${LEAGUES_URL}/:id/draft/draftPicks`, () => {
      customRender([`${LEAGUES_URL}/1/draft/draftPicks`], state)
      expect(screen.getByTestId('DraftPicksTable')).toBeInTheDocument()
    })

    it(`renders DraftPicksTable if the route is ${LEAGUES_URL}/:id/draft/availablePlayers`, () => {
      customRender([`${LEAGUES_URL}/1/draft/availablePlayers`], state)
      expect(screen.getByTestId('AvailablePlayersTable')).toBeInTheDocument()
    })

    it('renders the login page if there is no user', () => {
      customRender([`${LEAGUES_URL}/1/draft`])
      expect(screen.getByTestId('LoginPage')).toBeInTheDocument()
    })
  })

  describe('MiniDraftPage', () => {
    const baseState = {
      miniDraftPicks: {
        data: MINI_DRAFT_PICKS,
        facets: MINI_DRAFT_PICK_FACETS,
        meta: { total: MINI_DRAFT_PICKS.length },
        season: 'summer',
        fetching: false,
        errors: []
      },
      fplTeamList: {
        listPositions: LIST_POSITIONS,
        outListPosition: LIST_POSITIONS[0],
        fetching: false,
      },
      league: { data: LIVE_LEAGUE }
    }

    const state = {
      ...baseState,
      auth: { user: USER_1 }
    }

    it(`renders MiniDraftPicksTable if the route is ${LEAGUES_URL}/:id/miniDraft`, () => {
      customRender([`${LEAGUES_URL}/1/miniDraft`], state)
      expect(screen.getByTestId('MiniDraftPicksTable')).toBeInTheDocument()
    })

    it(`renders MiniDraftPicksTable if the route is ${LEAGUES_URL}/:id/miniDraft/miniDraftPicks`, () => {
      customRender([`${LEAGUES_URL}/1/miniDraft/miniDraftPicks`], state)
      expect(screen.getByTestId('MiniDraftPicksTable')).toBeInTheDocument()
    })

    it(`renders NewMiniDraftPick if the route is ${LEAGUES_URL}/:id/miniDraft/tradeableListPositions`, () => {
      customRender([`${LEAGUES_URL}/1/miniDraft/tradeableListPositions`], state)
      expect(screen.getByTestId('NewMiniDraftPick')).toBeInTheDocument()
    })

    it('renders the login page if there is no user', () => {
      customRender([`${LEAGUES_URL}/1/miniDraft`])
      expect(screen.getByTestId('LoginPage')).toBeInTheDocument()
    })
  })

  describe('LeaguesPage', () => {
    const state = {
      leagues: { leagues: [] },
      auth: { user: USER_1 }
    }
    it(`renders LeaguesPage if the route is ${PROFILE_URL}${LEAGUES_URL}`, () => {
      customRender([`${PROFILE_URL}${LEAGUES_URL}`], state)
      expect(screen.getByTestId('LeaguesPage')).toBeInTheDocument()
    })

    it('renders the login page if there is no user', () => {
      customRender([`${PROFILE_URL}${LEAGUES_URL}`])
      expect(screen.getByTestId('LoginPage')).toBeInTheDocument()
    })
  })

  describe('CreateLeague', () => {
    const state = {
      auth: { user: USER_1 }
    }

    const path = `${PROFILE_URL}${LEAGUES_URL}/new`
    
    it(`renders CreateLeague if the route is ${path}`, () => {
      customRender([path], state)
      expect(screen.getByTestId('CreateLeague')).toBeInTheDocument()
    })

    it('renders the login page if there is no user', () => {
      customRender([path])
      expect(screen.getByTestId('LoginPage')).toBeInTheDocument()
    })
  })

  describe('JoinLeague', () => {
    const state = {
      auth: { user: USER_1 }
    }

    const path = `${PROFILE_URL}${LEAGUES_URL}/join`
    
    it(`renders JoinLeague if the route is ${path}`, () => {
      customRender([path], state)
      expect(screen.getByTestId('JoinLeague')).toBeInTheDocument()
    })

    it('renders the login page if there is no user', () => {
      customRender([path])
      expect(screen.getByTestId('LoginPage')).toBeInTheDocument()
    })
  })

  describe('LeaguePage', () => {
    const baseState = {
      league: { data: LIVE_LEAGUE }
    }

    const state = {
      ...baseState,
      auth: { user: USER_1 }
    }
    
    it(`renders LeagueDetails when the route is ${LEAGUES_URL}/:id`, () => {
      customRender([`${LEAGUES_URL}/1`], state)
      expect(screen.getByTestId('LeagueDetails')).toBeInTheDocument()
    })

    it(`renders LeagueDetails when the route is ${LEAGUES_URL}/:id/details`, () => {
      customRender([`${LEAGUES_URL}/1/details`], state)
      expect(screen.getByTestId('LeagueDetails')).toBeInTheDocument()
    })

    it(`renders LeagueDetails when the route is ${LEAGUES_URL}/:id/details`, () => {
      customRender([`${LEAGUES_URL}/1/details`], state)
      expect(screen.getByTestId('LeagueDetails')).toBeInTheDocument()
    })

    it(`renders EditLeagueForm when the route is ${LEAGUES_URL}/:id/details/edit`, () => {
      customRender([`${LEAGUES_URL}/1/details/edit`], state)
      expect(screen.getByTestId('EditLeagueForm')).toBeInTheDocument()
    })

    it(`renders FplTeamsTable when the route is ${LEAGUES_URL}/:id/fplTeams`, () => {
      customRender([`${LEAGUES_URL}/1/fplTeams`], state)
      expect(screen.getByTestId('LeagueFplTeamsTable')).toBeInTheDocument()
    })

    it('renders the login page if there is no user', () => {
      customRender([`${LEAGUES_URL}/1`], baseState)
      expect(screen.getByTestId('LoginPage')).toBeInTheDocument()
    })
  })

  describe('FplTeamPage', () => {
    const baseState = {
      fplTeam: { data: FPL_TEAM_1 },
      fplTeamLists: { data: FPL_TEAM_LISTS },
      fplTeamList: {
        data: FPL_TEAM_LISTS[0],
        listPositions: LIST_POSITIONS,
        submitting: false,
        errors: []
      },
      listPosition: { data: LIST_POSITIONS[0] },
      waiverPicks: {
        data: WAIVER_PICKS,
        submitting: false,
        errors: [],
        fetching: false
      }
    }

    const state = {
      ...baseState,
      auth: { user: USER_1 }
    }

    it(`renders FplTeamDetails when the route is ${FPL_TEAMS_URL}/:id`, () => {
      customRender([`${FPL_TEAMS_URL}/1`], state)
      expect(screen.getByTestId('FplTeamDetails')).toBeInTheDocument()
    })

    it(`renders FplTeamDetails when the route is ${FPL_TEAMS_URL}/:id/details`, () => {
      customRender([`${FPL_TEAMS_URL}/1/details`], state)
      expect(screen.getByTestId('FplTeamDetails')).toBeInTheDocument()
    })

    it(`renders EditFplTeamForm when the route is ${FPL_TEAMS_URL}/:id/details/edit`, () => {
      customRender([`${FPL_TEAMS_URL}/1/details/edit`], state)
      expect(screen.getByTestId('EditFplTeamForm')).toBeInTheDocument()
    })

    describe('FplTeamListChart', () => {
      it(`renders FplTeamListChart when the route is ${FPL_TEAMS_URL}/:id/teamLists`, () => {  
        customRender([`${FPL_TEAMS_URL}/1/teamLists`], state)
        expect(screen.getByTestId('FplTeamListChart')).toBeInTheDocument()
      })

      it(`renders FplTeamListChart when the route is ${FPL_TEAMS_URL}/:id/teamLists/:fplTeamListId`, () => {  
        customRender([`${FPL_TEAMS_URL}/1/teamLists/1`], state)
        expect(screen.getByTestId('FplTeamListChart')).toBeInTheDocument()
      })
    })

    describe('WaiverPicksTable', () => {
      it(`renders WaiverPicksTable when the route is ${FPL_TEAMS_URL}/:id/waiverPicks`, () => {
        customRender([`${FPL_TEAMS_URL}/1/waiverPicks`], state)
        expect(screen.getByTestId('WaiverPicksTable')).toBeInTheDocument()
      })

      it(`renders WaiverPicksTable when the route is ${FPL_TEAMS_URL}/:id/teamLists/:fplTeamListId/waiverPicks`, () => {
        customRender([`${FPL_TEAMS_URL}/1/teamLists/1/waiverPicks`], state)
        expect(screen.getByTestId('WaiverPicksTable')).toBeInTheDocument()
      })

      it(`renders WaiverPicksTable when the route is ${FPL_TEAMS_URL}/:id/trades`, () => {
        customRender([`${FPL_TEAMS_URL}/1/teamLists/1/trades`], state)
        expect(screen.getByTestId('WaiverPicksTable')).toBeInTheDocument()
      })

      it(`renders WaiverPicksTable when the route is ${FPL_TEAMS_URL}/:id/teamLists/:fplTeamListId/trades`, () => {
        customRender([`${FPL_TEAMS_URL}/1/teamLists/1/trades`], state)
        expect(screen.getByTestId('WaiverPicksTable')).toBeInTheDocument()
      })
    })

    describe('NewWaiverPick', () => {
      it(`renders NewWaiverPick when the route is ${FPL_TEAMS_URL}/:id/waiverPicks/new`, () => {
        customRender([`${FPL_TEAMS_URL}/1/waiverPicks/new`], state)
        expect(screen.getByTestId('NewWaiverPick')).toBeInTheDocument()
      })

      it(`renders NewWaiverPick when the route is ${FPL_TEAMS_URL}/:id/trades/new`, () => {
        customRender([`${FPL_TEAMS_URL}/1/trades/new`], state)
        expect(screen.getByTestId('NewWaiverPick')).toBeInTheDocument()
      })
    })

    describe('TeamTradeTabs', () => {
      it(`renders TeamTradeTabs when the route is ${FPL_TEAMS_URL}/:id/teamTrades`, () => {
        customRender([`${FPL_TEAMS_URL}/1/teamTrades`], state)
        expect(screen.getByTestId('TeamTradeTabs')).toBeInTheDocument()
      })

      it(`renders TeamTradeTabs when the route is ${FPL_TEAMS_URL}/:id/teamLists/:fplTeamListId/teamTrades`, () => {
        customRender([`${FPL_TEAMS_URL}/1/teamLists/1/teamTrades/1`], state)
        expect(screen.getByTestId('TeamTradeTabs')).toBeInTheDocument()
      })

      it(`renders TeamTradeTabs when the route is ${FPL_TEAMS_URL}/:id/teamLists/:fplTeamListId/teamTrades/:action`, () => {
        customRender([`${FPL_TEAMS_URL}/1/teamLists/1/teamTrades/out`], state)
        expect(screen.getByTestId('TeamTradeTabs')).toBeInTheDocument()
      })
    })

    it(`renders NewTeamTrade when the route is ${FPL_TEAMS_URL}/:id/teamTrades/new`, () => {
      customRender([`${FPL_TEAMS_URL}/:id/teamTrades/new`], state)
      expect(screen.getByTestId('NewTeamTrade')).toBeInTheDocument()
    })

    it('renders the login page if there is no user', () => {
      customRender([`${FPL_TEAMS_URL}/1`], baseState)
      expect(screen.getByTestId('LoginPage')).toBeInTheDocument()
    })
  })

  describe('NoMatchPage', () => {
    it('is rendered when there is no recognised route', () => {
      customRender(['/unknown'], {})

      expect(screen.getByTestId('NoMatchPage')).toBeInTheDocument()
    })
  })
})
