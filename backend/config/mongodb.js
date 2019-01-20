const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/knowledge_stats', { useNewUrlParser: true })
    .then(msg => console.log('Contectado com o mongoDb'))
    .catch(e => {
        const msg = "[Erro] Não foi possivel conectar com mongo db"
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
    })