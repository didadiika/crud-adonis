import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Hash from '@adonisjs/core/services/hash'

export default class TokensController {
  /**
   * Display a list of resource
   */
  async tokens({ response, request }: HttpContext) {
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
    const accessToken = await User.accessTokens.create(authenticate, ['*'], {
      expiresIn: '1 days',
    })
    const refreshToken = await User.accessTokens.create(authenticate, ['refresh'], {
      expiresIn: '30 days',
    })
    return {
      type: 'bearer',
      access_token: accessToken.value!.release(),
      refresh_token: refreshToken.value!.release()
    }
  }

  async refresh_token({ auth }: HttpContext) {
    const user = auth.user!

    const newToken = await User.accessTokens.create(user, ['*'], {
      expiresIn: '1 days',
  })

   return {
      type: 'bearer',
      access_token: newToken.value!.release(),
    }
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