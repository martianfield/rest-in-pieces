'use strict'

const UsersDAO = require(__dirname + '/users.js').UsersDAO
const daos = {}

const init = (db) => {
  daos['users'] = new UsersDAO(db)
}

module.exports.init = init
module.exports.daos = daos