'use strict'

const MongoClient = require('mongodb').MongoClient

function UsersDAO(database) {
  console.log("Users DataAccessObject initialized")
  this.db = database

  // returns a promise
  this.all = function() {
    return this.db.collection('users').find({}).toArray()
  }
}

module.exports.UsersDAO = UsersDAO