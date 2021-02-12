<script lang="ts">
  import { getGameObject } from '../getGameObject'
  import { shouldApplyProps } from '../util'

  /**
   * Sets the active WebGL Pipeline of this Game Object.
   * @type {string | object}
   */
  export let pipeline:
    | string
    | { name: string; data: object; copy?: boolean } = undefined

  /**
   * The WebGL Post FX Pipelines this Game Object uses for post-render effects.
   * The pipelines are processed in the order in which they appear in this array.
   * @type {Phaser.Renderer.WebGL.Pipelines.PostFXPipeline}
   */
  export let postPipeline: Phaser.Renderer.WebGL.Pipelines.PostFXPipeline[] = undefined

  /**
   * Defaults to the parent game object in Svelte context. If you need to provide
   * the instance yourself, you can do so here.
   */
  export let gameObject = getGameObject<
    Phaser.GameObjects.Components.Pipeline
  >()

  $: if (shouldApplyProps(pipeline)) {
    if (typeof pipeline === 'string') {
      gameObject.setPipeline(pipeline)
    } else {
      gameObject.setPipeline(pipeline.name, pipeline.data, pipeline.copy)
    }
  }

  $: if (shouldApplyProps(postPipeline)) {
    gameObject.setPostPipeline(postPipeline)
  }
</script>
