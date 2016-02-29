'use strict'

const MongoClient = require('mongodb').MongoClient

/**
 * Data access object for users collection
 * @param database
 * @constructor
 */
function UsersDAO(database) {
  console.log("Users DataAccessObject initialized")
  this.db = database

  /**
   * Returns all users
   * @returns {Promise}
   */
  this.all = function() {
    return this.db.collection('users').find({}).toArray()
  }


}

module.exports.UsersDAO = UsersDAO