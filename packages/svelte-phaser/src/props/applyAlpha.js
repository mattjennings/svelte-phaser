import { shouldApplyProps } from '../util/shouldApplyProps'

export function applyAlpha(
  instance,
  { alpha, alphaTopLeft, alphaTopRight, alphaBottomLeft, alphaBottomRight }
) {
  if (shouldApplyProps(alpha) && alpha !== instance.alpha) {
    instance.setAlpha(alpha)
  } else if (
    shouldApplyProps(
      alphaTopLeft,
      alphaTopRight,
      alphaBottomLeft,
      alphaBottomRight
    )
  ) {
    if (
      alphaTopLeft !== instance.alphaTopLeft ||
      alphaTopRight !== instance.alphaTopRight ||
      alphaBottomLeft !== instance.alphaBottomLeft ||
      alphaBottomRight !== instance.alphaBottomRight
    ) {
      instance.setAlpha(
        alphaTopLeft,
        alphaTopRight,
        alphaBottomLeft,
        alphaBottomRight
      )
    }
  }
}
