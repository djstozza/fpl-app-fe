import { Link, useLocation } from 'react-router-dom'
import {
  Tabs as MuiTabs,
  Tab,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core'
import { findIndex } from 'lodash'

import { colors } from 'utilities/colors'

type TabType = {
  label: string,
  value: string,
  matcher?: RegExp,
  display: boolean
}

type Props = {
  currentTab: string,
  url: string,
  id?: string,
  tabs: TabType[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tab: {
      backgroundColor: colors.grey200,
      border: `0.5px solid ${colors.grey300}`
    }
  })
)

const Tabs = ({ currentTab, url, id, tabs }: Props) => {
  const classes = useStyles()
  const { pathname } = useLocation()

  return (
    <MuiTabs
      indicatorColor='primary'
      textColor='primary'
      value={findIndex(tabs, ({ value, matcher }) => matcher ? pathname.match(matcher) : value === currentTab)}
      variant='fullWidth'
      className={classes.tab}
    >
      {
        tabs.filter(({ display }) => display).map(
          ({ label, value }, key) => (
            <Tab
              key={key}
              label={label}
              component={Link}
              to={id ? `${url}/${id}/${value}` : `${url}/${value}`}
            />
          )
        )
      }
    </MuiTabs>
  )
}

export default Tabs
