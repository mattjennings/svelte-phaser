import { getGame } from '../getGame'

export function coroutine(callback: () => any) {
  const game = getGame()

  const generator = callback()

  const loopFn = () => {
    const result = generator.next()
    if (result.done) {
      game.events.off('step', loopFn)
    }
  }
  game.events.on('step', loopFn)
}
