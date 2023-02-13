const { compare } = require('bcryptjs');
const knex = require('../database/knex');

class SessionControllers {
  async create(req, res){
    const { email, password } = req.body
    
    const user = await knex('users').where({email}).first()

    if(!user){
      return res.status(401).json('Email/Senha não confere')
    }

    const passwordMatched = await compare(password, user.password)

    if(!passwordMatched){
      return res.status(401).json('Email/Senha não confere')
    }

    return res.json(user)
  }
}

module.exports = SessionControllers