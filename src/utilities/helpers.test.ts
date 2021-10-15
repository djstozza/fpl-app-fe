import { stringify } from './helpers'

test('stringify', () => {
  const query = {
    aZ: '1',
    b: '2',
  }

  expect(stringify(query)).toEqual('a_z=1&b=2')
  expect(stringify({ ...query, filter: { cT: ['3', '4'], d: ['5'] } }))
    .toEqual('a_z=1&b=2&filter%5Bc_t%5D=3%2C4&filter%5Bd%5D=5')

  expect(stringify(undefined)).toEqual('')
})
