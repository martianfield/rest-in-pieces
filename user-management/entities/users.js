'use strict'

const router = require('express').Router()
const Schema = require('iceworm').Schema
const snowflea = require('snowflea')
const jwt = require('jsonwebtoken')
const settings = require('setthings').settings

// the schema
let schema = new Schema(
  {
    username: '*string',
    id: '*string',
    auth_service: '*string',
    auth_id: '*string',
    roles: 'string[]',
    email: 'email'
  },
  {
    access: {
      'read':['admin'],
      'write':['admin']
    }
  }
)
snowflea.use(schema, 'users')

let user_schema = schema

const user_admin = "facebook.56b7b2c3e4cf56e928ebe7cb"
const user_normal = "google.56b7b2c3e4cf56e928ebe7cb"

const user_current = user_admin

// the router
router.get('/', (req, res) => {
  user_schema.read({"id":user_current})
    .then((result) => {
      // TODO check if the user exists
      let user = result[0]
      // check if user has role
      let hasAccess = userHasOneRole(user.roles, schema.options.access.read)

      if(!hasAccess) {
        console.log("asshit")
        throw new Error("no access")
      }
      console.log("hello")
      // get users
      return schema.read({})
    })
    .then(result => {
      res.status(200).json(result)
    })
    .catch((err) => {
      //res.status(200).send("error")
      res.status(422).send(err.message)
    })
  /*
  schema.read({})
    .then((result) => {
      result.forEach(r => {
        r.token = jwt.sign({username:r.username}, settings.jwt.secret)
      })
      res.status(200).json(result)
    })
    .catch((err) => {
      res.status(422).json(err)
    })
    */
})

/*
// the router
router.get('/', (req, res) => {
  schema.read({})
    .then((result) => {
      result.forEach(r => {
        r.token = jwt.sign({username:r.username}, settings.jwt.secret)
      })
      res.status(200).json(result)
    })
    .catch((err) => {
      res.status(422).json(err)
    })
})
*/

module.exports.router = router

function userHasOneRole(userRoles, targetRoles) {
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

// insert a user
/*
 schema.create({ username: 'anne', email: 'anne@miller.com', age: 44 })
 .then((result) => {
 console.log('created a user:', result[0])
 })
 .catch((err) => {
 console.error(err.message)
 })
 W/
 /*
 // get all users
 schema.read({})
 .then((result) => {
 console.log(result)
 // res.status(200).json(content);
 })
 .catch((err) => {
 console.log(err.message)
 })
 */