import type { User } from 'types'

type AuthProps = {
  user?: User,
  token?: string
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
  getAuth: (): undefined => {
    const authKeyValue = localStorage.getItem(authKey)
    const { ...auth } = authKeyValue ? JSON.parse(authKeyValue) : {}

    return {
      ...auth
    }
  },
  deleteAuth: (): void => {
    localStorage.removeItem(authKey)
  }
}

export default StateLoader
