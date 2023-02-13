const express = require('express')
const AppError = require('./utils/AppError')
const routes = require('./routes')
const uploadConfig = require('../configs/upload')

const app = express()

app.use(express.json())

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

const PORT = 3333

app.listen(PORT, () =>
  console.log(`server is perfectly running on Port ${PORT}`)
)
