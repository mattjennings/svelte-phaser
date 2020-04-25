import { shouldApplyProps } from '../util/shouldApplyProps'

export function applyAlpha(
  instance,
  { alpha, alphaTopLeft, alphaTopRight, alphaBottomLeft, alphaBottomRight }
) {
  if (shouldApplyProps(alpha)) {
    instance.setAlpha(alpha)
  } else if (
    shouldApplyProps(
      alphaTopLeft,
      alphaTopRight,
      alphaBottomLeft,
      alphaBottomRight
    )
  ) {
    instance.setAlpha(
      alphaTopLeft,
      alphaTopRight,
      alphaBottomLeft,
      alphaBottomRight
    )
  }
}
