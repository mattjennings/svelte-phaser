import { render } from '@testing-library/svelte'
import { getContext, tick } from 'svelte'
import GameObject from './GameObject.svelte'
import { createGame, asMock } from './test-utils'

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

test('active', async () => {
  render(GameObject, {
    instance,
    active: false,
  })

  expect(instance.active).toEqual(false)
})

test('draggable', async () => {
  const {
    component: { $$set },
  } = render(GameObject, {
    instance,
    interactive: { shape: new Phaser.Geom.Rectangle(0, 0, 10, 10) },
  })

  jest.spyOn(scene.input, 'setDraggable')
  $$set({ draggable: true })
  await tick()

  expect(scene.input.setDraggable).toHaveBeenCalledWith(instance, true)
  $$set({ draggable: false })
  await tick()

  expect(scene.input.setDraggable).toHaveBeenCalledWith(instance, false)
})

test('name', async () => {
  render(GameObject, {
    instance,
    name: 'bob',
  })

  expect(instance.name).toEqual('bob')
})

test('renderFlags', async () => {
  render(GameObject, {
    instance,
    renderFlags: 1,
  })

  expect(instance.renderFlags).toEqual(1)
})

test('tabIndex', async () => {
  render(GameObject, {
    instance,
    tabIndex: 1,
  })

  expect(instance.tabIndex).toEqual(1)
})
