import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Hash from '@adonisjs/core/services/hash'

export default class TokensController {
  /**
   * Display a list of resource
   */
  async index({ response, request }: HttpContext) {
    const username = request.input('username')
    const password = request.input('password')

    const authenticate = await User.findBy('email', username)
    if (!authenticate) {
      return response.status(401)
    }
    const isValid = await Hash.verify(authenticate.password, password)
    if (!isValid) {
      return response.status(401)
    }
    const token = await User.accessTokens.create(authenticate, ['*'], {
      expiresIn: '7 days',
    })
    return { type: 'bearer', value: token.value!.release() }
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({}: HttpContext) {}

  /**
   * Show individual record
   */
  async show({}: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({}: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({}: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({}: HttpContext) {}
}