const userRouter = require('express').Router()
const create = require('../controllers/user')

userRouter.post('/', create)

module.exports = userRouter