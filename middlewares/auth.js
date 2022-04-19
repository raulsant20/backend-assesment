const jwt = require('jsonwebtoken')

const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization.slice(7)
    const { email } = jwt.verify(token, "apple")
    req.email = email
    next()
}

module.exports = isAuthenticated