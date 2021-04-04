import {
  AppBar,
  Tabs,
  Tab,
  Theme,
  makeStyles
} from '@material-ui/core'
import history from 'state/history'

import type { RoundSummary, TeamSummary } from 'types'

type Props = {
  collection: RoundSummary[] | TeamSummary[],
  collectionId: string,
  labelRenderer: Function,
  url: string,
  tab?: string
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
  wrapper: {
    flexDirection: 'row',
    display: 'flex'
  }
}))

const TabPanel = (props: Props) => {
  const { collection, collectionId, labelRenderer, url, tab } = props
  const classes = useStyles()

  const index = collection.findIndex(({ id }) => id === collectionId)

  const handleChange = (newId) => history.push(`${url}/${newId}/${tab ? tab : ''}`)

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
            collection.map((item, key) => (
              <Tab
                classes={{ wrapper: classes.wrapper }}
                key={item['id']}
                label={labelRenderer(item)}
                onClick={() => handleChange(item['id'])}
                {...scrollProps(key)}
              />
            ))
          }
        </Tabs>
      </AppBar>
    </div>
  )
}

export default TabPanel
