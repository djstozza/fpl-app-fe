import { Fragment } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { ROUNDS_URL, TEAMS_URL } from 'utilities/constants'
import LoadingBar from 'react-redux-loading-bar'
import RoundsPage from 'components/pages/roundsPage'
import TeamsPage from 'components/pages/teamsPage'

const App = () => {
  return (
    <Fragment>
      {(<LoadingBar showFastActions />)}
      <Switch>
        <Route path={ROUNDS_URL + '/:roundId?'} render={(props) => <RoundsPage {...props} />} />
        <Route path={TEAMS_URL} render={(props) => <TeamsPage {...props} />} />
      </Switch>
    </Fragment>
  );
}

export default App;
