<script>
  import Graphics from './Graphics.svelte'

  export let x
  export let y
  export let radius

  export let instance = undefined

  $: instance && instance.fillCircle(x, y, radius)
</script>

<Graphics bind:instance bind:x bind:y {...$$restProps} />
