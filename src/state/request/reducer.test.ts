import reducer from './reducer'
import * as actions from './actions'

describe('Request reducer handles action', () => {
  const validationError = { status: '422', statusText: 'Unprocessable Entity', url: 'https://httpstat.us/422' }
  const internalServerError = { status: '500', statusText: 'Internal Server Error', url: 'https://httpstat.us/500' }

  test(`${actions.AUTHED_REQUEST}`, () => {
    expect(reducer({ inFlight: 0, errors: [] }, { type: actions.AUTHED_REQUEST }))
      .toEqual({ inFlight: 1, errors: [] })
  })

  test(`${actions.UNAUTHED_REQUEST}`, () => {
    expect(reducer({ inFlight: 0, errors: [] }, { type: actions.UNAUTHED_REQUEST }))
      .toEqual({ inFlight: 1, errors: [] })
  })

  test(`${actions.REQUEST_DONE}`, () => {
    expect(reducer({ inFlight: 3, errors: [] }, { type: actions.REQUEST_DONE }))
      .toEqual({ inFlight: 2, errors: [] })
  })

  test(`${actions.ADD_REQUEST_ERROR}`, () => {
    expect(reducer({ inFlight: 0, errors: [] }, { type: actions.ADD_REQUEST_ERROR, error: internalServerError }))
      .toEqual({ inFlight: 0, errors: [internalServerError] })

    expect(reducer({ inFlight: 0, errors: [] }, { type: actions.ADD_REQUEST_ERROR, error: validationError }))
      .toEqual({ inFlight: 0, errors: [] })
  })

  test(`${actions.CLEAR_REQUEST_ERRORS}`, () => {
    expect(reducer({ inFlight: 0, errors: [internalServerError] }, { type: actions.CLEAR_REQUEST_ERRORS }))
      .toEqual({ inFlight: 0, errors: [] })
  })

  test(`${actions.REQUEST_VALIDATION_ERROR}`, () => {
    expect(reducer({ inFlight: 0, errors: [] }, { type: actions.REQUEST_VALIDATION_ERROR, error: validationError }))
      .toEqual({ inFlight: 0, errors: [validationError] })
  })

  test('unknown type and undefined state', () => {
    expect(reducer(undefined, { type: 'unknown' }))
      .toEqual({ inFlight: 0, errors: [] })
  })
})
