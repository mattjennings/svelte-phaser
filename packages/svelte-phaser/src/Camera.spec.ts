import { render } from '@testing-library/svelte'
import { tick, getContext } from 'svelte'
import Camera from './Camera.svelte'
import { createGame, asMock } from './test-utils'
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
  asMock(getContext).mockImplementation((name) => {
    switch (name) {
      case 'phaser/scene':
        return scene
      case 'phaser/game':
        return setup.game
    }
  })
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

    // @ts-ignore
    asMock(findGameObjectsByName).mockImplementation(() => [target])

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

    // @ts-ignore
    asMock(findGameObjectsByName).mockImplementation(() => [target])

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
