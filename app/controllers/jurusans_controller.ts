import type { HttpContext } from '@adonisjs/core/http'
import Major from '#models/major'
import { v4 as uuidv4 } from 'uuid'

export default class JurusansController {
  /**
   * Display a list of resource
   */
  async index({ view, response, request }: HttpContext) {
    const majors = await Major.query().orderBy('created_at', 'desc').whereNull('deleted_at')
    .whereHas('faculty', (query) => {
      query.where('deleted_at', null)
      })
    .preload('faculty')
    const url = request.url()
    const segments = url.split('/').filter(Boolean)
    return view.render('admin/master-data/jurusan/index', { majors, segments })
    //return response.status(200).json(majors)
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { faculty_id, name } = request.only(['faculty_id', 'name'])
    const id = uuidv4()
    try {
      const jurusan = await Major.create({ id: id, facultyId: faculty_id, majorName: name })
      return response.redirect().back()
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
    const faculty = await Major.query().where('id', id)
    .whereNull('deleted_at')
    .preload('faculty').first()
    return response.status(200).json(faculty)
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const { id } = params
    const { faculty_id, name } = request.only(['faculty_id', 'name'])
    try {
      const affectedRows = await Major.query().where('id', id).update({
        facultyId: faculty_id,
        majorName: name,
      })
      if (affectedRows.length === 0) {
        return response.status(404).json({ error: 'User not found' })
      }
      return response.status(200).json({ id, faculty_id, name })
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
      const affectedRows = await Major.query().where('id', id).update({
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