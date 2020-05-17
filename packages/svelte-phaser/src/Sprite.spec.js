import { render } from '@testing-library/svelte'
import { tick, getContext } from 'svelte'
import Sprite from './Sprite.svelte'
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
  } = render(Sprite, {
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

test('animation props', async () => {
  const {
    component: { instance, $set },
  } = render(Sprite, {
    delay: 2,
    duration: 10,
    forward: false,
    isPlaying: false,
    msPerFrame: 100,
    skipMissedFrames: false,
    repeat: 5,
    repeatDelay: 10,
    timeScale: 10,
    yoyo: true,
  })

  expect(instance.anims.getDelay()).toEqual(2)
  expect(instance.anims.duration).toEqual(10)
  expect(instance.anims.forward).toEqual(false)
  expect(instance.anims.isPlaying).toEqual(false)
  expect(instance.anims.msPerFrame).toEqual(100)
  expect(instance.anims.skipMissedFrames).toEqual(false)
  expect(instance.anims.getRepeat()).toEqual(5)
  expect(instance.anims.getRepeatDelay()).toEqual(10)
  expect(instance.anims.getTimeScale()).toEqual(10)
  expect(instance.anims.getYoyo()).toEqual(true)

  // animation prop
  jest.spyOn(instance.anims, 'play')
  $set({ animation: 'run' })
  await tick()
  expect(instance.anims.play).toHaveBeenCalledWith('run', true)
})

test('blendMode props', async () => {
  const {
    component: { instance },
  } = render(Sprite, {
    blendMode: Phaser.BlendModes.COLOR,
  })

  expect(instance.blendMode).toEqual(Phaser.BlendModes.COLOR)
})

test('depth props', async () => {
  const {
    component: { instance },
  } = render(Sprite, {
    depth: 10,
  })

  expect(instance.depth).toEqual(10)
})

test('flip props', async () => {
  const {
    component: { instance },
  } = render(Sprite, {
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
  } = render(Sprite, {
    mask,
  })

  expect(instance.mask).toEqual(mask)
})

describe('origin', () => {
  test('origin props', async () => {
    const {
      component: { instance },
    } = render(Sprite, {
      originX: 0.5,
      originY: 0.75,
    })

    expect(instance.originX).toEqual(0.5)
    expect(instance.originY).toEqual(0.75)
  })

  test('displayOrigin props', async () => {
    const {
      component: { instance },
    } = render(Sprite, {
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
  } = render(Sprite, {
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
    } = render(Sprite, {
      width: 10,
      height: 10,
    })

    expect(instance.width).toEqual(10)
    expect(instance.height).toEqual(10)
  })

  test('display width/height', async () => {
    const {
      component: { instance },
    } = render(Sprite, {
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
  } = render(Sprite)

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
  } = render(Sprite)

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
  } = render(Sprite, {
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
  } = render(Sprite, {
    visible: false,
  })

  expect(instance.visible).toEqual(false)
})
