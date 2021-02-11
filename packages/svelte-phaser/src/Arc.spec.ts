import { render } from '@testing-library/svelte'
import { tick, getContext } from 'svelte'
import Arc from './Arc.svelte'
import { createGame, asMock } from './test-utils'

jest.mock('svelte', () => ({
  ...jest.requireActual('svelte'),
  getContext: jest.fn(),
}))

let scene
let game

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
    }
  })
})

test('arc props', async () => {
  const {
    component: { instance, $set },
  } = render(Arc, {
    radius: 5,
    startAngle: 20,
    endAngle: 30,
    anticlockwise: true,
  })

  // test constructor
  expect(instance.radius).toEqual(5)
  expect(instance._startAngle).toEqual(20)
  expect(instance._endAngle).toEqual(30)
  expect(instance._anticlockwise).toEqual(true)

  $set({
    radius: 10,
    startAngle: 30,
    endAngle: 40,
    anticlockwise: false,
  })
  await tick()

  // test reactive statements
  expect(instance.radius).toEqual(10)
  expect(instance._startAngle).toEqual(30)
  expect(instance._endAngle).toEqual(40)
  expect(instance._anticlockwise).toEqual(false)
})
