import { render } from '@testing-library/svelte'
import { tick, getContext } from 'svelte'
import Triangle from './Triangle.svelte'
import { createGame } from './test-utils'

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
  getContext.mockImplementation((name) => {
    switch (name) {
      case 'phaser/scene':
        return scene
      case 'phaser/game':
        return game
    }
  })
})

test('points', () => {
  const {
    component: { instance },
  } = render(Triangle, {
    x1: 1,
    y1: 2,
    x2: 3,
    y2: 4,
    x3: 5,
    y3: 6,
  })

  expect(instance.geom.x1).toEqual(1)
  expect(instance.geom.y1).toEqual(2)
  expect(instance.geom.x2).toEqual(3)
  expect(instance.geom.y2).toEqual(4)
  expect(instance.geom.x3).toEqual(5)
  expect(instance.geom.y3).toEqual(6)
})
