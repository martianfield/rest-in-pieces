'use strict'

const DA = require(__dirname + '/../data_access/DA')
const router = require('express').Router()

router.get('/', (req, res) => {
  DA.O["users"].all()
    .then(docs => {
      //console.log("success: received user docs")
      res.send(docs)
    })
    .catch(err => {
      res.send(err.message)
      console.error("error: did not receive user docs")
      console.error(err)
    })
})

router.get('/:id', (req, res) => {
  let id = req.params.id
  DA.O.users.oneById(id)
    .then(result => {
      console.log("one user by id:", result)
      res.send(result)
    })
    .catch(err => {
      res.send(err.message)
      console.error("error: did not receive user docs")
      console.error(err)
    })
})

module.exports = router


