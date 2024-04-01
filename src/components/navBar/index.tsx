import { Fragment, MouseEvent, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'
import { AppBar, Toolbar, IconButton, Typography, Tooltip, Theme, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material'

import { authActions } from 'state/auth'
import MoreIcon from '@mui/icons-material/MoreVert'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PersonIcon from '@mui/icons-material/Person'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { iconLoader } from 'utilities/helpers'
import {
  ROUNDS_URL,
  TEAMS_URL,
  PLAYERS_URL,
  SIGN_UP_URL,
  LOGIN_URL,
  PROFILE_URL,
  LEAGUES_URL,
  FPL_TEAMS_URL
} from 'utilities/constants'

import type { User } from 'types'

type Props = {
  user?: User,
  logOut: Function
}

const useStyles = makeStyles()((theme: Theme) =>
  ({
    grow: {
      flexGrow: 1,
    },

    menuButton: {
      marginRight: theme.spacing(2),
    },

    icon: {
      width: theme.spacing(3.5)
    },

    section: {
      display: 'flex'
    },

    active: {
      backgroundColor: `${theme.palette.secondary.main} !important`
    }
  }));

export const NavBar = (props: Props) => {
  const { user, logOut } = props
  const { classes, cx } = useStyles()
  const theme = useTheme()
  const showSectionMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null)
  const handleMobileMenuOpen = ({ currentTarget }: MouseEvent<HTMLElement>) => setMobileMoreAnchorEl(currentTarget)

  const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(null)
  const isAccountMenuOpen = Boolean(accountAnchorEl)
  const handleAccountMenuClose = () => setAccountAnchorEl(null)
  const handleAccountMenuOpen = ({ currentTarget }: MouseEvent<HTMLElement>) => setAccountAnchorEl(currentTarget)

  const handleLogoutClick = () => {
    logOut()
    handleAccountMenuClose()
  }

  const { pathname } = useLocation()

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        component={Link}
        to={ROUNDS_URL}
        onClick={handleMobileMenuClose}
        className={cx({ [classes.active]: pathname === ROUNDS_URL })}
      >
        <IconButton
          size='small'
          color='inherit'
          aria-label='Rounds'
        >
          <FormatListNumberedIcon />
        </IconButton>
        <p>Rounds</p>
      </MenuItem>
      <MenuItem
        component={Link}
        to={TEAMS_URL}
        onClick={handleMobileMenuClose}
        className={cx({ [classes.active]: pathname === TEAMS_URL })}
      >
        <IconButton
          size='small'
          color='inherit'
          aria-label='Teams'
        >
          <img src={iconLoader('team-jersey-black')} alt='Teams' className={classes.icon} />
        </IconButton>
        <p>Teams</p>
      </MenuItem>
      <MenuItem
        component={Link}
        to={PLAYERS_URL}
        onClick={handleMobileMenuClose}
        className={cx({ [classes.active]: pathname === PLAYERS_URL })}
      >
        <IconButton
          size='small'
          color='inherit'
          aria-label='Players'
        >
          <img src={iconLoader('player-black')} alt='Teams' className={classes.icon} />
        </IconButton>
        <p>Players</p>
      </MenuItem>
    </Menu>
  )

  const renderAccountMenu = (
    <Menu
      anchorEl={accountAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isAccountMenuOpen}
      onClose={handleAccountMenuClose}
    >
      <MenuItem
        component={Link}
        to={PROFILE_URL}
        onClick={handleAccountMenuClose}
      >
        My profile
      </MenuItem>
      <MenuItem
        component={Link}
        to={`${PROFILE_URL}${LEAGUES_URL}`}
        onClick={handleAccountMenuClose}
      >
        My leagues
      </MenuItem>
      <MenuItem
        component={Link}
        to={`${PROFILE_URL}${FPL_TEAMS_URL}`}
        onClick={handleAccountMenuClose}
      >
        My fpl teams
      </MenuItem>
      <MenuItem
        onClick={handleLogoutClick}
      >
        Log out
      </MenuItem>
    </Menu>
  )

  const renderAccountSection = (
    <Fragment>
      {
        !user &&
        <Fragment>
          <Tooltip title='Sign Up'>
            <IconButton
              size='small'
              color='inherit'
              component={Link}
              to={SIGN_UP_URL}
              className={cx({ [classes.active]: pathname.includes(SIGN_UP_URL) })}
            >
              <PersonAddIcon className={classes.icon} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Log In'>
            <IconButton
              size='small'
              color='inherit'
              component={Link}
              to={LOGIN_URL}
              className={cx({ [classes.active]: pathname.includes(LOGIN_URL) })}
            >
              <PersonIcon className={classes.icon} />
            </IconButton>
          </Tooltip>
        </Fragment>
      }
      {
        user &&
        <Fragment>
          <Tooltip title={user.username}>
            <IconButton
              size='small'
              aria-label='Account'
              aria-haspopup='true'
              color='inherit'
              onClick={handleAccountMenuOpen}
              className={cx({ [classes.active]: pathname.includes(PROFILE_URL) })}
            >
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
          {renderAccountMenu}
        </Fragment>
      }
    </Fragment>
  )

  return (
    <div className={classes.grow}>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h6' noWrap>
            FPL App
          </Typography>
          <div className={classes.grow} />
          {
            !showSectionMobile &&
            <div className={classes.section}>
              <Tooltip title='Rounds'>
                <IconButton
                  size='small'
                  color='inherit'
                  aria-label='Rounds'
                  component={Link}
                  to={ROUNDS_URL}
                  className={cx({ [classes.active]: pathname.includes(ROUNDS_URL) })}
                >
                  <FormatListNumberedIcon className={classes.icon} />
                </IconButton>
              </Tooltip>
              <Tooltip title='Teams'>
                <IconButton
                  size='small'
                  color='inherit'
                  component={Link}
                  to={TEAMS_URL}
                  className={cx({ [classes.active]: pathname.includes(TEAMS_URL) })}
                >
                  <img src={iconLoader('team-jersey-white')} alt='Teams' className={classes.icon} />
                </IconButton>
              </Tooltip>
              <Tooltip title='Players'>
                <IconButton
                  size='small'
                  color='inherit'
                  component={Link}
                  to={`${PLAYERS_URL}`}
                  className={cx({ [classes.active]: pathname.includes(PLAYERS_URL) })}
                >
                  <img src={iconLoader('player-white')} alt='Teams' className={classes.icon} />
                </IconButton>
              </Tooltip>
            </div>
          }
          {renderAccountSection}
          {
            showSectionMobile &&
            <div className={classes.section}>
              <IconButton
                size='small'
                aria-label='show more'
                aria-haspopup='true'
                onClick={handleMobileMenuOpen}
                color='inherit'
              >
                <MoreIcon />
              </IconButton>
            </div>
          }
        </Toolbar>
      </AppBar>
      {showSectionMobile && renderMobileMenu}
    </div>
  );
}

const mapStateToProps = (state) => {
  const {
    auth: { user }
  } = state

  return {
    user
  }
}

const matchDispatchToProps = {
  logOut: authActions.logOut
}

export default connect(mapStateToProps, matchDispatchToProps)(NavBar)
