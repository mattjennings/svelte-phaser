import { render } from '@testing-library/svelte'
import { tick, getContext } from 'svelte'
import Star from './Star.svelte'
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

const commonProps = {
  points: [
    {
      x: 0,
      y: 0,
    },
    {
      x: 10,
      y: 10,
    },
  ],
}
test('alpha props', async () => {
  const {
    component: { instance },
  } = render(Star, {
    ...commonProps,
    alpha: 1,
  })

  expect(instance.alpha).toEqual(1)
})

test('blendMode props', async () => {
  const {
    component: { instance },
  } = render(Star, {
    ...commonProps,
    blendMode: Phaser.BlendModes.COLOR,
  })

  expect(instance.blendMode).toEqual(Phaser.BlendModes.COLOR)
})

test('depth props', async () => {
  const {
    component: { instance },
  } = render(Star, {
    ...commonProps,
    depth: 10,
  })

  expect(instance.depth).toEqual(10)
})

test('draggable props', async () => {
  const {
    component: { instance, $set },
  } = render(Star, {
    ...commonProps,
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
  } = render(Star, {
    ...commonProps,
    mask,
  })

  expect(instance.mask).toEqual(mask)
})

describe('origin', () => {
  test('origin props', async () => {
    const {
      component: { instance },
    } = render(Star, {
      ...commonProps,
      originX: 0.5,
      originY: 0.75,
    })

    expect(instance.originX).toEqual(0.5)
    expect(instance.originY).toEqual(0.75)
  })

  test('displayOrigin props', async () => {
    const {
      component: { instance },
    } = render(Star, {
      ...commonProps,
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
  } = render(Star, {
    ...commonProps,
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
    } = render(Star, {
      ...commonProps,
      width: 10,
      height: 10,
    })

    expect(instance.width).toEqual(10)
    expect(instance.height).toEqual(10)
  })

  test('display width/height', async () => {
    const {
      component: { instance },
    } = render(Star, {
      ...commonProps,
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
  } = render(Star, {
    ...commonProps,
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
  } = render(Star, {
    ...commonProps,
    visible: false,
  })

  expect(instance.visible).toEqual(false)
})

test('style props', () => {
  const {
    component: { instance },
  } = render(Star, {
    ...commonProps,
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

test('points prop', () => {
  const {
    component: { instance },
  } = render(Star, {
    points: 10,
  })

  expect(instance._points).toEqual(10)
})
