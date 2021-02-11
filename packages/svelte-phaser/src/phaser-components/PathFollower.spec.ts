import { render } from '@testing-library/svelte'
import { getContext } from 'svelte'
import PathFollower from './PathFollower.svelte'
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
  instance = scene.add.sprite(0, 0, 'asdf')
})

afterEach(() => {
  instance.destroy()
})

test('path', async () => {
  const path = new Phaser.Curves.Line(
    new Phaser.Math.Vector2({ x: 100, y: 100 }),
    new Phaser.Math.Vector2({ x: 200, y: 200 })
  )
  render(PathFollower, {
    path,
  })

  expect(instance.path).toEqual(path)
})

test('rotateToPath', async () => {
  render(PathFollower, {
    rotateToPath: true,
  })

  expect(instance.rotateToPath).toEqual(true)
})
