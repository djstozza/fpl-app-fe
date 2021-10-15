import React from 'react';
import App from './App';
import { MockedStore } from 'test/helpers'
import { MemoryRouter } from "react-router-dom"
import { createMount } from '@material-ui/core/test-utils'

import { USER_1 } from 'test/fixtures'

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
  const render = (initialEntries, state = {}) => createMount()(
    <MemoryRouter initialEntries={initialEntries}>
      <MockedStore defaultState={{ ...defaultState, ...state }}>
        <App />
      </MockedStore>
    </MemoryRouter>
  )

  test('RoundsPage', () => {
    let wrapper = render()
    expect(wrapper.find('RoundsPage')).toHaveLength(1)

    wrapper = render([ROUNDS_URL])
    expect(wrapper.find('RoundsPage')).toHaveLength(1)

    wrapper = render([`${ROUNDS_URL}/1`])
    expect(wrapper.find('RoundsPage')).toHaveLength(1)
  })

  test('TeamsPage', () => {
    const wrapper = render([TEAMS_URL])
    expect(wrapper.find('TeamsPage')).toHaveLength(1)
  })

  test('TeamPage', () => {
    const wrapper = render([`${TEAMS_URL}/1`])
    expect(wrapper.find('Route').find('TeamPage')).toHaveLength(1)
  })

  test('PlayersPage', () => {
    const wrapper = render([PLAYERS_URL])
    expect(wrapper.find('PlayersPage')).toHaveLength(1)
  })

  test('PlayerPage', () => {
    const wrapper = render([`${PLAYERS_URL}/1`])
    expect(wrapper.find('PlayerPage')).toHaveLength(1)
  })

  test('SignUpPage', () => {
    const wrapper = render([SIGN_UP_URL])
    expect(wrapper.find('SignUpPage')).toHaveLength(1)
  })

  test('LoginPage', () => {
    const wrapper = render([LOGIN_URL])
    expect(wrapper.find('LoginPage')).toHaveLength(1)
  })

  describe('ProfilePage', () => {
    it('renders the profile page', () => {
      const wrapper = render([PROFILE_URL], { auth: { user: USER_1 } })
      expect(wrapper.find('ProfilePage')).toHaveLength(1)
    })

    it('renders the login page if there is no user', () => {
      const wrapper = render([PROFILE_URL])

      expect(wrapper.find('LoginPage')).toHaveLength(1)
    })
  })

  describe('DraftPage', () => {
    it('renders the draft page', () => {
      const wrapper = render([`${LEAGUES_URL}/1/draft`], { auth: { user: USER_1 } })
      expect(wrapper.find('DraftPage')).toHaveLength(1)
    })

    it('renders the login page if there is no user', () => {
      const wrapper = render([`${LEAGUES_URL}/1/draft`])

      expect(wrapper.find('LoginPage')).toHaveLength(1)
    })
  })

  describe('MiniDraftPage', () => {
    it('renders the mini draft page', () => {
      const wrapper = render([`${LEAGUES_URL}/1/miniDraft`], { auth: { user: USER_1 } })
      expect(wrapper.find('MiniDraftPage')).toHaveLength(1)
    })

    it('renders the login page if there is no user', () => {
      const wrapper = render([`${LEAGUES_URL}/1/miniDraft`])

      expect(wrapper.find('LoginPage')).toHaveLength(1)
    })
  })

  describe('LeaguePage', () => {
    it('renders the mini draft page', () => {
      const wrapper = render([`${LEAGUES_URL}/1`], { auth: { user: USER_1 } })
      expect(wrapper.find('LeaguePage')).toHaveLength(1)
    })

    it('renders the login page if there is no user', () => {
      const wrapper = render([`${LEAGUES_URL}/1/miniDraft`])

      expect(wrapper.find('LoginPage')).toHaveLength(1)
    })
  })

  describe('FplTeamPage', () => {
    it('renders the mini draft page', () => {
      const wrapper = render([`${FPL_TEAMS_URL}/1`], { auth: { user: USER_1 } })
      expect(wrapper.find('FplTeamPage')).toHaveLength(1)
    })

    it('renders the login page if there is no user', () => {
      const wrapper = render([`${FPL_TEAMS_URL}/1/miniDraft`])

      expect(wrapper.find('LoginPage')).toHaveLength(1)
    })
  })
})
