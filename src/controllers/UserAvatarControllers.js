const knex = require('../database/knex')
const DiskStorage  = require('../providers/DiskStorage')


class UserAvatarControllers{
  async update(req, res) {
    const user_id = req.user.id
    const avatarFilename = req.file.filename

    const diskStorage = new DiskStorage()

    const user = await knex('users').where({id: user_id}).first()

    if(!user){
      return res.json("Somente usuários autenticados podem mudar a foto de perfil")
    }

    if(user.avatar){
      await diskStorage.deleteFile(user.avatar)
    }

    const fileName = await diskStorage.saveFile(avatarFilename)
    user.avatar = fileName

    await knex('users').update(user).where({id: user_id})
    
    return res.json(user)
  }


}

module.exports = UserAvatarControllers