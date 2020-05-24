import { render } from '@testing-library/svelte'
import { getContext } from 'svelte'
import Size from './Size.svelte'
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

test('width/height', async () => {
  render(Size, {
    width: 10,
    height: 20,
  })

  expect(instance.width).toEqual(10)
  expect(instance.height).toEqual(20)
})

test('display width/height', async () => {
  render(Size, {
    displayWidth: 10,
    displayHeight: 20,
  })

  expect(instance.displayWidth).toEqual(10)
  expect(instance.displayHeight).toEqual(20)
})
