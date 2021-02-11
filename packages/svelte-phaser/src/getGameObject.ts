import type Phaser from 'phaser'
import { getContext } from 'svelte'

export function getGameObject<T = Phaser.GameObjects.GameObject>(): T {
  return getContext('phaser/game-object')
}
