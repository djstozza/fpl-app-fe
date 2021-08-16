import { createMount } from '@material-ui/core/test-utils'

import FixtureDetails from '.'
import { MockedRouter } from 'test/helpers'
import { IN_PROGRESS_FIXTURE } from 'test/fixtures'
import { PLAYERS_URL } from 'utilities/constants'

describe('FixtureDetails', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <FixtureDetails
        fixture={IN_PROGRESS_FIXTURE}
        {...props}
      />
    </MockedRouter>
  )

  const tableHead = (wrapper) => wrapper.find('WithStyles(ForwardRef(TableHead))')
  const tableBody = (wrapper, i = 0) => wrapper.find('WithStyles(ForwardRef(TableBody))').at(i)
  const tableBodyCell = (wrapper, i, j) => tableBody(wrapper, i).find('WithStyles(ForwardRef(TableCell))').at(j)
  const playerDiv = (wrapper, i, j, k) => tableBodyCell(wrapper, i, j).find('div').at(k)
  const playerLink = (wrapper, i, j, k) => playerDiv(wrapper, i, j, k).find('Link').at(0)

  it('renders the relevant stats', () => {
    const wrapper = render()

    expect(tableHead(wrapper)).toHaveLength(5)

    expect(tableHead(wrapper).at(0).text()).toEqual('Goals Scored')

    // Home team stats
    expect(playerDiv(wrapper, 0, 0, 0).text()).toEqual('3 Borges Fernandes')
    expect(playerLink(wrapper, 0, 0, 0).props().to).toEqual(`${PLAYERS_URL}/277`)

    expect(playerDiv(wrapper, 0, 0, 1).text()).toEqual('1 Rodrigues de Paula Santos')
    expect(playerLink(wrapper, 0, 0, 1).props().to).toEqual(`${PLAYERS_URL}/274`)

    expect(playerDiv(wrapper, 0, 0, 2).text()).toEqual('1 Greenwood')
    expect(playerLink(wrapper, 0, 0, 2).props().to).toEqual(`${PLAYERS_URL}/289`)

    // Away team stats
    expect(playerDiv(wrapper, 0, 1, 0).text()).toEqual('1 Ayling')
    expect(playerLink(wrapper, 0, 1, 0).props().to).toEqual(`${PLAYERS_URL}/206`)

    expect(tableHead(wrapper).at(1).text()).toEqual('Assists')

    // Home team stats
    expect(playerDiv(wrapper, 1, 0, 0).text()).toEqual('4 Pogba')
    expect(playerLink(wrapper, 1, 0, 0).props().to).toEqual(`${PLAYERS_URL}/272`)

    expect(playerDiv(wrapper, 1, 0, 1).text()).toEqual('1 Lindelöf')
    expect(playerLink(wrapper, 1, 0, 1).props().to).toEqual(`${PLAYERS_URL}/284`)

    // Away team stats
    expect(playerDiv(wrapper, 1, 1, 0).text()).toEqual('1 Dallas')
    expect(playerLink(wrapper, 1, 1, 0).props().to).toEqual(`${PLAYERS_URL}/209`)

    expect(tableHead(wrapper).at(2).text()).toEqual('Saves')

    // Home team stats
    expect(playerDiv(wrapper, 2, 0, 0).text()).toEqual('2 de Gea')
    expect(playerLink(wrapper, 2, 0, 0).props().to).toEqual(`${PLAYERS_URL}/270`)

    // Away team stats
    expect(playerDiv(wrapper, 2, 1, 0).text()).toEqual('3 Meslier')
    expect(playerLink(wrapper, 2, 1, 0).props().to).toEqual(`${PLAYERS_URL}/220`)

    expect(tableHead(wrapper).at(3).text()).toEqual('Yellow Cards')

    // Home team stats
    expect(playerDiv(wrapper, 3, 0, 0).text()).toEqual('1 Shaw')
    expect(playerLink(wrapper, 3, 0, 0).props().to).toEqual(`${PLAYERS_URL}/275`)

    // Away team stats
    expect(playerDiv(wrapper, 3, 1, 0).text()).toEqual('1 Cooper')
    expect(playerLink(wrapper, 3, 1, 0).props().to).toEqual(`${PLAYERS_URL}/205`)

    expect(playerDiv(wrapper, 3, 1, 1).text()).toEqual('1 Dias Belloli')
    expect(playerLink(wrapper, 3, 1, 1).props().to).toEqual(`${PLAYERS_URL}/217`)

    expect(tableHead(wrapper).at(4).text()).toEqual('Bonus')

    expect(playerDiv(wrapper, 4, 0, 0).text()).toEqual('3 Borges Fernandes')
    expect(playerLink(wrapper, 4, 0, 0).props().to).toEqual(`${PLAYERS_URL}/277`)

    expect(playerDiv(wrapper, 4, 0, 1).text()).toEqual('2 Pogba')
    expect(playerLink(wrapper, 4, 0, 1).props().to).toEqual(`${PLAYERS_URL}/272`)

    expect(playerDiv(wrapper, 4, 0, 2).text()).toEqual('1 Greenwood')
    expect(playerLink(wrapper, 4, 0, 2).props().to).toEqual(`${PLAYERS_URL}/289`)
  })
})
