const knex = require('../database/knex')

class MovieNotesControllers {
  async create(req, res) {
    const { title, description, rating, tags } = req.body
    const user_id = req.user.id


    if (rating > 5 || rating < 1) {
      return res.json('nota inválida, digite uma nota entre 1 e 5')
    }

    const notes_id = await knex('movie_notes').insert({
      title,
      description,
      rating,
      user_id
    })

    const tagsInsert = await tags.map(name => {
     return{
       notes_id,
       name,
       user_id

     }
    })

    await knex('movie_tags').insert(tagsInsert)


    res.json()
  }

  async update(req, res) {
    const { description, rating, title } = req.body
    const { id } = req.params

    const movie_notes = await knex('movie_notes').where({ id }).first()

    console.log(movie_notes)

    if (!movie_notes) {
      return res.status(404).json('usuário nao encontrado')
    }

    await knex('movie_notes')
      .where({ id })
      .update({ 
        title: title ?? movie_notes.title, 
        rating: rating ?? movie_notes.rating, 
        description: description ?? movie_notes.description })

    return res.json()
  }

  async show(req, res) {
    const { id } = req.params

    const notes = await knex('movie_notes').where({id}).first()
    const tags = await knex('movie_tags').where({ notes_id: id }).orderBy('name')

    return res.json({...notes, tags})
  }

  async index(req, res) {
    const {title} = req.params
    const user_id = req.user.id

   
    let notes = await knex('movie_notes')
    .where({ user_id })
    .orderBy('title')

    if (!notes) {
      return res.status(404).json('notes nao encontrado')
    }

    return res.json(notes)
  }

  async delete(req, res) {
    const { id } = req.params

    await knex('movie_notes').where({ id }).delete()

    return res.json('Anotação deletada com sucesso')
  }
}

module.exports = MovieNotesControllers
