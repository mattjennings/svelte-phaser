<script>
  import Graphics from './Graphics.svelte'

  export let x
  export let y
  export let width
  export let height
  export let cornerRadius = 0

  export let instance = undefined

  $: instance &&
    (cornerRadius
      ? instance.fillRoundedRect(x, y, width, height, cornerRadius)
      : instance.fillRect(x, y, width, height))
</script>

<Graphics bind:instance bind:x bind:y {...$$restProps} />
