<script>
  import Phaser from 'phaser'
  import { onMount, getContext } from 'svelte'
  import { shouldApplyProps } from './util'
  import { onGameEvent } from './onGameEvent'

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
    (instance.body.allowGravity = allowGravity)

  $: shouldApplyProps(allowDrag) && (instance.body.allowDrag = allowDrag)

  $: shouldApplyProps(allowRotation) &&
    (instance.body.allowRotation = allowRotation)

  $: if (shouldApplyProps(acceleration)) {
    if (
      acceleration !== instance.body.acceleration.x ||
      acceleration !== instance.body.acceleration.y
    ) {
      instance.body.setAcceleration(acceleration, acceleration)
    }
  }

  $: shouldApplyProps(accelerationX) &&
    accelerationX !== instance.body.accelerationX &&
    instance.body.setAccelerationX(accelerationX)

  $: shouldApplyProps(accelerationY) &&
    accelerationY !== instance.body.accelerationY &&
    instance.body.setAccelerationY(accelerationY)

  $: shouldApplyProps(angularAcceleration) &&
    angularAcceleration !== instance.body.angularAcceleration &&
    instance.body.setAngularAcceleration(angularAcceleration)

  $: shouldApplyProps(angularDrag) &&
    angularDrag !== instance.body.angularDrag &&
    instance.body.setAngularDrag(angularDrag)

  $: shouldApplyProps(angularVelocity) &&
    angularVelocity !== instance.body.angularVelocity &&
    instance.body.setAngularVelocity(angularVelocity)

  $: if (shouldApplyProps(bounce)) {
    if (
      bounce !== instance.body.bounce.x ||
      bounce !== instance.body.bounce.y
    ) {
      instance.body.setBounce(bounce, bounce)
    }
  }

  $: shouldApplyProps(bounceX) &&
    bounceX !== instance.body.bounce.x &&
    instance.body.setBounceX(bounceX)

  $: shouldApplyProps(bounceY) &&
    bounceY !== instance.body.bounce.y &&
    instance.body.setBounceY(bounceY)

  $: shouldApplyProps(collideWorldBounds) &&
    collideWorldBounds !== instance.body.collideWorldBounds &&
    instance.body.setCollideWorldBounds(collideWorldBounds)

  $: if (shouldApplyProps(debugBodyColor, debugShowBody, debugShowVelocity)) {
    instance.body.debugBodyColor = debugBodyColor
    instance.body.debugShowBody = debugShowBody
    instance.body.debugShowVelocity = debugShowVelocity
  }

  $: if (shouldApplyProps(drag)) {
    if (drag !== instance.body.drag.x || drag !== instance.body.drag.y) {
      instance.body.setDrag(drag, drag)
    }
  }

  $: shouldApplyProps(dragX) &&
    dragX !== instance.body.drag.x &&
    instance.body.setDragX(dragX)

  $: shouldApplyProps(dragY) &&
    dragY !== instance.body.drag.y &&
    instance.body.setDragY(dragY)

  $: shouldApplyProps(damping) &&
    damping !== instance.body.damping &&
    instance.body.setDamping(damping)

  $: if (shouldApplyProps(friction)) {
    if (
      friction !== instance.body.friction.x ||
      friction !== instance.body.friction.y
    ) {
      instance.body.setFriction(friction, friction)
    }
  }

  $: shouldApplyProps(frictionX) &&
    frictionX !== instance.body.friction.x &&
    instance.body.setFrictionX(frictionX)

  $: shouldApplyProps(frictionY) &&
    frictionY !== instance.body.friction.y &&
    instance.body.setFrictionY(frictionY)

  $: if (shouldApplyProps(gravity)) {
    if (
      gravity !== instance.body.gravity.x ||
      gravity !== instance.body.gravity.y
    ) {
      instance.body.setGravity(gravity, gravity)
    }
  }

  $: shouldApplyProps(gravityX) &&
    gravityX !== instance.body.gravity.x &&
    instance.body.setGravityX(gravityX)

  $: shouldApplyProps(gravityY) &&
    gravityY !== instance.body.gravity.y &&
    instance.body.setGravityY(gravityY)

  $: shouldApplyProps(immovable) && (instance.body.immovable = immovable)

  $: shouldApplyProps(mass) &&
    immovable !== instance.body.immovable &&
    instance.body.setImmovable(mass)

  $: if (shouldApplyProps(size)) {
    if (
      size.width !== instance.body.width ||
      size.height !== instance.body.height ||
      size.center !== instance.body.center
    ) {
      instance.body.setSize(size.width, size.height, size.center)
    }
  }

  $: if (shouldApplyProps(circle)) {
    if (
      circle.radius !== instance.body.radius ||
      circle.offsetX !== instance.body.offsetX ||
      circle.offsetY !== instance.body.offsetY
    ) {
      instance.body.setCircle(circle.radius, circle.offsetX, circle.offsetY)
    }
  }

  $: if (shouldApplyProps(offsetX, offsetY)) {
    if (
      offsetX !== instance.body.offsetX ||
      offsetY !== instance.body.offsetY
    ) {
      instance.body.setOffset(offsetX || 0, offsetY || 0)
    }
  }

  $: shouldApplyProps(onWorldBounds) &&
    (instance.body.onWorldBounds = onWorldBounds)

  $: if (shouldApplyProps(maxVelocityX, maxVelocityY)) {
    if (
      maxVelocityX !== instance.body.maxVelocity.x ||
      maxVelocityY !== instance.body.maxVelocity.y
    ) {
      instance.body.setMaxVelocity(maxVelocityX || 0, maxVelocityY || 0)
    }
  } else if (shouldApplyProps(maxVelocity)) {
    if (
      maxVelocity !== instance.body.maxVelocity.x ||
      maxVelocity !== instance.body.maxVelocity.y
    ) {
      instance.body.setMaxVelocity(maxVelocity)
    }
  }

  $: if (shouldApplyProps(velocity)) {
    if (
      velocity !== instance.body.velocity.x ||
      velocity !== instance.body.velocity.y
    ) {
      instance.body.setVelocity(velocity, velocity)
    }
  }

  $: shouldApplyProps(velocityX) &&
    velocityX !== instance.body.velocity.x &&
    instance.body.setVelocityX(velocityX)
  $: shouldApplyProps(velocityY) &&
    velocityY !== instance.body.velocity.y &&
    instance.body.setVelocityY(velocityY)

  onGameEvent('prestep', () => {
    if (instance.body) {
      if (instance.body.acceleration) {
        accelerationX = instance.body.acceleration.x
        accelerationY = instance.body.acceleration.y
      }
      allowDrag = instance.body.allowDrag
      allowRotation = instance.body.allowRotation
      allowGravity = instance.body.allowGravity
      angularAcceleration = instance.body.angularAcceleration
      angularDrag = instance.body.angularDrag
      angularVelocity = instance.body.angularVelocity
      if (instance.body.bounce) {
        bounceX = instance.body.bounce.x
        bounceY = instance.body.bounce.y
      }
      circle = instance.body.circle
      collideWorldBounds = instance.body.collideWorldBounds
      damping = instance.body.damping
      if (instance.body.drag) {
        dragX = instance.body.drag.x
        dragY = instance.body.drag.y
      }
      if (instance.body.friction) {
        frictionX = instance.body.friction.x
        frictionY = instance.body.friction.y
      }
      if (instance.body.gravity) {
        gravityX = instance.body.gravity.x
        gravityY = instance.body.gravity.y
      }
      immovable = instance.body.immovable
      mass = instance.body.mass
      if (instance.body.maxVelocity) {
        maxVelocityX = instance.body.maxVelocity.x
        maxVelocityY = instance.body.maxVelocity.y
      }
      if (instance.body.offset) {
        offsetX = instance.body.offset.x
        offsetX = instance.body.offset.y
      }
      onWorldBounds = instance.body.onWorldBounds
      size = instance.body.size
      if (instance.body.velocity) {
        velocityX = instance.body.velocity.x
        velocityY = instance.body.velocity.y
      }

      // conditionally bind to the "helper" props for Vector2 only if they were provided
      // (otherwise, it would cause them to be used on the next step and override the specific x/y prop)
      if (shouldApplyProps(acceleration) && instance.body.acceleration) {
        acceleration =
          instance.body.acceleration.x || instance.body.acceleration.y
      }
      if (shouldApplyProps(bounce) && instance.body.bounce) {
        bounce = instance.body.bounce.x || instance.body.bounce.y
      }
      if (shouldApplyProps(drag) && instance.body.drag) {
        drag = instance.body.drag.x || instance.body.drag.y
      }
      if (shouldApplyProps(friction) && instance.body.friction) {
        friction = instance.body.friction.x || instance.body.friction.y
      }
      if (shouldApplyProps(gravity) && instance.body.gravity) {
        gravity = instance.body.gravity.x || instance.body.gravity.y
      }
      if (shouldApplyProps(maxVelocity) && instance.body.maxVelocity) {
        maxVelocity = instance.body.maxVelocity.x || instance.body.maxVelocity.y
      }
      if (shouldApplyProps(velocity) && instance.body.velocity) {
        velocity = instance.body.velocity.x || instance.body.velocity.y
      }
    }
  })
</script>

<slot />
