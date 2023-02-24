const { hash, compare } = require('bcryptjs')
const knex = require('../database/knex')

class UsersControllers {
  async create(req, res) {
    const { name, email, password } = req.body

    const checkIfUserExists = await knex('users').where({ email }).first()

    if (checkIfUserExists) {
      return res.status(400).json('Este email já está em uso.')
    }

    const hashedPassword = await hash(password, 8)

    await knex('users').insert({ name, email, password: hashedPassword })
    res.json(`usuario ${name} criado com sucesso`)
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body
    const user_id = req.user.id

    const user = await knex('users').where({ id: user_id }).first()

    if (!user) {
      return res.status(404).json('usuário nao encontrado')
    }

    if (old_password && !old_password) {
      return res.json(
        'Você precisa informar a senha antiga para definir a nova senha'
      )
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)
      if (!checkOldPassword) {
        return res.json('A senha antiga não confere')
      }

      user.password = await hash(password, 8)
    }

    const checkIfEmailExists = await knex('users')
      .where({ email: user.email })
      .first()

    if (user.email === checkIfEmailExists) {
      return res.status(404).json('este email ja está em uso')
    }

    await knex('users')
      .where({ id: user_id })
      .update({
        name: name ?? user.name,
        email: email ?? user.email,
        password: password ?? user.password
      })

    return res.json()
  }

  async getAll(req, res) {
    const users = await knex('users')

    return res.json(users)
  }

  async getById(req, res) {
    const { id } = req.params

    const users = await knex('users').where({ id }).first()

    if (!users) {
      return res.status(404).json('usuário nao encontrado')
    }

    return res.json(users)
  }

  async delete(req, res) {
    const { id } = req.params

    await knex('users').where({ id }).delete()

    return res.json('usuário deletado')
  }
}

module.exports = UsersControllers
