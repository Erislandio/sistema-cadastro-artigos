const { authSecret } = require('../..env')
const passaport = require('passport')
const passaportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passaportJwt

module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done) => {
        app.db('users')
            .where({ id: payload.id })
            .first()
            .then(user => done(null, user ? { ...payload } : false))
            .catch(err => done(err, false))
    })

    passaport.use(strategy)
    return {
        authenticate: () => passaport.authenticate('jwt', { session: false })
    }
}