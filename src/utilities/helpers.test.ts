import { renderHook, act } from '@testing-library/react'
import { stringify, SetElHeight, GetElHeight } from './helpers'

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

const createMockDiv = (offsetTop, clientHeight) => {
  const div = document.createElement('div');
  Object.defineProperty(div, 'offsetTop', { value: offsetTop })
  Object.defineProperty(div, 'clientHeight', { value: clientHeight })
  return div
};

describe('SetElHeight', () => {
  it('should return height', () => {
    const ref = { current: createMockDiv(10, 100) }
    const { result } = renderHook(() => SetElHeight(ref))

    act(() => {
      global.innerHeight = 100;
      global.dispatchEvent(new Event('resize'))
    })

    expect(result.current.height).toBe(90)
  })

  it('handles null ref.current', () => {
    const ref = { current: null }
    const { result } = renderHook(() => SetElHeight(ref))

    act(() => {
      global.innerHeight = 100;
      global.dispatchEvent(new Event('resize'))
    })

    expect(result.current.height).toBe(0)
  })
})

describe('GetElHeight', () => {
  it('should return height', () => {
    const ref = { current: createMockDiv(10, 50) }
    const { result } = renderHook(() => GetElHeight(ref))

    expect(result.current.height).toBe(50)
  })

  it('handles null ref.current', () => {
    const ref = { current: null }
    const { result } = renderHook(() => GetElHeight(ref))

    act(() => {
      global.innerHeight = 100;
      global.dispatchEvent(new Event('resize'))
    })

    expect(result.current.height).toBe(0)
  })
})

