import { getContext } from 'svelte'
import type Phaser from 'phaser'

export function getTilemap(): Phaser.Tilemaps.Tilemap {
  return getContext('phaser/tilemap')
}
