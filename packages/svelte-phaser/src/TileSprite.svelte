<script>
  import Phaser from 'phaser'
  import { onMount, getContext, setContext } from 'svelte'
  import { addInstance, shouldApplyProps } from './util'
  import { applyAlpha, applyScale, applyTint } from './props/index'

  export let active = undefined
  export let align = undefined
  export let alpha = undefined
  export let alphaBottomLeft = undefined
  export let alphaBottomRight = undefined
  export let alphaTopLeft = undefined
  export let alphaTopRight = undefined
  export let angle = undefined
  export let blendMode = undefined
  export let data = undefined
  export let defaultPipeline = undefined
  export let depth = undefined
  export let displayHeight = undefined
  export let displayOriginX = undefined
  export let displayOriginY = undefined
  export let displayWidth = undefined
  export let flipX = undefined
  export let flipY = undefined
  export let frame = undefined
  export let height = undefined
  export let mask = undefined
  export let name = undefined
  export let originX = undefined
  export let originY = undefined
  export let renderFlags = undefined
  export let rotation = undefined
  export let scale = undefined
  export let scaleX = undefined
  export let scaleY = undefined
  export let scrollFactorX = undefined
  export let scrollFactorY = undefined
  export let tabIndex = undefined
  export let texture
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
  export let z = undefined
  export let tilePositionX = undefined
  export let tilePositionY = undefined
  export let tileScaleX = undefined
  export let tileScaleY = undefined

  const scene = getContext('phaser/scene')

  export let instance = new Phaser.GameObjects.TileSprite(
    scene,
    x,
    y,
    width,
    height,
    texture,
    frame
  )

  setContext('phaser/game-object', instance)

  if (!scene.children.exists(instance)) {
    addInstance(instance)
    onMount(() => () => instance.destroy())
  }

  $: shouldApplyProps(texture) && instance.setTexture(texture)
  $: shouldApplyProps(frame) && instance.setFrame(frame)
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
  $: shouldApplyProps(tilePositionX) && (instance.tilePositionX = tilePositionX)
  $: shouldApplyProps(tilePositionY) && (instance.tilePositionY = tilePositionY)
  $: shouldApplyProps(tileScaleX) && (instance.tileScaleX = tileScaleX)
  $: shouldApplyProps(tileScaleY) && (instance.tileScaleY = tileScaleY)

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
</script>

<slot />
