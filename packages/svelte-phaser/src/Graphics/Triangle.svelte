<script>
  import Graphics from './Graphics.svelte'

  export let x1
  export let y1
  export let x2
  export let y2
  export let x3
  export let y3

  export let instance = undefined

  $: instance && instance.fillTriangle(x1, y1, x2, y2, x3, y3)
</script>

<Graphics bind:instance {...$$restProps} />
