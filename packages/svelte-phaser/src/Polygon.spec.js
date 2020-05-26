import { render } from '@testing-library/svelte'
import { tick, getContext } from 'svelte'
import Polygon from './Polygon.svelte'
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
  const points = [
    {
      x: 10,
      y: 10,
    },
    {
      x: 20,
      y: 20,
    },
  ]
  const {
    component: { instance },
  } = render(Polygon, {
    points,
  })

  expect(instance.geom.points).toEqual(points)
})
