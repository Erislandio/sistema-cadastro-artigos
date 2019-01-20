const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
const mongoose = require('mongoose')
require('./config/mongodb')

const PORT = 3000
app.db = db
app.mongoose = mongoose

consign()
    .include('./config/passaport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(PORT, () => {
    const message = (`backend esta sendo executado... na porta=${PORT}`)
    console.log('\x1b[41m%s\x1b[37m', message, '\x1b[0m')
})
