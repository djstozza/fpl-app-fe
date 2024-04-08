import { heading } from '.'

describe('heading', () => {
  const name = 'Fpl Team Name'
  const tab = 'teamLists'
  const selectedRoundName = 'Round 1'
  const showSelectedRoundNameTabs = [tab]
  const totalScore = 12
  
  it('returns all information', () => {
    expect(heading({ name, tab, selectedRoundName, showSelectedRoundNameTabs, totalScore }))
      .toEqual(`${name} - ${selectedRoundName} - ${totalScore} Points`)
  })

  it('returns the singular of point if points === 1', () => {
    const newTotalScore = 1

    expect(heading({ name, tab, selectedRoundName, showSelectedRoundNameTabs, totalScore: newTotalScore }))
      .toEqual(`${name} - ${selectedRoundName} - ${newTotalScore} Point`)
  })

  it('does not show totalScore if the tab !== teamLists', () => {
    const newTab = 'foo'
    const newShowSelectedRoundNameTabs = [newTab]
    
    expect(
      heading({
        name,
        tab: newTab,
        selectedRoundName,
        showSelectedRoundNameTabs: newShowSelectedRoundNameTabs,
        totalScore
      })
    ).toEqual(`${name} - ${selectedRoundName}`)
  })

  it('does not show selectedRoundName if the tab is not included', () => {
    const newShowSelectedRoundNameTabs = []

    expect(
      heading({
        name,
        tab,
        selectedRoundName,
        showSelectedRoundNameTabs: newShowSelectedRoundNameTabs,
        totalScore
      })
    ).toEqual(`${name} - ${totalScore} Points`)
  })

  it('just renders the name if no other criteria are satisfied', () => {
    const newTab = 'foo'

    expect(heading({ name, tab: newTab, selectedRoundName, showSelectedRoundNameTabs, totalScore }))
    .toEqual(name)
  })
})