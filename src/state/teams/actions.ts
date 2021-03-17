export const API_TEAMS_INDEX = 'API_TEAMS_INDEX'

type Props = {
  sort: Object
}

export const fetchTeams = ({ sort }: Props) => ({ type: API_TEAMS_INDEX, sort })
