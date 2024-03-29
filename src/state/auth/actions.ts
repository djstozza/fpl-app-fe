export const INITIALIZE_AUTH = 'INITIALIZE_AUTH'
export const API_SESSIONS_CREATE = 'API_SESSIONS_CREATE'
export const API_SESSIONS_UPDATE = 'API_SESSIONS_UPDATE'
export const API_USERS_CREATE = 'API_USERS_CREATE'
export const API_USERS_UPDATE = 'API_USERS_UPDATE'
export const API_PASSWORDS_UPDATE = 'API_PASSWORDS_UPDATE'
export const LOG_OUT = 'LOG_OUT'

type LogInProps = {
  user: { email: string, password: string }
}

type SignUpProps = {
  user: { email: string, username: string, password: string }
}

type ChangePasswordProps = {
  user: { password: string, newPassword: string }
}

type UpdateUserProps = {
  user: { email: string, username: string }
}

export const initializeAuth = () => ({ type: INITIALIZE_AUTH })
export const logIn = ({ user }: LogInProps) => ({ type: API_SESSIONS_CREATE, user })
export const signUp = ({ user }: SignUpProps) => ({ type: API_USERS_CREATE, user })
export const updateSession = () => ({ type: API_SESSIONS_UPDATE })
export const updateUser = ({ user }: UpdateUserProps) => ({ type: API_USERS_UPDATE, user })
export const changePassword = ({ user }: ChangePasswordProps) => ({ type: API_PASSWORDS_UPDATE, user })
export const logOut = () => ({ type: LOG_OUT })
