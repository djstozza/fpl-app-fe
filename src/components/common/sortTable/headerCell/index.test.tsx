import { render, screen, fireEvent } from '@testing-library/react'

import HeaderCell from '.'
import { blank__ } from 'test/helpers'
import { PLAYER_FACETS } from 'test/fixtures'

describe('HeaderCell', () => {
  const label = 'T'
  const customRender = (props = {}) => render(
    <table>
      <tbody>
        <tr>
          <HeaderCell
            cellId='teams'
            facets={PLAYER_FACETS}
            filterParam='teamId'
            handleFilterChange={blank__}
            handleSort={blank__}
            label={label}
            sortParam='teams.shortName'
            sort={{ 'teams.shortName': 'desc' }}
            toolTipLabel='Team'
            {...props}
          />
        </tr>
      </tbody>
    </table>
  )

  const filterButton = () => screen.getByLabelText('filter')
  const checkboxes = () => screen.queryAllByRole('checkbox')
  const modal = () => screen.queryByRole('presentation')
  const buttons = () => screen.getAllByRole('button')
  const sortDirection = () => screen.getByTestId('ArrowDownwardIcon')
  const tableCell = () => screen.getByRole('cell')

  const filter = { teamId: ['1', '2'], positionId: ['4'] }

  describe('mainHeaderCell', () => {
    it('does not have mainHeadercell if sticky != true', () => {
      customRender()
      expect(tableCell().className).not.toContain('mainHeaderCell')
    })
  
    it('adds the mainHeaderCell class if sticky = true', () => {
      customRender({ sticky: true })
      expect(tableCell().className).toContain('mainHeaderCell')
    })
  })

  describe('when the cellId does not have any facets', () => {
    it('does not render the filter', () => {
      customRender({ cellId: 'ownGoals' })
      expect(screen.queryByLabelText('Filter')).not.toBeInTheDocument()
    })
  })

  describe('filtering', () => {
    it('triggers handleFilterChange with the set filters', ()=> {
      const handleFilterChange = jest.fn()

      customRender({ handleFilterChange, filter }) // Open filter
      
      expect(modal()).not.toBeInTheDocument()
      expect(checkboxes().length).toEqual(0)

      fireEvent.click(filterButton())
      expect(modal()).toBeInTheDocument()
      expect(checkboxes().length).toEqual(PLAYER_FACETS['teams'].length)
      
      expect(checkboxes()[0]).toBeChecked()
      expect(checkboxes()[1]).toBeChecked()

      fireEvent.click(checkboxes()[0])
      expect(checkboxes()[0]).not.toBeChecked()

      fireEvent.click(checkboxes()[4])
      expect(checkboxes()[4]).toBeChecked()

      fireEvent.click(screen.getByRole('button', { name: /apply/i }))

      expect(handleFilterChange).toHaveBeenCalledWith(
        {
          positionId: ['4'],
          teamId: ['2', '5']
        }
      )

      expect(modal()).not.toBeInTheDocument()
      expect(checkboxes().length).toEqual(0)
    })

    it('removes empty filters when handleFilterChange is called', () => {
      const handleFilterChange = jest.fn()

      customRender({ handleFilterChange, filter })

      expect(modal()).not.toBeInTheDocument()

      fireEvent.click(filterButton())

      expect(modal()).toBeInTheDocument()

      fireEvent.click(checkboxes()[0])
      fireEvent.click(checkboxes()[1])

      fireEvent.click(screen.getByRole('button', { name: 'Apply' }))

      expect(handleFilterChange).toHaveBeenCalledWith({ positionId: ['4'] })

      expect(modal()).not.toBeInTheDocument()
    })

    it('does not render the filter if there is no filterParam', () => {
      customRender({ filterParam: undefined, facets: undefined })

      expect(screen.queryByLabelText('Filter')).not.toBeInTheDocument()
    })
  })

  describe('sorting', () => {
    describe('noPaddingRight', () => {
      it('has the noPaddingRight class if the sortParam is present', () => {
        customRender()
        expect(tableCell().className).toContain('noPaddingRight')
      })

      it('does not have noPaddingRight if the sortParam is not present', () => {
        customRender({ sortParam: undefined })
        expect(tableCell().className).not.toContain('noPaddingRight')
      })
    })

    it('triggers handleSort when clicked', () => {
      const handleSort = jest.fn()
      
      customRender({ handleSort })

      expect(buttons()[1].className).toContain('Mui-active')
      expect(sortDirection().classList.toString()).toContain('MuiTableSortLabel-iconDirectionDesc')
      
      fireEvent.click(buttons()[1])

      expect(handleSort).toHaveBeenCalledWith('teams.shortName', 'desc')
    })

    it('shows active = false if there is no sortDirection', () => {
      const sort = { 'position.name': 'asc' }
      const handleSort = jest.fn()
      customRender({ handleSort, sort })

      expect(buttons()[1].className).not.toContain('Mui-active')
      expect(sortDirection().classList.toString()).toContain('MuiTableSortLabel-iconDirectionAsc')

      fireEvent.click(buttons()[1])

      expect(handleSort).toHaveBeenCalledWith('teams.shortName', undefined)
    })

    it('does not render the TableSortLabel if sortParam is undefined', () => {
      customRender({ sortParam: undefined })

      expect(buttons().length).toEqual(1)
    })
  })
})
