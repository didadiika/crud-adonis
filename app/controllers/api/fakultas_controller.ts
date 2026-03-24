import Faculties from '#models/faculties'
import { v4 as uuidv4 } from 'uuid'
import { HttpContext } from '@adonisjs/core/http'

export default class FakultasController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const limit = request.input('limit')
    const page = request.input('page')

      let query = Faculties
          .query()
          .orderBy('created_at', 'desc')
          .whereNull('deleted_at')

        if (limit && page) {
          query = query.forPage(page, limit)
        }
      const faculties = await query
    return response.status(200).json(faculties)
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { name } = request.only(['name'])
    const id = uuidv4()
    try {
      const fakultas = await Faculties.create({ id: id, facultyName: name })
      return response.status(200).json(fakultas)
    } catch (error) {
      console.error('Error creating user:', error)
      return response.status(400).json({ error: 'Failed to create data' })
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const { id } = params
    const faculty = await Faculties.query().where('id', id).whereNull('deleted_at').first()
    return response.status(200).json(faculty)
  }

  /**
   * Edit individual record
   */
  async edit({ params, response }: HttpContext) {
    const { id } = params
    const faculty = await Faculties.query().where('id', id).whereNull('deleted_at').first()
    return response.status(200).json(faculty)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const { id } = params
    const { name } = request.only(['name'])
    try {
      const affectedRows = await Faculties.query().where('id', id).update({
        facultyName: name,
      })
      if (affectedRows.length === 0) {
        return response.status(404).json({ error: 'User not found' })
      }
      return response.status(200).json({ id, name })
    } catch (error) {
      console.error('Error updating user:', error)
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const { id } = params
    try {
      // const affectedRows = await User.query().where('id', id).delete()
      const affectedRows = await Faculties.query().where('id', id).update({
        deleted_at: new Date(),
      })
      if (affectedRows.length === 0) {
        return response.status(404).json({ error: 'User not found' })
      }
      return response.status(200).json({ message: 'User deleted successfully' })
    } catch (error) {
      console.error('Error deleting user:', error)
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  } 
}