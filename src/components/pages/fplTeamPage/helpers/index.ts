import pluralize from 'pluralize'

type headingProps = {
  name: string,
  tab: string,
  showSelectedRoundNameTabs: (string | null)[],
  selectedRoundName?: string,
  totalScore?: number
}

export const heading = ({ name, tab, showSelectedRoundNameTabs, selectedRoundName, totalScore }: headingProps): string => {
  const baseStr = name
  const roundStr = showSelectedRoundNameTabs.includes(tab) && selectedRoundName ? ` - ${selectedRoundName}` : ''
  const scoreStr = tab === 'teamLists' && Boolean(totalScore) ? ` - ${totalScore} ${pluralize('Point', totalScore)}` : ''
  
  return `${baseStr}${roundStr}${scoreStr}`
}