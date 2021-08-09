import { createMount } from '@material-ui/core/test-utils'

import HeaderCell from '.'
import { blank__ } from 'test/helpers'
import { PLAYER_FACETS } from 'test/fixtures'

describe('HeaderCell', () => {
  const render = (props = {}) => createMount()(
    <table>
      <tbody>
        <tr>
          <HeaderCell
            cellId='teams'
            facets={PLAYER_FACETS}
            filterParam='teamId'
            handleFilterChange={blank__}
            handleSort={blank__}
            label='T'
            sortParam='teams.shortName'
            sort={{ 'teams.shortName': 'desc' }}
            toolTipLabel='Team'
            {...props}
          />
        </tr>
      </tbody>
    </table>
  )

  const button = wrapper => wrapper.find('button')
  const menu = wrapper => wrapper.find('WithStyles(ForwardRef(Menu))')
  const menuItem = wrapper => wrapper.find('WithStyles(ForwardRef(MenuItem))')
  const checkbox = wrapper => wrapper.find('WithStyles(ForwardRef(Checkbox))')
  const sortLabel = wrapper => wrapper.find('WithStyles(ForwardRef(TableSortLabel))')
  const tableCell = wrapper => wrapper.find('WithStyles(ForwardRef(TableCell))')

  const filter = { teamId: ['1', '2'], positionId: ['4'] }

  it('adds the mainHeaderCell class if sticky = true', () => {
    let wrapper = render({ sticky: true })

    expect(tableCell(wrapper).props().className).toContain('mainHeaderCell')

    wrapper = render()
    expect(tableCell(wrapper).props().className).not.toContain('mainHeaderCell')
  })

  describe('filtering', () => {
    it('triggers handleFilterChange with the set filters', ()=> {
      const handleFilterChange = jest.fn()

      const wrapper = render({ handleFilterChange, filter })
      expect(menu(wrapper).props().open).toEqual(false)

      button(wrapper).at(0).simulate('click') // Open filter

      expect(menu(wrapper).props().open).toEqual(true)
      expect(menuItem(wrapper).length).toEqual(20)

      expect(checkbox(wrapper).at(0).props().checked).toEqual(true)
      expect(checkbox(wrapper).at(1).props().checked).toEqual(true)

      menuItem(wrapper).at(0).simulate('click')
      expect(checkbox(wrapper).at(0).props().checked).toEqual(false)

      expect(checkbox(wrapper).at(4).props().checked).toEqual(false)
      menuItem(wrapper).at(4).simulate('click')
      expect(checkbox(wrapper).at(4).props().checked).toEqual(true)

      button(wrapper).at(2).simulate('click') // Apply filter

      expect(handleFilterChange).toHaveBeenCalledWith(
        {
          positionId: ['4'],
          teamId: ['2', '5']
        }
      )

      expect(menu(wrapper).props().open).toEqual(false)
    })

    it('removes empty filters when handleFilterChange is called', () => {
      const handleFilterChange = jest.fn()

      const wrapper = render({ handleFilterChange, filter })

      button(wrapper).at(0).simulate('click') // Open filter

      expect(checkbox(wrapper).at(0).props().checked).toEqual(true)
      expect(checkbox(wrapper).at(1).props().checked).toEqual(true)

      button(wrapper).at(1).simulate('click') // Clear selection

      expect(checkbox(wrapper).at(0).props().checked).toEqual(false)
      expect(checkbox(wrapper).at(1).props().checked).toEqual(false)

      button(wrapper).at(2).simulate('click') // Apply filter

      expect(handleFilterChange).toHaveBeenCalledWith({ positionId: ['4'] })
      expect(menu(wrapper).props().open).toEqual(false)
    })

    it('does not render the filter if there is no filterParam', () => {
      const wrapper = render({ filterParam: undefined })

      expect(wrapper.find('Filter')).toHaveLength(0)
    })
  })

  describe('sorting', () => {
    it('has the noPaddingRight class if the sortParam is present', () => {
      let wrapper = render()
      expect(tableCell(wrapper).props().className).toContain('noPaddingRight')

      wrapper = render({ sortParam: undefined })
      expect(tableCell(wrapper).props().className).not.toContain('noPaddingRight')
    })

    it('triggers handleSort when clicked', () => {
      const handleSort = jest.fn()
      const wrapper = render({ handleSort })

      expect(sortLabel(wrapper).props().direction).toEqual('desc')
      sortLabel(wrapper).simulate('click')

      expect(handleSort).toBeCalledWith('teams.shortName', 'desc')
    })

    it('shows active = false if there is no sortDirection', () => {
      const sort = { 'position.name': 'asc' }
      const handleSort = jest.fn()
      const wrapper = render({ handleSort, sort })

      expect(sortLabel(wrapper).props().direction).toEqual(undefined)
      expect(sortLabel(wrapper).props().active).toEqual(false)

      sortLabel(wrapper).simulate('click')

      expect(handleSort).toBeCalledWith('teams.shortName', undefined)
    })

    it('does not render the TableSortLabel if sortParam is undefined', () => {
      const wrapper = render({ sortParam: undefined })

      expect(sortLabel(wrapper)).toHaveLength(0)
    })
  })
})
