import { render } from '@testing-library/svelte'
import { tick, getContext } from 'svelte'
import Camera from './Camera.svelte'
import { createGame } from './test-utils'
import { findGameObjectsByName } from './util/findGameObjectsByName'

jest.mock('svelte', () => ({
  ...jest.requireActual('svelte'),
  getContext: jest.fn(),
}))

jest.mock('./util/findGameObjectsByName')

const baseProps = {
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  bounds: { x: 0, y: 0, width: 512, height: 256 },
}

let scene

beforeAll(async () => {
  const setup = await createGame()

  scene = setup.scene
  getContext.mockImplementation((name) => {
    switch (name) {
      case 'phaser/scene':
        return scene
      case 'phaser/game':
        return setup.game
    }
  })
})

afterEach(() => {
  // scene.cameras.main.destroy()
})

test('alpha props', async () => {
  const {
    component: { instance },
  } = render(Camera, {
    ...baseProps,
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

test('bounds props', async () => {
  const {
    component: { instance, $set },
  } = render(Camera, {
    ...baseProps,
  })

  jest.spyOn(instance, 'setBounds')

  $set({ bounds: { x: 100, y: 0, width: 512, height: 256, centerOn: true } })
  await tick()

  expect(instance.setBounds).toHaveBeenCalledWith(100, 0, 512, 256, true)
})

test('effects props', async () => {
  const {
    component: { instance },
  } = render(Camera, {
    ...baseProps,
    fadeEffect: 1,
    flashEffect: 2,
    panEffect: 3,
    shakeEffect: 4,
    zoomEffect: 5,
  })

  expect(instance.fadeEffect).toEqual(1)
  expect(instance.flashEffect).toEqual(2)
  expect(instance.panEffect).toEqual(3)
  expect(instance.shakeEffect).toEqual(4)
  expect(instance.zoomEffect).toEqual(5)
})

test('flip props', async () => {
  const {
    component: { instance },
  } = render(Camera, {
    ...baseProps,
    flipX: true,
    flipY: true,
  })

  expect(instance.flipX).toEqual(true)
  expect(instance.flipY).toEqual(true)
})

describe('follow', () => {
  test('follow with object reference', async () => {
    const target = { something: 'something' }

    const {
      component: { instance, $set },
    } = render(Camera, {
      ...baseProps,
    })

    jest.spyOn(instance, 'startFollow')

    $set({
      follow: target,
    })

    await tick()

    expect(instance.startFollow).toHaveBeenCalledWith(
      target,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    )
  })

  test('follow with all parameters', async () => {
    const target = { something: 'something' }

    findGameObjectsByName.mockImplementation(() => [target])

    const {
      component: { instance, $set },
    } = render(Camera, {
      ...baseProps,
    })

    jest.spyOn(instance, 'startFollow')

    $set({
      follow: 'something',
      roundPixels: true,
      lerp: {
        x: 1,
        y: 2,
      },
      followOffsetX: 5,
      followOffsetY: 6,
    })

    await tick()

    expect(instance.startFollow).toHaveBeenCalledWith(target, true, 1, 2, 5, 6)
  })

  test('follow with string reference', async () => {
    const target = { something: 'something' }

    findGameObjectsByName.mockImplementation(() => [target])

    const {
      component: { instance, $set },
    } = render(Camera, {
      ...baseProps,
    })

    jest.spyOn(instance, 'startFollow')

    $set({
      follow: 'something',
    })

    await tick()

    expect(instance.startFollow).toHaveBeenCalledWith(
      target,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    )
  })

  test('follow offset', async () => {
    const {
      component: { instance },
    } = render(Camera, {
      ...baseProps,
      followOffsetX: 1,
      followOffsetY: 2,
    })

    expect(instance.followOffset.x).toEqual(1)
    expect(instance.followOffset.y).toEqual(2)
  })
})

test('makeMain', async () => {
  jest.spyOn(scene.cameras, 'addExisting')
  const {
    component: { instance },
  } = render(Camera, {
    ...baseProps,
    makeMain: true,
  })

  expect(scene.cameras.addExisting).toHaveBeenCalledWith(instance, true)
})

test('roundPixels', async () => {
  const {
    component: { instance },
  } = render(Camera, {
    ...baseProps,
    roundPixels: true,
  })

  expect(instance.roundPixels).toEqual(true)
})

test('origin props', async () => {
  const {
    component: { instance },
  } = render(Camera, {
    ...baseProps,
    originX: 0.5,
    originY: 0.75,
  })

  expect(instance.originX).toEqual(0.5)
  expect(instance.originY).toEqual(0.75)
})

test('width/height', async () => {
  const {
    component: { instance },
  } = render(Camera, {
    ...baseProps,
    width: 10,
    height: 10,
  })

  expect(instance.width).toEqual(10)
  expect(instance.height).toEqual(10)
})

test('tint props', async () => {
  const {
    component: { instance, $set },
  } = render(Camera, { ...baseProps })

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

test('visible props', async () => {
  const {
    component: { instance },
  } = render(Camera, {
    ...baseProps,
    visible: false,
  })

  expect(instance.visible).toEqual(false)
})
