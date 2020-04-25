<script>
  import Phaser from 'phaser'
  import { onMount, getContext } from 'svelte'
  import { addInstance } from './util'

  const scene = getContext('phaser/scene')

  export let text = ''
  export let x = undefined
  export let y = undefined
  export let style = undefined

  export let instance = new Phaser.GameObjects.Text(scene, x, y, text, style)

  if (!scene.children.exists(instance)) {
    addInstance(instance)
    onMount(() => () => instance.destroy())
  }

  $: instance.setX(x)
  $: instance.setY(y)
  $: instance.setText(text)
  $: instance.setStyle(style)
</script>

<slot />
