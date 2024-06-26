import { Link, useLocation } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui';
import { Tabs as MuiTabs, Tab } from '@mui/material';
import { findIndex } from 'lodash'

import { TITLE } from 'utilities/constants'
import { colors } from 'utilities/colors'

type TabType = {
  label: string,
  value: string,
  matcher?: RegExp,
  extraTitleInfo?: string,
  display: boolean
}

type Props = {
  currentTab: string,
  url: string,
  id?: string,
  tabs: TabType[],
  titleSubstr: string
}

const useStyles = makeStyles()(() => ({
  tab: {
    backgroundColor: colors.grey200,
    border: `0.5px solid ${colors.grey300}`
  }
}));

const Tabs = ({ currentTab, url, id, tabs, titleSubstr }: Props) => {
  const { classes } = useStyles()
  const { pathname } = useLocation()

  const activeTabs = tabs.filter(({ display }) => display)

  let tabIndex = findIndex(activeTabs, ({ value, matcher }) => {
    return matcher ? pathname.match(matcher) : value === currentTab
  })

  if (tabIndex < 0) tabIndex = 0

  const { label, extraTitleInfo } = activeTabs[tabIndex]

  const extraTitleInfoSubstr = extraTitleInfo ? ` - ${extraTitleInfo}` : ''

  document.title = `${TITLE} - ${titleSubstr} - ${label}${extraTitleInfoSubstr}`

  return (
    <MuiTabs
      indicatorColor='primary'
      textColor='primary'
      value={tabIndex}
      variant='fullWidth'
      className={classes.tab}
    >
      {
        activeTabs.map(
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
