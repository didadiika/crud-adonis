import type { HttpContext } from '@adonisjs/core/http'
import Major from '#models/major'
import { v4 as uuidv4 } from 'uuid'

export default class JurusansController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const limit = request.input('limit')
    const page = request.input('page')

    let query = Major.query()
      .orderBy('created_at', 'desc')
      .whereNull('deleted_at')
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .whereHas('faculty', (query) => {
        query.whereNull('deleted_at')
      })

    if (limit && page) {
      query = query.forPage(page, limit)
    }
    const majors = await query
    return response.status(200).json({
      data: majors,
      total: majors.length,
      message: majors.length ? 'Data ditemukan' : 'Tidak ada data'
    })
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { faculty_id, name } = request.only(['faculty_id', 'name'])
    const id = uuidv4()
    try {
      await Major.create({ id: id, facultyId: faculty_id, majorName: name })
      const major = await Major.query().where('id', id).whereNull('deleted_at').first()
      return response.status(201).json({
        data: major,
        total: major ? 1 : 0,
        message: major ? 'Data berhasil disimpan' : 'Tidak ada data'
      })
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
    const major = await Major.query()
      .where('id', id)
      .whereNull('deleted_at')
      .whereHas('faculty', (query) => {
        query.whereNull('deleted_at')
      })
      .first()
    return response.status(200).json({
      data: major,
      total: major ? 1 : 0,
      message: major ? 'Data ditemukan' : 'Tidak ada data'
    })
  }

  /**
   * Edit individual record
   */
  async edit({ params, response }: HttpContext) {
    const { id } = params
    const major = await Major.query().where('id', id)
      .whereNull('deleted_at')
      .preload('faculty')
      .first()
    return response.status(200).json({
      data: major,
      total: major ? 1 : 0,
      message: major ? 'Data ditemukan' : 'Tidak ada data'
    })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const { id } = params
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { faculty_id, name } = request.only(['faculty_id', 'name'])
    try {
      const affectedRows = await Major.query().where('id', id).update({
        facultyId: faculty_id,
        majorName: name,
        updatedAt: new Date(),
      })
      if (affectedRows.length === 0) {
        return response.status(404).json({ error: 'User not found' })
      }
      const major = await Major.query().where('id', id).whereNull('deleted_at').first()
      return response.status(200).json({
        data: major,
        total: major ? 1 : 0,
        message: major ? 'Data ditemukan' : 'Tidak ada data'
      })
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
      return response.status(204).json({ message: 'User deleted successfully' })
    } catch (error) {
      console.error('Error deleting user:', error)
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async majors_of_faculty({ params, response }: HttpContext){
    const { id } = params
    try {
      const majors = await Major.query()
        .where('faculty_id', id)
        .orderBy('major_name', 'asc')
        .whereNull('deleted_at')
        .select('id', 'major_name')

      return response.status(200).json(majors)
    } catch (error) {
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }
}