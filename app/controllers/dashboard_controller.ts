import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  /**
   * Display a list of resource
   */
  async index({ view, request }: HttpContext) {
    const url = request.url()
    const segments = url.split('/').filter(Boolean)
    return view.render('admin/dashboard', { segments })
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({  }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({  }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({  }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({  }: HttpContext) {}
}