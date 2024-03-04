import { createConsumer } from '@rails/actioncable'

export const API_URL = process.env.REACT_APP_API_URL
export const CABLE_URL = process.env.REACT_APP_CABLE_URL
export const ROUNDS_URL = '/rounds'
export const TEAMS_URL = '/teams'
export const PLAYERS_URL = '/players'
export const SIGN_UP_URL = '/sign-up'
export const LOGIN_URL = '/login'
export const PROFILE_URL = '/profile'
export const USER_DETAILS_URL = `${PROFILE_URL}/details`
export const EDIT_USER_DETAILS_URL = `${USER_DETAILS_URL}/edit`
export const CHANGE_PASSWORD_URL = `${PROFILE_URL}/change-password`
export const LEAGUES_URL = '/leagues'
export const NEW_LEAGUE_URL = `${LEAGUES_URL}/new`
export const JOIN_LEAGUE_URL = `${LEAGUES_URL}/join`
export const FPL_TEAMS_URL = '/fplTeams'

export const API_REGISTRATIONS_PATH = '/registrations'
export const API_SESSIONS_PATH = '/sessions'
export const API_USERS_PATH = '/users'
export const API_PASSWORDS_PATH = '/passwords'
export const API_FPL_TEAMS_PATH = '/fpl_teams'
export const API_FPL_TEAM_LISTS_PATH = '/fpl_team_lists'
export const API_LIST_POSITIONS_PATH = '/list_positions'
export const API_WAIVER_PICKS_PATH = '/waiver_picks'

export const TITLE = 'Fpl App'

export const cable = createConsumer(CABLE_URL)

export const APPLICATION_ERRORS = {
  '401': {
    description: 'Unauthorized',
    title: 'Unauthorized',
    message: 'You must be logged in to view this page',
    action: {
      label: 'OK'
    }
  },
  '404': {
    description: 'Not Found',
    title: 'Requested resource not found',
    message: 'We couldn’t find what you’re looking for.',
    action: {
      label: 'Back Home',
      path: '/'
    }
  },
  '429': {
    description: 'Too Many Requests',
    title: 'Too many requests',
    message: 'Please try again after {retryAfter} seconds.',
    action: {
      label: 'OK'
    }
  },
  '500': {
    description: 'Internal Server Error',
    title: 'Oops, something went wrong',
    message: 'Something went wrong. The team has been alerted.',
    action: {
      label: 'OK'
    }
  },
  '502': {
    description: 'Bad Gateway',
    title: 'Service Unavailable',
    message: 'The service is temporarily unavailable. Please try again later.',
    action: {
      label: 'OK'
    }
  },
  '503': {
    description: 'Service Unavailable',
    title: 'Service Unavailable',
    message: 'The service is temporarily unavailable. Please try again later.',
    action: {
      label: 'OK'
    }
  },
  'failed_to_fetch': {
    description: 'Service Unavailable',
    title: 'Service Unavailable',
    message: 'The service is temporarily unavailable. Please try again later.',
    action: {
      label: 'OK'
    }
  }
}
