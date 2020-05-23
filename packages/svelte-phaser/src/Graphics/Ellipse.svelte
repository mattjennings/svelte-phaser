<script>
  import Graphics from './Graphics.svelte'

  export let x
  export let y
  export let width
  export let height
  export let smoothness = 32

  export let instance = undefined

  $: instance && instance.fillEllipse(x, y, width, height, smoothness)
</script>

<Graphics bind:instance bind:x bind:y {...$$restProps} />
