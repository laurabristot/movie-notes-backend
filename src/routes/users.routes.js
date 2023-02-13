const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const UsersControllers = require('../controllers/UsersControllers')
const UserAvatarControllers = require('../controllers/UsersControllers')
const ensureAuth = require('../middlewares/ensureAuth')

const usersRoutes = Router()
// fazemos dessa forma para quando quisermos implementar outra tecnica de upload, podermo reaproveitar de forma mais facil o código, sem quebrar a aplicacao
const upload = multer(uploadConfig.MULTER)

const usersControllers = new UsersControllers()
const userAvatarControllers = new UserAvatarControllers()

usersRoutes.post('/', usersControllers.create)
usersRoutes.put('/', ensureAuth, usersControllers.update)
usersRoutes.get('/:id', usersControllers.getById)
usersRoutes.get('/', usersControllers.getAll)
usersRoutes.delete('/:id', usersControllers.delete)
usersRoutes.patch('/avatar', ensureAuth, upload.single('avatar'), userAvatarControllers.update)

module.exports = usersRoutes
