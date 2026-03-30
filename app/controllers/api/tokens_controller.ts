import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Hash from '@adonisjs/core/services/hash'
import { Secret } from '@adonisjs/core/helpers'

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
      name: 'access',
    })
    const refreshToken = await User.accessTokens.create(authenticate, ['refresh'], {
      expiresIn: '30 days',
      name: 'refresh',
    })
    return {
      type: 'bearer',
      access_token: accessToken.value!.release(),
      access_expires_at: accessToken.expiresAt,
      refresh_token: refreshToken.value!.release(),
      refresh_expires_at: refreshToken.expiresAt,
    }
  }

  // async refresh_token({ auth }: HttpContext) {
  //   const user = auth.user!

  //   const newToken = await User.accessTokens.create(user, ['*'], {
  //     expiresIn: '1 days',
  // })

  // return {
  //     type: 'bearer',
  //     access_token: newToken.value!.release(),
  //   }
  // }

  // Jika Refresh Token lama masih ada dan berlaku maka Generate Access Token dan Refresh Token Baru


  async refresh_token({ request, response }: HttpContext) {
    const authHeader = request.header('authorization')!
    const refreshToken = authHeader.replace('Bearer ', '')
    const token = await User.accessTokens.verify(new Secret(refreshToken))

    if (!token) {
      return response.unauthorized({ message: 'Invalid refresh token' })
    }

    if (token.name !== 'refresh') {
      return response.unauthorized({ message: 'Invalid token type' })
    }

    if (token.expiresAt && token.expiresAt < new Date()) {
      return response.unauthorized({ message: 'Refresh token expired' })
    }

    const user = await User.find(token.tokenableId)
    if (!user) {
      return response.unauthorized({ message: 'User not found' })
    }
    await User.accessTokens.delete(user, token.identifier)
    const accessToken = await User.accessTokens.create(user, ['*'], {
      expiresIn: '1 days',
      name: 'access',
    })
    const newRefreshToken = await User.accessTokens.create(user, ['refresh'], {
      expiresIn: '30 days',
      name: 'refresh',
    })

    return {
      type: 'bearer',
      access_token: accessToken.value!.release(),
      access_expires_at: accessToken.expiresAt,
      refresh_token: newRefreshToken.value!.release(),
      refresh_expires_at: newRefreshToken.expiresAt,
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