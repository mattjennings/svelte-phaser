<script>
  import Phaser from 'phaser'
  import {
    onMount,
    getContext,
    setContext,
    createEventDispatcher,
  } from 'svelte'
  import { addInstance, shouldApplyProps } from './util'
  import { applyAlpha, applyScale, applyTint } from './props/index'

  const dispatch = createEventDispatcher()

  export let accumulator = undefined
  export let active = undefined
  export let align = undefined
  export let alpha = undefined
  export let alphaBottomLeft = undefined
  export let alphaBottomRight = undefined
  export let alphaTopLeft = undefined
  export let alphaTopRight = undefined
  export let angle = undefined
  export let animation = undefined
  export let blendMode = undefined
  export let data = undefined
  export let defaultPipeline = undefined
  export let delay = undefined
  export let depth = undefined
  export let displayHeight = undefined
  export let displayOriginX = undefined
  export let displayOriginY = undefined
  export let displayWidth = undefined
  export let duration = undefined
  export let flipX = undefined
  export let flipY = undefined
  export let forward = undefined
  export let frame = undefined
  export let frameRate = undefined
  export let height = undefined
  export let isPlaying = undefined
  export let mask = undefined
  export let msPerFrame = undefined
  export let name = undefined
  export let originX = undefined
  export let originY = undefined
  export let progress = undefined
  export let renderFlags = undefined
  export let repeat = undefined
  export let repeatDelay = undefined
  export let rotation = undefined
  export let scale = undefined
  export let scaleX = undefined
  export let scaleY = undefined
  export let scrollFactorX = undefined
  export let scrollFactorY = undefined
  export let skipMissedFrames = undefined
  export let stopAfterDelay = undefined
  export let stopOnFrame = undefined
  export let tabIndex = undefined
  export let texture = undefined
  export let timeScale = undefined
  export let tint = undefined
  export let tintBottomLeft = undefined
  export let tintBottomRight = undefined
  export let tintFill = undefined
  export let tintTopLeft = undefined
  export let tintTopRight = undefined
  export let useAdvancedWordWrap = undefined
  export let visible = undefined
  export let w = undefined
  export let width = undefined
  export let wordWrap = undefined
  export let x = undefined
  export let y = undefined
  export let yoyo = undefined
  export let z = undefined

  const scene = getContext('phaser/scene')

  export let instance = new Phaser.GameObjects.Sprite(
    scene,
    x,
    y,
    texture,
    frame
  )

  setContext('phaser/game-object', instance)

  if (!scene.children.exists(instance)) {
    addInstance(instance)

    const createEventHandler = event =>
      instance.on(event, (...args) => dispatch(event, args))

    createEventHandler('animationstart')
    createEventHandler('animationcomplete')
    createEventHandler('animationrestart')
    createEventHandler('animationrepeat')
    onMount(() => () => instance.destroy())
  }

  $: shouldApplyProps(texture) && instance.setTexture(texture)
  $: shouldApplyProps(frame) && instance.setFrame(frame)
  $: {
    if (shouldApplyProps(animation)) {
      const ignoreIfPlaying =
        instance.anims.currentAnim &&
        instance.anims.currentAnim.key === animation
      instance.anims.play(animation, ignoreIfPlaying, 0)
    }
  }
  $: shouldApplyProps(active) && instance.setActive(active)
  $: shouldApplyProps(align) && instance.setAlign(align)
  $: {
    applyAlpha(instance, {
      alpha,
      alphaBottomLeft,
      alphaBottomRight,
      alphaTopLeft,
      alphaTopRight,
    })
  }
  $: shouldApplyProps(angle) && instance.setAngle(angle)
  $: shouldApplyProps(blendMode) && instance.setBlendMode(blendMode)
  $: shouldApplyProps(data) && instance.setData(data)
  $: shouldApplyProps(defaultPipeline) &&
    (instance.defaultPipeline = defaultPipeline)
  $: shouldApplyProps(depth) && instance.setDepth(depth)
  $: {
    if (shouldApplyProps(displayHeight) || shouldApplyProps(displayWidth)) {
      instance.setDisplaySize(displayWidth, displayHeight)
    }
  }
  $: {
    if (shouldApplyProps(displayOriginX) || shouldApplyProps(displayOriginY)) {
      instance.setDisplayOrigin(displayOriginX, displayOriginY)
    }
  }
  $: shouldApplyProps(flipX) && instance.setFlipX(flipX)
  $: shouldApplyProps(flipY) && instance.setFlipY(flipY)
  $: shouldApplyProps(frame) && (instance.frame = frame)
  $: {
    if (shouldApplyProps(height) || shouldApplyProps(width)) {
      instance.setSize(width, height)
    }
  }
  $: shouldApplyProps(mask) && instance.setMask(mask)
  $: shouldApplyProps(name) && instance.setName(name)
  $: {
    if (shouldApplyProps(originX) || shouldApplyProps(originY)) {
      instance.setOrigin(originX, originY)
    }
  }
  $: shouldApplyProps(renderFlags) && (instance.renderFlags = renderFlags)
  $: shouldApplyProps(rotation) && instance.setRotation(rotation)
  $: applyScale(instance, { scale, scaleX, scaleY })
  $: {
    if (shouldApplyProps(scrollFactorX) || shouldApplyProps(scrollFactorY)) {
      instance.setScrollFactor(scrollFactorX, scrollFactorY)
    }
  }
  $: shouldApplyProps(tabIndex) && (instance.tabIndex = tabIndex)
  $: applyTint(instance, {
    tint,
    tintBottomLeft,
    tintBottomRight,
    tintTopLeft,
    tintTopRight,
    tintFill,
  })
  $: shouldApplyProps(visible) && instance.setVisible(visible)
  $: shouldApplyProps(w) && instance.setW(w)
  $: shouldApplyProps(wordWrap, useAdvancedWordWrap) &&
    instance.setWordWrapWidth(wordWrap, useAdvancedWordWrap)

  $: shouldApplyProps(x) && instance.setX(x)
  $: shouldApplyProps(y) && instance.setY(y)
  $: shouldApplyProps(z) && instance.setZ(z)

  // animation props
  $: shouldApplyProps(accumulator) && (instance.accumulator = accumulator)
  $: {
    if (shouldApplyProps(animation)) {
      const ignoreIfPlaying =
        instance.anims.currentAnim &&
        instance.anims.currentAnim.key === animation
      instance.anims.play(animation, ignoreIfPlaying, 0)
    }
  }
  $: shouldApplyProps(delay) && instance.setDelay(delay)
  $: shouldApplyProps(duration) && (instance.anims.duration = duration)
  $: shouldApplyProps(forward) && (instance.anims.forward = forward)
  $: shouldApplyProps(frameRate) && (instance.anims.frameRate = frameRate)
  $: shouldApplyProps(isPlaying) && (instance.anims.isPlaying = isPlaying)
  $: shouldApplyProps(msPerFrame) && (instance.anims.msPerFrame = msPerFrame)
  $: shouldApplyProps(skipMissedFrames) &&
    (instance.anims.skipMissedFrames = skipMissedFrames)
  $: shouldApplyProps(progress) && instance.anims.setProgress(progress)
  $: shouldApplyProps(stopOnFrame) && instance.anims.stopOnFrame(stopOnFrame)
  $: shouldApplyProps(stopAfterDelay) &&
    instance.anims.stopAfterDelay(stopAfterDelay)
  $: shouldApplyProps(repeat) && instance.anims.setRepeat(repeat)
  $: shouldApplyProps(repeatDelay) && instance.anims.setRepeatDelay(repeatDelay)
  $: shouldApplyProps(timeScale) && instance.anims.setTimeScale(timeScale)
  $: shouldApplyProps(yoyo) && instance.anims.setYoyo(yoyo)
</script>

<slot />
