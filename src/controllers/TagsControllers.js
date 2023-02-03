const knex = require('../database/knex')

class TagsControllers {
  async getAll(req, res){
    const { user_id } = req.params

    const tags = await knex("movie_tags")
    .where({user_id})

    return res.json(tags)
 }

 async index(req, res){
  
 }

}

module.exports = TagsControllers