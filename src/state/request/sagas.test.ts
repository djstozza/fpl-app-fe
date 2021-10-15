import { expectSaga } from 'redux-saga-test-plan'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

import requestSagas, * as sagas from './sagas'
import * as actions from './actions'

const successAction = 'SUCCESS'
const failureAction = 'FAIL'
const method = 'GET'
const url = 'www.example.com'
const result = { foo: 'bar' }
const body = { a: 'b' }
const token = '1234'
const error = {
  body: {
    errors: [
      {
        code: 'is invalid',
        detail: 'This is an error message',
        source: 'Source',
        title: 'Is Invalid'
      }
    ]
  },
  ok: false,
  status: '422',
  statusText: 'Unprocessible Entity'
}

describe('Request sagas', () => {
  describe('sendRequest', () => {
    test(`${actions.AUTHED_REQUEST} - success`, async () => {
      const fetchStub = jest.spyOn(window, 'fetch').mockResolvedValue({
        status: '200',
        statusText: 'Success',
        ok: true,
        body: { foo: 'bar' },
        json: () => result
      })

      await expectSaga(sagas.sendRequest, true, { successAction, failureAction, method, url, body })
        .withState({
          loadingBar: { default: 0 },
          auth: { token }
        })
        .put(showLoading())
        .put({ type: successAction, ...result, redirect: undefined, notification: undefined })
        .put({ type: actions.REQUEST_DONE })
        .dispatch({ type: actions.AUTHED_REQUEST })
        .run()

      expect(fetchStub).toBeCalledWith(
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
      const response = {
        status: '422',
        statusText: 'Unporcessible Entity',
        ok: false
      }
      const fetchStub = jest.spyOn(window, 'fetch').mockResolvedValue({
        ...response,
        json: () => result
      })

      await expectSaga(sagas.sendRequest, true, { successAction, failureAction, method, url })
        .withState({
          loadingBar: { default: 1 },
          auth: { token }
        })
        .put({ type: actions.REQUEST_FAIL, failureAction, url, response: { ...response, body: result } })
        .put({ type: actions.REQUEST_DONE })
        .dispatch({ type: actions.AUTHED_REQUEST })
        .run()

      expect(fetchStub).toBeCalledWith(
        url,
        {
          body: undefined,
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          method
        }
      )
    })

    test(`${actions.UNAUTHED_REQUEST} - success`, async () => {
      const fetchStub = jest.spyOn(window, 'fetch').mockResolvedValue({
        status: '200',
        statusText: 'Success',
        ok: true,
        body: { foo: 'bar' },
        json: () => result
      })

      await expectSaga(sagas.sendRequest, false, { successAction, failureAction, method, url, body, hideLoading: true })
        .put({ type: successAction, ...result, redirect: undefined, notification: undefined })
        .put({ type: actions.REQUEST_DONE })
        .dispatch({ type: actions.UNAUTHED_REQUEST })
        .run()

      expect(fetchStub).toBeCalledWith(
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

    test(`${actions.UNAUTHED_REQUEST} - error`, async () => {
      const response = {
        status: '422',
        statusText: 'Unporcessible Entity',
        ok: false
      }
      const fetchStub = jest.spyOn(window, 'fetch').mockResolvedValue({
        ...response,
        json: () => result
      })

      await expectSaga(sagas.sendRequest, false, { successAction, failureAction, method, url })
        .withState({
          loadingBar: { default: 1 }
        })
        .put({ type: actions.REQUEST_FAIL, failureAction, url, response: { ...response, body: result } })
        .put({ type: actions.REQUEST_DONE })
        .dispatch({ type: actions.UNAUTHED_REQUEST })
        .run()

      expect(fetchStub).toBeCalledWith(
        url,
        {
          body: undefined,
          headers: {
            Accept: 'application/json',
            Authorization: '',
            'Content-Type': 'application/json'
          },
          method
        }
      )
    })

    test(`${actions.UNAUTHED_REQUEST} - ${actions.ADD_REQUEST_ERROR}`, async () => {
      const fetchStub = jest.spyOn(window, 'fetch').mockRejectedValue(error)

      await expectSaga(sagas.sendRequest, false, { successAction, failureAction, method, url })
        .withState({
          loadingBar: { default: 1 }
        })
        .put({ type: failureAction, errors: [error] })
        .put({ type: actions.ADD_REQUEST_ERROR, error: { url, status: 'failed_to_fetch' } })
        .put({ type: actions.REQUEST_DONE })
        .dispatch({ type: actions.UNAUTHED_REQUEST })
        .run()

      expect(fetchStub).toBeCalledWith(
        url,
        {
          body: undefined,
          headers: {
            Accept: 'application/json',
            Authorization: '',
            'Content-Type': 'application/json'
          },
          method
        }
      )
    })

    test(actions.REQUEST_FAIL, () => {
      const { status, statusText, body: { errors } } = error

      expectSaga(sagas.requestFail, { failureAction, url, response: error })
        .put({ type: failureAction, status, errors })
        .put({ type: actions.ADD_REQUEST_ERROR, error: { url, status, statusText, errors } })
        .dispatch({ type: actions.REQUEST_FAIL })
        .run()

      expectSaga(sagas.requestFail, { failureAction, url, response: error })
        .put({ type: failureAction, status, errors })
        .put({ type: actions.ADD_REQUEST_ERROR, error: { url, status, statusText, errors } })
        .dispatch({ type: actions.REQUEST_FAIL })
        .run()

      expectSaga(sagas.requestFail, { failureAction, url, response: { ...error, body: { errors: undefined } } })
        .put({ type: failureAction, status, errors: [] })
        .put({ type: actions.ADD_REQUEST_ERROR, error: { url, status, statusText, errors: [] } })
        .dispatch({ type: actions.REQUEST_FAIL })
        .run()
    })

    test(actions.REQUEST_DONE, () => {
      expectSaga(requestSagas)
        .withState({
          request: { inFlight: 1 }
        })
        .dispatch({ type: actions.REQUEST_DONE })
        .run()

        expectSaga(sagas.requestDone)
          .withState({
            request: { inFlight: 0 }
          })
          .put(hideLoading())
          .dispatch({ type: actions.REQUEST_DONE })
          .run()
    })
  })
})
