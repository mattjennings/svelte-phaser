import { render } from '@testing-library/svelte'
import { getContext } from 'svelte'
import ScrollFactor from './ScrollFactor.svelte'
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

test('scrollFactor', async () => {
  render(ScrollFactor, {
    scrollFactorX: 10,
    scrollFactorY: 20,
  })

  expect(instance.scrollFactorX).toEqual(10)
  expect(instance.scrollFactorY).toEqual(20)
})
