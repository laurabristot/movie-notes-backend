const { Router } = require('express')
const MovieNotesControllers = require("../controllers/MovieNotesControllers")

const movieNotesRoutes = Router()

const movieNotesControllers = new MovieNotesControllers()

movieNotesRoutes.post('/:user_id', movieNotesControllers.create)
movieNotesRoutes.put('/:id', movieNotesControllers.update)
movieNotesRoutes.delete('/:id', movieNotesControllers.delete)
movieNotesRoutes.get('/:id', movieNotesControllers.getById)
movieNotesRoutes.get('/', movieNotesControllers.getAll)

module.exports = movieNotesRoutes