import { render } from '@testing-library/svelte'
import { tick, getContext } from 'svelte'
import Star from './Star.svelte'
import { createGame, asMock } from './test-utils'

jest.mock('svelte', () => ({
  ...jest.requireActual('svelte'),
  getContext: jest.fn(),
}))

let scene
let game

beforeAll(async () => {
  const setup = await createGame()

  game = setup.game
  scene = setup.scene
  asMock(getContext).mockImplementation((name) => {
    switch (name) {
      case 'phaser/scene':
        return scene
      case 'phaser/game':
        return game
    }
  })
})

const commonProps = {
  points: [
    {
      x: 0,
      y: 0,
    },
    {
      x: 10,
      y: 10,
    },
  ],
}

test('points', () => {
  const {
    component: { instance },
  } = render(Star, {
    points: 10,
  })

  expect(instance._points).toEqual(10)
})
test('radius', () => {
  const {
    component: { instance },
  } = render(Star, {
    innerRadius: 10,
    outerRadius: 20,
  })

  expect(instance._innerRadius).toEqual(10)
  expect(instance._outerRadius).toEqual(20)
})
