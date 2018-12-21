const bcrypt = require('bcrypt-nodejs')


module.exports = app => {

    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    // * função para encripitar a senha do usuario
    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        // * pega o corpo da requisição
        const user = { ...req.body }
        if (req.params.id) user.id = req.params.id

        // * validação do usuarios
        try {
            existsOrError(user.name, "Nome não informado")
            existsOrError(user.email, "E-mail não informado")
            existsOrError(user.password, "Senha não informada")
            existsOrError(user.confirmPassword, "Confirmação de senha inválida")
            existsOrError(user.password, user.confirmPassword, "Senhas Nãp conferem")

            // * usuario ja cadastrado 
            const userFromDB = await app.db('users')
                .where({ email: user.email }).first();
            if (user.id) {
                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }

        } catch (msg) {
            // ! erro do lado do cliente --> 400
            return res.status(400).send(msg)
        }

        // * encripita a senha do usuario
        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        // ! validação e adição
        // * status 204 deu certo, mas nao retorna as infomações
        // todo ERRO 500 --> LADO SO SERVER
        if (user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .then(_ => res.status(204)).send()
                .catch(err => res.status(500).send(err))
        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }

    }

    // * lista de usuarios 
    const get = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    return { save, get }
}