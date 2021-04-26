import { Link } from 'react-router-dom'
import {
  Tabs as MuiTabs,
  Tab,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core'
import { findIndex } from 'lodash'

type TabType = {
  label: string,
  value: string
}

type Props = {
  currentTab: string,
  url: string,
  id: string,
  tabs: TabType[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tab: {
      backgroundColor: '#eeeeee',
      border: '0.5px solid #e0e0e0'
    }
  })
)

const Tabs = ({ currentTab, url, id, tabs }: Props) => {
  const classes = useStyles()

  return (
    <MuiTabs
      indicatorColor='primary'
      textColor='primary'
      value={findIndex(tabs, ({ value }) => value === currentTab)}
      variant='fullWidth'
      className={classes.tab}
    >
      {
        tabs.map(
          ({ label, value }) => (
            <Tab
              key={value}
              label={label}
              component={Link}
              to={`${url}/${id}/${value}`}
            />
          )
        )
      }
    </MuiTabs>
  )
}

export default Tabs
