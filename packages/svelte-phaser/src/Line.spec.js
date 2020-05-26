import { render } from '@testing-library/svelte'
import { tick, getContext } from 'svelte'
import Line from './Line.svelte'
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
  x1: 0,
  y1: 0,
  x2: 10,
  y2: 10,
}

test('line props', async () => {
  const {
    component: { instance, $set },
  } = render(Line, {
    ...commonProps,
    x1: 10,
    y1: 20,
    x2: 100,
    y2: 200,
  })

  expect(instance.geom.x1).toEqual(10)
  expect(instance.geom.y1).toEqual(20)
  expect(instance.geom.x2).toEqual(100)
  expect(instance.geom.y2).toEqual(200)

  $set({
    x1: 20,
    y1: 30,
    x2: 200,
    y2: 300,
  })
  await tick()

  expect(instance.geom.x1).toEqual(20)
  expect(instance.geom.y1).toEqual(30)
  expect(instance.geom.x2).toEqual(200)
  expect(instance.geom.y2).toEqual(300)
})
