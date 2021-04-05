import { MouseEvent, useState } from 'react'
import { Link } from 'react-router-dom'
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

import MoreIcon from '@material-ui/icons/MoreVert'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'

import { ROUNDS_URL, TEAMS_URL } from 'utilities/constants'

import { iconLoader } from 'utilities/helpers'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    icon: {
      width: theme.spacing(4)
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
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
  }),
);

const NavBar = () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null)

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null)
  const handleMobileMenuOpen = ({ currentTarget }: MouseEvent<HTMLElement>) => setMobileMoreAnchorEl(currentTarget)

  const menuId = 'primary-search-account-menu';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        component={Link}
        to={`${ROUNDS_URL}`}
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
        to={`${TEAMS_URL}`}
      >
        <IconButton
          color='inherit'
        >
          <img src={iconLoader('team-jersey-black')} alt='Teams' className={classes.icon} />
        </IconButton>
        <p>Teams</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Fpl App
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Tooltip title='Rounds'>
              <IconButton
                color='inherit'
                aria-label='Rounds'
                component={Link}
                to={`${ROUNDS_URL}`}
              >
                <FormatListNumberedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Teams'>
              <IconButton
                color='inherit'
                component={Link}
                to={`${TEAMS_URL}`}
              >
                <img src={iconLoader('team-jersey-white')} alt='Teams' className={classes.icon} />
              </IconButton>
            </Tooltip>
          </div>
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

export default NavBar
