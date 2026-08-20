import { AppBar, Tabs, Tab } from '@mui/material'
import history from 'state/history'

import type { RoundSummary, TeamSummary, FplTeamList } from 'types'

type Props = {
  collection: RoundSummary[] | TeamSummary[] | FplTeamList[],
  collectionId?: string,
  labelRenderer: Function,
  url: string,
  tab?: string,
  sticky?: boolean
}

const scrollProps = (index: number) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const stickyAppBarSx = (theme) => ({
  top: theme.spacing(7),
  [theme.breakpoints.up('sm')]: {
    top: theme.spacing(8)
  }
})

const TabPanel = (props: Props) => {
  const { collection, collectionId, labelRenderer, url, tab, sticky } = props

  const index = collection.findIndex(({ id }) => id === collectionId)

  const handleChange = (newId) => history.push(`${url}/${newId}/${tab ? tab : ''}`)

  return (
    <AppBar
      position={sticky ? 'sticky' : 'static'}
      color='inherit'
      sx={sticky ? stickyAppBarSx : undefined}
    >
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
  )
}

export default TabPanel
