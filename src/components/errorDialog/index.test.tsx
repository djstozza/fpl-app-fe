import { fireEvent, render, screen } from '@testing-library/react'

import { APPLICATION_ERRORS } from 'utilities/constants'
import ConnectedErrorDialog, { ErrorDialog } from '.'
import { MockedStore, blank__ } from 'test/helpers'


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

const retryAfter = 10

const error429 = {
  errors: [
    {
      detail: 'This is a 429 message',
      status: '429',
      title: 'Too many requests',
      meta: {
        retryAfter
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

describe('ErrorDialog', () => {
  const mockedStoreRender = (state = {}) => render(
    <MockedStore
       defaultState={{ request: { errors: [error404] }, ...state }}
    >
      <ConnectedErrorDialog />
    </MockedStore>
  )

  const customRender = (props = {}) => render(
    <ErrorDialog
      errorCode='500'
      message='Something went wrong. The team has been alerted.'
      clearRequestErrors={blank__}
      {...props}
    />
  )

  it('renders rate limit error message', () => {
    mockedStoreRender()

    const error = APPLICATION_ERRORS['404']

    expect(screen.getByRole('heading')).toHaveTextContent(error.title)
    expect(screen.getByText(error.message)).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveTextContent(error.action.label)
    expect(screen.getByRole('link')).toHaveAttribute('href', error.action.path)
  })

  it('renders the rate limit error message with substituted retry after string', () => {
    mockedStoreRender({ request: { errors: [error429] } })

    const error = APPLICATION_ERRORS['429']

    expect(screen.getByRole('heading')).toHaveTextContent(error.title)
    expect(screen.getByText(error.message.replace('{retryAfter}', retryAfter.toString()))).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent(error.action.label)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('renders the internal server error message', () => {
    mockedStoreRender({ request: { errors: [error500] } })

    const error = APPLICATION_ERRORS['500']

    expect(screen.getByRole('heading')).toHaveTextContent(error.title)
    expect(screen.getByText(error.message)).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent(error.action.label)
    expect(screen.queryByRole('link')).not.toBeInTheDocument() 
  })

  it('renders the service unavailable message for a 502', () => {
    mockedStoreRender({ request: { errors: [error502] } })

    const error = APPLICATION_ERRORS['502']

    expect(screen.getByRole('heading')).toHaveTextContent(error.title)
    expect(screen.getByText(error.message)).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent(error.action.label)
    expect(screen.queryByRole('link')).not.toBeInTheDocument() 
  })

  it('renders the service unavailable message for a 503', () => {
    mockedStoreRender({ request: { errors: [error503] } })

    const error = APPLICATION_ERRORS['503']

    expect(screen.getByRole('heading')).toHaveTextContent(error.title)
    expect(screen.getByText(error.message)).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent(error.action.label)
    expect(screen.queryByRole('link')).not.toBeInTheDocument() 
  })

  it('renders the service unavailable message for failed_to_fetch', () => {
    mockedStoreRender({ request: { errors: [errorFailedToFetch] } })

    const error = APPLICATION_ERRORS['failed_to_fetch']

    expect(screen.getByRole('heading')).toHaveTextContent(error.title)
    expect(screen.getByText(error.message)).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent(error.action.label)
    expect(screen.queryByRole('link')).not.toBeInTheDocument() 
  })

  it('triggers clearRequestErrors and onClose', () => {
    const clearRequestErrors = jest.fn()
    const onClose = jest.fn()

    customRender({ clearRequestErrors, onClose })

    fireEvent.click(screen.getByRole('button'))
    expect(onClose).toHaveBeenCalled()
    expect(clearRequestErrors).toHaveBeenCalled()
  })

  it('does not render anything if the error code is not one that has been specified in the constants', () => {
    mockedStoreRender({ request: { errors: [error422] } })

    expect(screen.queryByRole('presentation')).not.toBeInTheDocument()
  })

  it('does not render anything if errors is null', () => {
    mockedStoreRender({ request: { errors: null } })

    expect(screen.queryByRole('presentation')).not.toBeInTheDocument()
  })

  it('prevents clicking out of errors', () => {
    const clearRequestErrors = jest.fn()
    const onClose = jest.fn()

    customRender({ clearRequestErrors, onClose })

    const backdrop = document.querySelector('.MuiBackdrop-root') as HTMLElement
    fireEvent.click(backdrop)
 
    expect(clearRequestErrors).not.toHaveBeenCalled()
    expect(onClose).not.toHaveBeenCalled()
  })
})
