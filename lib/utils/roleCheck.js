module.exports = function (target, roles) {
  if (Array.isArray(roles)) {
    let r = []
    if (typeof target === 'string') {
      r = target.split(',')
    } else if (Array.isArray(target)) {
      r = target
    }

    return r.some((role) => {
      return roles.indexOf(role) !== -1
    })
  }
}