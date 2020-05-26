import { render } from '@testing-library/svelte'
import { tick, getContext } from 'svelte'
import Text from './Text.svelte'
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

test('style props', async () => {
  const {
    component: { instance },
  } = render(Text, {
    text: 'test',
    color: 'white',
    backgroundColor: 'green',
    fixedHeight: 20,
    fixedWidth: 30,
    fontFamily: 'Arial',
    fontSize: 10,
    fontStyle: 'italic',
    rtl: true,
    shadow: {
      x: 1,
      y: 2,
      color: 'blue',
      blur: 3,
      stroke: 4,
      fill: 'red',
    },
    wordWrap: 100,
    useAdvancedWordWrap: true,
  })

  expect(instance.style.color).toEqual('white')
  expect(instance.style.backgroundColor).toEqual('green')
  expect(instance.style.fixedHeight).toEqual(20)
  expect(instance.style.fixedWidth).toEqual(30)
  expect(instance.style.fontFamily).toEqual('Arial')
  expect(instance.style.fontSize).toEqual('10px')
  expect(instance.style.fontStyle).toEqual('italic')
  expect(instance.style.rtl).toEqual(true)
  expect(instance.style.shadowOffsetX).toEqual(1)
  expect(instance.style.shadowOffsetY).toEqual(2)
  expect(instance.style.shadowColor).toEqual('blue')
  expect(instance.style.shadowBlur).toEqual(3)
  expect(instance.style.shadowStroke).toEqual(4)
  expect(instance.style.shadowFill).toEqual('red')
  expect(instance.style.wordWrapWidth).toEqual(100)
  expect(instance.style.wordWrapUseAdvanced).toEqual(true)
})
