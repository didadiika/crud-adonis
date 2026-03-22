import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  /**
   * Display a list of resource
   */
  public async index({ response }: HttpContext) {
    try {
      const users = await User.query().orderBy('created_at', 'desc').whereNull('deleted_at')
      return response.status(200).json(users)
    } catch (error) {
      console.error('Error fetching users:', error)
      return response.status(400).json({ error: 'Internal Server Error' })
    }
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { name, email, password } = request.only(['name', 'email', 'password'])
    try {
      const user = await User.create({
        firstName: name,
        email: email,
        password: password,
      })
      const { id } = user
      return response.status(201).json({ id, name, email })
    } catch (error) {
      console.error('Error creating user:', error)
      return response.status(400).json({ error: 'Failed to create user' })
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const { id } = params
    try {
      const user = await User.query().where('id', id).whereNull('deleted_at').first()
      if (!user) {
        return response.status(404).json({ error: 'User not found' })
      }
      return response.status(200).json(user)
    } catch (error) {
      console.error('Error fetching user:', error)
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }

  /**
   * Edit individual record
   */
  async edit({ params, response }: HttpContext) {
    const { id } = params
    try {
      const user = await User.query().where('id', id).whereNull('deleted_at').first()
      if (!user) {
        return response.status(404).json({ error: 'User not found' })
      }
      return response.status(200).json(user)
    } catch (error) {
      console.error('Error fetching user for edit:', error)
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response}: HttpContext) {
    const { id } = params
    const { name, email, password } = request.only(['name', 'email', 'password'])
    try {
      const affectedRows = await User.query().where('id', id).update({
        first_name: name,
        email: email,
        password: password,
      })
      if (affectedRows.length === 0) {
        return response.status(404).json({ error: 'User not found' })
      }
      return response.status(200).json({ id, name, email })
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
      const affectedRows = await User.query().where('id', id).update({
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
}