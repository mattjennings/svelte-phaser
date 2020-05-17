import { render } from '@testing-library/svelte'
import { tick, getContext } from 'svelte'
import TileSprite from './TileSprite.svelte'
import { createGame } from './test-utils'

jest.mock('svelte', () => ({
  ...jest.requireActual('svelte'),
  getContext: jest.fn(),
}))

beforeAll(async () => {
  const { game, scene } = await createGame()

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
  } = render(TileSprite, {
    alphaBottomLeft: 0.1,
    alphaBottomRight: 0.2,
    alphaTopLeft: 0.3,
    alphaTopRight: 0.4,
  })

  expect(instance.alphaBottomLeft).toEqual(0.1)
  expect(instance.alphaBottomRight).toEqual(0.2)
  expect(instance.alphaTopLeft).toEqual(0.3)
  expect(instance.alphaTopRight).toEqual(0.4)
})

test('blendMode props', async () => {
  const {
    component: { instance },
  } = render(TileSprite, {
    blendMode: Phaser.BlendModes.COLOR,
  })

  expect(instance.blendMode).toEqual(Phaser.BlendModes.COLOR)
})

test('depth props', async () => {
  const {
    component: { instance },
  } = render(TileSprite, {
    depth: 10,
  })

  expect(instance.depth).toEqual(10)
})

test('flip props', async () => {
  const {
    component: { instance },
  } = render(TileSprite, {
    flipX: true,
    flipY: true,
  })

  expect(instance.flipX).toEqual(true)
  expect(instance.flipY).toEqual(true)
})

test('mask props', async () => {
  // getContext is mocked, so we can use that outside of svelte
  const mask = new Phaser.Display.Masks.BitmapMask(getContext('phaser/scene'))

  const {
    component: { instance },
  } = render(TileSprite, {
    mask,
  })

  expect(instance.mask).toEqual(mask)
})

describe('origin', () => {
  test('origin props', async () => {
    const {
      component: { instance },
    } = render(TileSprite, {
      originX: 0.5,
      originY: 0.75,
    })

    expect(instance.originX).toEqual(0.5)
    expect(instance.originY).toEqual(0.75)
  })

  test('displayOrigin props', async () => {
    const {
      component: { instance },
    } = render(TileSprite, {
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
  } = render(TileSprite, {
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
    } = render(TileSprite, {
      width: 10,
      height: 10,
    })

    expect(instance.width).toEqual(10)
    expect(instance.height).toEqual(10)
  })

  test('display width/height', async () => {
    const {
      component: { instance },
    } = render(TileSprite, {
      displayHeight: 100,
      displayWidth: 100,
    })

    expect(instance.displayHeight).toEqual(100)
    expect(instance.displayWidth).toEqual(100)
  })
})

test('texture props', async () => {
  const {
    component: { instance, $set },
  } = render(TileSprite)

  const setTexture = jest.spyOn(instance, 'setTexture')
  const setFrame = jest.spyOn(instance, 'setFrame')

  $set({ texture: 't', frame: 'f' })
  await tick()

  expect(setTexture).toHaveBeenCalledWith('t')
  expect(setFrame).toHaveBeenCalledWith('f', true, true)
})

test('tint props', async () => {
  const {
    component: { instance, $set },
  } = render(TileSprite)

  const setTint = jest.spyOn(instance, 'setTint')

  $set({
    tintTopLeft: 1,
    tintTopRight: 2,
    tintBottomLeft: 3,
    tintBottomRight: 4,
    tintFill: 100,
  })
  await tick()

  expect(setTint).toHaveBeenCalledWith(1, 2, 3, 4, 100)
})

test('transform props', async () => {
  const {
    component: { instance, $set },
  } = render(TileSprite, {
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

test('visible props', async () => {
  const {
    component: { instance },
  } = render(TileSprite, {
    visible: false,
  })

  expect(instance.visible).toEqual(false)
})
