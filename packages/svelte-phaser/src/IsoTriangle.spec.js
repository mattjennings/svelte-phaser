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

test('alpha props', async () => {
  const {
    component: { instance },
  } = render(IsoTriangle, {
    alpha: 1,
  })

  expect(instance.alpha).toEqual(1)
})

test('blendMode props', async () => {
  const {
    component: { instance },
  } = render(IsoTriangle, {
    blendMode: Phaser.BlendModes.COLOR,
  })

  expect(instance.blendMode).toEqual(Phaser.BlendModes.COLOR)
})

test('depth props', async () => {
  const {
    component: { instance },
  } = render(IsoTriangle, {
    depth: 10,
  })

  expect(instance.depth).toEqual(10)
})

test('draggable props', async () => {
  const {
    component: { instance, $set },
  } = render(IsoTriangle, {})

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
  } = render(IsoTriangle, {
    mask,
  })

  expect(instance.mask).toEqual(mask)
})

describe('origin', () => {
  test('origin props', async () => {
    const {
      component: { instance },
    } = render(IsoTriangle, {
      originX: 0.5,
      originY: 0.75,
    })

    expect(instance.originX).toEqual(0.5)
    expect(instance.originY).toEqual(0.75)
  })

  test('displayOrigin props', async () => {
    const {
      component: { instance },
    } = render(IsoTriangle, {
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
  } = render(IsoTriangle, {
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
    } = render(IsoTriangle, {
      size: 10,
      height: 20,
    })

    expect(instance.width).toEqual(10)
    expect(instance.height).toEqual(20)
  })

  test('display width/height', async () => {
    const {
      component: { instance },
    } = render(IsoTriangle, {
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
  } = render(IsoTriangle, {
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
  } = render(IsoTriangle, {
    visible: false,
  })

  expect(instance.visible).toEqual(false)
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
