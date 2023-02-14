const { verify } = require('jsonwebtoken')
const authConfig = require('../configs/auth')

function ensureAuth(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json('JWT Token não informado')
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret)
    req.user={
      id: Number(user_id)
    }

    return next()
  } catch (error) {
    
    console.log(error)
    return res.json("JWT Token inválido")
  }
}

module.exports = ensureAuth