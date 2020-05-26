import { render } from '@testing-library/svelte'
import { getContext } from 'svelte'
import Mask from './Mask.svelte'
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

test('mask', async () => {
  const mask = new Phaser.Display.Masks.BitmapMask(scene)

  render(Mask, {
    mask,
  })

  expect(instance.mask).toEqual(mask)
})
