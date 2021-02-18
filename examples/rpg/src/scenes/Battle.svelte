<script>
  import { Text, Scene, onGameEvent } from 'svelte-phaser'
  import { slide } from 'svelte/transition'
  import { quintOut } from 'svelte/easing'
  import { getRouter } from '../context'

  const router = getRouter()

  let keys
  let exited = false

  function create(scene) {
    keys = {
      space: scene.input.keyboard.addKey('space'),
    }
  }

  function update() {
    if (!exited && Phaser.Input.Keyboard.JustDown(keys.space)) {
      exited = true
      router.pop()
    }
  }
</script>

<Scene {...$$props} {create} {update} />

<!-- <div class="menu" transition:slide={{ easing: quintOut }}>
  <ul>
    <li>Attack</li>
  </ul>
</div> -->
<style>
  .menu {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 20%;
    background: blue;
    border: 3px solid white;
    border-radius: 5px;
    margin: 4px;
    color: white;
  }
</style>
