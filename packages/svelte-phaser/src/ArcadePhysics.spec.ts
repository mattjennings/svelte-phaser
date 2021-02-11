import { render } from '@testing-library/svelte'
import { tick, getContext } from 'svelte'
import ArcadePhysics from './ArcadePhysics.svelte'
import { createGame, asMock } from './test-utils'

jest.mock('svelte', () => ({
  ...jest.requireActual('svelte'),
  getContext: jest.fn(),
}))

let game
let scene
let gameObject

beforeAll(async () => {
  const setup = await createGame({ physics: { default: 'arcade' } })
  game = setup.game
  scene = setup.scene
})

beforeEach(() => {
  gameObject = new Phaser.GameObjects.Text(scene, 0, 0, 'blah', {})

  asMock(getContext).mockImplementation((name) => {
    switch (name) {
      case 'phaser/scene':
        return scene
      case 'phaser/game':
        return game
      case 'phaser/game-object':
        return gameObject
    }
  })
})

afterEach(async () => {
  gameObject.destroy()
})

test('acceleration', async () => {
  const {
    component: { $$set },
  } = render(ArcadePhysics, {
    acceleration: 1,
  })

  expect(gameObject.body.acceleration).toEqual({ x: 1, y: 1 })

  $$set({ accelerationX: 2, accelerationY: 3 })
  await tick()

  expect(gameObject.body.acceleration).toEqual({ x: 2, y: 3 })
})

test('angular', async () => {
  const {
    component: { $$set },
  } = render(ArcadePhysics)

  jest.spyOn(gameObject.body, 'setAngularAcceleration')
  jest.spyOn(gameObject.body, 'setAngularDrag')
  jest.spyOn(gameObject.body, 'setAngularVelocity')

  $$set({
    angularAcceleration: 1,
    angularDrag: 1,
    angularVelocity: 1,
  })
  await tick()

  expect(gameObject.body.setAngularAcceleration).toHaveBeenCalledWith(1)
  expect(gameObject.body.setAngularDrag).toHaveBeenCalledWith(1)
  expect(gameObject.body.setAngularVelocity).toHaveBeenCalledWith(1)
})

test('bounce', async () => {
  const {
    component: { $$set },
  } = render(ArcadePhysics, {
    bounce: 1,
  })

  expect(gameObject.body.bounce).toEqual({ x: 1, y: 1 })

  $$set({ bounceX: 2, bounceY: 3 })
  await tick()

  expect(gameObject.body.bounce).toEqual({ x: 2, y: 3 })
})

test('circle', async () => {
  const {
    component: { $$set },
  } = render(ArcadePhysics)

  jest.spyOn(gameObject.body, 'setCircle')
  $$set({
    circle: {
      radius: 5,
      offsetX: 10,
      offsetY: 20,
    },
  })
  await tick()

  expect(gameObject.body.setCircle).toHaveBeenCalledWith(5, 10, 20)
})

test('debug', async () => {
  render(ArcadePhysics, {
    debugBodyColor: 'red',
    debugShowBody: true,
    debugShowVelocity: false,
  })

  expect(gameObject.body.debugBodyColor).toEqual('red')
  expect(gameObject.body.debugShowBody).toEqual(true)
  expect(gameObject.body.debugShowVelocity).toEqual(false)
})

test('drag', async () => {
  const {
    component: { $$set },
  } = render(ArcadePhysics, {
    drag: 1,
  })

  expect(gameObject.body.drag).toEqual({ x: 1, y: 1 })

  $$set({ dragX: 2, dragY: 3 })
  await tick()

  expect(gameObject.body.drag).toEqual({ x: 2, y: 3 })
})

test('friction', async () => {
  const {
    component: { $$set },
  } = render(ArcadePhysics, {
    friction: 1,
  })

  expect(gameObject.body.friction).toEqual({ x: 1, y: 1 })

  $$set({ frictionX: 2, frictionY: 3 })
  await tick()

  expect(gameObject.body.friction).toEqual({ x: 2, y: 3 })
})

test('gravity', async () => {
  const {
    component: { $$set },
  } = render(ArcadePhysics, {
    gravity: 1,
    allowGravity: false,
  })

  jest.spyOn(gameObject.body, 'setAllowGravity')

  expect(gameObject.body.gravity).toEqual({ x: 1, y: 1 })

  $$set({ gravityX: 2, gravityY: 3, allowGravity: true })
  await tick()

  expect(gameObject.body.setAllowGravity).toHaveBeenCalledWith(true)
  expect(gameObject.body.gravity).toEqual({ x: 2, y: 3 })
})

test('immovable', async () => {
  render(ArcadePhysics, {
    immovable: true,
  })

  expect(gameObject.body.immovable).toEqual(true)
})

test('offset', async () => {
  const {
    component: { $$set },
  } = render(ArcadePhysics, {
    offsetX: 5,
    offsetY: 10,
  })

  expect(gameObject.body.offset).toEqual({ x: 5, y: 10 })

  $$set({ offsetY: 15 })
  await tick()

  expect(gameObject.body.offset).toEqual({ x: 5, y: 15 })
})

test('size', async () => {
  render(ArcadePhysics, {
    width: 16,
    height: 32,
  })

  expect(gameObject.body.width).toEqual(16)
  expect(gameObject.body.height).toEqual(32)
})

test('mass', async () => {
  render(ArcadePhysics, {
    mass: 123,
  })

  expect(gameObject.body.mass).toEqual(123)
})

test('maxSpeed', async () => {
  render(ArcadePhysics, {
    maxSpeed: 3,
  })

  expect(gameObject.body.maxSpeed).toEqual(3)
})

test('maxVelocity', async () => {
  render(ArcadePhysics, {
    maxVelocityX: 1,
    maxVelocityY: 2,
  })

  expect(gameObject.body.maxVelocity).toEqual({ x: 1, y: 2 })
})
test('velocity', async () => {
  const {
    component: { $$set },
  } = render(ArcadePhysics, {
    velocity: 1,
  })

  expect(gameObject.body.velocity).toEqual({ x: 1, y: 1 })

  $$set({ velocityX: 2, velocityY: 3 })
  await tick()

  expect(gameObject.body.velocity).toEqual({ x: 2, y: 3 })
})
