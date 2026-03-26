import type { HttpContext } from '@adonisjs/core/http'
import Student from '#models/student'
import { v4 as uuidv4 } from 'uuid'

export default class MahasiswasController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const limit = request.input('limit')
    const page = request.input('page')

    let query = Student.query()
      .orderBy('created_at', 'desc')
      .whereNull('deleted_at')
      .preload('major', (majorQuery) => {
        majorQuery.preload('faculty')
      })

    if (limit && page) {
      query = query.forPage(page, limit)
    }
    const students = await query
    return response.status(200).json({
      data: students,
      total: students.length,
      message: students.length ? 'Data ditemukan' : 'Tidak ada data'
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
    const { major_id, name, uid, date_of_birth, address, gender } = request.only([
      'major_id',
      'name',
      'uid',
      'date_of_birth',
      'address',
      'gender',
    ])
    const id = uuidv4()
    try {
      await Student.create({
        id: id,
        majorId: major_id,
        uid: uid,
        studentName: name,
        dateOfBirth: date_of_birth,
        address: address,
        gender: gender,
      })
      const student = await Student.query().where('id', id).whereNull('deleted_at').first()
      return response.status(201).json({
        data: student,
        total: student ? 1 : 0,
        message: student ? 'Data berhasil disimpan' : 'Tidak ada data'
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
    const student = await Student.query()
      .where('id', id)
      .whereNull('deleted_at')
      .preload('major', (majorQuery) => {
        majorQuery.preload('faculty')
      })
      .firstOrFail()

    return response.status(200).json(student)
}

  /**
   * Edit individual record
   */
  async edit({ params, response }: HttpContext) {
    const { id } = params
    const student = await Student.query()
      .where('id', id)
      .whereNull('deleted_at')
      .preload('major', (majorQuery) => {
        majorQuery.preload('faculty')
      })
      .firstOrFail()

    return response.status(200).json(student)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
      const { id } = params
      const { major_id, name, uid, date_of_birth, address, gender } = request.only([
      'major_id',
      'name',
      'uid',
      'date_of_birth',
      'address',
      'gender',
    ])
    try {
      const affectedRows = await Student.query().where('id', id).update({
        majorId: major_id,
        uid: uid,
        studentName: name,
        dateOfBirth: date_of_birth,
        address: address,
        gender: gender,
        updatedAt: new Date(),
      })
      if (affectedRows.length === 0) {
        return response.status(404).json({ error: 'User not found' })
      }
      const student = await Student.query()
        .where('id', id)
        .whereNull('deleted_at')
        .preload('major', (majorQuery) => {
          majorQuery.preload('faculty')
        })
        .first()
      return response.status(200).json(student)
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
      const affectedRows = await Student.query().where('id', id).update({
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
}