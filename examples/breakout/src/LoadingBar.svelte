<script>
  import Phaser from 'phaser'
  import { onMount } from 'svelte'
  import { Game, Scene, Rectangle } from 'svelte-phaser'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'

  const barWidth = 400

  export let x
  export let y
  export let progress

  const tweenedProgress = tweened(progress, {
    duration: 50,
    easing: cubicOut,
  })

  $: $tweenedProgress = progress
</script>

<Rectangle
  width={barWidth}
  height={50}
  fillColor={0x777777}
  cornerRadius={10}
  {x}
  {y}
  {...$$restProps}>
  <Rectangle
    {x}
    {y}
    width={Phaser.Math.Clamp(barWidth * $tweenedProgress, 10, barWidth)}
    height={50}
    cornerRadius={10}
    fillColor={0xbbbbbb} />
</Rectangle>
