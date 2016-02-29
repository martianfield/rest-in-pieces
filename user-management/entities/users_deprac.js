'use strict'

const router = require('express').Router()
const Schema = require('iceworm').Schema
const snowflea = require('snowflea')
const jwt = require('jsonwebtoken')
const settings = require('setthings').settings
const helper = require(__dirname + '/../lib/helper')

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
    collection:'users',
    access: {
      'read':['admin'],
      'write':['admin']
    }
  }
)


const user_admin = "facebook.56b7b2c3e4cf56e928ebe7cb"
const user_normal = "google.56b7b2c3e4cf56e928ebe7cb"

const user_current = user_admin

// the router
router.get('/', (req, res) => {
  // user_schema.read({"id":user_current})
  snowflea.read({"id":user_current}, schema)
    .then((result) => {
      // TODO check if the user exists
      let user = result[0]
      // check if user has role
      let hasAccess = helper.roleMatch(user.roles, schema.options.access.read)

      if(!hasAccess) {
        throw new Error("no access")
      }
      console.log("hello")
      // get users
      return snowflea.read({}, schema)
    })
    .then(result => {
      addTokens(result)
      res.status(200).json(result)
    })
    .catch((err) => {
      //res.status(200).send("error")
      res.status(422).send(err.message)
    })
})

module.exports.router = router
module.exports.schema = schema

function addTokens(users) {
  users.forEach(user => {
    let payload = {
      id:user.id,
      auth:user.auth
    }
    let token = jwt.sign(payload, settings.jwt.secret)
    user.token = token
    console.log("token:", token)
    //console.log(jwt.decode(token))
    jwt.verify(token, settings.jwt.secret, (err, decoded) => {
      if(err) {
        console.log("err:", err)
      }
      else {
        console.log("decoded:", decoded)
      }
    })
  })
}
