export const API_URL = process.env.REACT_APP_API_URL
export const ROUNDS_URL = '/rounds'
export const TEAMS_URL = '/teams'
export const PLAYERS_URL = '/players'
export const SIGN_UP_URL = '/sign-up'
export const LOGIN_URL = '/login'
export const PROFILE_URL = '/profile'

export const API_REGISTRATIONS_PATH = '/registrations'
export const API_SESSIONS_PATH = '/sessions'

export const APPLICATION_ERRORS = {
  '403': {
    description: 'Forbidden',
    title: 'Not permitted',
    message: 'You do not have permission to perform this action. Try logging out and in again.',
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
    title: 'Rate limit reached',
    message: 'Too many requests. Please try again after {retryAfter} seconds.',
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
