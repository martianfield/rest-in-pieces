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

  /**
   * Returns a user by id
   * @param id
   * @returns {Promise}
   */
  this.oneById = function(id) {
    return this.db.collection('users').find({"id":id}).limit(1).next()
  }

}

module.exports.UsersDAO = UsersDAO