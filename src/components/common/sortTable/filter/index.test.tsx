import React from 'react'
import { createMount } from '@material-ui/core/test-utils'

import Filter from '.'
import { blank__ } from 'test/helpers'
import { POSITION_FACETS } from 'test/fixtures'

const anchorEl = document.createElement('div')
const filterSelection = ['1', '2']

describe('Filter', () => {
  const render = (props = {}) => createMount()(
    <Filter
      facetValues={POSITION_FACETS}
      filterParam='filterParam'
      setAnchorEl={blank__}
      applyFilter={blank__}
      filterSelection={[]}
      {...props}
    />
  )

  const button = wrapper => wrapper.find('button')
  const menuItem = wrapper => wrapper.find('WithStyles(ForwardRef(MenuItem))')
  const checkbox = wrapper => wrapper.find('WithStyles(ForwardRef(Checkbox))')

  it('renders the dropdown if the anchor element is present and triggers applyFilter when apply is clicked', () => {
    const applyFilter = jest.fn()

    const wrapper = render({ applyFilter, anchorEl })

    expect(menuItem(wrapper)).toHaveLength(4)

    menuItem(wrapper).at(1).simulate('click')
    expect(checkbox(wrapper).at(1).props().checked).toEqual(true)

    menuItem(wrapper).at(2).simulate('click')
    expect(checkbox(wrapper).at(2).props().checked).toEqual(true)

    button(wrapper).at(2).simulate('click') // The apply button

    expect(applyFilter).toHaveBeenCalledWith('filterParam', ['2', '3'])
  })

  it('clears the selection when the "Clear all" button is clicked', () => {
    const wrapper = render({ anchorEl, filterSelection })
    button(wrapper).at(0).simulate('click') // Open modal button

    expect(checkbox(wrapper).at(0).props().checked).toEqual(true)
    expect(checkbox(wrapper).at(1).props().checked).toEqual(true)

    checkbox(wrapper).at(0).simulate('click') // Uncheck checkbox
    expect(checkbox(wrapper).at(0).props().checked).toEqual(false)
    expect(checkbox(wrapper).at(1).props().checked).toEqual(true)

    button(wrapper).at(1).simulate('click') // Clear all button
    expect(checkbox(wrapper).at(0).props().checked).toEqual(false)
    expect(checkbox(wrapper).at(1).props().checked).toEqual(false)
  })

  it('clears the anchorEl when the menu is closed', () => {
    const setAnchorEl = jest.fn()
    const wrapper = render({ anchorEl, setAnchorEl })

    wrapper.find('WithStyles(ForwardRef(Menu))').props().onClose()

    expect(setAnchorEl).toHaveBeenCalledWith(null)
  })

  it('triggers setAnchorEl and setSelected when the button is clicked', () => {
    const setAnchorEl = jest.fn()
    const setState = jest.fn()
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState])

    const wrapper = render({ setAnchorEl, filterSelection })

    button(wrapper).simulate('click')

    expect(setAnchorEl).toBeCalledWith(document.querySelector('button'))
    expect(setState).toHaveBeenCalledWith(['1', '2'])
  })
})
