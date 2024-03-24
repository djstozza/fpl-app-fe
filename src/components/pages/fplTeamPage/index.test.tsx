import React, { useState as useStateReal } from 'react'
import { render, screen } from '@testing-library/react'
import * as rrd from 'react-router-dom'
import moment from 'moment'

import ConnectedFplTeamPage, { FplTeamPage, TABS } from '.'
import { initialState as fplTeamListInitialState } from 'state/fplTeamList/reducer'
import { initialState as listPositionInitialState } from 'state/listPosition/reducer'
import { initialState as playersInitialState } from 'state/players/reducer'
import { initialState as waiverPicksInitialState } from 'state/waiverPicks/reducer'
import { initialState as tradesInitialState } from 'state/trades/reducer'
import { initialState as interTeamTradeGroupsInitialState } from 'state/interTeamTradeGroups/reducer'
import { initialState as interTeamTradeGroupInitialState } from 'state/interTeamTradeGroup/reducer'
import { initialState as fplTeamListsInitialState } from 'state/fplTeamLists/reducer'

import {
  FPL_TEAM_1,
  FPL_TEAM_LISTS,
  INITIALIZED_LEAGUE,
  INTER_TEAM_TRADE_GROUP_1
} from 'test/fixtures'
import { MockedRouterStoreWithRoute, MockedRouter, blank__ } from 'test/helpers'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(), // Mock the useParams hook
}))

afterEach(() => {
  jest.clearAllMocks();
})

const tabsArr = Object.values(TABS)

