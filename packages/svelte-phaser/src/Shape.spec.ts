import Phaser from 'phaser'
import { render } from '@testing-library/svelte'
import { tick, getContext } from 'svelte'
import Shape from './Shape.svelte'
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
  instance = new Phaser.GameObjects.Rectangle(scene, 0, 0)

  asMock(getContext).mockImplementation((name) => {
    switch (name) {
      case 'phaser/scene':
        return scene
      case 'phaser/game':
        return game
    }
  })
})

test('stroke and fill', () => {
  render(Shape, {
    instance,
    fillAlpha: 0.5,
    fillColor: 2,
    strokeAlpha: 3,
    strokeColor: 4,
    strokeWidth: 5,
  })

  expect(instance.fillAlpha).toEqual(0.5)
  expect(instance.fillColor).toEqual(2)
  expect(instance.strokeAlpha).toEqual(3)
  expect(instance.strokeColor).toEqual(4)
  expect(instance.lineWidth).toEqual(5)
})
