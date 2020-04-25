import { shouldApplyProps } from '../util/shouldApplyProps'

export function applyScale(instance, { scale, scaleX, scaleY }) {
  if (shouldApplyProps(scale)) {
    instance.setScale(scale)
  } else if (shouldApplyProps(scaleX, scaleY)) {
    instance.setScale(scaleX, scaleY)
  }
}
