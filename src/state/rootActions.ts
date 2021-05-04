export const APP_INITIALIZATION = 'APP_INITIALIZATION'

export const appInitialization = (auth: {}) => ({
  type: APP_INITIALIZATION,
  auth
})
