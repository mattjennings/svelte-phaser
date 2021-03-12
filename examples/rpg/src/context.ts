import type Phaser from 'phaser'
import { getContext } from 'svelte'
import type { Writable } from 'svelte/store'

export interface SceneComponent {
  component: any
  key?: string
  transition?: TransitionConfig
  props?: Record<string, any>
}

export interface TransitionConfig
  extends Omit<
    Phaser.Types.Scenes.SceneTransitionConfig,
    'target' | 'onUpdate'
  > {
  onUpdate: (scene: Phaser.Scene, progress: number) => void
}
export interface RouterContext {
  scenes: SceneComponent[]
  go: (scene: SceneComponent | SceneComponent[]) => string[]
  add: (scene: SceneComponent | SceneComponent[]) => string[]
  remove: (key: string | string[]) => void
}

export function getRouter(): Writable<RouterContext> {
  return getContext('router')
}
