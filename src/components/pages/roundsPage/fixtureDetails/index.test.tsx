import { within, render, screen } from '@testing-library/react'

import FixtureDetails from '.'
import { MockedRouter } from 'test/helpers'
import { IN_PROGRESS_FIXTURE } from 'test/fixtures'
import { PLAYERS_URL } from 'utilities/constants'

describe('FixtureDetails', () => {
  const customRender = (props = {}) => render(
    <MockedRouter>
      <FixtureDetails
        fixture={IN_PROGRESS_FIXTURE}
        {...props}
      />
    </MockedRouter>
  )

  const table = () => screen.getByRole('table')
  const colummnHeaders = () => screen.getAllByRole('columnheader')
  const tableBody = (i) => document.querySelectorAll('tbody')[i]
  const tableBodyCell = (i, j) => within(tableBody(i)).getAllByRole('cell')[j]
  const playerDiv = (i, j, k) => tableBodyCell(i, j).querySelectorAll('div')[k]
  const playerLink = (i, j, k) => within(tableBodyCell(i, j)).getAllByRole('link')[k]

  it('renders the relevant stats', () => {
    customRender()

    expect(colummnHeaders()).toHaveLength(5)
    expect(colummnHeaders()[0]).toHaveTextContent('Goals Scored')

    // Home team stats
    expect(playerDiv(0, 0, 0)).toHaveTextContent('3 Borges Fernandes')
    expect(playerLink(0, 0, 0)).toHaveAttribute('href', `${PLAYERS_URL}/277`)

    expect(playerDiv(0, 0, 1)).toHaveTextContent('1 Rodrigues de Paula Santos')
    expect(playerLink(0, 0, 1)).toHaveAttribute('href', `${PLAYERS_URL}/274`)

    expect(playerDiv(0, 0, 2)).toHaveTextContent('1 Greenwood')
    expect(playerLink(0, 0, 2)).toHaveAttribute('href', `${PLAYERS_URL}/289`)

    // Away team stats
    expect(playerDiv(0, 1, 0)).toHaveTextContent('1 Ayling')
    expect(playerLink(0, 1, 0)).toHaveAttribute('href', `${PLAYERS_URL}/206`)

    expect(colummnHeaders()[1]).toHaveTextContent('Assists')

    // Home team stats
    expect(playerDiv(1, 0, 0)).toHaveTextContent('4 Pogba')
    expect(playerLink(1, 0, 0)).toHaveAttribute('href', `${PLAYERS_URL}/272`)

    expect(playerDiv(1, 0, 1)).toHaveTextContent('1 Lindelöf')
    expect(playerLink(1, 0, 1)).toHaveAttribute('href', `${PLAYERS_URL}/284`)

    // Away team stats
    expect(playerDiv(1, 1, 0)).toHaveTextContent('1 Dallas')
    expect(playerLink(1, 1, 0)).toHaveAttribute('href', `${PLAYERS_URL}/209`)

    expect(colummnHeaders()[2]).toHaveTextContent('Saves')

    // Home team stats
    expect(playerDiv(2, 0, 0)).toHaveTextContent('2 de Gea')
    expect(playerLink(2, 0, 0)).toHaveAttribute('href', `${PLAYERS_URL}/270`)

    // Away team stats
    expect(playerDiv(2, 1, 0)).toHaveTextContent('3 Meslier')
    expect(playerLink(2, 1, 0)).toHaveAttribute('href', `${PLAYERS_URL}/220`)

    expect(colummnHeaders()[3]).toHaveTextContent('Yellow Cards')

    // Home team stats
    expect(playerDiv(3, 0, 0)).toHaveTextContent('1 Shaw')
    expect(playerLink(3, 0, 0)).toHaveAttribute('href', `${PLAYERS_URL}/275`)

    // Away team stats
    expect(playerDiv(3, 1, 0)).toHaveTextContent('1 Cooper')
    expect(playerLink(3, 1, 0)).toHaveAttribute('href', `${PLAYERS_URL}/205`)

    expect(playerDiv(3, 1, 1)).toHaveTextContent('1 Dias Belloli')
    expect(playerLink(3, 1, 1)).toHaveAttribute('href', `${PLAYERS_URL}/217`)

    expect(colummnHeaders()[4]).toHaveTextContent('Bonus')

    expect(playerDiv(4, 0, 0)).toHaveTextContent('3 Borges Fernandes')
    expect(playerLink(4, 0, 0)).toHaveAttribute('href', `${PLAYERS_URL}/277`)

    expect(playerDiv(4, 0, 1)).toHaveTextContent('2 Pogba')
    expect(playerLink(4, 0, 1)).toHaveAttribute('href', `${PLAYERS_URL}/272`)

    expect(playerDiv(4, 0, 2)).toHaveTextContent('1 Greenwood')
    expect(playerLink(4, 0, 2)).toHaveAttribute('href', `${PLAYERS_URL}/289`)
  })
})
