const snowflea = require('snowflea')
const app = require('express')()
const port = process.env.PORT || 8080
const set = require('setthings').set

set('mongo.uri', 'mongodb://localhost:27017/playground')
set('jwt.secret', 'doubledoubletoilandtrouble')

app.use('/', require('./routers/index'))
app.use('/users/', require('./entities/users').router)

console.log(`serving at http://localhost:${port}`);
app.listen(port);
