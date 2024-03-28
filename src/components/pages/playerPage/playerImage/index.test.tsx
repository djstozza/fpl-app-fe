import { render, screen } from '@testing-library/react'

import PlayerImage from '.'
import { playerPlaceHolderLoader, playerImage } from 'utilities/helpers'

const code = 1234
const lastName = 'Last Name'
const maxHeight = 45

describe('PlayerImage', () => {  
  const customRender = (props = {}) => render(
    <PlayerImage
      code={code}
      lastName={lastName}
      maxHeight={maxHeight}
      {...props}
    />
  )

  const img = () => screen.getByAltText(lastName)

  it('shows the placeholder image before the actual image is loaded', () => {
    customRender()

    expect(img()).toHaveAttribute('src', playerPlaceHolderLoader())
  })


  it('should set the correct image source after loading', () => {
    const originalImage = global.Image
    
    const mockImage = {
      addEventListener: jest.fn((event, callback: EventListener) => {
        if (event === 'load') {
          callback(new Event('load'))
        }
      }),
      removeEventListener: jest.fn(),
      src: 'mock-image-url',
    };
    
    global.Image = jest.fn(() => mockImage) as any as typeof Image

    customRender()

    global.Image = originalImage

    expect(img()).toHaveAttribute('src', playerImage(code))
  })
})
