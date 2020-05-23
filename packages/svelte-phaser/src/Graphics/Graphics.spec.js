import { render } from '@testing-library/svelte'
import { tick, getContext } from 'svelte'
import Graphics from './Graphics.svelte'
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

test('alpha props', async () => {
  const {
    component: { instance },
  } = render(Graphics, {
    alpha: 0.5,
  })

  expect(instance.alpha).toEqual(0.5)
})

test('default style props', async () => {
  const {
    component: { instance },
  } = render(Graphics, {
    fillAlpha: 0.5,
    fillColor: 2,
    strokeAlpha: 3,
    strokeColor: 4,
    strokeWidth: 5,
  })

  expect(instance.defaultFillAlpha).toEqual(0.5)
  expect(instance.defaultFillColor).toEqual(2)
  expect(instance.defaultStrokeAlpha).toEqual(3)
  expect(instance.defaultStrokeColor).toEqual(4)
  expect(instance.defaultStrokeWidth).toEqual(5)
})

test('blendMode props', async () => {
  const {
    component: { instance },
  } = render(Graphics, {
    blendMode: Phaser.BlendModes.COLOR,
  })

  expect(instance.blendMode).toEqual(Phaser.BlendModes.COLOR)
})

test('depth props', async () => {
  const {
    component: { instance },
  } = render(Graphics, {
    depth: 10,
  })

  expect(instance.depth).toEqual(10)
})

test('draggable props', async () => {
  const {
    component: { instance, $set },
  } = render(Graphics, {
    interactive: { shape: new Phaser.Geom.Rectangle(0, 0, 10, 10) },
  })

  jest.spyOn(scene.input, 'setDraggable')
  $set({ draggable: true })
  await tick()

  expect(scene.input.setDraggable).toHaveBeenCalledWith(instance, true)
  $set({ draggable: false })
  await tick()

  expect(scene.input.setDraggable).toHaveBeenCalledWith(instance, false)
})

test('mask props', async () => {
  // getContext is mocked, so we can use that outside of svelte
  const mask = new Phaser.Display.Masks.BitmapMask(getContext('phaser/scene'))

  const {
    component: { instance },
  } = render(Graphics, {
    mask,
  })

  expect(instance.mask).toEqual(mask)
})

test('scrollFactor props', async () => {
  const {
    component: { instance },
  } = render(Graphics, {
    scrollFactorX: 0.5,
    scrollFactorY: 0.75,
  })

  expect(instance.scrollFactorX).toEqual(0.5)
  expect(instance.scrollFactorY).toEqual(0.75)
})

test('texture props', async () => {
  const {
    component: { instance, $set },
  } = render(Graphics)

  const setTexture = jest.spyOn(instance, 'setTexture')

  $set({ texture: 't', frame: 'f', blendMode: 1 })
  await tick()

  expect(setTexture).toHaveBeenCalledWith('t', 'f', 1)
})

test('transform props', async () => {
  const {
    component: { instance, $set },
  } = render(Graphics, {
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

test('visible props', async () => {
  const {
    component: { instance },
  } = render(Graphics, {
    visible: false,
  })

  expect(instance.visible).toEqual(false)
})
