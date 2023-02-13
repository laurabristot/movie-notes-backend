const { Router } = require('express');

const SessionControllers = require('../controllers/SessionControllers')

const sessionControllers = new SessionControllers()

const sessionRoutes = Router()

sessionRoutes.post('/', sessionControllers.create)

module.exports = sessionRoutes