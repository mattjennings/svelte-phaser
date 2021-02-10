import type Phaser from 'phaser'
import { getContext } from 'svelte'

export function getGame(): Phaser.Game {
  return getContext('phaser/game')
}
