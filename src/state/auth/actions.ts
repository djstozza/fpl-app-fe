export const INITIALIZE_AUTH = 'INITIALIZE_AUTH'
export const API_SESSIONS_CREATE = 'API_SESSIONS_CREATE'
export const API_SESSIONS_UPDATE = 'API_SESSIONS_UPDATE'
export const API_USERS_CREATE = 'API_USERS_CREATE'
export const LOG_OUT = 'LOG_OUT'

type Props = {
  user: {
    email: string,
    password: string
  }
}

export const initializeAuth = () => ({ type: INITIALIZE_AUTH })
export const logIn = ({ user }: Props) => ({ type: API_SESSIONS_CREATE, user })
export const signUp = ({ user }: Props) => ({ type: API_USERS_CREATE, user })
export const updateSession = () => ({ type: API_SESSIONS_UPDATE })
export const logOut = () => ({ type: LOG_OUT })
