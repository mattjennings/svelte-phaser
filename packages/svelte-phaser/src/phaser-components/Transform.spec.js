import { render } from '@testing-library/svelte'
import { getContext, tick } from 'svelte'
import Transform from './Transform.svelte'
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

test('transform props', async () => {
  const {
    component: { $set },
  } = render(Transform, {
    x: 100,
    y: 100,
    angle: 100,
    scale: 3,
    z: 2,
    w: 2,
  })

  expect(instance.x).toEqual(100)
  expect(instance.y).toEqual(100)
  expect(instance.angle).toEqual(100)
  expect(instance.scale).toEqual(3)
  expect(instance.z).toEqual(2)
  expect(instance.w).toEqual(2)

  // update scale using scaleX/Y
  $set({ scaleX: 2, scaleY: 2 })
  await tick()
  expect(instance.scale).toEqual(2)
})
