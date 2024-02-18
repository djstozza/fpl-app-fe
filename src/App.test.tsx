import React from 'react';
import App from './App';
import { MockedStore } from 'test/helpers'
import { MemoryRouter } from "react-router-dom"
import { render, screen } from '@testing-library/react'

import {
  USER_1,
  ROUNDS,
  ARSENAL,
  PLAYER_SUMMARIES,
  LIVE_LEAGUE,
  FPL_TEAM_1
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
  auth: {},
  loadingBar: { default: 0 }
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

  test('TeamPage', () => {
    const state = { 
      team: { data: ARSENAL, fixtures: [] },
      teams: { data: [] },
      players: { data: [] }
    } 
    customRender([`${TEAMS_URL}/1/fixtures`], state)
    expect(screen.getByTestId('TeamPage')).toBeInTheDocument()
  })

  test('PlayersPage', () => {
    customRender([PLAYERS_URL])
    expect(screen.getByTestId('PlayersPage')).toBeInTheDocument()
  })

  test('PlayerPage', () => {
    const state = { player: { data: PLAYER_SUMMARIES[1] } }
    customRender([`${PLAYERS_URL}/1`], state)
    expect(screen.getByTestId('PlayerPage')).toBeInTheDocument()
  })

  test('SignUpPage', () => {
    customRender([SIGN_UP_URL])
    expect(screen.getByTestId('SignUpPage')).toBeInTheDocument()
  })

  test('LoginPage', () => {
    customRender([LOGIN_URL])
    expect(screen.getByTestId('LoginPage')).toBeInTheDocument()
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

  describe('DraftPage', () => {
    it('renders the draft page', () => {
      customRender(
        [`${LEAGUES_URL}/1/draft`],
        { 
          league: { data: LIVE_LEAGUE },
          auth: { user: USER_1 }
        }
      )
      expect(screen.getByTestId('DraftPage')).toBeInTheDocument()
    })

    it('renders the login page if there is no user', () => {
      customRender([`${LEAGUES_URL}/1/draft`])
      expect(screen.getByTestId('LoginPage')).toBeInTheDocument()
    })
  })

  describe('MiniDraftPage', () => {
    it('renders the mini draft page', () => {
      customRender(
        [`${LEAGUES_URL}/1/miniDraft`],
        { 
          league: { data: LIVE_LEAGUE },
          auth: { user: USER_1 }
        }
      )
      expect(screen.getByTestId('MiniDraftPage')).toBeInTheDocument()
    })

    it('renders the login page if there is no user', () => {
      customRender([`${LEAGUES_URL}/1/miniDraft`])
      expect(screen.getByTestId('LoginPage')).toBeInTheDocument()
    })
  })

  describe('LeaguePage', () => {
    it('renders the league page', () => {
      customRender(
        [`${LEAGUES_URL}/1`],
        { 
          league: { data: { league: LIVE_LEAGUE } },
          auth: { user: USER_1 }
        }
      )
      expect(screen.getByTestId('LeaguePage')).toBeInTheDocument()
    })

    it('renders the login page if there is no user', () => {
      customRender([`${LEAGUES_URL}/1`])
      expect(screen.getByTestId('LoginPage')).toBeInTheDocument()
    })
  })

  describe('FplTeamPage', () => {
    it('renders the fpl team page', () => {
      customRender(
        [`${FPL_TEAMS_URL}/1`],
        {
          fplTeam: { data: FPL_TEAM_1 },
          auth: { user: USER_1 }
        }
      )
      expect(screen.getByTestId('FplTeamPage')).toBeInTheDocument()
    })

    it('renders the login page if there is no user', () => {
      customRender([`${FPL_TEAMS_URL}/1`])
      expect(screen.getByTestId('LoginPage')).toBeInTheDocument()
    })
  })
})
