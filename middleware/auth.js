const jwt = require('jsonwebtoken')
const keys = require('../config/keys')

module.exports = function(req, res, next) {
    // get token from header
    const token = req.cookies.xAuthToken

    // check if not token
    if(!token) {
        return res.status(401).json({ errors: [{ msg: 'Token não existente, autorização negada' }] })
    }

    // verify token
    try {
        const decoded = jwt.verify(token, keys.jwtSecret)

        req.user = decoded.user
        next()
    } catch(err) {
        res.status(401).json({ errors: [{ msg: 'Token inválido' }] })
    }
}