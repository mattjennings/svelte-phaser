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
  export let autoRound = undefined
  export let backgroundColor = undefined
  export let baselineX = undefined
  export let baselineY = undefined
  export let blendMode = undefined
  export let color = undefined
  export let data = undefined
  export let defaultPipeline = undefined
  export let depth = undefined
  export let displayHeight = undefined
  export let displayOriginX = undefined
  export let displayOriginY = undefined
  export let displayWidth = undefined
  export let fixedHeight = undefined
  export let fixedWidth = undefined
  export let flipX = undefined
  export let flipY = undefined
  export let fontFamily = undefined
  export let fontSize = undefined
  export let fontStyle = undefined
  export let frame = undefined
  export let height = undefined
  export let lineSpacing = undefined
  export let mask = undefined
  export let maxLines = undefined
  export let metrics = undefined
  export let name = undefined
  export let originX = undefined
  export let originY = undefined
  export let padding = undefined
  export let renderFlags = undefined
  export let resolution = undefined
  export let rotation = undefined
  export let rtl = undefined
  export let scale = undefined
  export let scaleX = undefined
  export let scaleY = undefined
  export let scrollFactorX = undefined
  export let scrollFactorY = undefined
  export let shadow = undefined
  export let splitRegExp = undefined
  export let stroke = undefined
  export let strokeThickness = undefined
  export let style = undefined
  export let tabIndex = undefined
  export let testString = undefined
  export let text = ''
  export let tint = undefined
  export let tintBottomLeft = undefined
  export let tintBottomRight = undefined
  export let tintFill = undefined
  export let tintTopLeft = undefined
  export let tintTopRight = undefined
  export let visible = undefined
  export let w = undefined
  export let width = undefined
  export let wordWrap = undefined
  export let useAdvancedWordWrap = undefined
  export let x = undefined
  export let y = undefined
  export let z = undefined

  const scene = getContext('phaser/scene')

  export let instance = new Phaser.GameObjects.Text(scene, x, y, text, style)

  setContext('phaser/game-object', instance)

  if (!scene.children.exists(instance)) {
    addInstance(instance)
    onMount(() => () => instance.destroy())
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
  $: shouldApplyProps(autoRound) && (instance.autoRound = autoRound)
  $: shouldApplyProps(backgroundColor) &&
    instance.setBackgroundColor(backgroundColor)
  $: shouldApplyProps(baselineX) && (instance.baselineX = baselineX)
  $: shouldApplyProps(baselineY) && (instance.baselineY = baselineY)
  $: shouldApplyProps(blendMode) && instance.setBlendMode(blendMode)
  $: shouldApplyProps(color) && instance.setColor(color)
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
  $: {
    if (shouldApplyProps(fixedWidth) || shouldApplyProps(fixedHeight)) {
      instance.setFixedSize(fixedWidth, fixedHeight)
    }
  }
  $: shouldApplyProps(flipX) && instance.setFlipX(flipX)
  $: shouldApplyProps(flipY) && instance.setFlipY(flipY)
  $: shouldApplyProps(fontFamily) && instance.setFontFamily(fontFamily)
  $: shouldApplyProps(fontSize) && instance.setFontSize(fontSize)
  $: shouldApplyProps(fontStyle) && instance.setFontStyle(fontStyle)
  $: shouldApplyProps(frame) && (instance.frame = frame)
  $: {
    if (shouldApplyProps(height) || shouldApplyProps(width)) {
      instance.setSize(width, height)
    }
  }
  $: shouldApplyProps(lineSpacing) && instance.setLineSpacing(lineSpacing)
  $: shouldApplyProps(mask) && instance.setMask(mask)
  $: shouldApplyProps(maxLines) && instance.setMaxLines(maxLines)
  $: shouldApplyProps(metrics) && (instance.metrics = metrics)
  $: shouldApplyProps(name) && instance.setName(name)
  $: {
    if (shouldApplyProps(originX) || shouldApplyProps(originY)) {
      instance.setOrigin(originX, originY)
    }
  }
  $: shouldApplyProps(padding) && instance.setPadding(padding)
  $: shouldApplyProps(renderFlags) && (instance.renderFlags = renderFlags)
  $: shouldApplyProps(resolution) && instance.setResolution(resolution)
  $: shouldApplyProps(rotation) && instance.setRotation(rotation)
  $: shouldApplyProps(rtl) && (instance.rtl = rtl)
  $: applyScale(instance, { scale, scaleX, scaleY })
  $: {
    if (shouldApplyProps(scrollFactorX) || shouldApplyProps(scrollFactorY)) {
      instance.setScrollFactor(scrollFactorX, scrollFactorY)
    }
  }
  $: shouldApplyProps(shadow) &&
    instance.setShadow(
      shadow.x,
      shadow.y,
      shadow.color,
      shadow.blur,
      shadow.stroke,
      shadow.fill
    )
  $: shouldApplyProps(splitRegExp) && (instance.splitRegExp = splitRegExp)
  $: {
    if (shouldApplyProps(stroke) || shouldApplyProps(strokeThickness)) {
      instance.setStroke(stroke, strokeThickness)
    }
  }
  $: shouldApplyProps(tabIndex) && (instance.tabIndex = tabIndex)
  $: shouldApplyProps(testString) && (instance.testString = testString)
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
  $: shouldApplyProps(text) && instance.setText(text)
</script>

<slot />
