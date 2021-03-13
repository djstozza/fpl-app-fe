import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import './App.css'

import { ROUNDS_PAGE_URL } from 'utilities/constants'
import LoadingBar from 'react-redux-loading-bar'
import RoundsPage from 'components/pages/roundsPage'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {(<LoadingBar showFastActions />)}
        <Switch>
          <Route path={ROUNDS_PAGE_URL + '/:roundId?'} render={(props) => <RoundsPage {...props} />} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
