import { getContext } from 'svelte'

export function getSceneRouter() {
  return getContext('phaser/scene-router')
}
