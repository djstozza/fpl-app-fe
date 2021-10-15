// convenience functions for creating success / failure action names

const snakeCaseAppend = (string1: string, string2: string): string => [string1, string2].join('_')
export const success = (actionName: string): string => snakeCaseAppend(actionName, 'SUCCESS')
export const failure = (actionName: string): string => snakeCaseAppend(actionName, 'FAILURE')
