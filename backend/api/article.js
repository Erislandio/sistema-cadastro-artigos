module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const article = { ...req.body }
        if (req.params.id) article.id = req.params.id

        // * Validação dos campos
        try {
            existsOrError(article.name, "Nome não foi definido")
            existsOrError(article.description, "Descrição nao foi informado")
            existsOrError(article.categoryId, "ID da Categoria não foi informado")
            existsOrError(article.userId, "Autor não informado")
            existsOrError(article.content, "Conteudo não foi informado")
        } catch (msg) {
            res.status(400).send(msg)
        }

        if (article.id) {
            app.db('articles')
                .update(article)
                .where({ id: article.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('articles')
                .insert(article)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('articles')
                .where({ id: req.params.id }).del()
            notExistsOrError(rowsDeleted, "Artigo não encontrado")

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }
}