import { type HttpContext } from '@adonisjs/core/http'
import Faculties from '#models/faculties'
import { v4 as uuidv4 } from 'uuid'

export default class FakultasController {
  /**
   * Display a list of resource
   */
  async index({ view, request }: HttpContext) {
    const faculties = await Faculties.query().orderBy('created_at','desc').whereNull('deleted_at')
    const url = request.url()
    const segments = url.split('/').filter(Boolean)
    return view.render('admin/master-data/fakultas/index', { faculties, segments })
    //return response.status(200).json(faculties)
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

  async search({ response, request }: HttpContext) {
    const search = request.input('search', '').trim()
    const page = request.input('page')
    const limit = request.input('limit')
    const offset = limit * (page - 1)
    try {
      const data = await Faculties.query()
      .whereRaw('faculty_name LIKE ? COLLATE utf8mb4_general_ci', [`%${search}%`])
      .orderBy('faculty_name', 'asc')
      .whereNull('deleted_at')
      .forPage(page, limit)

      const totalResult = await Faculties.query()
      .whereNull('deleted_at')
      .count('* as total')

      // Count data setelah filter
      const filteredResult = await Faculties.query()
      .whereRaw('faculty_name LIKE ? COLLATE utf8mb4_general_ci', [`%${search}%`])
      .whereNull('deleted_at')
      .count('* as total')

      const total = Number(totalResult[0].$extras.total)
      const filtered = Number(filteredResult[0].$extras.total)
      const mappedData = data.map((item) => ({
        id: item.id,
        text: item.facultyName
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
    let query = Faculties.query().whereNull('deleted_at')

    // 🔍 MULTI FIELD SEARCH
    if (search) {
      query = query.where((builder) => {
        builder
          .whereILike('faculty_name', `%${search}%`)
          .orWhereILike('faculty_code', `%${search}%`)
      })
    }

    // Total data tanpa filter
    const recordsTotal = await Faculties.query()
      .whereNull('deleted_at')
      .count('* as total')
      .first()

    // Total setelah filter
    const recordsFiltered = await query.clone().count('* as total').first()

    // Ambil data dengan pagination
    const data = await query
      .orderBy('faculty_name', 'asc')
      .offset(start)
      .limit(length)

    // Format data ke DataTables
    const result = data.map((item, index) => {
      return {
        DT_RowIndex: start + index + 1,
        id: item.id,
        faculty_code: item.facultyCode || '',
        faculty_name: item.facultyName,
        action: `
          <button class="btn btn-sm btn-warning item_edit" data-id="${item.id}">Edit</button>
          <button href="javascript:;" class="btn btn-sm btn-danger item_hapus" data-id="${item.id}">Delete</button>
        `
      }
    })

    return response.json({
      draw: request.input('draw'),
      recordsTotal: recordsTotal?.$extras.total || 0,
      recordsFiltered: recordsFiltered?.$extras.total || 0,
      data: result
    })
  }
}