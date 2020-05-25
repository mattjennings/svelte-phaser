import { render } from '@testing-library/svelte'
import { getContext, tick } from 'svelte'
import Texture from './Texture.svelte'
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
  instance = scene.add.sprite(0, 0)
})

afterEach(() => {
  instance.destroy()
})

test('texture props', async () => {
  const {
    component: { $set },
  } = render(Texture)

  const setTexture = jest.spyOn(instance, 'setTexture')

  $set({ texture: 't', frame: 'f' })
  await tick()

  expect(setTexture).toHaveBeenCalledWith('t', 'f')
})
