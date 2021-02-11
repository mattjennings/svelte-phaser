<script lang="ts">
  import { getGameObject } from '../getGameObject'
  import { onGameEvent } from '../onGameEvent'
  import { shouldApplyProps } from '../util'

  /**
   * Sets the active WebGL Pipeline of this Game Object.
   * @type {string}
   */
  export let pipeline: string = undefined

  /**
   * Defaults to the parent game object in Svelte context. If you need to provide
   * the instance yourself, you can do so here.
   */
  export let gameObject = getGameObject<
    Phaser.GameObjects.Components.Pipeline
  >()

  $: shouldApplyProps(pipeline) && gameObject.setPipeline(pipeline)
</script>
