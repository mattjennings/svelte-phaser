import { shouldApplyProps } from '../util/shouldApplyProps'

export function applyTint(
  instance,
  { tintTopLeft, tintTopRight, tintBottomLeft, tintBottomRight, tintFill }
) {
  if (
    shouldApplyProps(
      tintTopLeft,
      tintTopRight,
      tintBottomLeft,
      tintBottomRight,
      tintFill
    )
  ) {
    if (
      tintTopLeft !== instance.tintTopLeft ||
      tintTopRight !== instance.tintTopRight ||
      tintBottomLeft !== instance.tintBottomLeft ||
      tintBottomRight !== instance.tintBottomRight
    ) {
      if (tintFill) {
        instance.setTintFill(
          tintTopLeft,
          tintTopRight,
          tintBottomLeft,
          tintBottomRight
        )
      } else {
        instance.setTint(
          tintTopLeft,
          tintTopRight,
          tintBottomLeft,
          tintBottomRight
        )
      }
    }
  }
}
