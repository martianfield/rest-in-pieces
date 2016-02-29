//const snowflea = require('snowflea')
const app = require('express')()
const port = process.env.PORT || 8080
const set = require('setthings').set
const settings = require('setthings').settings
const MongoClient = require('mongodb').MongoClient
const DA = require(__dirname + '/data_access/DA')

// settings
set('mongo.uri', 'mongodb://localhost:27017/restinpieces')
set('jwt.secret', 'doubledoubletoilandtrouble')

// connect to database, create entity objects
MongoClient.connect(settings.mongo.uri)
  .then(db => {
    console.log("successfully connected to mongo db")
    // initialize data access objects
    console.log("initializing data access objects")
    DA.init(db)
    // set up routes
    app.use('/users/', require(__dirname + '/routers/users'))
  })
  .catch(err => {
    console.error(err.message)
    //console.error("could not connect to mongo db")
  })


// set up routes
app.use('/', require('./routers/index'))
/*
app.use('/users/', require('./entities/users').router)
app.use('/exercises/', require('./entities/exercises').router)
*/

// start
console.log(`serving at http://localhost:${port}`);
app.listen(port);
