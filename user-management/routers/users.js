const entities = require(__dirname + '/../entities/entities')
const router = require('express').Router()

router.get('/', (req, res) => {
  entities.daos["users"].all()
    .then(docs => {
      console.log("success: received user docs")
      res.send(docs)
    })
    .catch(err => {
      res.send(err.message)
      console.error("error: did not receive user docs")
      console.error(err)
    })
})

module.exports = router