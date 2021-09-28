import { createMount } from '@material-ui/core/test-utils'

import ConnectedErrorDialog, { ErrorDialog } from '.'
import { MockedStore } from 'test/helpers'

const error404 = {
  errors: [
    {
      detail: 'This is a 404 message',
      status: '404',
      title: 'Not Found'
    }
  ],
  status: '404',
  statusText: 'Not Found',
  url: 'example.com'
}

const error429 = {
  errors: [
    {
      detail: 'This is a 429 message',
      status: '429',
      title: 'Too many requests',
      meta: {
        retryAfter: 10
      }
    }
  ],
  status: '429',
  statusText: 'Too many requests',
  url: 'example.com'
}

const error500 = {
  errors: [
    {
      detail: 'This is a 500 message',
      status: '500',
      title: 'Internal server error'
    }
  ],
  status: '500',
  statusText: 'Internal server error',
  url: 'example.com'
}

const error502 = {
  errors: [
    {
      detail: 'This is a 502 message',
      status: '502',
      title: 'Bad gateway'
    }
  ],
  status: '502',
  statusText: 'Bad gateway',
  url: 'example.com'
}

const error503 = {
  errors: [
    {
      detail: 'This is a 502 message',
      status: '502',
      title: 'Service unavailable'
    }
  ],
  status: '502',
  statusText: 'Service unavailable',
  url: 'example.com'
}

const errorFailedToFetch = {
  errors: [
    {
      detail: 'This is a 502 message',
      status: '502',
      title: 'Bad gateway'
    }
  ],
  status: '502',
  statusText: 'Bad gateway',
  url: 'example.com'
}

const error422 = {
  errors: [
    {
      detail: 'This is a 422 message',
      status: '422',
      title: 'Unprocessable entity'
    }
  ],
  status: '422',
  statusText: 'Unprocessable entity',
  url: 'example.com'
}

const h6 = wrapper => wrapper.find('h6')
const p = wrapper => wrapper.find('p')
const button = wrapper => wrapper.find('WithStyles(ForwardRef(Button))')

describe('ErrorDialog', () => {
  const mockedStoreRender = (state = {}) => createMount()(
    <MockedStore
       defaultState={{ request: { errors: [error404] }, ...state }}
    >
      <ConnectedErrorDialog />
    </MockedStore>
  )

  const render = (props = {}) => createMount()(
    <ErrorDialog
      errorCode='500'
      title='Oops, something went wrong'
      message='Something went wrong. The team has been alerted.'
      clearRequestErrors={() => {}}
      {...props}
    />
  )

  it('renders rate limit error message', () => {
    const wrapper = mockedStoreRender()

    expect(h6(wrapper).text()).toEqual('Requested resource not found')
    expect(p(wrapper).text()).toEqual("We couldn’t find what you’re looking for.")
    expect(button(wrapper).text()).toEqual('Back Home')
    expect(button(wrapper).props().href).toEqual('/')
  })

  it('renders the rate limit error message with substituted retry after string', () => {
    const wrapper = mockedStoreRender({ request: { errors: [error429] } })

    expect(h6(wrapper).text()).toEqual('Too many requests')
    expect(p(wrapper).text()).toEqual('Please try again after 10 seconds.')
    expect(button(wrapper).text()).toEqual('OK')
    expect(button(wrapper).props().href).toBeUndefined()
  })

  it('renders the internal server error message', () => {
    const wrapper = mockedStoreRender({ request: { errors: [error500] } })

    expect(h6(wrapper).text()).toEqual('Oops, something went wrong')
    expect(p(wrapper).text()).toEqual('Something went wrong. The team has been alerted.')
    expect(button(wrapper).text()).toEqual('OK')
    expect(button(wrapper).props().href).toBeUndefined()
  })

  it('renders the service unavailable message', () => {
    [error502, error503, errorFailedToFetch].forEach(error => {
      const wrapper = mockedStoreRender({ request: { errors: [error] } })

      expect(h6(wrapper).text()).toEqual('Service Unavailable')
      expect(p(wrapper).text()).toEqual('The service is temporarily unavailable. Please try again later.')
      expect(button(wrapper).text()).toEqual('OK')
      expect(button(wrapper).props().href).toBeUndefined()
    })
  })

  it('triggers clearRequestErrors and onClose', () => {
    const clearRequestErrors = jest.fn()
    const onClose = jest.fn()

    const wrapper = render({ clearRequestErrors, onClose })

    button(wrapper).simulate('click')
    expect(onClose).toHaveBeenCalled()
    expect(clearRequestErrors).toHaveBeenCalled()
  })

  it('does not render anything if the error code is not one that has been specified in the constants', () => {
    const wrapper = mockedStoreRender({ request: { errors: [error422] } })

    expect(wrapper.html()).toEqual('')
  })
})
