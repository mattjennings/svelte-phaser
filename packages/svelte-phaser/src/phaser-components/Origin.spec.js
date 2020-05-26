import { render } from '@testing-library/svelte'
import { getContext } from 'svelte'
import Origin from './Origin.svelte'
import { createGame } from '../test-utils'

jest.mock('svelte', () => ({
  ...jest.requireActual('svelte'),
  getContext: jest.fn(),
}))

let scene
let game

let instance

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
      case 'phaser/game-object':
        return instance
    }
  })
})

beforeEach(() => {
  instance = scene.add.text(0, 0, 'hello')
})

afterEach(() => {
  instance.destroy()
})

test('x/y', async () => {
  render(Origin, {
    originX: 10,
    originY: 20,
  })

  expect(instance.originX).toEqual(10)
  expect(instance.originY).toEqual(20)
})

test('display x/y', async () => {
  render(Origin, {
    displayOriginX: 10,
    displayOriginY: 20,
  })

  expect(instance.displayOriginX).toEqual(10)
  expect(instance.displayOriginY).toEqual(20)
})
