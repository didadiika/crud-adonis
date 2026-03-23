import type { HttpContext } from '@adonisjs/core/http'
import Student from '#models/student'
import { v4 as uuidv4 } from 'uuid'
import Database from '@adonisjs/lucid/services/db'

export default class MahasiswasController {
  /**
   * Display a list of resource
   */
  async index({ view, response, request }: HttpContext) {
      const students = await Student.query().orderBy('created_at', 'desc').whereNull('deleted_at')
      .whereHas('major', (query) => {
        query.where('deleted_at', null)
        })
      .preload('major')
      const url = request.url()
      const segments = url.split('/').filter(Boolean)
      return view.render('admin/master-data/mahasiswa/index', { students, segments })
      //return response.status(200).json(students)
    }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { major_id, student_name, uid, date_of_birth, address, gender } = request.only([
      'major_id',
      'name',
      'uid',
      'date_of_birth',
      'address',
      'gender',
    ])
    const id = uuidv4()
    try {
      const mahasiswa = await Student.create({
        id: id,
        majorId: major_id,
        uid: uid,
        studentName: student_name,
        dateOfBirth: date_of_birth,
        address: address,
        gender: gender,
       })
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
      const student = await Student.query().where('id', id)
      .whereNull('deleted_at')
      .preload('major').first()
      return response.status(200).json(student)
    }

  /**
   * Edit individual record
   */
  async edit({ params, response }: HttpContext) {
      const { id } = params
      const student = await Student.query().where('id', id)
      .whereNull('deleted_at')
      .preload('major').first()
      return response.status(200).json(student)
    }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
      const { id } = params
      const { major_id, student_name, uid, date_of_birth, address, gender } = request.only([
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
          studentName: student_name,
          dateOfBirth: date_of_birth,
          address: address,
          gender: gender,
        })
        if (affectedRows.length === 0) {
          return response.status(404).json({ error: 'User not found' })
        }
        const student = await Student.query().where('id', id)
        .whereNull('deleted_at')
        .preload('major').first()
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
        return response.status(200).json({ message: 'User deleted successfully' })
      } catch (error) {
        console.error('Error deleting user:', error)
        return response.status(500).json({ error: 'Internal Server Error' })
      }
    }

  async datatable({ request, response }: HttpContext) {
      const start = Number(request.input('start', 0))
      const length = request.input('length', 10)
      const search = request.input('search.value', '')
  
      // Query dasar
    let query = Database.from('students')
            .innerJoin('majors', 'students.major_id', 'majors.id')
            .innerJoin('faculties', 'majors.faculty_id', 'faculties.id')
            .whereNull('students.deleted_at')
  
      // 🔍 MULTI FIELD SEARCH
      if (search) {
        query = query.where((builder) => {
          builder
          .whereILike('students.uid', `%${search}%`)
          .orWhereILike('students.student_name', `%${search}%`)
          .orWhereILike('students.date_of_birth', `%${search}%`)
          .orWhereILike('students.address', `%${search}%`)
          .orWhereILike('students.gender', `%${search}%`)
          .orWhereILike('majors.major_name', `%${search}%`)
      })
    }

    // Total data tanpa filter
      const totalResult = await Database
      .from('students')
      .whereNull('deleted_at')
      .count('* as total')
      const recordsTotal = Number(totalResult[0]?.total || 0)
  
      // Total setelah filter
      const filteredResult = await query.clone().count('* as total')
      const recordsFiltered = Number(filteredResult[0]?.total || 0)
  
      // Ambil data dengan pagination
      const data = await query
                .select(
                'students.id',
                'students.major_id',
                'students.uid',
                'students.student_name',
                'students.date_of_birth',
                'students.address',
                'students.gender',
                'majors.major_name'
              )
              .orderBy('students.uid', 'asc')
              .offset(start)
              .limit(length)
  
      // Format data ke DataTables
      const result = data.map((item, index) => {
        return {
          DT_RowIndex: start + index + 1,
          id: item.id,
          student_uid: item.uid || '',
          major_name: item.major_name,
          student_name: item.student_name,
          student_date_of_birth: item.date_of_birth,
          student_address: item.address,
          student_gender: item.gender,
          action: `
            <button class="btn btn-sm btn-warning item_edit" data-id="${item.id}">Edit</button>
            <button href="javascript:;" class="btn btn-sm btn-danger item_hapus" data-id="${item.id}">Delete</button>
          `
        }
      })
  
      return response.json({
        draw: Number(request.input('draw', 1)),
        recordsTotal,
        recordsFiltered,
        data: result
      })
    }
}