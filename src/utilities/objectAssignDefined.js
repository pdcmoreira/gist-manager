import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'

export const objectAssignDefined = (target, ...args) => {
  if (!target) {
    return
  }

  return Object.assign(target, ...args.map((arg) => omitBy(arg, isUndefined)))
}
