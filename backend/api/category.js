module.exports = app => {
    const { exitsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const category = { ...req.body }
        if (req.params.id) category.id = req.params.id

        try {
            exitsOrError(category.name, "Nome não informado")
        } catch (msg) {
            return res.status(400).send()
        }

        if (category.id) {
            app.db('categories')
                .update(category)
                .where({ id: category.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send())
        } else {
            app.db('categories')
                .insert(category)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send())
        }
    }

    const remove = async (req, res) => {
        try {
            // ! verifica se possui subcategoria
            exitsOrError(req.params.id, "Código da categoria não foi informado.")
            const subcategory = await app.db('categories')
                .where({ parentId: req.params.id })
            // ! Verifica artigos 
            notExistsOrError(subcategory, "Categoria possui subcategoria")
            const articles = await app.db('categories')
                .where({ categoryId: req.params.id })

            notExistsOrError(articles, "Categoria possui artigos. ")
            // ! deleta categoria 
            const rowsDeleted = await app.db('categories')
                .where({ id: req.params.id }).del();
            exitsOrError(rowsDeleted, "Categoria não foi encontrada")
            // * envia o status
            res.status(204).send()

        } catch (msg) {
            res.status(400).send(msg)
        }
    }
}