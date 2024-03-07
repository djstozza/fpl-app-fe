import { render, screen } from '@testing-library/react'

import Link from '.'
import { MockedRouter } from 'test/helpers'

describe('Link', () => {
  const text = 'This is a link'
  const route = '/foo/1'
  const customRender = (props = {}) => render(
    <MockedRouter>
      <Link
        to={route}
        {...props}
      >
        {text}
      </Link>
    </MockedRouter>
  )

  // const link = wrapper => wrapper.find('Link').at(1)

  const link = () => screen.getByRole('link')

  it('renders a link wih the team crest', () => {
    customRender()

    expect(link()).toHaveTextContent(text)
    expect(link().getAttribute('href')).toEqual(route)
  })

  it('adds the noWrap and imageContainer', () => {
    customRender({ noWrap: true, image: true })

    expect(link().className).toContain('noWrap')
    expect(link().className).toContain('imageContainer')
  })
})
