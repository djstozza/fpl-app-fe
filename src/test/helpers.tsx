import { configureStore } from '@reduxjs/toolkit'
import rootReducer from 'state/rootReducer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import history from 'state/history'

export const blank__ = (): void => { return }

type MockedStoreProps = {
  children: any,
  defaultState: Object
}

export const MockedStore = ({ children, defaultState = {} }: MockedStoreProps) => (
  <Provider store={configureStore({ reducer: rootReducer, preloadedState: defaultState })}>{children}</Provider>
)

export const MockedRouter = ({ initialEntries = ['/'], children }:{ initialEntries: string[], children: any }) => (
  <Router>
    {children}
  </Router>
)

export const MockedRouterStore = ({
  children,
  defaultState = { rounds: { data: [] }, auth: {}, loadingBar: { default: 0 } }
}: MockedStoreProps) => (
  <MockedStore defaultState={defaultState}>
    <Router>
      {children}
    </Router>
  </MockedStore>
)
