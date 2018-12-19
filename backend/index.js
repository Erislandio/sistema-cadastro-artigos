const app = require('express')()
const consign = require('consign')
const PORT = 3000



consign()
    .then('./config/middlewares.js')
    .into(app)

app.listen(PORT, () => {
    console.log(`backend esta sendo executado... na porta=${PORT}`)
})
