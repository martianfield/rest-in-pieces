'use strict'

const UsersDAO = require(__dirname + '/users.js').UsersDAO
const objects = {}

const init = (db) => {
  objects['users'] = new UsersDAO(db)
}

module.exports.init = init
module.exports.O = objects