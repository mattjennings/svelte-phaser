import { shouldApplyProps } from '../util/shouldApplyProps'

export function applyScale(instance, { scale, scaleX, scaleY }) {
  if (shouldApplyProps(scale) && scale !== instance.scale) {
    instance.setScale(scale)
  } else if (
    shouldApplyProps(scaleX, scaleY) &&
    (scaleX !== instance.scaleX || scaleY !== instance.scaleY)
  ) {
    instance.setScale(scaleX, scaleY)
  }
}
