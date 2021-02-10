import type Phaser from 'phaser'
import { getContext } from 'svelte'

export function getScene(): Phaser.Scene {
  return getContext('phaser/scene')
}
