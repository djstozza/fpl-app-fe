import { Fragment } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { ROUNDS_URL, TEAMS_URL } from 'utilities/constants'
import LoadingBar from 'react-redux-loading-bar'
import RoundsPage from 'components/pages/roundsPage'
import TeamsPage from 'components/pages/teamsPage'
import TeamPage from 'components/pages/teamPage'

const App = () => {
  return (
    <Fragment>
      {(<LoadingBar showFastActions />)}
      <Switch>
        <Route exact path={`${ROUNDS_URL}/:roundId?`} render={(props) => <RoundsPage {...props} />} />
        <Route exact path={`${TEAMS_URL}/:teamId`} render={(props) => <TeamPage {...props} />} />
        <Route exact path={TEAMS_URL} render={(props) => <TeamsPage {...props} />} />
      </Switch>
    </Fragment>
  );
}

export default App;
