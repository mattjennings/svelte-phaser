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

test('renders a sprite', async () => {
  const { component } = render(Sprite, { x: 10 })

  expect(component.instance.x).toEqual(10)
  component.$set({ x: 20 })
  await tick()
  expect(component.instance.x).toEqual(20)
})
