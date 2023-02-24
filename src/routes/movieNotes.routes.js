const { Router } = require('express')
const MovieNotesControllers = require("../controllers/MovieNotesControllers")
const ensureAuth = require('../middlewares/ensureAuth')

const movieNotesRoutes = Router()

const movieNotesControllers = new MovieNotesControllers()
movieNotesRoutes.use(ensureAuth)

movieNotesRoutes.post('/', movieNotesControllers.create)
movieNotesRoutes.put('/:id', movieNotesControllers.update)
movieNotesRoutes.delete('/:id', movieNotesControllers.delete)
movieNotesRoutes.get('/', ensureAuth, movieNotesControllers.index)
movieNotesRoutes.get('/:id', movieNotesControllers.show)

module.exports = movieNotesRoutes