import { render } from '@testing-library/svelte'
import { getContext, tick } from 'svelte'
import Tint from './Tint.svelte'
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

test('tint', async () => {
  const {
    component: { $$set },
  } = render(Tint)

  const setTint = jest.spyOn(instance, 'setTint')

  $$set({
    tintTopLeft: 1,
    tintTopRight: 2,
    tintBottomLeft: 3,
    tintBottomRight: 4,
  })
  await tick()

  expect(setTint).toHaveBeenCalledWith(1, 2, 3, 4)
})

test('tintFill', async () => {
  const {
    component: { $$set },
  } = render(Tint)

  const setTintFill = jest.spyOn(instance, 'setTintFill')

  $$set({
    tintTopLeft: 1,
    tintTopRight: 2,
    tintBottomLeft: 3,
    tintBottomRight: 4,
    tintFill: 100,
  })
  await tick()

  expect(setTintFill).toHaveBeenCalledWith(1, 2, 3, 4)
})
