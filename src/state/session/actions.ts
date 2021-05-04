export const API_SESSIONS_CREATE = 'API_SESSIONS_CREATE'

type Props = {
  user: {
    email: string,
    password: string
  }
}

export const logIn = ({ user }: Props) => ({ type: API_SESSIONS_CREATE, user })
