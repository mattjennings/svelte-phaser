import { render } from '@testing-library/svelte'
import { getContext } from 'svelte'
import Alpha from './Alpha.svelte'
import { createGame, asMock } from '../test-utils'

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

  asMock(getContext).mockImplementation((name) => {
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

test('alpha', async () => {
  render(Alpha, {
    alpha: 0.1,
  })

  expect(instance.alpha).toEqual(0.1)
  expect(instance.alphaBottomLeft).toEqual(0.1)
  expect(instance.alphaBottomRight).toEqual(0.1)
  expect(instance.alphaTopLeft).toEqual(0.1)
  expect(instance.alphaTopRight).toEqual(0.1)
})

test('alpha corners', async () => {
  render(Alpha, {
    alphaBottomLeft: 0.1,
    alphaBottomRight: 0.2,
    alphaTopLeft: 0.3,
    alphaTopRight: 0.4,
  })

  expect(instance.alphaBottomLeft).toEqual(0.1)
  expect(instance.alphaBottomRight).toEqual(0.2)
  expect(instance.alphaTopLeft).toEqual(0.3)
  expect(instance.alphaTopRight).toEqual(0.4)
})
