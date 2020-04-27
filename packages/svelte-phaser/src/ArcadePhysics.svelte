<script>
  import Phaser from 'phaser'
  import { onMount, getContext } from 'svelte'
  import { shouldApplyProps } from './util'

  export let acceleration = undefined
  export let accelerationX = undefined
  export let accelerationY = undefined
  export let allowDrag = undefined
  export let allowGravity = undefined
  export let allowRotation = undefined
  export let angularAcceleration = undefined
  export let angularDrag = undefined
  export let angularVelocity = undefined
  export let bodyType = 'dynamic'
  export let bounce = undefined
  export let bounceX = undefined
  export let bounceY = undefined
  export let circle = undefined
  export let collideWorldBounds = undefined
  export let damping = undefined
  export let debugBodyColor = undefined
  export let debugShowBody = undefined
  export let debugShowVelocity = undefined
  export let drag = undefined
  export let dragX = undefined
  export let dragY = undefined
  export let friction = undefined
  export let frictionX = undefined
  export let frictionY = undefined
  export let gravity = undefined
  export let gravityX = undefined
  export let gravityY = undefined
  export let immovable = undefined
  export let mass = undefined
  export let maxVelocity = undefined
  export let maxVelocityX = undefined
  export let maxVelocityY = undefined
  export let offsetX = undefined
  export let offsetY = undefined
  export let onWorldBounds = undefined
  export let size = undefined
  export let velocity = undefined
  export let velocityX = undefined
  export let velocityY = undefined

  const scene = getContext('phaser/scene')
  const instance = getContext('phaser/game-object')

  scene.physics.world.enable(
    instance,
    bodyType === 'static'
      ? Phaser.Physics.Arcade.STATIC_BODY
      : Phaser.Physics.Arcade.DYNAMIC_BODY
  )

  onMount(() => {
    return () => {
      if (scene.children.exists(instance)) {
        scene.physics.world.disable(instance)
      }
    }
  })

  $: shouldApplyProps(allowGravity) &&
    instance.body.setAllowGravity(allowGravity)
  $: shouldApplyProps(allowDrag) && instance.body.setAllowDrag(allowDrag)
  $: shouldApplyProps(allowRotation) &&
    instance.body.allowRotation(allowRotation)

  $: if (shouldApplyProps(acceleration)) {
    instance.body.setAcceleration(acceleration)
  } else {
    if (shouldApplyProps(accelerationX)) {
      instance.body.setAccelerationX(accelerationX)
    }
    if (shouldApplyProps(accelerationY)) {
      instance.body.setAccelerationY(accelerationY)
    }
  }

  $: shouldApplyProps(angularAcceleration) &&
    instance.body.setAngularAcceleration(angularAcceleration)
  $: shouldApplyProps(angularDrag) && instance.body.setAngularDrag(angularDrag)
  $: shouldApplyProps(angularVelocity) &&
    instance.body.setAngularVelocity(angularVelocity)

  $: if (shouldApplyProps(bounce)) {
    instance.body.setBounce(bounce)
  } else {
    if (shouldApplyProps(bounceX)) {
      instance.body.setBounceX(bounceX)
    }
    if (shouldApplyProps(bounceY)) {
      instance.body.setBounceY(bounceY)
    }
  }

  $: shouldApplyProps(collideWorldBounds) &&
    instance.body.setCollideWorldBounds(collideWorldBounds)
  $: if (shouldApplyProps(debugBodyColor, debugShowBody, debugShowVelocity)) {
    instance.body.debugBodyColor = debugBodyColor
    instance.body.debugShowBody = debugShowBody
    instance.body.debugShowVelocity = debugShowVelocity
  }

  $: if (shouldApplyProps(drag)) {
    instance.body.setDrag(drag)
  } else {
    if (shouldApplyProps(dragX)) {
      instance.body.setDragX(dragX)
    }
    if (shouldApplyProps(dragY)) {
      instance.body.setDragY(dragY)
    }
  }

  $: shouldApplyProps(damping) && instance.body.setDamping(damping)
  $: if (shouldApplyProps(friction)) {
    instance.body.setFriction(friction)
  } else {
    if (shouldApplyProps(frictionX)) {
      instance.body.setFrictionX(frictionX)
    }
    if (shouldApplyProps(frictionY)) {
      instance.body.setFrictionY(frictionY)
    }
  }

  $: if (shouldApplyProps(gravity)) {
    instance.body.setGravity(gravity)
  } else {
    if (shouldApplyProps(gravityX)) {
      instance.body.setGravityX(gravityX)
    }
    if (shouldApplyProps(gravityY)) {
      instance.body.setGravityY(gravityY)
    }
  }

  $: shouldApplyProps(immovable) && (instance.body.immovable = immovable)
  $: shouldApplyProps(mass) && instance.body.setImmovable(mass)

  $: shouldApplyProps(size) &&
    instance.body.setSize(size.width, size.height, size.center)

  $: shouldApplyProps(circle) &&
    instance.body.setCircle(circle.radius, circle.offsetX, circle.offsetY)

  $: shouldApplyProps(offsetX, offsetY) &&
    instance.body.setOffset(offsetX || 0, offsetY || 0)

  $: shouldApplyProps(onWorldBounds) &&
    (instance.body.onWorldBounds = onWorldBounds)

  $: if (shouldApplyProps(maxVelocity)) {
    instance.body.setMaxVelocity(maxVelocity)
  } else if (shouldApplyProps(maxVelocityX, maxVelocityY)) {
    instance.body.setMaxVelocity(maxVelocityX || 0, maxVelocityY || 0)
  }

  $: if (shouldApplyProps(velocity)) {
    instance.body.setVelocity(velocity)
  } else {
    if (shouldApplyProps(velocityX)) {
      instance.body.setVelocityX(velocityX)
    }
    if (shouldApplyProps(velocityY)) {
      instance.body.setVelocityY(velocityY)
    }
  }
</script>

<slot />
