import { shouldApplyProps } from '../util/shouldApplyProps'

export function applyTint(
  instance,
  { tint, tintTopLeft, tintTopRight, tintBottomLeft, tintBottomRight, tintFill }
) {
  if (shouldApplyProps(tint)) {
    instance.setTint(tint)
  } else if (
    shouldApplyProps(tintTopLeft, tintTopRight, tintBottomLeft, tintBottomRight)
  ) {
    instance.setTint(tintTopLeft, tintTopRight, tintBottomLeft, tintBottomRight)
  }

  if (shouldApplyProps(tintFill)) {
    instance.setTintFill(tintFill)
  }
}
