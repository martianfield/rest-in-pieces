/*
 addAdmin
 - makeAdmin 56b7b29b9b4ef7e0289ca293
 */



'use strict'

const _ = require('lodash')
const set = require('setthings').set
const settings = require('setthings').settings
const MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectId
const DA = require(__dirname + '/data_access/DA')

// settings
set('mongo.uri', 'mongodb://localhost:27017/restinpieces')
set('jwt.secret', 'doubledoubletoilandtrouble')

// connect to database, create entity objects
let database = null
MongoClient.connect(settings.mongo.uri)
  .then(db => {
    database = db
    console.log("successfully connected to mongo db")
    // initialize data access objects
    console.log("initializing data access objects")
    DA.init(db)
    // parse
    return parse()
  })
  .then(cmd => {
    return cmd.run(cmd.value)
  })
  .then((message) => {
    console.log("message:", message)
    database.close()
  })
  .catch(err => {
    console.error(err.message)
    database.close()
  })

function parse() {
  return new Promise((resolve, reject) => {
    let args = process.argv.slice(2)
    if(args.length < 2) {
      reject(new Error("not enough parameters"))
    }
    else {

      let funcs = {'makeAdmin': makeAdmin}
      if(funcs.hasOwnProperty(args[0])) {
        let command = { run: funcs[args[0]], value: args[1]}
        resolve(command)
      }
      else {
        reject(new Error(`unknown command '${args[0]}'`))
      }
    }
  })
}

function makeAdmin(user_id) {

  return new Promise((resolve, reject) => {
    database.collection('users').find({'_id':ObjectId(user_id)}).limit(1).toArray()
      .then(users => {
        if(users.length > 0) {
          if(new Set(users[0].roles).has("admin") === false ) {
            users[0].roles.push("admin")
          }
          return database.collection('users').updateOne({'_id': ObjectId(user_id)}, {'$set': {roles:users[0].roles}})
        }
        else {
          reject(new Error("user not found"))
        }
      })
      .then(result => {
        resolve("admin role added to user")
      })
      .catch(err => {
        reject(new Error(err.message))
      })
  })

  //return DA.O.users.makeAdmin(user_id)
}