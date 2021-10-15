import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import history from 'state/history'

export const blank__ = (): void => { return }

type MockedStoreProps = {
  children: any,
  defaultState: Object
}

export const MockedStore = ({ children, defaultState = {} }: MockedStoreProps) => (
  <Provider store={createStore(() => defaultState)}>{children}</Provider>
)

export const MockedRouter = ({ initialEntries = ['/'], children }:{ initialEntries: string[], children: any }) => (
  <Router initialEntries={initialEntries} history={history}>
    {children}
  </Router>
)

export const MockedRouterStore = ({
  children,
  defaultState = { rounds: { data: [] }, auth: {}, loadingBar: { default: 0 } }
}: MockedStoreProps) => (
  <MockedStore defaultState={defaultState}>
    <Router history={history}>
      {children}
    </Router>
  </MockedStore>
)
