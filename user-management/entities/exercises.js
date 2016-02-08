'use strict'

const router = require('express').Router()
const Schema = require('iceworm').Schema
const snowflea = require('snowflea')
const jwt = require('jsonwebtoken')
const settings = require('setthings').settings
const helper = require(__dirname + '/../lib/helper')
const user_schema = require(__dirname + '/users').schema

// the schema
let schema = new Schema(
  {
    name: '*string',
    description: '*string'
  },
  {
    collection:'exercises',
    access: {
      'read':['user']
    }
  }
)

const user_admin = "facebook.56b7b2c3e4cf56e928ebe7cb"
const user_normal = "google.56b7b2c3e4cf56e928ebe7cb"

const user_current = user_admin

// the router
router.get('/', (req, res) => {
  snowflea.read({"id":user_current}, user_schema)
    .then((result) => {
      // TODO check if the user exists
      let user = result[0]
      // check if user has role
      let hasAccess = helper.roleMatch(user.roles, schema.options.access.read)

      if(!hasAccess) {
        throw new Error("no access")
      }
      // get users
      return snowflea.read({}, schema)
    })
    .then(result => {
      res.status(200).json(result)
    })
    .catch((err) => {
      //res.status(200).send("error")
      res.status(422).send(err.message)
    })
})

module.exports.router = router
