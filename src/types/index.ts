export type Error = {
  status: string
}

export type Action = {
  type: string,
  errors?: Error[],
  data?: any
}

export type Round = {
  id: string,
  name: string,
  finsihed: boolean,
  isCurrent: boolean,
  isNext: boolean,
  isPrevious: boolean,
  finished: boolean,
  dataChecked: boolean,
  deadlineTime: string
}
