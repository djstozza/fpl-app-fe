export const API_USERS_CREATE = 'API_USERS_CREATE'

type Props = {
  user: {
    email: string,
    username: string,
    password: string
  }
}

export const signUp = ({ user }: Props) => ({ type: API_USERS_CREATE, user })
