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
      return {
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
        description: description ?? movie_notes.description
      })

    return res.json()
  }

  async show(req, res) {
    const { id } = req.params

    const notes = await knex('movie_notes').where({ id }).first()
    const tags = await knex('movie_tags')
      .where({ notes_id: id })
      .orderBy('name')

    return res.json({ ...notes, tags })
  }

  async index(req, res) {
    const { title, tags } = req.query
    const user_id = req.user.id

    let notes

    if (tags) {
      const filterTags = tags.split(',').map(tag => tag.trim())

      notes = await knex('movie_tags')
        .select(['movie_notes.id', 'movie_notes.title', 'movie_notes.user_id'])
        .where('movie_notes.user_id', user_id)
        .whereLike('movie_notes.title', `%${title}%`)
        .whereIn('name', filterTags)
        .innerJoin('movie_notes', 'movie_notes.id', 'movie_tags.movie_id')
        .groupBy('movie_notes.id')
        .orderBy('movie_notes.title')
    } else {
      notes = await knex('movie_notes')
        .where({ user_id })
        .whereLike('title', `%${title}%`)
        .orderBy('title')
    }

    const userTags = await knex('movie_tags').where({ user_id })
    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id)
      return {
        ...note,
        tags: noteTags
      }
    })

    return res.json(notesWithTags)
  }

  async delete(req, res) {
    const { id } = req.params

    await knex('movie_notes').where({ id }).delete()

    return res.json('Anotação deletada com sucesso')
  }
}

module.exports = MovieNotesControllers
