import type { User } from 'types'

type AuthProps = {
  user?: User,
  token?: string,
  errors?: any[],
  submitting?: boolean,
  data?: {
    token?: string,
  }
}

export const initialAuth = {
  user: null,
  token: '',
}

export const authKey = 'fplAppAuth'

const StateLoader = {
  saveAuth: (auth: AuthProps): void => {
    const { token, user } = auth
    localStorage.setItem(authKey, JSON.stringify({ token, user }))
  },
  getAuth: () => {
    const authKeyValue = localStorage.getItem(authKey)
    const { user = null, token = '' } = authKeyValue ? JSON.parse(authKeyValue) : {}

    return {
      user,
      token
    }
  },
  deleteAuth: (): void => {
    localStorage.removeItem(authKey)
  }
}

export default StateLoader
