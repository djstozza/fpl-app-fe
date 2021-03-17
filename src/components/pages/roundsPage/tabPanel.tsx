import { makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import history from 'state/history'
import { ROUNDS_URL } from 'utilities/constants'

import type { RoundSummary } from 'types'

type Props = {
  rounds: RoundSummary[],
  roundId: string,
  onChange: Function
}

const scrollProps = (index: number) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
}))

export default function ScrollableTabsButtonAuto(props: Props) {
  const { rounds, roundId, onChange } = props
  const classes = useStyles()

  const index = rounds.findIndex(({ id }) => id === roundId)

  const handleChange = (newId) => {
    onChange(newId)

    history.push(`${ROUNDS_URL}/${newId}`)
  }

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Tabs
          value={index}
          indicatorColor='primary'
          textColor='primary'
          variant='scrollable'
          scrollButtons='auto'
          aria-label='scrollable auto tabs example'
        >
          {
            rounds.map(({ name, id }, key) => (
              <Tab
                key={id}
                label={name}
                onClick={() => handleChange(id)}
                {...scrollProps(key)}
              />
            ))
          }
        </Tabs>
      </AppBar>
    </div>
  )
}
