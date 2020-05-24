import { render } from '@testing-library/svelte'
import { tick, getContext } from 'svelte'
import Triangle from './Triangle.svelte'
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
  } = render(Triangle, {
    alpha: 1,
  })

  expect(instance.alpha).toEqual(1)
})

test('blendMode props', async () => {
  const {
    component: { instance },
  } = render(Triangle, {
    blendMode: Phaser.BlendModes.COLOR,
  })

  expect(instance.blendMode).toEqual(Phaser.BlendModes.COLOR)
})

test('depth props', async () => {
  const {
    component: { instance },
  } = render(Triangle, {
    depth: 10,
  })

  expect(instance.depth).toEqual(10)
})

test('draggable props', async () => {
  const {
    component: { instance, $set },
  } = render(Triangle, {})

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
  } = render(Triangle, {
    mask,
  })

  expect(instance.mask).toEqual(mask)
})

describe('origin', () => {
  test('origin props', async () => {
    const {
      component: { instance },
    } = render(Triangle, {
      originX: 0.5,
      originY: 0.75,
    })

    expect(instance.originX).toEqual(0.5)
    expect(instance.originY).toEqual(0.75)
  })

  test('displayOrigin props', async () => {
    const {
      component: { instance },
    } = render(Triangle, {
      displayOriginX: 50,
      displayOriginY: 75,
    })

    expect(instance.displayOriginX).toEqual(50)
    expect(instance.displayOriginY).toEqual(75)
  })
})

test('scrollFactor props', async () => {
  const {
    component: { instance },
  } = render(Triangle, {
    scrollFactorX: 0.5,
    scrollFactorY: 0.75,
  })

  expect(instance.scrollFactorX).toEqual(0.5)
  expect(instance.scrollFactorY).toEqual(0.75)
})

describe('size', () => {
  test('width/height', async () => {
    const {
      component: { instance },
    } = render(Triangle, {
      width: 10,
      height: 10,
    })

    expect(instance.width).toEqual(10)
    expect(instance.height).toEqual(10)
  })

  test('display width/height', async () => {
    const {
      component: { instance },
    } = render(Triangle, {
      displayHeight: 100,
      displayWidth: 100,
    })

    expect(instance.displayHeight).toEqual(100)
    expect(instance.displayWidth).toEqual(100)
  })
})

test('transform props', async () => {
  const {
    component: { instance, $set },
  } = render(Triangle, {
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
  } = render(Triangle, {
    visible: false,
  })

  expect(instance.visible).toEqual(false)
})

test('style props', () => {
  const {
    component: { instance },
  } = render(Triangle, {
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

test('points', () => {
  const {
    component: { instance },
  } = render(Triangle, {
    x1: 1,
    y1: 2,
    x2: 3,
    y2: 4,
    x3: 5,
    y3: 6,
  })

  expect(instance.geom.x1).toEqual(1)
  expect(instance.geom.y1).toEqual(2)
  expect(instance.geom.x2).toEqual(3)
  expect(instance.geom.y2).toEqual(4)
  expect(instance.geom.x3).toEqual(5)
  expect(instance.geom.y3).toEqual(6)
})
