import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    return view.render('visitor/login')
  }

  async login({ request }: HttpContext){
    const data = request.only(['username', 'password'])
    console.log(data)
    return data
  }
}