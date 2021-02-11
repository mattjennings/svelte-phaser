<svelte:options immutable />

<script lang="ts">
  import Phaser from 'phaser'
  import { onMount, getContext } from 'svelte'
  import { shouldApplyProps } from './util'
  import { onGameEvent } from './onGameEvent'
  import { getScene } from './getScene'
  import { getGameObject } from './getGameObject'

  /**
   * Sets the body's horizontal and vertical acceleration.
   * @type {number}
   */
  export let acceleration: number = undefined

  /**
   * Sets the body's horizontal acceleration
   * @type {number}
   */
  export let accelerationX: number = undefined

  /**
   * Sets the body's vertical acceleration
   * @type {number}
   */
  export let accelerationY: number = undefined

  /**
   * Whether this Body's velocity is affected by its drag.
   *
   * #phaserDefault true
   * @type {boolean}
   */
  export let allowDrag: boolean = undefined

  /**
   * Whether this Body's position is affected by gravity (local or world).
   *
   * #phaserDefault true
   * @type {boolean}
   */
  export let allowGravity: boolean = undefined

  /**
   * Whether this Body's rotation is affected by its angular acceleration and angular velocity.
   *
   * #phaserDefault true
   * @type {boolean}
   */
  export let allowRotation: boolean = undefined

  /**
   * The Body's angular acceleration (change in angular velocity), in degrees per second squared.
   * @type {number}
   */
  export let angularAcceleration: number = undefined

  /**
   * Loss of angular velocity due to angular movement, in degrees per second.
   *
   * Angular drag is applied only when angular acceleration is zero.
   * @type {number}
   */
  export let angularDrag: number = undefined

  /**
   * The rate of change of this Body's rotation, in degrees per second.
   * @type {number}
   */
  export let angularVelocity: number = undefined

  /**
   * The type of physics body it has
   *
   * 'dynamic' is the default, and is synchronized with the game object. It will match the
   * size, angle, origin, scale, etc.
   *
   * 'static' does not move. It can collide with dynamic bodies, but is immovable.
   *
   * @type {'dynamic' | 'static'}
   */
  export let bodyType: 'dynamic' | 'static' = 'dynamic'

  /**
   * Rebound following a collision, relative to 1.
   * @type {number}
   */
  export let bounce: number = undefined

  /**
   * Rebound on X-axis following a collision, relative to 1.
   * @type {number}
   */
  export let bounceX: number = undefined

  /**
   * Rebound on Y-axis following a collision, relative to 1.
   * @type {number}
   */
  export let bounceY: number = undefined

  /**
   * Set the body on a Game Object to a circle.
   *
   * object should contain:
   *
   *  - radius: number
   *  - offsetX: number (optional)
   *  - offsetY: number (optional)
   *
   * @type {object}
   */
  export let circle: {
    radius: number
    offsetX?: number
    offsetY?: number
  } = undefined

  /**
   * Sets whether this Body collides with the world boundary
   *
   * #phaserDefault false
   * @type {boolean}
   */
  export let collideWorldBounds: boolean = undefined

  /**
   * The color of this Body on the debug display.
   * @type {number}
   */
  export let debugBodyColor: number = undefined

  /**
   * Whether the Body's boundary is drawn to the debug display.
   * @type {boolean}
   */
  export let debugShowBody: boolean = undefined

  /**
   * Whether the Body's velocity is drawn to the debug display.
   * @type {boolean}
   */
  export let debugShowVelocity: boolean = undefined

  /**
   * When useDamping is false (the default), this is absolute loss of velocity due to movement,
   * in pixels per second squared (a vector). The x and y components are applied separately.
   *
   * When useDamping is true, this is 1 minus the damping factor (a number). A value of 1 means the Body
   * loses no velocity. A value of 0.95 means the Body loses 5% of its velocity per step.
   * A value of 0.5 means the Body loses 50% of its velocity per step.
   *
   * Drag is applied only when acceleration is zero.
   * @type {number}
   */
  export let drag: number = undefined

  /**
   * Sets drag on X
   * @type {number}
   */
  export let dragX: number = undefined

  /**
   * Sets drag on Y
   * @type {number}
   */
  export let dragY: number = undefined

  /**
   * If this Body is immovable and in motion, friction is the proportion of this Body's motion received
   * by the riding Body on each axis, relative to 1. The horizontal component (x) is applied only when
   * two colliding Bodies are separated vertically. The vertical component (y) is applied
   * only when two colliding Bodies are separated horizontally. The default value (1, 0)
   * moves the riding Body horizontally in equal proportion to this Body and vertically
   * not at all.
   * @type {number}
   */
  export let friction: number = undefined

  /**
   * Sets friction on X
   * @type {number}
   */
  export let frictionX: number = undefined

  /**
   * Sets friction on Y
   * @type {number}
   */
  export let frictionY: number = undefined

  /**
   * Acceleration due to gravity (specific to this Body), in pixels per second squared.
   * Total gravity is the sum of this vector and the simulation's gravity.
   *
   * @type {number}
   */
  export let gravity: number = undefined

  /**
   * Sets the gravity on X
   * @type {number}
   */
  export let gravityX: number = undefined

  /**
   * Sets the gravity on Y
   * @type {number}
   */
  export let gravityY: number = undefined

  /**
   * Whether this Body can be moved by collisions with another Body.
   * @type {boolean}
   */
  export let immovable: boolean = undefined

  /**
   * The Body's inertia, relative to a default unit (1).
   * With bounce, this affects the exchange of momentum (velocities) during collisions.
   * @type {number}
   */
  export let mass: number = undefined

  /**
   * The Body's maximum angular velocity, in degrees per second.
   *
   * #phaserDefault 1000
   * @type {number}
   */
  export let maxAngular: number = undefined

  /**
   * The maximum speed this Body is allowed to reach, in pixels per second.
   *
   * If not negative it limits the scalar value of speed.
   *
   * Any negative value means no maximum is being applied (the default).
   *
   * #phaserDefault -1
   * @type {number}
   */
  export let maxSpeed: number = undefined

  /**
   * The Body's absolute maximum velocity, in pixels per second.
   * The horizontal and vertical components are applied separately.
   * @type {number}
   */
  export let maxVelocity: number = undefined

  /**
   * Sets the max velocity on the X
   * @type {number}
   */
  export let maxVelocityX: number = undefined

  /**
   * Sets the max velocity on the Y
   * @type {number}
   */
  export let maxVelocityY: number = undefined

  /**
   * Sets the X offset of the Body's position from its Game Object's position.
   * @type {number}
   */
  export let offsetX: number = undefined

  /**
   * Sets the Y offset of the Body's position from its Game Object's position.
   * @type {number}
   */
  export let offsetY: number = undefined

  /**
   * Whether the simulation emits a worldbounds event when this Body collides with the world boundary
   * (and collideWorldBounds is also true).
   *
   * The event is emitted on the physics.world. You can access it with
   * `onArcadePhysicsEvent` from svelte-phaser.
   *
   * @type {boolean}
   */
  export let onWorldBounds: boolean = true

  /**
   * The width of the Body in pixels. Cannot be zero.
   * If not given, and the parent Game Object has a frame, it will use the frame width.
   * @type {number}
   */
  export let width: number = undefined

  /**
   * The height of the Body in pixels. Cannot be zero.
   * If not given, and the parent Game Object has a frame, it will use the frame height.
   *
   * @type {number}
   */
  export let height: number = undefined

  /**
   * Modify the Body's offset, placing the Body's center on its Game Object's center.
   * @type {boolean}
   */
  export let center: boolean = true

  /**
   * If this Body is using drag for deceleration this property controls how the drag is applied.
   * If set to true drag will use a damping effect rather than a linear approach.
   * If you are creating a game where the Body moves freely at any angle (i.e. like the way the ship moves in the game Asteroids)
   *  then you will get a far smoother and more visually correct deceleration by using damping,
   * avoiding the axis-drift that is prone with linear deceleration.
   *
   * If you enable this property then you should use far smaller drag values than with linear,
   * as they are used as a multiplier on the velocity.
   * Values such as 0.95 will give a nice slow deceleration, where-as smaller values, such as 0.5
   * will stop an object almost immediately.
   *
   * #phaserDefault false
   * @type {boolean}
   */
  export let useDamping: boolean = undefined

  /**
   * The Body's velocity, in pixels per second.
   * @type {number}
   */
  export let velocity: number = undefined

  /**
   * The Body's velocity on the X, in pixels per second.
   * @type {number}
   */
  export let velocityX: number = undefined

  /**
   * The Body's velocity on the Y, in pixels per second.
   * @type {number}
   */
  export let velocityY: number = undefined

  const scene = getScene()
  const instance = getGameObject<
    Phaser.GameObjects.GameObject & { body: Phaser.Physics.Arcade.Body }
  >()

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

  // this should be before anything else
  $: if (!width && !height && shouldApplyProps(circle)) {
    instance.body.setCircle(circle.radius, circle.offsetX, circle.offsetY)
  }

  // this should be before anything else
  $: if (!circle && shouldApplyProps(width, height, center)) {
    instance.body.setSize(width, height, center)
  }

  $: shouldApplyProps(allowGravity) &&
    (instance.body.allowGravity = allowGravity)

  $: shouldApplyProps(allowDrag) && (instance.body.allowDrag = allowDrag)

  $: shouldApplyProps(allowRotation) &&
    (instance.body.allowRotation = allowRotation)

  $: if (shouldApplyProps(acceleration)) {
    instance.body.setAcceleration(acceleration, acceleration)
  }

  $: shouldApplyProps(accelerationX) &&
    instance.body.setAccelerationX(accelerationX)

  $: shouldApplyProps(accelerationY) &&
    instance.body.setAccelerationY(accelerationY)

  $: shouldApplyProps(angularAcceleration) &&
    instance.body.setAngularAcceleration(angularAcceleration)

  $: shouldApplyProps(angularDrag) && instance.body.setAngularDrag(angularDrag)

  $: shouldApplyProps(angularVelocity) &&
    instance.body.setAngularVelocity(angularVelocity)

  $: if (shouldApplyProps(bounce)) {
    instance.body.setBounce(bounce, bounce)
  }

  $: shouldApplyProps(bounceX) && instance.body.setBounceX(bounceX)

  $: shouldApplyProps(bounceY) && instance.body.setBounceY(bounceY)

  $: shouldApplyProps(collideWorldBounds) &&
    instance.body.setCollideWorldBounds(collideWorldBounds)

  $: if (shouldApplyProps(debugBodyColor, debugShowBody, debugShowVelocity)) {
    instance.body.debugBodyColor = debugBodyColor
    instance.body.debugShowBody = debugShowBody
    instance.body.debugShowVelocity = debugShowVelocity
  }

  $: if (shouldApplyProps(drag)) {
    instance.body.setDrag(drag, drag)
  }

  $: shouldApplyProps(dragX) && instance.body.setDragX(dragX)

  $: shouldApplyProps(dragY) && instance.body.setDragY(dragY)

  $: shouldApplyProps(useDamping) && (instance.body.useDamping = useDamping)

  $: if (shouldApplyProps(friction)) {
    instance.body.setFriction(friction, friction)
  }

  $: shouldApplyProps(frictionX) && instance.body.setFrictionX(frictionX)

  $: shouldApplyProps(frictionY) && instance.body.setFrictionY(frictionY)

  $: if (shouldApplyProps(gravity)) {
    instance.body.setGravity(gravity, gravity)
  }

  $: shouldApplyProps(gravityX) && instance.body.setGravityX(gravityX)

  $: shouldApplyProps(gravityY) && instance.body.setGravityY(gravityY)

  $: shouldApplyProps(immovable) && (instance.body.immovable = immovable)

  $: shouldApplyProps(mass) &&
    mass !== instance.body.mass &&
    instance.body.setMass(mass)

  $: if (shouldApplyProps(offsetX, offsetY)) {
    instance.body.setOffset(
      offsetX || instance.body.offset.x,
      offsetY || instance.body.offset.y
    )
  }

  $: shouldApplyProps(onWorldBounds) &&
    (instance.body.onWorldBounds = onWorldBounds)

  $: shouldApplyProps(maxSpeed) && instance.body.setMaxSpeed(maxSpeed)

  $: shouldApplyProps(maxAngular) && (instance.body.maxAngular = maxAngular)

  $: if (shouldApplyProps(maxVelocityX, maxVelocityY)) {
    instance.body.setMaxVelocity(maxVelocityX || 0, maxVelocityY || 0)
  } else if (shouldApplyProps(maxVelocity)) {
    instance.body.setMaxVelocity(maxVelocity)
  }

  $: if (shouldApplyProps(velocity)) {
    instance.body.setVelocity(velocity, velocity)
  }

  $: shouldApplyProps(velocityX) && instance.body.setVelocityX(velocityX)
  $: shouldApplyProps(velocityY) && instance.body.setVelocityY(velocityY)

  onGameEvent('prestep', () => {
    if (instance.body) {
      allowDrag = instance.body.allowDrag
      allowRotation = instance.body.allowRotation
      allowGravity = instance.body.allowGravity
      angularAcceleration = instance.body.angularAcceleration
      angularDrag = instance.body.angularDrag
      angularVelocity = instance.body.angularVelocity
      useDamping = instance.body.useDamping
      immovable = instance.body.immovable
      mass = instance.body.mass
      onWorldBounds = instance.body.onWorldBounds
      width = instance.body.width
      height = instance.body.height

      if (!!collideWorldBounds !== instance.body.collideWorldBounds) {
        collideWorldBounds = instance.body.collideWorldBounds
      }

      if (shouldApplyProps(accelerationX, accelerationY)) {
        accelerationX = instance.body.acceleration.x
        accelerationY = instance.body.acceleration.y
      }
      if (shouldApplyProps(bounceX, bounceY)) {
        bounceX = instance.body.bounce.x
        bounceY = instance.body.bounce.y
      }
      if (shouldApplyProps(gravityX, gravityY)) {
        gravityX = instance.body.gravity.x
        gravityY = instance.body.gravity.y
      }
      if (shouldApplyProps(dragX, dragY)) {
        // @ts-ignore
        dragX = instance.body.drag.x
        // @ts-ignore
        dragY = instance.body.drag.y
      }
      if (shouldApplyProps(frictionX, frictionY)) {
        frictionX = instance.body.friction.x
        frictionY = instance.body.friction.y
      }
      if (shouldApplyProps(maxVelocityX, maxVelocityY)) {
        maxVelocityX = instance.body.maxVelocity.x
        maxVelocityY = instance.body.maxVelocity.y
      }
      if (shouldApplyProps(offsetX, offsetY)) {
        offsetX = instance.body.offset.x
        offsetY = instance.body.offset.y
      }
      if (shouldApplyProps(velocityX, velocityY)) {
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
        // @ts-ignore
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