describe('DraftPage', () => {
  const connectedRender = (props = {}, state = {}) => render(
    <MockedRouterStoreWithRoute
       defaultState={{
        fplTeam: { data: FPL_TEAM_1, errors: [] },
        fplTeamLists: { data: FPL_TEAM_LISTS },
        fplTeamList: { outListPosition: undefined },
        interTeamTradeGroup: { data: undefined },
        ...state
      }}
    >
      <ConnectedFplTeamPage
        {...props}
      />
    </MockedRouterStoreWithRoute>
  )

  const customRender = (props = {}) => render(
    <MockedRouter>
      <FplTeamPage
        fplTeam={FPL_TEAM_1}
        fplTeamLists={fplTeamListsInitialState}
        fplTeamList={fplTeamListInitialState}
        interTeamTradeGroup={{...interTeamTradeGroupInitialState, ...INTER_TEAM_TRADE_GROUP_1 }}
        listPosition={listPositionInitialState}
        players={playersInitialState}
        waiverPicks={waiverPicksInitialState}
        trades={tradesInitialState}
        interTeamTradeGroups={interTeamTradeGroupsInitialState}
        errors={[]}
        submitting={false}
        fetchFplTeam={blank__}
        updateFplTeam={blank__}
        fetchFplTeamLists={blank__}
        fetchFplTeamList={blank__}
        fetchValidSubstitutions={blank__}
        processSubstitution={blank__}
        clearValidSubstitutions={blank__}
        fetchListPositions={blank__}
        setOutListPosition={blank__}
        fetchTradeablePlayers={blank__}
        updateTradeablePlayersFilter={blank__}
        updateTradeablePlayersSort={blank__}
        updateTradeablePlayersPage={blank__}
        fetchPlayerFacets={blank__}
        fetchWaiverPicks={blank__}
        createWaiverPick={blank__}
        changeWaiverPickOrder={blank__}
        createTrade={blank__}
        fetchTrades={blank__}
        fetchTradeableListPositions={blank__}
        createInterTeamTradeGroup={blank__}
        updateTradeableListPositionsFilter={blank__}
        updateTradeableListPositionsSort={blank__}
        fetchTradeableListPositionFacets={blank__}
        fetchInterTeamTradeGroups={blank__}
        addToInterTeamTradeGroup={blank__}
        cancelInterTeamTradeGroup={blank__}
        submitInterTeamTradeGroup={blank__}
        approveInterTeamTradeGroup={blank__}
        declineInterTeamTradeGroup={blank__}
        fetchInterTeamTradeGroup={blank__}
        removeTrade={blank__}
        {...props}
      />
    </MockedRouter>
  )

  const tabs = () => screen.getAllByRole('tab')
  const heading = () => screen.getByRole('heading')
  const fplTeamAlert = () => screen.queryByTestId('FplTeamAlert')
  
  describe('when fplTeamId is present', () => {
    beforeEach(() => (rrd as jest.Mocked<typeof rrd>).useParams.mockReturnValue({ fplTeamId: '1' }))
    
    it('renders all the tabs if isOwner = true and the league is live', () => {
      connectedRender()
     
      expect(screen.getByTestId('FplTeamPage')).toBeInTheDocument()
      expect(tabs()).toHaveLength(tabsArr.length)
      expect(tabs()[0]).toHaveAttribute('aria-selected', 'true')
      
      expect(tabs()[0]).toHaveTextContent(tabsArr[0].label)
      expect(tabs()[1]).toHaveTextContent(tabsArr[1].label)
      expect(tabs()[2]).toHaveTextContent(tabsArr[2].label)
      expect(tabs()[3]).toHaveTextContent(tabsArr[3].label)
      expect(tabs()[4]).toHaveTextContent(tabsArr[4].label)
      
      expect(heading()).toHaveTextContent(FPL_TEAM_1.name)
    })

    it('only shows the details tab if isOwner = false and the league is not live', () => {
      connectedRender(
        {},
        { fplTeam: { data: { ...FPL_TEAM_1, isOwner: false, league: INITIALIZED_LEAGUE } } }
      )

      expect(tabs()).toHaveLength(1)
      expect(tabs()[0]).toHaveTextContent(tabsArr[0].label)
    })

    it('only shows the teamLists and details tabs if the league is live and isOwner = false', () => {
      connectedRender({}, { fplTeam: { data: { ...FPL_TEAM_1, isOwner: false } } })

      expect(tabs()).toHaveLength(2)
      expect(tabs()[0]).toHaveTextContent(tabsArr[0].label)
      expect(tabs()[1]).toHaveTextContent(tabsArr[1].label)
    })

    it('triggers fetchFplTeam on render', () => {
      const fetchFplTeam = jest.fn()

      customRender({ fetchFplTeam })

      expect(fetchFplTeam).toHaveBeenCalledWith(FPL_TEAM_1.id)
    })

    it('triggers fetchFplTeamLists on render', () => {
      const fetchFplTeamLists = jest.fn()

      customRender({ fetchFplTeamLists })

      expect(fetchFplTeamLists).toHaveBeenCalledWith(FPL_TEAM_1.id)
    })

    it('renders nothing if there is no fplTeamId is undefined', () => {
      (rrd as jest.Mocked<typeof rrd>).useParams.mockReturnValue({ fplTeamId: undefined })
      customRender()
      expect(screen.queryByTestId('FplTeamPage')).not.toBeInTheDocument()
    })

    it('renders nothing if there is no fplTeam', () => {
      customRender({ fplTeam: undefined })
      expect(screen.queryByTestId('FplTeamPage')).not.toBeInTheDocument()
    })

    describe('extraTitleInfo', () => {
      it('shows the round and the total score on the teamLists tab if present', () => {
        const useStateSpy = jest.spyOn(React, 'useState');
        let calls = 0;
      
        useStateSpy.mockImplementation((init: any = undefined) => {
          calls += 1;
         
          if (calls === 6) {
            return ['teamLists', blank__]
          }
          return useStateReal(init);
        })
        customRender({
          fplTeamList: { outListPosition: undefined, data: FPL_TEAM_LISTS[0] }
        })

        expect(heading())
          .toHaveTextContent(`${FPL_TEAM_1.name} - ${FPL_TEAM_LISTS[0].round.name} - ${FPL_TEAM_LISTS[0].totalScore} Points`)

        useStateSpy.mockRestore()
      })
    })

    describe('selectedFplTeamListId', () => {
      it('does not get set if there are no fplTeamLists', () => {
        const fetchFplTeamList = jest.fn()
        const fetchListPositions = jest.fn()

        customRender({ fetchFplTeamList, fetchListPositions, fplTeamLists: { data: [] } })

        expect(fetchFplTeamList).not.toHaveBeenCalled()
        expect(fetchListPositions).not.toHaveBeenCalled()
      })

      it('uses the fplTeamListId in the params if present', () => {
        (rrd as jest.Mocked<typeof rrd>).useParams.mockReturnValue({ fplTeamId: FPL_TEAM_1.id, fplTeamListId: FPL_TEAM_LISTS[1].id })
        const fetchFplTeamList = jest.fn()
        const fetchListPositions = jest.fn()

        customRender({
          fetchFplTeamList,
          fetchListPositions
        })

        expect(fetchFplTeamList).toHaveBeenCalledWith(FPL_TEAM_LISTS[1].id)
        expect(fetchListPositions).toHaveBeenCalledWith(FPL_TEAM_LISTS[1].id)
      })

      it('defaults to the currentFplTeamListId if present and there is no fplTeamListId in the params', () => {
        const fetchFplTeamList = jest.fn()
        const fetchListPositions = jest.fn()

        customRender({ fetchFplTeamList, fetchListPositions, fplTeamLists: { data: FPL_TEAM_LISTS } })

        expect(fetchFplTeamList).toHaveBeenCalledWith(FPL_TEAM_LISTS[0].id)
        expect(fetchListPositions).toHaveBeenCalledWith(FPL_TEAM_LISTS[0].id)
      })

      it('defaults to the last fplTeamList if present and there is no fplTeamListId and no currentFplTeamList', () => {
        const fetchFplTeamList = jest.fn()
        const fetchListPositions = jest.fn()

        const fplTeamLists = [
          {
            ...FPL_TEAM_LISTS[0],
            round: {
              ...FPL_TEAM_LISTS[0].round,
              current: false
            }
          },
          FPL_TEAM_LISTS[1],
          FPL_TEAM_LISTS[2]
        ]

        customRender({ fetchFplTeamList, fetchListPositions, fplTeamLists: { data: fplTeamLists } })

        expect(fetchFplTeamList).toHaveBeenCalledWith(FPL_TEAM_LISTS[2].id)
        expect(fetchListPositions).toHaveBeenCalledWith(FPL_TEAM_LISTS[2].id)
      })
    })

    
    describe('deadlineTime', () => {
      it('gets set as the waiverDeadline if it has not passed', () => {
        const waiverDeadline = moment().add(1, 'day').toDate()
        const deadlineTime = moment().add(3, 'days').toDate()

        const fplTeamLists = [
          {
            ...FPL_TEAM_LISTS[0],
            round: {
              ...FPL_TEAM_LISTS[0].round,
              current: false
            }
          },
          FPL_TEAM_LISTS[1],
          {
            ...FPL_TEAM_LISTS[2],
            round: {
              ...FPL_TEAM_LISTS[2].round,
              current: true,
              deadlineTime,
              waiverDeadline
            }
          }
        ]

        customRender({ fplTeamLists: { data: fplTeamLists } })

        expect(fplTeamAlert()).toHaveTextContent(`${FPL_TEAM_LISTS[2].round.name} waiver deadline ends in 1 day`)
      })

      it('gets set as the deadlineTime it has not passed but the waiverDeadline has', () => {
        const waiverDeadline = moment().subtract(2, 'days').toDate()
        const deadlineTime = moment().add(1, 'day').toDate()

        const fplTeamLists = [
          {
            ...FPL_TEAM_LISTS[0],
            round: {
              ...FPL_TEAM_LISTS[0].round,
              current: false
            }
          },
          FPL_TEAM_LISTS[1],
          {
            ...FPL_TEAM_LISTS[2],
            round: {
              ...FPL_TEAM_LISTS[2].round,
              current: true,
              deadlineTime,
              waiverDeadline
            }
          }
        ]

        customRender({ fplTeamLists: { data: fplTeamLists } })
        expect(fplTeamAlert()).toHaveTextContent(`${FPL_TEAM_LISTS[2].round.name} trade deadline ends in 1 day`)
      })

      it('does not get set if both the waiverDeadline and the deadlineTime have passed', () => {
        const waiverDeadline = moment().subtract(2, 'days').toDate()
        const deadlineTime = moment().subtract(1, 'day').toDate()

        const fplTeamLists = [
          {
            ...FPL_TEAM_LISTS[0],
            round: {
              ...FPL_TEAM_LISTS[0].round,
              current: false
            }
          },
          FPL_TEAM_LISTS[1],
          {
            ...FPL_TEAM_LISTS[2],
            round: {
              ...FPL_TEAM_LISTS[2].round,
              current: true,
              deadlineTime,
              waiverDeadline
            }
          }
        ]

        customRender({ fplTeamLists: { data: fplTeamLists } })

        expect(fplTeamAlert()).not.toBeInTheDocument()
      })

      it('does not get set if there is no currentFplTeamList', () => {
        const fplTeamLists = [
          {
            ...FPL_TEAM_LISTS[0],
            round: {
              ...FPL_TEAM_LISTS[0].round,
              current: false
            }
          },
          FPL_TEAM_LISTS[1],
          FPL_TEAM_LISTS[2]
        ]

        customRender({ fplTeamLists: { data: fplTeamLists } })

        expect(fplTeamAlert()).not.toBeInTheDocument()
      })
    })
  })

  describe('when fplTeamId is not present', () => {
    it('renders nothing', () => {
      expect(screen.queryByTestId('FplTeamPage')).not.toBeInTheDocument()
    })
  })
})