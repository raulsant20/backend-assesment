const isAuthenticated = require('../middlewares/auth')
const {create, getFavs, getFavId, deleteFavId} = require('../controllers/favs')
const favsRouter = require('express').Router()



favsRouter.post('/', isAuthenticated, create )
favsRouter.get('/', isAuthenticated, getFavs )
favsRouter.get('/:id', isAuthenticated, getFavId )
favsRouter.delete('/:id', isAuthenticated, deleteFavId )

module.exports = favsRouter