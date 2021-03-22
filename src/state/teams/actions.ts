export const API_TEAMS_INDEX = 'API_TEAMS_INDEX'

type Props = {
  sort: Object,
  updateUrl?: boolean
}

export const fetchTeams = ({ sort, updateUrl }: Props) => ({ type: API_TEAMS_INDEX, sort, updateUrl })
