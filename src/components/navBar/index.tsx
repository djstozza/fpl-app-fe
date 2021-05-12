import { Fragment, MouseEvent, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import classnames from 'classnames'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  Theme,
  Menu,
  MenuItem,
  makeStyles,
  createStyles
} from '@material-ui/core'

import { authActions } from 'state/auth'
import MoreIcon from '@material-ui/icons/MoreVert'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import PersonIcon from '@material-ui/icons/Person'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { iconLoader } from 'utilities/helpers'
import { ROUNDS_URL, TEAMS_URL, PLAYERS_URL, SIGN_UP_URL, LOGIN_URL, PROFILE_URL } from 'utilities/constants'

import type { User } from 'types'

type Props = {
  user: User,
  logOut: Function
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    icon: {
      width: theme.spacing(3.5)
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    active: {
      backgroundColor: theme.palette.secondary.main
    }
  }),
)

const NavBar = (props: Props) => {
  const { user, logOut } = props
  const classes = useStyles()

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
        className={classnames({ [classes.active]: pathname === ROUNDS_URL })}
      >
        <IconButton
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
        className={classnames({ [classes.active]: pathname === TEAMS_URL })}
      >
        <IconButton
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
        className={classnames({ [classes.active]: pathname === PLAYERS_URL })}
      >
        <IconButton
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
              color='inherit'
              component={Link}
              to={SIGN_UP_URL}
              className={classnames({ [classes.active]: pathname.includes(SIGN_UP_URL) })}
            >
              <PersonAddIcon className={classes.icon} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Log In'>
            <IconButton
              color='inherit'
              component={Link}
              to={LOGIN_URL}
              className={classnames({ [classes.active]: pathname.includes(LOGIN_URL) })}
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
              aria-label='Account'
              aria-haspopup='true'
              color='inherit'
              onClick={handleAccountMenuOpen}
              className={classnames({ [classes.active]: pathname.includes(PROFILE_URL) })}
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
            Fpl App
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Tooltip title='Rounds'>
              <IconButton
                color='inherit'
                aria-label='Rounds'
                component={Link}
                to={ROUNDS_URL}
                className={classnames({ [classes.active]: pathname.includes(ROUNDS_URL) })}
              >
                <FormatListNumberedIcon className={classes.icon} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Teams'>
              <IconButton
                color='inherit'
                component={Link}
                to={TEAMS_URL}
                className={classnames({ [classes.active]: pathname.includes(TEAMS_URL) })}
              >
                <img src={iconLoader('team-jersey-white')} alt='Teams' className={classes.icon} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Players'>
              <IconButton
                color='inherit'
                component={Link}
                to={`${PLAYERS_URL}`}
                className={classnames({ [classes.active]: pathname.includes(PLAYERS_URL) })}
              >
                <img src={iconLoader('player-white')} alt='Teams' className={classes.icon} />
              </IconButton>
            </Tooltip>

          </div>
          {renderAccountSection}
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  )
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
