export const teamCrestPathLoader = (shortName: string) => (
  require(`../images/crests/${shortName.toLowerCase()}.png`).default
)
