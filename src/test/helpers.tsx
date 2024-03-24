import { ReactNode } from 'react'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from 'state/rootReducer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import history from 'state/history'

export const blank__ = (): void => { return }

type MockedStoreProps = {
  children: any,
  defaultState: Object
}

export const MockedStore = ({ children, defaultState = {} }: MockedStoreProps) => (
  <Provider store={configureStore({ reducer: rootReducer, preloadedState: defaultState })}>{children}</Provider>
)

export const MockedRouter = ({ children }:{ children: any }) => (
  <Router>
    {children}
  </Router>
)

export const MockedRouterStore = ({
  children,
  defaultState = { rounds: { data: [] }, auth: {} }
}: MockedStoreProps) => (
  <MockedStore defaultState={defaultState}>
    <Router>
      {children}
    </Router>
  </MockedStore>
)

export const MockedRouterStoreWithRoute = ({
  children,
  defaultState = { rounds: { data: [] }, auth: {} }
}: MockedStoreProps) => (
  <MockedStore defaultState={defaultState}>
    <Router>
      <Routes>
        <Route path='/' element={children}>
          <Route index element={<div></div>} />
        </Route>
      </Routes>
    </Router>
  </MockedStore>
)

interface RouteWithOutletContextProps<T = any> {
  context: T;
  children: ReactNode;
  path?: string
}

export const RouteWithOutletContext = <T,>({ context, children, path = "/" }: RouteWithOutletContextProps<T>) => (
  <Router>
    <Routes>
      <Route path={path} element={<Outlet context={context as T} />}>
        <Route index element={children} />
      </Route>
    </Routes>
  </Router>
)
