import { render } from '@testing-library/svelte'
import { tick, getContext } from 'svelte'
import TileSprite from './TileSprite.svelte'
import { createGame } from './test-utils'

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
  getContext.mockImplementation((name) => {
    switch (name) {
      case 'phaser/scene':
        return scene
      case 'phaser/game':
        return game
    }
  })
})

test('tile props', async () => {
  const {
    component: { instance },
  } = render(TileSprite, {
    tilePositionX: 10,
    tilePositionY: 20,
    tileScaleX: 1,
    tileScaleY: 2,
  })

  expect(instance.tilePositionX).toEqual(10)
  expect(instance.tilePositionY).toEqual(20)
  expect(instance.tileScaleX).toEqual(1)
  expect(instance.tileScaleY).toEqual(2)
})
