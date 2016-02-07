'use strict'

const router = require('express').Router()
const Schema = require('iceworm').Schema
const snowflea = require('snowflea')

// the schema
let schema = new Schema(
  {
    username: '*string',
    email: '*email'
  }
)
snowflea.use(schema, 'users')

/*
// insert a user
schema.create({ username: 'peter', email: 'peter@miller.com' })
  .then((result) => {
    console.log('created a user:', result[0])
  })
  .catch((err) => {
    console.error(err.message)
  })
*/
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

// the router
router.get('/', (req, res) => {
  schema.read({})
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      res.status(422).json(err)
    })
})


module.exports.router = router