import type Phaser from 'phaser'
import { getContext } from 'svelte'

export function getCamera(): Phaser.Cameras.Scene2D.Camera {
  return getContext('phaser/camera')
}
