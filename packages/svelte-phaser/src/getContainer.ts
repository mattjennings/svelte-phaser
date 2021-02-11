import type Phaser from 'phaser'
import { getContext } from 'svelte'

export function getContainer(): Phaser.GameObjects.Container {
  return getContext('phaser/container')
}
