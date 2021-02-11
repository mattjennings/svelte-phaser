import { render } from '@testing-library/svelte'
import { tick, getContext } from 'svelte'
import Sprite from './Sprite.svelte'
import { createGame, asMock } from './test-utils'

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
  asMock(getContext).mockImplementation((name) => {
    switch (name) {
      case 'phaser/scene':
        return scene
      case 'phaser/game':
        return game
    }
  })
})

test('animation props', async () => {
  const {
    component: { instance, $$set },
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

  expect(instance.anims.delay).toEqual(2)
  expect(instance.anims.duration).toEqual(10)
  expect(instance.anims.forward).toEqual(false)
  expect(instance.anims.isPlaying).toEqual(false)
  expect(instance.anims.msPerFrame).toEqual(100)
  expect(instance.anims.skipMissedFrames).toEqual(false)
  expect(instance.anims.repeat).toEqual(5)
  expect(instance.anims.repeatDelay).toEqual(10)
  expect(instance.anims.timeScale).toEqual(10)
  expect(instance.anims.yoyo).toEqual(true)

  // animation prop
  jest.spyOn(instance.anims, 'play')
  $$set({ animation: 'run' })
  await tick()
  expect(instance.anims.play).toHaveBeenCalledWith('run', true)
})
