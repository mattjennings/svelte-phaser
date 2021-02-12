import { getContext } from 'svelte'

export interface SpawnerContext {
  spawn: (component: any, props: Record<string, any>) => void
}

export function getSpawner(): SpawnerContext {
  return getContext('phaser/spawner')
}
