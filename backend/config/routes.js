module.exports = app => {

    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passaport.authenticate())
        .post(app.api.user.save)
        .get(app.api.user.get)

    // * alterar
    app.route('/users/:id')
        .all(app.config.passaport.authenticate())
        .put(app.api.user.save)
        .get(app.api.user.getById)

    // ! get cateogoria
    app.route('/categories')
        .all(app.config.passaport.authenticate())
        .get(app.api.category.get)
        .post(app.api.category.save)

    app.route('/categories/tree')
        .all(app.config.passaport.authenticate())
        .get(app.api.category.getTree)

    app.route('/categories/:id')
        .all(app.config.passaport.authenticate())
        .get(app.api.category.getById)
        .put(app.api.category.save)
        .delete(app.api.category.remove)

    app.route('/articles')
        .all(app.config.passaport.authenticate())
        .get(app.api.article.get)
        .post(app.api.article.save)

    app.route('/articles/:id')
        .all(app.config.passaport.authenticate())
        .get(app.api.article.getById)
        .put(app.api.article.save)
        .delete(app.api.article.remove)
    app.route('/categories/:id/articles')
        .all(app.config.passaport.authenticate())
        .get(app.api.article.getByCategory)
}