import Phaser from 'phaser'
import { waitFor } from '@testing-library/svelte'

export async function createGame(config = {}) {
  const onSceneCreate = jest.fn()
  const game = new Phaser.Game({
    type: Phaser.HEADLESS,
    banner: false,
    scene: {
      create: onSceneCreate,
    },

    ...config,
  })

  await waitFor(() => {
    if (!game.isRunning) {
      throw 'Game not ready'
    }

    // i can't figure out which event is emitted when a scene is ready (without loader), so this works for now
    if (onSceneCreate.mock.calls.length === 0) {
      throw 'Scene not ready'
    }
  })

  return { game, scene: game.scene.scenes[0] }
}
