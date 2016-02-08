'use strict'

const roleMatch = (userRoles, targetRoles) => {
  let result = false
  userRoles.forEach(userRole => {
    targetRoles.forEach(targetRole => {
      if(targetRole === userRole) {
        result = true
      }
    })
  })
  return result
}


module.exports.roleMatch = roleMatch