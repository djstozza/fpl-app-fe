import { Link } from 'react-router-dom'
import {
  Tabs,
  Tab,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core'
import { findIndex } from 'lodash'

import { TEAMS_URL } from 'utilities/constants'

type Props = {
  currentTab: string,
  teamId: string
}

const TABS = [
  { label: 'Details', value: 'details' },
  { label: 'Fixtures', value: 'fixtures' },
  { label: 'Players', value: 'players' }
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tab: {
      backgroundColor: '#eeeeee',
      border: '0.5px solid #e0e0e0'
    }
  })
)

const TeamTabs = ({ currentTab, teamId }: Props) => {
  const classes = useStyles()

  return (
    <Tabs
      indicatorColor='primary'
      textColor='primary'
      value={findIndex(TABS, ({ value }) => value === currentTab)}
      variant='fullWidth'
      className={classes.tab}
    >
      {
        TABS.map(
          ({ label, value }) => (
            <Tab
              key={value}
              label={label}
              component={Link}
              to={`${TEAMS_URL}/${teamId}/${value}`}
            />
          )
        )
      }
    </Tabs>
  )
}

export default TeamTabs
