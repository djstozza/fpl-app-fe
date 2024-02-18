import { makeStyles } from 'tss-react/mui';
import { AppBar, Tabs, Tab, Theme } from '@mui/material';
import history from 'state/history'

import type { RoundSummary, TeamSummary, FplTeamList } from 'types'

type Props = {
  collection: RoundSummary[] | TeamSummary[] | FplTeamList[],
  collectionId?: string,
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

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}));

const TabPanel = (props: Props) => {
  const { collection, collectionId, labelRenderer, url, tab } = props
  const { classes } = useStyles()

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
        >
          {
            collection.map((item, key) => (
              <Tab
                key={item['id']}
                label={labelRenderer(item)}
                onClick={() => handleChange(item['id'])}
                {...scrollProps(key)}
                wrapped
              />
            ))
          }
        </Tabs>
      </AppBar>
    </div>
  )
}

export default TabPanel
