import type Phaser from 'phaser'
import { getContext } from 'svelte'

export function getRouter(): {
  currentScene: Phaser.Scene
  previousScene: Phaser.Scene
  set: (scene: Phaser.Scene) => any
  pop: () => any
  push: (scene: Phaser.Scene, config?: any) => any
} {
  return getContext('router')
}
