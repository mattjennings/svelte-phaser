<script>
  import Phaser from 'phaser'
  import { onMount, getContext } from 'svelte'
  import { addInstance } from './util'

  export let text = ''
  export let x = undefined
  export let y = undefined
  export let style = undefined

  const scene = getContext('phaser/scene')

  const instance = new Phaser.GameObjects.Text(scene, x, y, text, style)

  addInstance(instance)

  $: instance.setX(x)
  $: instance.setY(y)
  $: instance.setText(text)
  $: instance.setStyle(style)

  onMount(() => instance.destroy)
</script>
