import type { HttpContext } from '@adonisjs/core/http'
import Major from '#models/major'
import { v4 as uuidv4 } from 'uuid'
import Database from '@adonisjs/lucid/services/db'

export default class JurusansController {
  /**
   * Display a list of resource
   */
  async index({ view, request }: HttpContext) {
    const majors = await Major.query()
      .orderBy('created_at', 'desc')
      .whereNull('deleted_at')
      .whereHas('faculty', (query) => {
        query.whereNull('deleted_at')
      })
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
      return response.status(200).json(jurusan)
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
    const major = await Major.query().where('id', id)
      .whereNull('deleted_at')
      .preload('faculty')
      .first()
    return response.status(200).json(major)
  }

  /**
   * Edit individual record
   */
  async edit({ params, response }: HttpContext) {
    const { id } = params
    const major = await Major.query().where('id', id)
    .whereNull('deleted_at')
    .preload('faculty').first()
    return response.status(200).json(major)
  }

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
        updatedAt: new Date(),
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

  async search({ response, request }: HttpContext) {
      const search = request.input('search', '').trim()
      const page = request.input('page')
      const limit = request.input('limit')
      
      try {
        const data = await Major.query()
        .whereRaw('major_name LIKE ? COLLATE utf8mb4_general_ci', [`%${search}%`])
        .orderBy('major_name', 'asc')
        .whereNull('deleted_at')
        .forPage(page, limit)
  
        const totalResult = await Major.query()
        .whereNull('deleted_at')
        .count('* as total')
  
        // Count data setelah filter
        const filteredResult = await Major.query()
        .whereRaw('major_name LIKE ? COLLATE utf8mb4_general_ci', [`%${search}%`])
        .whereNull('deleted_at')
        .count('* as total')
  
        const total = Number(totalResult[0].$extras.total)
        const filtered = Number(filteredResult[0].$extras.total)
        const mappedData = data.map((item) => ({
          id: item.id,
          text: item.majorName
        }))
        return response.status(200).json({
        data: mappedData,
        meta: {
          total: total,            // jumlah semua data
          total_filtered: filtered, // jumlah data setelah filter
          page: page,
          limit: limit
        }
        })
      } catch (error) {
          return response.status(400).json({
            error: 'Failed to search data',
            detail: error.message
          })
        }
    }

  async datatable({ request, response }: HttpContext) {
      const start = Number(request.input('start', 0))
      const length = request.input('length', 10)
      const search = request.input('search.value', '')
  
      // Query dasar
    let query = Database.from('majors')
            .innerJoin('faculties', 'majors.faculty_id', 'faculties.id')
            .whereNull('majors.deleted_at')
  
      // 🔍 MULTI FIELD SEARCH
      if (search) {
        query = query.where((builder) => {
          builder
          .whereILike('majors.major_code', `%${search}%`)
          .orWhereILike('majors.major_name', `%${search}%`)
          .orWhereILike('faculties.faculty_name', `%${search}%`)
      })
    }

    // Total data tanpa filter
      const totalResult = await Database
      .from('majors')
      .whereNull('deleted_at')
      .count('* as total')
      const recordsTotal = Number(totalResult[0]?.total || 0)
  
      // Total setelah filter
      const filteredResult = await query.clone().count('* as total')
      const recordsFiltered = Number(filteredResult[0]?.total || 0)
  
      // Ambil data dengan pagination
      const data = await query
                .select(
                'majors.id',
                'majors.major_code',
                'majors.major_name',
                'faculties.faculty_name'
              )
              .orderBy('majors.major_name', 'asc')
              .offset(start)
              .limit(length)
  
      // Format data ke DataTables
      const result = data.map((item, index) => {
        return {
          DT_RowIndex: start + index + 1,
          id: item.id,
          major_code: item.major_code || '',
          faculty_name: item.faculty_name,
          major_name: item.major_name,
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

    async majors_of_faculty({ params, response }: HttpContext){
      const { id } = params
      try {
        const majors = await Major.query().where('faculty_id', id).orderBy('major_name','asc').whereNull('deleted_at').select('id', 'major_name')
        
        return response.status(200).json(majors)
      } catch (error) {
        return response.status(500).json({ error: 'Internal Server Error' })
      }
      
      
    }
}