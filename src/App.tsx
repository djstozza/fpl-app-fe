import { Fragment } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { ROUNDS_PAGE_URL } from 'utilities/constants'
import LoadingBar from 'react-redux-loading-bar'
import RoundsPage from 'components/pages/roundsPage'

const App = () => {
  return (
    <Fragment>
      {(<LoadingBar showFastActions />)}
      <Switch>
        <Route path={ROUNDS_PAGE_URL + '/:roundId?'} render={(props) => <RoundsPage {...props} />} />
      </Switch>
    </Fragment>
  );
}

export default App;
