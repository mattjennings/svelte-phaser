import { render } from '@testing-library/svelte'
import { getContext } from 'svelte'
import Pipeline from './Pipeline.svelte'
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

test('pipeline', async () => {
  jest.spyOn(instance, 'setPipeline')

  // it relies on a webgl render target to actually do anything,
  // so we can't test instance.pipeline, but we can spy on the method
  render(Pipeline, {
    pipeline: 'bleh',
  })

  expect(instance.setPipeline).toHaveBeenCalledWith('bleh')
})
