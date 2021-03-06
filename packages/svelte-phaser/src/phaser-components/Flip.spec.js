import { render } from '@testing-library/svelte'
import { getContext } from 'svelte'
import Flip from './Flip.svelte'
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

test('flip', async () => {
  render(Flip, {
    flipX: true,
    flipY: true,
  })

  expect(instance.flipX).toEqual(true)
  expect(instance.flipY).toEqual(true)
})
