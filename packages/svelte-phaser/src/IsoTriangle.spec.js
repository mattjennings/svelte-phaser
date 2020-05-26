import { render } from '@testing-library/svelte'
import { tick, getContext } from 'svelte'
import IsoTriangle from './IsoTriangle.svelte'
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

test('fill props', () => {
  const {
    component: { instance },
  } = render(IsoTriangle, {
    fillTop: 1,
    fillLeft: 2,
    fillRight: 3,
  })

  expect(instance.fillTop).toEqual(1)
  expect(instance.fillLeft).toEqual(2)
  expect(instance.fillRight).toEqual(3)
})

test('show props', async () => {
  const {
    component: { instance, $set },
  } = render(IsoTriangle, {
    showTop: false,
    showLeft: false,
    showRight: false,
  })

  expect(instance.showTop).toEqual(false)
  expect(instance.showLeft).toEqual(false)
  expect(instance.showRight).toEqual(false)

  $set({ showTop: true, showLeft: true, showRight: true })
  await tick()

  expect(instance.showTop).toEqual(true)
  expect(instance.showLeft).toEqual(true)
  expect(instance.showRight).toEqual(true)
})

test('projection prop', () => {
  const {
    component: { instance },
  } = render(IsoTriangle, {
    projection: 10,
  })

  expect(instance.projection).toEqual(10)
})
test('reversed prop', async () => {
  const {
    component: { instance, $set },
  } = render(IsoTriangle, {
    reversed: true,
  })

  expect(instance.isReversed).toEqual(true)

  $set({ reversed: false })
  await tick()

  expect(instance.isReversed).toEqual(false)
})
