import * as actions from './actions'

describe('Request actions', () => {
  test(actions.CLEAR_REQUEST_ERRORS, () => {
    expect(actions.clearRequestErrors()).toEqual({ type: actions.CLEAR_REQUEST_ERRORS })
  })
})

describe('apiRequest', () => {
  const successAction = 'SUCCESS'
  const failureAction = 'FAIL'
  const method = 'GET'
  const url = 'www.example.com'
  const result = { foo: 'bar' }
  const body = { a: 'b' }
  const token = '1234'

  const getState = () => ({ auth: { token } })

  test(`${actions.AUTHED_REQUEST} - success`, async () => {
    const dispatch = vi.fn()
    const fetchStub = vi.spyOn(window, 'fetch').mockResolvedValue({
      ...new Response(),
      status: 200,
      statusText: 'Success',
      ok: true,
      json: async () => result
    })

    const ok = await actions.apiRequest({ needsAuth: true, method, url, body, successAction, failureAction })(dispatch, getState)

    expect(ok).toBe(true)
    expect(dispatch).toHaveBeenCalledWith({
      type: actions.AUTHED_REQUEST, method, url, body, successAction, failureAction
    })
    expect(dispatch).toHaveBeenCalledWith({ type: successAction, ...result })
    expect(dispatch).toHaveBeenCalledWith({ type: actions.REQUEST_DONE })

    expect(fetchStub).toHaveBeenCalledWith(
      url,
      {
        body: JSON.stringify(body),
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        method
      }
    )
  })

  test(`${actions.AUTHED_REQUEST} - error`, async () => {
    const dispatch = vi.fn()
    const response = {
      status: '422',
      statusText: 'Unporcessible Entity',
      ok: false
    }

    vi.spyOn(window, 'fetch').mockResolvedValue({
      ...new Response(),
      ...response,
      status: parseInt(response.status),
      json: async () => result
    })

    const ok = await actions.apiRequest({ needsAuth: true, method, url, successAction, failureAction })(dispatch, getState)

    expect(ok).toBe(false)
    expect(dispatch).toHaveBeenCalledWith({ type: failureAction, status: response.status, errors: [] })
    expect(dispatch).toHaveBeenCalledWith({
      type: actions.ADD_REQUEST_ERROR,
      error: { url, status: response.status, statusText: response.statusText, errors: [] }
    })
    expect(dispatch).toHaveBeenCalledWith({ type: actions.REQUEST_DONE })
  })

  test(`${actions.UNAUTHED_REQUEST} - success`, async () => {
    const dispatch = vi.fn()

    const fetchStub = vi.spyOn(window, 'fetch').mockResolvedValue({
      ...new Response(),
      status: 200,
      statusText: 'Success',
      ok: true,
      json: async () => result
    })

    const ok = await actions.apiRequest({ needsAuth: false, method, url, body, successAction, failureAction })(dispatch, getState)

    expect(ok).toBe(true)
    expect(dispatch).toHaveBeenCalledWith({
      type: actions.UNAUTHED_REQUEST, method, url, body, successAction, failureAction
    })
    expect(dispatch).toHaveBeenCalledWith({ type: successAction, ...result })

    expect(fetchStub).toHaveBeenCalledWith(
      url,
      {
        body: JSON.stringify(body),
        headers: {
          Accept: 'application/json',
          Authorization: '',
          'Content-Type': 'application/json'
        },
        method
      }
    )
  })

  test('response body errors trigger a failure even when ok', async () => {
    const dispatch = vi.fn()
    const errors = [{ code: 'is invalid', detail: 'This is an error message', source: 'Source', title: 'Is Invalid' }]

    vi.spyOn(window, 'fetch').mockResolvedValue({
      ...new Response(),
      status: 200,
      statusText: 'OK',
      ok: true,
      json: async () => ({ errors })
    })

    const ok = await actions.apiRequest({ needsAuth: false, method, url, successAction, failureAction })(dispatch, getState)

    expect(ok).toBe(false)
    expect(dispatch).toHaveBeenCalledWith({ type: failureAction, status: '200', errors })
  })

  test(`${actions.UNAUTHED_REQUEST} - ${actions.ADD_REQUEST_ERROR}`, async () => {
    const dispatch = vi.fn()
    const error = { message: 'failed to fetch' }

    vi.spyOn(window, 'fetch').mockRejectedValue(error)

    const ok = await actions.apiRequest({ needsAuth: false, method, url, successAction, failureAction })(dispatch, getState)

    expect(ok).toBe(false)
    expect(dispatch).toHaveBeenCalledWith({ type: failureAction, errors: [error] })
    expect(dispatch).toHaveBeenCalledWith({ type: actions.ADD_REQUEST_ERROR, error: { url, status: 'failed_to_fetch' } })
    expect(dispatch).toHaveBeenCalledWith({ type: actions.REQUEST_DONE })
  })
})
