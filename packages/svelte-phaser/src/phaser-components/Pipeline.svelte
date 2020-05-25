<script>
  import { getGameObject } from '../getGameObject'
  import { onGameEvent } from '../onGameEvent'
  import { shouldApplyProps } from '../util'

  /**
   * Sets the active WebGL Pipeline of this Game Object.
   * @type {string}
   */
  export let pipeline = undefined

  const instance = getGameObject()

  $: shouldApplyProps(pipeline) && instance.setPipeline(pipeline)

  onGameEvent('prestep', () => {
    pipeline = instance.pipeline
  })
</script>
