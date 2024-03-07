  import React from 'react'
  import { render, screen, fireEvent, within } from '@testing-library/react'

  import Filter from '.'
  import { blank__ } from 'test/helpers'
  import { POSITION_FACETS } from 'test/fixtures'

  const anchorEl = document.createElement('div')
  const filterSelection = ['1', '2']

  describe('Filter', () => {
    const customRender = (props = {}) => render(
      <Filter
        facetValues={POSITION_FACETS}
        filterParam='filterParam'
        setAnchorEl={blank__}
        applyFilter={blank__}
        filterSelection={[]}
        anchorEl={null}
        {...props}
      />
    )

    const menuItem = () => screen.getAllByRole('menuitem')
    const button = (text) => screen.getByText(text, { selector: 'button' })
    const checkbox = (pos, checked) => within(menuItem()[pos]).getByRole('checkbox', { checked })

    it('renders the dropdown if the anchor element is present and triggers applyFilter when apply is clicked', () => {
      const applyFilter = jest.fn()

      customRender({ applyFilter, anchorEl })

      expect(menuItem()).toHaveLength(4)
      
      expect(checkbox(1, false)).toBeInTheDocument()
      fireEvent.click(menuItem()[1])
      expect(checkbox(1, true)).toBeInTheDocument()
      
      expect(checkbox(2, false)).toBeInTheDocument()
      fireEvent.click(menuItem()[2])
      expect(checkbox(2, true)).toBeInTheDocument()

      fireEvent.click(button('Apply'))

      expect(applyFilter).toHaveBeenCalledWith('filterParam', ['2', '3'])
    })

    it('clears the selection when the "Clear all" button is clicked', () => {
      const applyFilter = jest.fn()
      
      customRender({ anchorEl, filterSelection, applyFilter })

      expect(checkbox(0, true)).toBeInTheDocument()
      expect(checkbox(1, true)).toBeInTheDocument()

      fireEvent.click(checkbox(0, true)) // Uncheck first checkbox

      expect(checkbox(0, false)).toBeInTheDocument()
      expect(checkbox(1, true)).toBeInTheDocument()

      fireEvent.click(button('Clear all'))

      expect(checkbox(0, false)).toBeInTheDocument()
      expect(checkbox(1, false)).toBeInTheDocument()

      fireEvent.click(button('Apply'))

      expect(applyFilter).toHaveBeenCalledWith('filterParam', [])
    })

    it('clears the anchorEl when the menu is closed', () => {
      const setAnchorEl = jest.fn()
      customRender({ anchorEl, setAnchorEl })

      const firstChild = screen.getByRole('presentation').firstChild // Close the menu
      if (firstChild) fireEvent.click(firstChild)
   
      expect(setAnchorEl).toHaveBeenCalledWith(null)
    })

    it('triggers setAnchorEl the button is clicked', () => {
      const setAnchorEl = jest.fn()

      customRender({ setAnchorEl })

      fireEvent.click(screen.getByRole('button'))

      expect(setAnchorEl).toHaveBeenCalledWith(document.querySelector('button'))
    })
  })
