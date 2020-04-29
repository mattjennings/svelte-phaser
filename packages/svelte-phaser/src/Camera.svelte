<script>
  // import * as Phaser from 'phaser'
  import Phaser from 'phaser'
  import { getScene } from './getScene'
  import { setContext } from 'svelte'
  import { shouldApplyProps, findGameObjectsByName } from './util'
  import { onSceneEvent } from './onSceneEvent'

  export let makeMain = true
  export let x
  export let y
  export let width
  export let height
  export let follow

  export let instance = new Phaser.Cameras.Scene2D.Camera(x, y, width, height)

  const scene = getScene()
  console.log(scene.cameras)
  console.log(instance)
  setContext('phaser/camera', instance)

  // by using the Camera component we are opting-in to controlling the camera
  // ourselves, so we will destroy the one that came with the Scene
  if (scene.cameras.main.__isOriginalCamera) {
    const oldCamera = scene.cameras.main
    scene.cameras.remove(oldCamera)
    oldCamera.destroy()
  }

  scene.cameras.addExisting(instance, makeMain)

  $: window.scene = scene
  $: if (shouldApplyProps(follow)) {
    const target =
      typeof follow.target === 'string'
        ? findGameObjectsByName(scene, follow.target)[0]
        : target

    if (target) {
      instance.startFollow(
        target,
        follow.roundPixels,
        follow.lerpX,
        follow.lerpY,
        follow.offsetX,
        follow.offsetY
      )
    }
  }

  onSceneEvent('CHILD_ADDED', object => {
    if (object.name && follow && follow.target === object.name) {
      follow = {
        ...follow,
      }
    }
  })
</script>

<slot />
