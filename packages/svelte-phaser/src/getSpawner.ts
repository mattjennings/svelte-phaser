import { getContext } from 'svelte'

export interface SpawnerContext {
  spawn: <Props extends { onDestroy: () => any }>(
    component: any,
    props: Props
  ) => void
}

export function getSpawner(): SpawnerContext {
  return getContext('phaser/spawner')
}
