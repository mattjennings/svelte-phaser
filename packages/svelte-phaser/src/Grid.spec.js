import { render } from '@testing-library/svelte'
import { tick, getContext } from 'svelte'
import Grid from './Grid.svelte'
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

test('outline props', () => {
  const {
    component: { instance },
  } = render(Grid, {
    outlineFillColor: 0xff,
    outlineFillAlpha: 6,
  })

  expect(instance.outlineFillColor).toEqual(0xff)
  expect(instance.outlineFillAlpha).toEqual(6)
})

test('cell props', async () => {
  const {
    component: { instance, $set },
  } = render(Grid, {
    cellWidth: 10,
    cellHeight: 20,
  })

  expect(instance.cellWidth).toEqual(10)
  expect(instance.cellHeight).toEqual(20)

  $set({ cellWidth: 1, cellHeight: 2 })
  await tick()
  expect(instance.cellWidth).toEqual(1)
  expect(instance.cellHeight).toEqual(2)
})
