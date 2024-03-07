import { render, screen } from '@testing-library/react'

import ButtonLink from '.'
import { MockedRouter } from 'test/helpers'

describe('User Login Form', () => {
  const name = 'This is a link'
  
  const customRender = (props = {}) => render(
    <MockedRouter>
      <ButtonLink
        to='foo/1'
        children={name}
        color='inherit'
        {...props}
      />
    </MockedRouter>
  )

  it('renders the button link', () => {
    customRender({ color: 'primary', size: 'small' })
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/foo/1')
    expect(link).toHaveClass('MuiButton-contained')
    expect(link).toHaveClass('MuiButton-sizeSmall')
    expect(link).toHaveClass('MuiButton-containedPrimary')
    expect(link).toHaveTextContent(name)
  })

  it('adds a right margin if rightMargin = true', () => {
    customRender({ rightMargin: true })

    const link = screen.getByRole('link')
    expect(link.className).toContain('rightMargin')
  })
})
