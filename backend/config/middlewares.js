const bodyParse = require('body-parser')
const cors = require('cors')


//  ! consig dependence
module.exports = app => {
    app.use(bodyParse.json())
    app.use(cors())
}