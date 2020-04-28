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

  $: shouldApplyProps(acceleration) &&
    instance.body.setAcceleration(acceleration)
  $: shouldApplyProps(accelerationX) &&
    instance.body.setAccelerationX(accelerationX)
  $: shouldApplyProps(accelerationY) &&
    instance.body.setAccelerationY(accelerationY)

  $: shouldApplyProps(angularAcceleration) &&
    instance.body.setAngularAcceleration(angularAcceleration)
  $: shouldApplyProps(angularDrag) && instance.body.setAngularDrag(angularDrag)
  $: shouldApplyProps(angularVelocity) &&
    instance.body.setAngularVelocity(angularVelocity)

  $: shouldApplyProps(bounce) && instance.body.setBounce(bounce)
  $: shouldApplyProps(bounceX) && instance.body.setBounceX(bounceX)
  $: shouldApplyProps(bounceY) && instance.body.setBounceY(bounceY)

  $: shouldApplyProps(collideWorldBounds) &&
    instance.body.setCollideWorldBounds(collideWorldBounds)
  $: if (shouldApplyProps(debugBodyColor, debugShowBody, debugShowVelocity)) {
    instance.body.debugBodyColor = debugBodyColor
    instance.body.debugShowBody = debugShowBody
    instance.body.debugShowVelocity = debugShowVelocity
  }

  $: shouldApplyProps(drag) && instance.body.setDrag(drag)
  $: shouldApplyProps(dragX) && instance.body.setDragX(dragX)
  $: shouldApplyProps(dragY) && instance.body.setDragY(dragY)

  $: shouldApplyProps(damping) && instance.body.setDamping(damping)

  $: shouldApplyProps(friction) && instance.body.setFriction(friction)
  $: shouldApplyProps(frictionX) && instance.body.setFrictionX(frictionX)
  $: shouldApplyProps(frictionY) && instance.body.setFrictionY(frictionY)

  $: shouldApplyProps(gravity) && instance.body.setGravity(gravity)
  $: shouldApplyProps(gravityX) && instance.body.setGravityX(gravityX)
  $: shouldApplyProps(gravityY) && instance.body.setGravityY(gravityY)

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

  $: if (shouldApplyProps(maxVelocityX, maxVelocityY)) {
    instance.body.setMaxVelocity(maxVelocityX || 0, maxVelocityY || 0)
  } else if (shouldApplyProps(maxVelocity)) {
    instance.body.setMaxVelocity(maxVelocity)
  }

  $: shouldApplyProps(velocityX) && instance.body.setVelocityX(velocityX)
  $: shouldApplyProps(velocityY) && instance.body.setVelocityY(velocityY)
  $: shouldApplyProps(velocity) && instance.body.setVelocity(velocity)

  onGameEvent('prestep', () => {
    accelerationX = instance.body.acceleration.x
    accelerationY = instance.body.acceleration.y
    allowDrag = instance.body.allowDrag
    allowRotation = instance.body.allowRotation
    allowGravity = instance.body.allowGravity
    angularAcceleration = instance.body.angularAcceleration
    angularDrag = instance.body.angularDrag
    angularVelocity = instance.body.angularVelocity
    bounceX = instance.body.bounce.x
    bounceY = instance.body.bounce.y
    circle = instance.body.circle
    collideWorldBounds = instance.body.collideWorldBounds
    damping = instance.body.damping
    dragX = instance.body.drag.x
    dragY = instance.body.drag.y
    frictionX = instance.body.friction.x
    frictionY = instance.body.friction.y
    gravityX = instance.body.gravity.x
    gravityY = instance.body.gravity.y
    immovable = instance.body.immovable
    mass = instance.body.mass
    maxVelocityX = instance.body.maxVelocity.x
    maxVelocityY = instance.body.maxVelocity.y
    offsetX = instance.body.offset.x
    offsetX = instance.body.offset.y
    onWorldBounds = instance.body.onWorldBounds
    size = instance.body.size
    velocityX = instance.body.velocity.x
    velocityY = instance.body.velocity.y

    // conditionally bind to the "helper" props for Vector2 only if they were provided
    // (otherwise, it would cause them to be used on the next step and override the specific x/y prop)
    if (shouldApplyProps(acceleration)) {
      acceleration =
        instance.body.acceleration.x || instance.body.acceleration.y
    }
    if (shouldApplyProps(bounce)) {
      bounce = instance.body.bounce.x || instance.body.bounce.y
    }
    if (shouldApplyProps(drag)) {
      drag = instance.body.drag.x || instance.body.drag.y
    }
    if (shouldApplyProps(friction)) {
      friction = instance.body.friction.x || instance.body.friction.y
    }
    if (shouldApplyProps(gravity)) {
      gravity = instance.body.gravity.x || instance.body.gravity.y
    }
    if (shouldApplyProps(gravity)) {
      maxVelocity = instance.body.maxVelocity.x || instance.body.maxVelocity.y
    }
    if (shouldApplyProps(velocity)) {
      velocity = instance.body.velocity.x || instance.body.velocity.y
    }
  })
</script>

<slot />
